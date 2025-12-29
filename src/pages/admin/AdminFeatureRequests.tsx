// ============================================
// Admin Feature Requests Page
// ============================================

import { useState, useCallback } from 'react';
import { Lightbulb, AlertCircle } from 'lucide-react';
import { LiquidGlassCard } from '@/components/LiquidGlassEffects';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { toast } from 'sonner';
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
import { exportToCsv } from '@/lib/exportToCsv';
import { format } from 'date-fns';
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
  const [search, setSearch] = useState('');
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined,
  });
  
  // Selection state for bulk actions
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  
  // Detail modal state
  const [selectedRequest, setSelectedRequest] = useState<AdminFeatureRequest | null>(null);

  // Data fetching - now with server-side search and date filtering
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
    search: search || undefined,
    dateFrom: dateRange.from ? format(dateRange.from, 'yyyy-MM-dd') : undefined,
    dateTo: dateRange.to ? format(dateRange.to, 'yyyy-MM-dd') : undefined,
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

  const items = data?.items ?? [];

  // Selection handlers
  const handleSelect = useCallback((id: number, selected: boolean) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (selected) {
        next.add(id);
      } else {
        next.delete(id);
      }
      return next;
    });
  }, []);

  const handleSelectAll = useCallback(() => {
    setSelectedIds(new Set(items.map(r => r.id)));
  }, [items]);

  const handleDeselectAll = useCallback(() => {
    setSelectedIds(new Set());
  }, []);

  const allSelected = items.length > 0 && items.every(r => selectedIds.has(r.id));

  // Handlers
  const handleStatusChange = useCallback((status: AdminFeatureRequestStatus | undefined) => {
    setStatusFilter(status);
    setPage(0);
    setSelectedIds(new Set());
  }, []);

  const handleSearchChange = useCallback((value: string) => {
    setSearch(value);
    setPage(0);
    setSelectedIds(new Set());
  }, []);

  const handleDateRangeChange = useCallback((range: { from: Date | undefined; to: Date | undefined }) => {
    setDateRange(range);
    setPage(0);
    setSelectedIds(new Set());
  }, []);

  const handleUpdateStatus = useCallback((id: number, status: AdminFeatureRequestStatus) => {
    updateMutation.mutate(
      { id, data: { status } },
      {
        onSuccess: () => {
          toast.success('Status updated');
        },
        onError: () => {
          toast.error('Failed to update status');
        },
      }
    );
  }, [updateMutation]);

  const handleUpdatePriority = useCallback((id: number, priority: AdminPriority | null) => {
    updateMutation.mutate(
      { id, data: { admin_priority: priority || undefined } },
      {
        onSuccess: () => {
          toast.success('Priority updated');
        },
        onError: () => {
          toast.error('Failed to update priority');
        },
      }
    );
  }, [updateMutation]);

  const handleArchive = useCallback((id: number) => {
    archiveMutation.mutate(id, {
      onSuccess: () => {
        toast.success('Request archived');
        setSelectedIds(prev => {
          const next = new Set(prev);
          next.delete(id);
          return next;
        });
      },
      onError: () => {
        toast.error('Failed to archive');
      },
    });
  }, [archiveMutation]);

  const handleUnarchive = useCallback((id: number) => {
    unarchiveMutation.mutate(id, {
      onSuccess: () => {
        toast.success('Request unarchived');
      },
      onError: () => {
        toast.error('Failed to unarchive');
      },
    });
  }, [unarchiveMutation]);

  const handleDelete = useCallback((id: number) => {
    deleteMutation.mutate(id, {
      onSuccess: () => {
        toast.success('Request deleted');
        setSelectedIds(prev => {
          const next = new Set(prev);
          next.delete(id);
          return next;
        });
      },
      onError: () => {
        toast.error('Failed to delete');
      },
    });
  }, [deleteMutation]);

  const handleSaveDetails = useCallback((id: number, updateData: UpdateAdminFeatureRequest) => {
    updateMutation.mutate(
      { id, data: updateData },
      {
        onSuccess: () => {
          toast.success('Changes saved');
          setSelectedRequest(null);
        },
        onError: () => {
          toast.error('Failed to save changes');
        },
      }
    );
  }, [updateMutation]);

  // Bulk action handlers
  const handleBulkStatusChange = useCallback(async (status: AdminFeatureRequestStatus) => {
    const ids = Array.from(selectedIds);
    try {
      await Promise.all(ids.map(id => updateMutation.mutateAsync({ id, data: { status } })));
      toast.success(`${ids.length} request${ids.length !== 1 ? 's' : ''} updated`);
      setSelectedIds(new Set());
    } catch {
      toast.error('Failed to update some requests');
    }
  }, [selectedIds, updateMutation]);

  const handleBulkPriorityChange = useCallback(async (priority: AdminPriority) => {
    const ids = Array.from(selectedIds);
    try {
      await Promise.all(ids.map(id => updateMutation.mutateAsync({ id, data: { admin_priority: priority } })));
      toast.success(`${ids.length} request${ids.length !== 1 ? 's' : ''} updated`);
      setSelectedIds(new Set());
    } catch {
      toast.error('Failed to update some requests');
    }
  }, [selectedIds, updateMutation]);

  const handleBulkArchive = useCallback(async () => {
    const ids = Array.from(selectedIds);
    try {
      await Promise.all(ids.map(id => archiveMutation.mutateAsync(id)));
      toast.success(`${ids.length} request${ids.length !== 1 ? 's' : ''} archived`);
      setSelectedIds(new Set());
    } catch {
      toast.error('Failed to archive some requests');
    }
  }, [selectedIds, archiveMutation]);

  const handleBulkDelete = useCallback(async () => {
    const ids = Array.from(selectedIds);
    try {
      await Promise.all(ids.map(id => deleteMutation.mutateAsync(id)));
      toast.success(`${ids.length} request${ids.length !== 1 ? 's' : ''} deleted`);
      setSelectedIds(new Set());
    } catch {
      toast.error('Failed to delete some requests');
    }
  }, [selectedIds, deleteMutation]);

  // Export handler
  const handleExport = useCallback(() => {
    if (items.length === 0) {
      toast.error('Nothing to export');
      return;
    }
    
    exportToCsv(items, `feature-requests-${format(new Date(), 'yyyy-MM-dd')}`, [
      { key: 'id', header: 'ID' },
      { key: 'title', header: 'Title' },
      { key: 'description', header: 'Description' },
      { key: 'status', header: 'Status' },
      { key: 'admin_priority', header: 'Priority', format: (v) => v ? String(v) : 'None' },
      { key: 'author_email', header: 'Author Email' },
      { key: 'author_name', header: 'Author Name', format: (v) => v ? String(v) : '' },
      { key: 'vote_count', header: 'Votes' },
      { key: 'is_archived', header: 'Archived' },
      { key: 'created_at', header: 'Created At', format: (v) => format(new Date(String(v)), 'yyyy-MM-dd HH:mm') },
    ]);
    
    toast.success('Export complete');
  }, [items]);

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
        search={search}
        onSearchChange={handleSearchChange}
        dateRange={dateRange}
        onDateRangeChange={handleDateRangeChange}
        selectedCount={selectedIds.size}
        onBulkStatusChange={handleBulkStatusChange}
        onBulkPriorityChange={handleBulkPriorityChange}
        onBulkArchive={handleBulkArchive}
        onBulkDelete={handleBulkDelete}
        onSelectAll={handleSelectAll}
        onDeselectAll={handleDeselectAll}
        isBulkOperating={isAnyMutating}
        onExport={handleExport}
      />

      {/* Table */}
      <LiquidGlassCard variant="secondary" className="overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10">
                  <Checkbox
                    checked={allSelected}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        handleSelectAll();
                      } else {
                        handleDeselectAll();
                      }
                    }}
                    className="border-white/20"
                    aria-label="Select all"
                  />
                </TableHead>
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
                  <td colSpan={8} className="py-12">
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
              ) : items.length === 0 ? (
                <TableRow>
                  <td colSpan={8} className="py-12">
                    <div className="flex flex-col items-center justify-center text-center">
                      <Lightbulb className="h-12 w-12 text-muted-foreground/30 mb-3" />
                      <p className="text-muted-foreground mb-1">No feature requests found</p>
                      <p className="text-sm text-muted-foreground/70">
                        {statusFilter || !includeArchived || search || dateRange.from || dateRange.to
                          ? 'Try adjusting your filters or search'
                          : 'Feature requests from users will appear here'}
                      </p>
                    </div>
                  </td>
                </TableRow>
              ) : (
                items.map((request) => (
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
                    isSelected={selectedIds.has(request.id)}
                    onSelect={handleSelect}
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
