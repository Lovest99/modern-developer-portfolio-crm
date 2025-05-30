import React from 'react';

export function Badge({ children, variant = 'gray', size = 'md', className = '' }) {
  const baseClasses = 'inline-flex items-center font-medium rounded-full';

  const variantClasses = {
    gray: 'bg-gray-100 text-gray-800',
    red: 'bg-red-100 text-red-800',
    yellow: 'bg-yellow-100 text-yellow-800',
    green: 'bg-green-100 text-green-800',
    blue: 'bg-blue-100 text-blue-800',
    indigo: 'bg-indigo-100 text-indigo-800',
    purple: 'bg-purple-100 text-purple-800',
    pink: 'bg-pink-100 text-pink-800',
  };

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-0.5 text-sm',
    lg: 'px-3 py-0.5 text-base',
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  return (
    <span className={classes}>
      {children}
    </span>
  );
}

export function StatusBadge({ status, className = '' }) {
  const statusConfig = {
    // Deal statuses
    prospect: { label: 'Prospect', variant: 'gray' },
    qualified: { label: 'Qualified', variant: 'blue' },
    proposal: { label: 'Proposal', variant: 'indigo' },
    closed: { label: 'Closed', variant: 'green' },

    // Project statuses
    planning: { label: 'Planning', variant: 'yellow' },
    development: { label: 'Development', variant: 'blue' },
    completed: { label: 'Completed', variant: 'green' },
    archived: { label: 'Archived', variant: 'gray' },

    // Task statuses
    todo: { label: 'To Do', variant: 'gray' },
    in_progress: { label: 'In Progress', variant: 'blue' },
    review: { label: 'Review', variant: 'purple' },

    // Task priorities
    low: { label: 'Low', variant: 'gray' },
    medium: { label: 'Medium', variant: 'blue' },
    high: { label: 'High', variant: 'yellow' },
    urgent: { label: 'Urgent', variant: 'red' },

    // Client statuses
    active: { label: 'Active', variant: 'green' },
    inactive: { label: 'Inactive', variant: 'gray' },
    churned: { label: 'Churned', variant: 'red' },

    // Contact form statuses
    new: { label: 'New', variant: 'blue' },
    responded: { label: 'Responded', variant: 'green' },
    spam: { label: 'Spam', variant: 'red' },
  };

  const config = statusConfig[status] || { label: status, variant: 'gray' };

  return (
    <Badge variant={config.variant} className={className}>
      {config.label}
    </Badge>
  );
}
