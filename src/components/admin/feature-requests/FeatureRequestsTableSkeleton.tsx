// ============================================
// Admin Feature Requests Table Skeleton
// ============================================

import { TableRow, TableCell } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';

interface FeatureRequestsTableSkeletonProps {
  rows?: number;
}

export function FeatureRequestsTableSkeleton({ rows = 6 }: FeatureRequestsTableSkeletonProps) {
  return (
    <>
      {Array.from({ length: rows }).map((_, i) => (
        <TableRow key={i} className="animate-pulse">
          {/* Vote Count */}
          <TableCell className="w-16">
            <Skeleton className="h-6 w-8" />
          </TableCell>

          {/* Title & Description */}
          <TableCell className="max-w-xs">
            <Skeleton className="h-4 w-48 mb-2" />
            <Skeleton className="h-3 w-64" />
          </TableCell>

          {/* Status */}
          <TableCell className="w-36">
            <Skeleton className="h-8 w-28" />
          </TableCell>

          {/* Priority */}
          <TableCell className="w-32">
            <Skeleton className="h-8 w-24" />
          </TableCell>

          {/* Author */}
          <TableCell className="w-40">
            <div className="flex items-center gap-2">
              <Skeleton className="h-6 w-6 rounded-full" />
              <Skeleton className="h-4 w-24" />
            </div>
          </TableCell>

          {/* Created Date */}
          <TableCell className="w-28">
            <Skeleton className="h-4 w-20" />
          </TableCell>

          {/* Actions */}
          <TableCell className="w-12">
            <Skeleton className="h-8 w-8" />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}
