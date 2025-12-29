// ============================================
// CSV Export Utility
// Converts data array to CSV and triggers download
// ============================================

export interface CsvColumn<T> {
  key: keyof T;
  header: string;
  format?: (value: T[keyof T], row: T) => string;
}

/**
 * Exports data to a CSV file and triggers download
 */
export function exportToCsv<T>(
  data: T[],
  filename: string,
  columns: CsvColumn<T>[]
): void {
  if (data.length === 0) {
    return;
  }

  // Build header row
  const headers = columns.map(col => escapeCSV(col.header));
  
  // Build data rows
  const rows = data.map(row => 
    columns.map(col => {
      const value = row[col.key];
      if (col.format) {
        return escapeCSV(col.format(value, row));
      }
      return escapeCSV(formatValue(value));
    })
  );

  // Combine into CSV string
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');

  // Create blob and download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Escape a value for CSV (handle quotes, commas, newlines)
 */
function escapeCSV(value: string): string {
  if (value.includes(',') || value.includes('"') || value.includes('\n') || value.includes('\r')) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

/**
 * Format a value for CSV output
 */
function formatValue(value: unknown): string {
  if (value === null || value === undefined) {
    return '';
  }
  if (typeof value === 'boolean') {
    return value ? 'Yes' : 'No';
  }
  if (value instanceof Date) {
    return value.toISOString();
  }
  if (Array.isArray(value)) {
    return value.join('; ');
  }
  return String(value);
}
