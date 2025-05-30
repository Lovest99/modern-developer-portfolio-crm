import React from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function SimpleProducts() {
  // Sample data for demonstration
  const products = [
    {
      id: 1,
      name: 'Basic Website Package',
      category: 'Web Development',
      monthly_price: 0,
      annual_price: 2500,
    },
    {
      id: 2,
      name: 'E-commerce Website',
      category: 'Web Development',
      monthly_price: 0,
      annual_price: 5000,
    },
    {
      id: 3,
      name: 'SEO Basic Package',
      category: 'Digital Marketing',
      monthly_price: 500,
      annual_price: 5400,
    }
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <AppLayout title="Simple Products">
      <Head title="Simple Products" />

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Products Catalog</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Monthly Price</TableHead>
                  <TableHead>Annual Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>{product.monthly_price ? formatCurrency(product.monthly_price) : 'N/A'}</TableCell>
                    <TableCell>{product.annual_price ? formatCurrency(product.annual_price) : 'N/A'}</TableCell>
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
