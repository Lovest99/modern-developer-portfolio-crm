import React from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Filter, FileText, Building2, User, DollarSign, Calendar } from 'lucide-react';

export default function QuotesSimple({ quotes = [], filters = {} }) {
  // Sample data for demonstration
  const sampleQuotes = [
    {
      id: 1,
      quote_number: 'Q-2023-001',
      title: 'Website Redesign Project',
      company: { name: 'Acme Corporation' },
      amount: 5000,
      status: 'draft',
      created_at: '2023-05-15T10:00:00Z',
      expiry_date: '2023-06-15T10:00:00Z',
      user: { name: 'Alex Johnson' }
    },
    {
      id: 2,
      quote_number: 'Q-2023-002',
      title: 'E-commerce Integration',
      company: { name: 'XYZ Retail' },
      amount: 8500,
      status: 'sent',
      created_at: '2023-05-10T14:30:00Z',
      expiry_date: '2023-06-10T14:30:00Z',
      user: { name: 'Maria Garcia' }
    },
    {
      id: 3,
      quote_number: 'Q-2023-003',
      title: 'SEO Optimization',
      company: { name: 'Global Media' },
      amount: 3000,
      status: 'accepted',
      created_at: '2023-05-08T09:15:00Z',
      expiry_date: '2023-06-08T09:15:00Z',
      user: { name: 'Alex Johnson' }
    },
    {
      id: 4,
      quote_number: 'Q-2023-004',
      title: 'Mobile App Development',
      company: { name: 'Tech Innovators' },
      amount: 15000,
      status: 'rejected',
      created_at: '2023-05-05T11:45:00Z',
      expiry_date: '2023-06-05T11:45:00Z',
      user: { name: 'David Wilson' }
    },
    {
      id: 5,
      quote_number: 'Q-2023-005',
      title: 'Content Management System',
      company: { name: 'Publishing House' },
      amount: 15000,
      status: 'draft',
      created_at: '2023-05-15T11:20:00Z',
      expiry_date: '2023-06-15T11:20:00Z',
      user: { name: 'John Doe' }
    }
  ];

  const displayQuotes = quotes.length > 0 ? quotes : sampleQuotes;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'draft':
        return <Badge variant="outline">Draft</Badge>;
      case 'sent':
        return <Badge variant="secondary">Sent</Badge>;
      case 'accepted':
        return <Badge className="bg-green-500 text-white hover:bg-green-600">Accepted</Badge>;
      case 'rejected':
        return <Badge className="bg-red-500 text-white hover:bg-red-600">Rejected</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <AppLayout title="Quotes & Proposals">
      <Head title="Quotes & Proposals" />

      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Quotes & Proposals</h1>
          <p className="text-muted-foreground">
            Create and manage quotes for your clients
          </p>
        </div>
        <Button className="w-full md:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          Create Quote
        </Button>
      </div>

      <div className="space-y-6">
        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <CardTitle>Quotes & Proposals</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[120px]">Quote #</TableHead>
                    <TableHead className="w-[200px]">Title</TableHead>
                    <TableHead className="w-[150px]">Client</TableHead>
                    <TableHead className="w-[100px]">Amount</TableHead>
                    <TableHead className="w-[120px]">Status</TableHead>
                    <TableHead className="w-[120px]">Expiry Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {displayQuotes.map((quote) => (
                    <TableRow key={quote.id}>
                      <TableCell className="font-medium">{quote.quote_number}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <FileText className="mr-2 h-4 w-4 text-gray-400" />
                          {quote.title}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Building2 className="mr-2 h-4 w-4 text-gray-400" />
                          {quote.company?.name || 'No client'}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <DollarSign className="mr-2 h-4 w-4 text-gray-400" />
                          {formatCurrency(quote.amount)}
                        </div>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(quote.status)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Calendar className="mr-2 h-4 w-4 text-gray-400" />
                          {formatDate(quote.expiry_date)}
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
