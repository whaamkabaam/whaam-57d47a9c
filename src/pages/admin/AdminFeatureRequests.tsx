// ============================================
// Admin Feature Requests Page
// ============================================

import { useState, useCallback } from 'react';
import { Lightbulb, AlertCircle } from 'lucide-react';
import { LiquidGlassCard } from '@/components/LiquidGlassEffects';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { toast } from '@/hooks/use-toast';
import { FeatureRequestsToolbar } from '@/components/admin/feature-requests/FeatureRequestsToolbar';
import { FeatureRequestRow } from '@/components/admin/feature-requests/FeatureRequestRow';
import { FeatureRequestDetailModal } from '@/components/admin/feature-requests/FeatureRequestDetailModal';
import { FeatureRequestsTableSkeleton } from '@/components/admin/feature-requests/FeatureRequestsTableSkeleton';
import { UsersPagination } from '@/components/admin/users/UsersPagination';
import {
  useAdminFeatureRequests,
  useUpdateAdminFeatureRequest,
  useArchiveFeatureRequest,
  useUnarchiveFeatureRequest,
  useDeleteFeatureRequest,
} from '@/hooks/api/useAdmin';
import type { 
  AdminFeatureRequest, 
  AdminFeatureRequestStatus, 
  AdminPriority,
  UpdateAdminFeatureRequest,
} from '@/lib/api/types';

const PAGE_SIZE = 20;

