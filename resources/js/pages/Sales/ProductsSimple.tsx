import React from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Search, Filter, Tag, DollarSign, BarChart } from 'lucide-react';

export default function ProductsSimple({ products = [], categories = [], filters = {} }) {
  // Sample data for demonstration
  const sampleProducts = [
    {
      id: 1,
      name: 'Basic Website Package',
      category: 'Web Development',
      monthly_price: 0,
      annual_price: 2500,
      created_at: '2023-01-15T10:00:00Z',
    },
    {
      id: 2,
      name: 'E-commerce Website',
      category: 'Web Development',
      monthly_price: 0,
      annual_price: 5000,
      created_at: '2023-02-20T14:30:00Z',
    },
    {
      id: 3,
      name: 'SEO Basic Package',
      category: 'Digital Marketing',
      monthly_price: 500,
      annual_price: 5400,
      created_at: '2023-03-10T09:15:00Z',
    },
    {
      id: 4,
      name: 'Content Marketing Package',
      category: 'Digital Marketing',
      monthly_price: 800,
      annual_price: 8640,
      created_at: '2023-04-05T11:45:00Z',
    },
    {
      id: 5,
      name: 'Mobile App Development',
      category: 'App Development',
      monthly_price: 0,
      annual_price: 12000,
      created_at: '2023-05-12T16:20:00Z',
    }
  ];

  const displayProducts = products.length > 0 ? products : sampleProducts;
  const displayCategories = categories.length > 0 ? categories : ['Web Development', 'Digital Marketing', 'App Development'];

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

      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Products Catalog</h1>
          <p className="text-muted-foreground">
            Manage your product offerings and pricing
          </p>
        </div>
        <Button className="w-full md:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>

      <div className="space-y-6">
        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <CardTitle>Products</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <BarChart className="mr-2 h-4 w-4" />
                  Reports
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[300px]">Product Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Monthly Price</TableHead>
                    <TableHead>Annual Price</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {displayProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Tag className="mr-2 h-4 w-4 text-gray-400" />
                          {product.category}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <DollarSign className="mr-2 h-4 w-4 text-gray-400" />
                          {product.monthly_price ? formatCurrency(product.monthly_price) : 'N/A'}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <DollarSign className="mr-2 h-4 w-4 text-gray-400" />
                          {product.annual_price ? formatCurrency(product.annual_price) : 'N/A'}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
