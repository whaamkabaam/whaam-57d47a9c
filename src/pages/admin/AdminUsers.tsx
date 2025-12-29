// ============================================
// Admin Users Page
// ============================================

import { useState, useCallback } from 'react';
import { LiquidGlassCard } from '@/components/LiquidGlassEffects';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Users, AlertCircle, UserX } from 'lucide-react';
import { useAdminUsers, useSetTestUser } from '@/hooks/api/useAdmin';
import { UserTableRow } from '@/components/admin/users/UserTableRow';
import { UserTableSkeleton } from '@/components/admin/users/UserTableSkeleton';
import { UsersToolbar } from '@/components/admin/users/UsersToolbar';
import { UsersPagination } from '@/components/admin/users/UsersPagination';
import { UserDetailModal } from '@/components/admin/users/UserDetailModal';
import { exportToCsv } from '@/lib/exportToCsv';
import { toast } from 'sonner';
import { format } from 'date-fns';
import type { AdminUser } from '@/lib/api/types';

const PAGE_SIZE = 20;

export default function AdminUsers() {
  const [search, setSearch] = useState('');
  const [includeTestUsers, setIncludeTestUsers] = useState(true);
  const [page, setPage] = useState(0);
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);

  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useAdminUsers({
    search: search || undefined,
    includeTestUsers,
    limit: PAGE_SIZE,
    offset: page * PAGE_SIZE,
  });

  const setTestUserMutation = useSetTestUser();

  const handleToggleTestUser = useCallback((userId: string, isTestUser: boolean) => {
    setTestUserMutation.mutate(
      { userId, isTestUser },
      {
        onSuccess: () => {
          toast.success(isTestUser ? 'User marked as test user' : 'Test user status removed');
          // Update selected user if it's the one being modified
          if (selectedUser?.id === userId) {
            setSelectedUser(prev => prev ? { ...prev, is_test_user: isTestUser } : null);
          }
        },
        onError: () => {
          toast.error('Failed to update test user status');
        },
      }
    );
  }, [setTestUserMutation, selectedUser]);

  const handleSearchChange = useCallback((value: string) => {
    setSearch(value);
    setPage(0); // Reset to first page on search
  }, []);

  const handleIncludeTestUsersChange = useCallback((value: boolean) => {
    setIncludeTestUsers(value);
    setPage(0); // Reset to first page on filter change
  }, []);

  const handleExport = useCallback(() => {
    const users = data?.users || [];
    if (users.length === 0) {
      toast.error('Nothing to export');
      return;
    }

    exportToCsv(users, `users-${format(new Date(), 'yyyy-MM-dd')}`, [
      { key: 'email', header: 'Email' },
      { key: 'display_name', header: 'Display Name', format: (v) => v ? String(v) : '' },
      { key: 'created_at', header: 'Created At', format: (v) => format(new Date(String(v)), 'yyyy-MM-dd HH:mm') },
      { key: 'feature_request_count', header: 'Feature Requests' },
      { key: 'problem_report_count', header: 'Problem Reports' },
      { key: 'vote_count', header: 'Votes' },
      { key: 'is_test_user', header: 'Is Test User' },
      { key: 'email_verified', header: 'Email Verified' },
    ]);

    toast.success('Export complete');
  }, [data]);

  const totalPages = data ? Math.ceil(data.total / PAGE_SIZE) : 0;
  const users = data?.users || [];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center gap-3">
        <Users className="h-8 w-8 text-secondary drop-shadow-[0_0_6px_rgba(255,215,64,0.5)]" />
        <div>
          <h1 className="text-2xl font-bold text-foreground">Users</h1>
          <p className="text-sm text-muted-foreground">
            Manage users and their permissions
          </p>
        </div>
      </div>

      {/* Toolbar */}
      <UsersToolbar
        search={search}
        onSearchChange={handleSearchChange}
        includeTestUsers={includeTestUsers}
        onIncludeTestUsersChange={handleIncludeTestUsersChange}
        totalUsers={data?.total || 0}
        isLoading={isLoading}
        onRefresh={() => refetch()}
        onExport={handleExport}
      />

      {/* Users Table */}
      <LiquidGlassCard variant="secondary" className="overflow-hidden">
        {isError ? (
          /* Error State */
          <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
            <AlertCircle className="h-12 w-12 text-destructive/70 mb-4" />
            <h2 className="text-lg font-semibold text-foreground mb-2">
              Failed to load users
            </h2>
            <p className="text-muted-foreground mb-4 max-w-sm">
              There was an error fetching the user list. Please try again.
            </p>
            <Button variant="outline" onClick={() => refetch()}>
              Retry
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-border/50">
                  <TableHead className="min-w-[240px]">User</TableHead>
                  <TableHead className="min-w-[200px]">Activity</TableHead>
                  <TableHead className="min-w-[120px]">Test User</TableHead>
                  <TableHead className="min-w-[100px]">Joined</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <UserTableSkeleton rows={PAGE_SIZE} />
                ) : users.length === 0 ? (
                  /* Empty State */
                  <TableRow>
                    <td colSpan={4} className="py-16">
                      <div className="flex flex-col items-center justify-center text-center">
                        <UserX className="h-12 w-12 text-muted-foreground/50 mb-4" />
                        <h2 className="text-lg font-semibold text-foreground mb-2">
                          No users found
                        </h2>
                        <p className="text-muted-foreground max-w-sm">
                          {search
                            ? `No users match "${search}". Try a different search term.`
                            : 'No users in the system yet.'}
                        </p>
                        {search && (
                          <Button
                            variant="ghost"
                            className="mt-4"
                            onClick={() => setSearch('')}
                          >
                            Clear search
                          </Button>
                        )}
                      </div>
                    </td>
                  </TableRow>
                ) : (
                  users.map((user) => (
                    <UserTableRow
                      key={user.id}
                      user={user}
                      onToggleTestUser={handleToggleTestUser}
                      isToggling={setTestUserMutation.isPending}
                      onViewDetails={setSelectedUser}
                    />
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </LiquidGlassCard>

      {/* Pagination */}
      {!isError && (
        <UsersPagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
          isLoading={isLoading}
        />
      )}

      {/* User Detail Modal */}
      <UserDetailModal
        user={selectedUser}
        open={!!selectedUser}
        onOpenChange={(open) => !open && setSelectedUser(null)}
        onToggleTestUser={handleToggleTestUser}
        isToggling={setTestUserMutation.isPending}
      />
    </div>
  );
}
