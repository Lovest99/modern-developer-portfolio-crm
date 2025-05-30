import React from 'react';

export function Table({ children, className = '' }) {
  return (
    <div className={`flex flex-col ${className}`}>
      <div className="overflow-x-auto">
        <div className="align-middle inline-block min-w-full">
          <div className="overflow-hidden">
            <table className="min-w-full divide-y">
              {children}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export function TableHeader({ children }) {
  return (
    <thead className="bg-muted/50">
      {children}
    </thead>
  );
}

export function TableHead({ children }) {
  return (
    <thead className="bg-muted/50">
      <tr>{children}</tr>
    </thead>
  );
}

export function TableHeadCell({ children, className = '', align = 'left' }) {
  const alignmentClass =
    align === 'right' ? 'text-right' :
    align === 'center' ? 'text-center' : 'text-left';

  return (
    <th
      scope="col"
      className={`px-6 py-3 ${alignmentClass} text-xs font-medium text-muted-foreground uppercase tracking-wider ${className}`}
    >
      {children}
    </th>
  );
}

export function TableBody({ children }) {
  return <tbody className="bg-card divide-y">{children}</tbody>;
}

export function TableRow({ children, className = '' }) {
  return <tr className={`hover:bg-muted/50 ${className}`}>{children}</tr>;
}

export function TableCell({ children, className = '', align = 'left' }) {
  const alignmentClass =
    align === 'right' ? 'text-right' :
    align === 'center' ? 'text-center' : 'text-left';

  return (
    <td className={`px-6 py-4 whitespace-nowrap text-sm text-foreground ${alignmentClass} ${className}`}>
      {children}
    </td>
  );
}

export function SortableTableHeadCell({
  children,
  field,
  currentSortField,
  currentSortDirection,
  onSort,
  className = '',
  align = 'left'
}) {
  const isActive = currentSortField === field;
  const nextDirection = isActive && currentSortDirection === 'asc' ? 'desc' : 'asc';

  const alignmentClass =
    align === 'right' ? 'text-right' :
    align === 'center' ? 'text-center' : 'text-left';

  return (
    <th
      scope="col"
      className={`px-6 py-3 ${alignmentClass} text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer hover:text-foreground ${className}`}
      onClick={() => onSort(field, nextDirection)}
    >
      <div className={`flex items-center gap-1 ${align === 'right' ? 'justify-end' : align === 'center' ? 'justify-center' : 'justify-start'}`}>
        <span>{children}</span>
        <span className="flex flex-col">
          <svg
            className={`w-2 h-2 ${isActive && currentSortDirection === 'asc' ? 'text-primary' : 'text-muted-foreground/50'}`}
            viewBox="0 0 16 16"
            fill="currentColor"
          >
            <path d="M8 4l4 4H4l4-4z" />
          </svg>
          <svg
            className={`w-2 h-2 ${isActive && currentSortDirection === 'desc' ? 'text-primary' : 'text-muted-foreground/50'}`}
            viewBox="0 0 16 16"
            fill="currentColor"
          >
            <path d="M8 12l4-4H4l4 4z" />
          </svg>
        </span>
      </div>
    </th>
  );
}

export function EmptyTableRow({ colSpan, message = 'No items found', className = '' }) {
  return (
    <TableRow className={className}>
      <TableCell colSpan={colSpan} className="text-center py-8">
        <div className="flex flex-col items-center justify-center text-gray-500">
          <p className="text-lg font-medium">{message}</p>
        </div>
      </TableCell>
    </TableRow>
  );
}
