import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import { Search as SearchIcon, Filter as FilterIcon, X as XIcon } from 'lucide-react';
import { Button } from './button';

export function SearchFilter({
  value,
  onChange,
  onSubmit,
  placeholder = 'Search',
  className = ''
}) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <SearchIcon className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
      </div>
      <input
        type="text"
        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 pl-10 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        placeholder={placeholder}
        value={value || ''}
        onChange={e => onChange(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && onSubmit()}
      />
      {value && (
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
          <button
            type="button"
            className="text-muted-foreground hover:text-foreground focus:outline-none"
            onClick={() => onChange('')}
          >
            <XIcon className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
}

export function SelectFilter({
  label,
  value,
  onChange,
  options,
  className = ''
}) {
  return (
    <div className={className}>
      <label htmlFor={`filter-${label}`} className="block text-sm font-medium mb-2">
        {label}
      </label>
      <select
        id={`filter-${label}`}
        name={label}
        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        value={value || ''}
        onChange={e => onChange(e.target.value)}
      >
        <option value="">All</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export function DateRangeFilter({
  startLabel = 'From',
  endLabel = 'To',
  startValue,
  endValue,
  onStartChange,
  onEndChange,
  className = ''
}) {
  return (
    <div className={`flex gap-4 ${className}`}>
      <div className="w-1/2">
        <label htmlFor="date-from" className="block text-sm font-medium mb-2">
          {startLabel}
        </label>
        <input
          type="date"
          id="date-from"
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          value={startValue || ''}
          onChange={e => onStartChange(e.target.value)}
        />
      </div>
      <div className="w-1/2">
        <label htmlFor="date-to" className="block text-sm font-medium mb-2">
          {endLabel}
        </label>
        <input
          type="date"
          id="date-to"
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          value={endValue || ''}
          onChange={e => onEndChange(e.target.value)}
        />
      </div>
    </div>
  );
}

export function FilterPanel({
  filters,
  setFilters,
  onSubmit,
  onReset,
  children,
  className = ''
}) {
  const [isOpen, setIsOpen] = useState(false);

  const hasActiveFilters = Object.values(filters).some(value => value !== '' && value !== null);

  return (
    <div className={`mb-6 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant={hasActiveFilters ? 'default' : 'outline'}
            size="sm"
            className="flex items-center gap-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            <FilterIcon className="h-4 w-4" />
            Filters
            {hasActiveFilters && (
              <span className="ml-1 inline-flex h-5 items-center justify-center rounded-full bg-primary/20 px-2 text-xs font-medium text-primary">
                Active
              </span>
            )}
          </Button>

          {hasActiveFilters && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onReset}
            >
              Clear filters
            </Button>
          )}
        </div>
      </div>

      {isOpen && (
        <div className="mt-4 rounded-lg border bg-card p-4 shadow-sm">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {children}
          </div>

          <div className="mt-4 flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onReset}
            >
              Reset
            </Button>
            <Button
              type="button"
              variant="default"
              size="sm"
              onClick={onSubmit}
            >
              Apply Filters
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export function useFilters(initialFilters, routeName) {
  const [filters, setFilters] = useState(initialFilters);

  const applyFilters = () => {
    router.get(route(routeName), filters, {
      preserveState: true,
      replace: true,
    });
  };

  const resetFilters = () => {
    const resetFilters = Object.keys(filters).reduce((acc, key) => {
      acc[key] = '';
      return acc;
    }, {});

    setFilters(resetFilters);

    router.get(route(routeName), resetFilters, {
      preserveState: true,
      replace: true,
    });
  };

  return { filters, setFilters, applyFilters, resetFilters };
}