export default function AdminFeatureRequests() {
  // Filter state
  const [statusFilter, setStatusFilter] = useState<AdminFeatureRequestStatus | undefined>(undefined);
  const [includeArchived, setIncludeArchived] = useState(false);
  const [page, setPage] = useState(0);
  
  // Detail modal state
  const [selectedRequest, setSelectedRequest] = useState<AdminFeatureRequest | null>(null);

  // Data fetching
  const { 
    data, 
    isLoading, 
    isError,
    error,
    refetch,
    isFetching,
  } = useAdminFeatureRequests({
    status: statusFilter,
    limit: PAGE_SIZE,
    offset: page * PAGE_SIZE,
    includeArchived,
  });

  // Mutations
  const updateMutation = useUpdateAdminFeatureRequest();
  const archiveMutation = useArchiveFeatureRequest();
  const unarchiveMutation = useUnarchiveFeatureRequest();
  const deleteMutation = useDeleteFeatureRequest();

  const isAnyMutating = 
    updateMutation.isPending || 
    archiveMutation.isPending || 
    unarchiveMutation.isPending ||
    deleteMutation.isPending;

  // Handlers
  const handleStatusChange = useCallback((status: AdminFeatureRequestStatus | undefined) => {
    setStatusFilter(status);
    setPage(0);
  }, []);

  const handleUpdateStatus = useCallback((id: number, status: AdminFeatureRequestStatus) => {
    updateMutation.mutate(
      { id, data: { status } },
      {
        onSuccess: () => {
          toast({ title: 'Status updated' });
        },
        onError: () => {
          toast({ title: 'Failed to update status', variant: 'destructive' });
        },
      }
    );
  }, [updateMutation]);

  const handleUpdatePriority = useCallback((id: number, priority: AdminPriority | null) => {
    updateMutation.mutate(
      { id, data: { admin_priority: priority || undefined } },
      {
        onSuccess: () => {
          toast({ title: 'Priority updated' });
        },
        onError: () => {
          toast({ title: 'Failed to update priority', variant: 'destructive' });
        },
      }
    );
  }, [updateMutation]);

  const handleArchive = useCallback((id: number) => {
    archiveMutation.mutate(id, {
      onSuccess: () => {
        toast({ title: 'Request archived' });
      },
      onError: () => {
        toast({ title: 'Failed to archive', variant: 'destructive' });
      },
    });
  }, [archiveMutation]);

  const handleUnarchive = useCallback((id: number) => {
    unarchiveMutation.mutate(id, {
      onSuccess: () => {
        toast({ title: 'Request unarchived' });
      },
      onError: () => {
        toast({ title: 'Failed to unarchive', variant: 'destructive' });
      },
    });
  }, [unarchiveMutation]);

  const handleDelete = useCallback((id: number) => {
    deleteMutation.mutate(id, {
      onSuccess: () => {
        toast({ title: 'Request deleted' });
      },
      onError: () => {
        toast({ title: 'Failed to delete', variant: 'destructive' });
      },
    });
  }, [deleteMutation]);

  const handleSaveDetails = useCallback((id: number, updateData: UpdateAdminFeatureRequest) => {
    updateMutation.mutate(
      { id, data: updateData },
      {
        onSuccess: () => {
          toast({ title: 'Changes saved' });
          setSelectedRequest(null);
        },
        onError: () => {
          toast({ title: 'Failed to save changes', variant: 'destructive' });
        },
      }
    );
  }, [updateMutation]);

  const totalPages = Math.ceil((data?.total || 0) / PAGE_SIZE);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center gap-3">
        <Lightbulb className="h-8 w-8 text-secondary drop-shadow-[0_0_6px_rgba(255,215,64,0.5)]" />
        <div>
          <h1 className="text-2xl font-bold text-foreground">Feature Requests</h1>
          <p className="text-sm text-muted-foreground">
            Review and manage user feature requests
          </p>
        </div>
      </div>

      {/* Toolbar */}
      <FeatureRequestsToolbar
        status={statusFilter}
        onStatusChange={handleStatusChange}
        includeArchived={includeArchived}
        onIncludeArchivedChange={setIncludeArchived}
        statusCounts={data?.by_status}
        total={data?.total || 0}
        onRefresh={() => refetch()}
        isRefreshing={isFetching && !isLoading}
      />

      {/* Table */}
      <LiquidGlassCard variant="secondary" className="overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-16">Votes</TableHead>
                <TableHead className="max-w-xs">Request</TableHead>
                <TableHead className="w-36">Status</TableHead>
                <TableHead className="w-32">Priority</TableHead>
                <TableHead className="w-40">Author</TableHead>
                <TableHead className="w-28">Created</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <FeatureRequestsTableSkeleton rows={6} />
              ) : isError ? (
                <TableRow>
                  <td colSpan={7} className="py-12">
                    <div className="flex flex-col items-center justify-center text-center">
                      <AlertCircle className="h-12 w-12 text-destructive/50 mb-3" />
                      <p className="text-muted-foreground mb-3">
                        {error instanceof Error ? error.message : 'Failed to load feature requests'}
                      </p>
                      <Button variant="outline" onClick={() => refetch()}>
                        Try again
                      </Button>
                    </div>
                  </td>
                </TableRow>
              ) : data?.items.length === 0 ? (
                <TableRow>
                  <td colSpan={7} className="py-12">
                    <div className="flex flex-col items-center justify-center text-center">
                      <Lightbulb className="h-12 w-12 text-muted-foreground/30 mb-3" />
                      <p className="text-muted-foreground mb-1">No feature requests found</p>
                      <p className="text-sm text-muted-foreground/70">
                        {statusFilter || !includeArchived 
                          ? 'Try adjusting your filters'
                          : 'Feature requests from users will appear here'}
                      </p>
                    </div>
                  </td>
                </TableRow>
              ) : (
                data?.items.map((request) => (
                  <FeatureRequestRow
                    key={request.id}
                    request={request}
                    onUpdateStatus={handleUpdateStatus}
                    onUpdatePriority={handleUpdatePriority}
                    onArchive={handleArchive}
                    onUnarchive={handleUnarchive}
                    onDelete={handleDelete}
                    onViewDetails={setSelectedRequest}
                    isUpdating={isAnyMutating}
                  />
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </LiquidGlassCard>

      {/* Pagination */}
      {totalPages > 1 && (
        <UsersPagination
          currentPage={page + 1}
          totalPages={totalPages}
          onPageChange={(p) => setPage(p - 1)}
        />
      )}

      {/* Detail Modal */}
      <FeatureRequestDetailModal
        request={selectedRequest}
        open={!!selectedRequest}
        onOpenChange={(open) => !open && setSelectedRequest(null)}
        onSave={handleSaveDetails}
        isSaving={updateMutation.isPending}
      />
    </div>
  );
}
