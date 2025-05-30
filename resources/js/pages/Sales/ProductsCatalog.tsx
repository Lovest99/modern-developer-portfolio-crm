import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import {
  PlusIcon,
  SearchIcon,
  FilterIcon,
  SortAscendingIcon,
  SortDescendingIcon,
  TagIcon,
  CurrencyDollarIcon,
  CalendarIcon,
  ChartBarIcon
} from '@heroicons/react/solid';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Pagination } from '@/components/ui/pagination';
import { formatDistanceToNow } from 'date-fns';

export default function ProductsCatalog({ products, categories, filters }) {
  const [searchQuery, setSearchQuery] = useState(filters?.search || '');
  const [selectedCategory, setSelectedCategory] = useState(filters?.category || '');
  const [sortField, setSortField] = useState(filters?.sort_field || 'name');
  const [sortDirection, setSortDirection] = useState(filters?.sort_direction || 'asc');

  const handleSearch = (e) => {
    e.preventDefault();
    router.get(route('sales.products.index'), {
      search: searchQuery,
      category: selectedCategory,
      sort_field: sortField,
      sort_direction: sortDirection,
    });
  };

  const handleSort = (field) => {
    const direction = field === sortField && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortDirection(direction);
    router.get(route('sales.products.index'), {
      search: searchQuery,
      category: selectedCategory,
      sort_field: field,
      sort_direction: direction,
    });
  };

  const getSortIcon = (field) => {
    if (field !== sortField) {
      return <SortAscendingIcon className="h-4 w-4 text-gray-400" />;
    }
    return sortDirection === 'asc'
      ? <SortAscendingIcon className="h-4 w-4 text-primary" />
      : <SortDescendingIcon className="h-4 w-4 text-primary" />;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <AppLayout title="Products Catalog">
      <Head title="Products Catalog" />

      <div className="space-y-6">
        {/* Filters and Actions */}
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 w-full sm:w-64"
                />
              </div>
              <Button type="submit" variant="secondary" size="icon">
                <FilterIcon className="h-4 w-4" />
              </Button>
            </form>

            {categories && categories.length > 0 && (
              <Select value={selectedCategory} onValueChange={(value) => {
                setSelectedCategory(value);
                router.get(route('sales.products.index'), {
                  search: searchQuery,
                  category: value,
                  sort_field: sortField,
                  sort_direction: sortDirection,
                });
              }}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>

          <Button asChild>
            <Link href={route('sales.products.create')}>
              <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              New Product
            </Link>
          </Button>
        </div>

        {/* Products Table */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Products</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead className="w-[300px] font-semibold">
                    <button
                      onClick={() => handleSort('name')}
                      className="flex items-center gap-2 hover:text-primary"
                    >
                      <span className="uppercase text-xs tracking-wider">PRODUCT NAME</span>
                      {getSortIcon('name')}
                    </button>
                  </TableHead>
                  <TableHead className="font-semibold">
                    <button
                      onClick={() => handleSort('category')}
                      className="flex items-center gap-2 hover:text-primary"
                    >
                      <span className="uppercase text-xs tracking-wider">CATEGORY</span>
                      {getSortIcon('category')}
                    </button>
                  </TableHead>
                  <TableHead className="font-semibold">
                    <button
                      onClick={() => handleSort('monthly_price')}
                      className="flex items-center gap-2 hover:text-primary"
                    >
                      <span className="uppercase text-xs tracking-wider">MONTHLY PRICE</span>
                      {getSortIcon('monthly_price')}
                    </button>
                  </TableHead>
                  <TableHead className="font-semibold">
                    <button
                      onClick={() => handleSort('annual_price')}
                      className="flex items-center gap-2 hover:text-primary"
                    >
                      <span className="uppercase text-xs tracking-wider">ANNUAL PRICE</span>
                      {getSortIcon('annual_price')}
                    </button>
                  </TableHead>
                  <TableHead className="font-semibold">
                    <button
                      onClick={() => handleSort('created_at')}
                      className="flex items-center gap-2 hover:text-primary"
                    >
                      <span className="uppercase text-xs tracking-wider">CREATED</span>
                      {getSortIcon('created_at')}
                    </button>
                  </TableHead>
                  <TableHead className="text-right font-semibold">
                    <span className="uppercase text-xs tracking-wider">ACTIONS</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products && products.data && products.data.length > 0 ? (
                  products.data.map((product) => (
                    <TableRow key={product.id} className="hover:bg-muted/50">
                      <TableCell className="font-medium">
                        <Link
                          href={route('sales.products.show', product.id)}
                          className="hover:text-primary hover:underline"
                        >
                          {product.name}
                        </Link>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <TagIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                          <Badge variant="outline" className="font-normal">
                            {product.category || 'Uncategorized'}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <CurrencyDollarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">
                            {product.monthly_price ? formatCurrency(product.monthly_price) : 'N/A'}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <CurrencyDollarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">
                            {product.annual_price ? formatCurrency(product.annual_price) : 'N/A'}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                          <span title={new Date(product.created_at).toLocaleString()}>
                            {formatDistanceToNow(new Date(product.created_at), { addSuffix: true })}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              Actions
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link href={route('sales.products.show', product.id)}>
                                View Details
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={route('sales.products.edit', product.id)}>
                                Edit Product
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link
                                href={route('sales.products.destroy', product.id)}
                                method="delete"
                                as="button"
                                className="w-full text-left text-red-600 hover:text-red-700"
                              >
                                Delete Product
                              </Link>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      <div className="flex flex-col items-center justify-center text-gray-500">
                        <SearchIcon className="h-12 w-12 mb-4 text-gray-300" />
                        <h3 className="text-lg font-medium">No products found</h3>
                        <p className="mt-1">Try adjusting your search or filter to find what you're looking for.</p>
                        <Button
                          variant="outline"
                          className="mt-4"
                          onClick={() => router.get(route('sales.products.index'))}
                        >
                          Clear filters
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>

            {/* Pagination */}
            {products && products.data && products.data.length > 0 && (
              <div className="mt-6">
                <Pagination
                  currentPage={products.current_page}
                  totalPages={products.last_page}
                  onPageChange={(page) => {
                    router.get(route('sales.products.index'), {
                      page,
                      search: searchQuery,
                      category: selectedCategory,
                      sort_field: sortField,
                      sort_direction: sortDirection,
                    });
                  }}
                />
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
