// ============================================
// Admin Problem Reports Page
// Full CRUD with filters, bulk actions, screenshot gallery, inline editing, search, export
// ============================================

import { useState, useCallback } from 'react';
import { AlertTriangle, Inbox } from 'lucide-react';
import { LiquidGlassCard } from '@/components/LiquidGlassEffects';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { ProblemReportsToolbar } from '@/components/admin/problem-reports/ProblemReportsToolbar';
import { ProblemReportRow } from '@/components/admin/problem-reports/ProblemReportRow';
import { ProblemReportDetailModal } from '@/components/admin/problem-reports/ProblemReportDetailModal';
import { ProblemReportsTableSkeleton } from '@/components/admin/problem-reports/ProblemReportsTableSkeleton';
import { UsersPagination } from '@/components/admin/users/UsersPagination';
import {
  useAdminProblemReports,
  useUpdateAdminProblemReport,
  useArchiveProblemReport,
  useUnarchiveProblemReport,
  useDeleteProblemReport,
} from '@/hooks/api/useAdmin';
import { exportToCsv } from '@/lib/exportToCsv';
import { format } from 'date-fns';
import type { AdminProblemReport, UpdateAdminProblemReport } from '@/lib/api/types';

// Types
type ProblemReportStatus = 'new' | 'triaged' | 'in_progress' | 'fixed' | 'wont_fix' | 'duplicate';
type ProblemCategory = 'bug' | 'ui_issue' | 'performance' | 'other';
type AdminPriority = 'low' | 'medium' | 'high' | 'critical';

const PAGE_SIZE = 20;

