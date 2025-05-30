import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import {
  Plus as PlusIcon,
  Search as SearchIcon,
  Filter as FilterIcon,
  ArrowUpDown as SortAscendingIcon,
  ArrowDownUp as SortDescendingIcon,
  Tag as TagIcon,
  DollarSign as CurrencyDollarIcon,
  Calendar as CalendarIcon,
  BarChart as ChartBarIcon
} from 'lucide-react';
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
  TableHeader,
  TableHeadCell,
  TableBody,
  TableRow,
  TableCell,
  EmptyTableRow
} from '@/components/ui/table-improved';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Pagination } from '@/components/ui/pagination';
import { formatDistanceToNow } from 'date-fns';

export default function Products({ products, categories, filters }) {
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
                {categories && categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
              <TableHeader>
                <TableRow>
                  <TableHeadCell className="w-[300px]">
                    <button
                      onClick={() => handleSort('name')}
                      className="flex items-center space-x-1 hover:text-primary"
                    >
                      <span>Product Name</span>
                      {getSortIcon('name')}
                    </button>
                  </TableHeadCell>
                  <TableHeadCell align="center">
                    <button
                      onClick={() => handleSort('category')}
                      className="flex items-center space-x-1 hover:text-primary justify-center"
                    >
                      <span>Category</span>
                      {getSortIcon('category')}
                    </button>
                  </TableHeadCell>
                  <TableHeadCell align="right">
                    <button
                      onClick={() => handleSort('monthly_price')}
                      className="flex items-center space-x-1 hover:text-primary justify-end"
                    >
                      <span>Monthly Price</span>
                      {getSortIcon('monthly_price')}
                    </button>
                  </TableHeadCell>
                  <TableHeadCell align="right">
                    <button
                      onClick={() => handleSort('annual_price')}
                      className="flex items-center space-x-1 hover:text-primary justify-end"
                    >
                      <span>Annual Price</span>
                      {getSortIcon('annual_price')}
                    </button>
                  </TableHeadCell>
                  <TableHeadCell align="right">Actions</TableHeadCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products && products.data && products.data.length > 0 ? (
                  products.data.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">
                        <Link
                          href={route('sales.products.show', product.id)}
                          className="hover:text-primary hover:underline"
                        >
                          {product.name}
                        </Link>
                      </TableCell>
                      <TableCell align="center">
                        {product.category ? (
                          <Badge variant="outline" className="capitalize">
                            <TagIcon className="mr-1 h-3 w-3" />
                            {product.category}
                          </Badge>
                        ) : (
                          <span className="text-gray-500">Uncategorized</span>
                        )}
                      </TableCell>
                      <TableCell align="right">
                        <div className="flex items-center justify-end">
                          <CurrencyDollarIcon className="mr-2 h-4 w-4 text-gray-400" />
                          {product.monthly_price ? formatCurrency(product.monthly_price) : 'N/A'}
                          <span className="ml-1 text-xs text-gray-500">/mo</span>
                        </div>
                      </TableCell>
                      <TableCell align="right">
                        <div className="flex items-center justify-end">
                          <CurrencyDollarIcon className="mr-2 h-4 w-4 text-gray-400" />
                          {product.annual_price ? formatCurrency(product.annual_price) : 'N/A'}
                          <span className="ml-1 text-xs text-gray-500">/yr</span>
                        </div>
                      </TableCell>
                      <TableCell align="right">
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
                  <EmptyTableRow
                    colSpan={5}
                    message="No products found. Try adjusting your search or filter to find what you're looking for."
                  />
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
