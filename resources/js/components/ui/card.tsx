import React from 'react';

export function Card({ children, className = '' }) {
  return (
    <div className={`bg-card overflow-hidden border shadow-sm rounded-lg ${className}`}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className = '' }) {
  return (
    <h3 className={`text-lg font-medium leading-6 text-foreground ${className}`}>
      {children}
    </h3>
  );
}

export function CardDescription({ children, className = '' }) {
  return (
    <p className={`mt-1 text-sm text-muted-foreground ${className}`}>
      {children}
    </p>
  );
}

export function CardHeader({ title, description, actions, children }) {
  return (
    <div className="px-4 py-5 border-b sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          {title && <CardTitle>{title}</CardTitle>}
          {children}
          {description && <CardDescription>{description}</CardDescription>}
        </div>
        {actions && <div className="flex-shrink-0">{actions}</div>}
      </div>
    </div>
  );
}

export function CardContent({ children, className = '' }) {
  return <div className={`px-4 py-5 sm:p-6 text-foreground ${className}`}>{children}</div>;
}

export function CardFooter({ children, className = '' }) {
  return (
    <div className={`px-4 py-4 border-t sm:px-6 ${className}`}>
      {children}
    </div>
  );
}