export default function AdminProblemReports() {
  // Filter state
  const [statusFilter, setStatusFilter] = useState<ProblemReportStatus | undefined>();
  const [categoryFilter, setCategoryFilter] = useState<ProblemCategory | undefined>();
  const [priorityFilter, setPriorityFilter] = useState<AdminPriority | undefined>();
  const [includeArchived, setIncludeArchived] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined,
  });
  
  // Selection state for bulk actions
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  
  // Modal state
  const [selectedReport, setSelectedReport] = useState<AdminProblemReport | null>(null);

  // Data fetching - now with server-side search and date filtering
  const {
    data,
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useAdminProblemReports({
    status: statusFilter,
    category: categoryFilter,
    priority: priorityFilter,
    limit: PAGE_SIZE,
    offset: (page - 1) * PAGE_SIZE,
    includeArchived,
    search: search || undefined,
    dateFrom: dateRange.from ? format(dateRange.from, 'yyyy-MM-dd') : undefined,
    dateTo: dateRange.to ? format(dateRange.to, 'yyyy-MM-dd') : undefined,
  });

  // Mutations
  const updateMutation = useUpdateAdminProblemReport();
  const archiveMutation = useArchiveProblemReport();
  const unarchiveMutation = useUnarchiveProblemReport();
  const deleteMutation = useDeleteProblemReport();

  const reports = data?.reports ?? [];
  const total = data?.total ?? 0;
  const statusCounts = data?.by_status ?? {};
  const totalPages = Math.ceil(total / PAGE_SIZE);

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
    setSelectedIds(new Set(reports.map(r => r.id)));
  }, [reports]);

  const handleDeselectAll = useCallback(() => {
    setSelectedIds(new Set());
  }, []);

  const allSelected = reports.length > 0 && reports.every(r => selectedIds.has(r.id));

  // Individual handlers
  const handleUpdateStatus = async (id: number, status: ProblemReportStatus) => {
    try {
      await updateMutation.mutateAsync({ id, data: { status } });
      toast.success('Status updated');
    } catch {
      toast.error('Failed to update status');
    }
  };

  const handleUpdatePriority = async (id: number, priority: AdminPriority | null) => {
    try {
      await updateMutation.mutateAsync({ id, data: { priority } });
      toast.success('Priority updated');
    } catch {
      toast.error('Failed to update priority');
    }
  };

  const handleArchive = async (id: number) => {
    try {
      await archiveMutation.mutateAsync(id);
      toast.success('Report archived');
      setSelectedIds(prev => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    } catch {
      toast.error('Failed to archive report');
    }
  };

  const handleUnarchive = async (id: number) => {
    try {
      await unarchiveMutation.mutateAsync(id);
      toast.success('Report unarchived');
    } catch {
      toast.error('Failed to unarchive report');
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteMutation.mutateAsync(id);
      setSelectedIds(prev => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
      toast.success('Report deleted');
    } catch {
      toast.error('Failed to delete report');
    }
  };

  const handleSaveDetails = async (id: number, data: UpdateAdminProblemReport) => {
    try {
      await updateMutation.mutateAsync({ id, data });
      toast.success('Report updated');
      setSelectedReport(null);
    } catch {
      toast.error('Failed to update report');
    }
  };

  // Bulk action handlers
  const handleBulkStatusChange = async (status: ProblemReportStatus) => {
    const ids = Array.from(selectedIds);
    try {
      await Promise.all(ids.map(id => updateMutation.mutateAsync({ id, data: { status } })));
      toast.success(`${ids.length} report${ids.length !== 1 ? 's' : ''} updated`);
      setSelectedIds(new Set());
    } catch {
      toast.error('Failed to update some reports');
    }
  };

  const handleBulkPriorityChange = async (priority: AdminPriority) => {
    const ids = Array.from(selectedIds);
    try {
      await Promise.all(ids.map(id => updateMutation.mutateAsync({ id, data: { priority } })));
      toast.success(`${ids.length} report${ids.length !== 1 ? 's' : ''} updated`);
      setSelectedIds(new Set());
    } catch {
      toast.error('Failed to update some reports');
    }
  };

  const handleBulkArchive = async () => {
    const ids = Array.from(selectedIds);
    try {
      await Promise.all(ids.map(id => archiveMutation.mutateAsync(id)));
      toast.success(`${ids.length} report${ids.length !== 1 ? 's' : ''} archived`);
      setSelectedIds(new Set());
    } catch {
      toast.error('Failed to archive some reports');
    }
  };

  const handleBulkDelete = async () => {
    const ids = Array.from(selectedIds);
    try {
      await Promise.all(ids.map(id => deleteMutation.mutateAsync(id)));
      toast.success(`${ids.length} report${ids.length !== 1 ? 's' : ''} deleted`);
      setSelectedIds(new Set());
    } catch {
      toast.error('Failed to delete some reports');
    }
  };

  const handleSearchChange = useCallback((value: string) => {
    setSearch(value);
    setPage(1);
    setSelectedIds(new Set());
  }, []);

  const handleDateRangeChange = useCallback((range: { from: Date | undefined; to: Date | undefined }) => {
    setDateRange(range);
    setPage(1);
    setSelectedIds(new Set());
  }, []);

  const handleClearFilters = () => {
    setStatusFilter(undefined);
    setCategoryFilter(undefined);
    setPriorityFilter(undefined);
    setSearch('');
    setDateRange({ from: undefined, to: undefined });
    setPage(1);
    setSelectedIds(new Set());
  };

  // Export handler
  const handleExport = useCallback(() => {
    if (reports.length === 0) {
      toast.error('Nothing to export');
      return;
    }

    exportToCsv(reports, `problem-reports-${format(new Date(), 'yyyy-MM-dd')}`, [
      { key: 'id', header: 'ID' },
      { key: 'category', header: 'Category' },
      { key: 'description', header: 'Description' },
      { key: 'status', header: 'Status' },
      { key: 'priority', header: 'Priority', format: (v) => v ? String(v) : 'None' },
      { key: 'user_email', header: 'User Email' },
      { key: 'user_name', header: 'User Name', format: (v) => v ? String(v) : '' },
      { key: 'page_url', header: 'Page URL', format: (v) => v ? String(v) : '' },
      { key: 'is_archived', header: 'Archived' },
      { key: 'created_at', header: 'Created At', format: (v) => format(new Date(String(v)), 'yyyy-MM-dd HH:mm') },
    ]);

    toast.success('Export complete');
  }, [reports]);

  const isUpdating = updateMutation.isPending || archiveMutation.isPending || 
                     unarchiveMutation.isPending || deleteMutation.isPending;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center gap-3">
        <AlertTriangle className="h-8 w-8 text-secondary drop-shadow-[0_0_6px_rgba(255,215,64,0.5)]" />
        <div>
          <h1 className="text-2xl font-bold text-foreground">Problem Reports</h1>
          <p className="text-sm text-muted-foreground">
            Review and resolve user-reported issues
          </p>
        </div>
      </div>

      {/* Toolbar with bulk actions */}
      <ProblemReportsToolbar
        status={statusFilter}
        category={categoryFilter}
        priority={priorityFilter}
        includeArchived={includeArchived}
        statusCounts={statusCounts}
        total={total}
        onStatusChange={(status) => { setStatusFilter(status); setPage(1); setSelectedIds(new Set()); }}
        onCategoryChange={(category) => { setCategoryFilter(category); setPage(1); setSelectedIds(new Set()); }}
        onPriorityChange={(priority) => { setPriorityFilter(priority); setPage(1); setSelectedIds(new Set()); }}
        onIncludeArchivedChange={setIncludeArchived}
        onRefresh={() => refetch()}
        isRefreshing={isFetching}
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
        isBulkOperating={isUpdating}
        onExport={handleExport}
      />

      {/* Table */}
      <LiquidGlassCard variant="secondary" className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-white/10 hover:bg-transparent">
                <TableHead className="w-[40px]">
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
                <TableHead className="text-muted-foreground">Category</TableHead>
                <TableHead className="text-muted-foreground">Description</TableHead>
                <TableHead className="text-muted-foreground">Screenshots</TableHead>
                <TableHead className="text-muted-foreground">Status</TableHead>
                <TableHead className="text-muted-foreground">Priority</TableHead>
                <TableHead className="text-muted-foreground">User</TableHead>
                <TableHead className="text-muted-foreground">Page</TableHead>
                <TableHead className="text-muted-foreground">Created</TableHead>
                <TableHead className="text-muted-foreground w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <ProblemReportsTableSkeleton />
              ) : isError ? (
                <TableRow>
                  <td colSpan={10} className="py-12">
                    <div className="text-center">
                      <AlertTriangle className="h-12 w-12 mx-auto text-destructive/50 mb-3" />
                      <p className="text-muted-foreground mb-4">Failed to load problem reports</p>
                      <Button variant="outline" onClick={() => refetch()}>
                        Try Again
                      </Button>
                    </div>
                  </td>
                </TableRow>
              ) : reports.length === 0 ? (
                <TableRow>
                  <td colSpan={10} className="py-12">
                    <div className="text-center">
                      <Inbox className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
                      <p className="text-muted-foreground mb-2">No problem reports found</p>
                      {(statusFilter || categoryFilter || priorityFilter || search || dateRange.from || dateRange.to) && (
                        <Button variant="link" onClick={handleClearFilters} className="text-secondary">
                          Clear filters
                        </Button>
                      )}
                    </div>
                  </td>
                </TableRow>
              ) : (
                reports.map((report) => (
                  <ProblemReportRow
                    key={report.id}
                    report={report}
                    isSelected={selectedIds.has(report.id)}
                    onSelect={handleSelect}
                    onUpdateStatus={handleUpdateStatus}
                    onUpdatePriority={handleUpdatePriority}
                    onArchive={handleArchive}
                    onUnarchive={handleUnarchive}
                    onDelete={handleDelete}
                    onViewDetails={setSelectedReport}
                    isUpdating={isUpdating}
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
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      )}

      {/* Detail Modal */}
      <ProblemReportDetailModal
        report={selectedReport}
        open={selectedReport !== null}
        onOpenChange={(open) => !open && setSelectedReport(null)}
        onSave={handleSaveDetails}
        isSaving={updateMutation.isPending}
      />
    </div>
  );
}
