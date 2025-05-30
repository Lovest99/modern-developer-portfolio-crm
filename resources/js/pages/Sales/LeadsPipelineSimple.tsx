import React from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, Search, Filter, Building2, User, DollarSign, Calendar } from 'lucide-react';

export default function LeadsPipelineSimple({ leads = [], filters = {} }) {
  // Sample data for demonstration
  const sampleLeads = [
    {
      id: 1,
      name: 'Website Redesign Project',
      company: { name: 'Acme Corporation' },
      contact: { name: 'John Smith' },
      stage: 'prospect',
      amount: 5000,
      created_at: '2023-05-15T10:00:00Z',
      user: { name: 'Alex Johnson' }
    },
    {
      id: 2,
      name: 'E-commerce Integration',
      company: { name: 'XYZ Retail' },
      contact: { name: 'Sarah Williams' },
      stage: 'qualified',
      amount: 8500,
      created_at: '2023-05-10T14:30:00Z',
      user: { name: 'Maria Garcia' }
    },
    {
      id: 3,
      name: 'SEO Optimization',
      company: { name: 'Global Media' },
      contact: { name: 'Robert Johnson' },
      stage: 'prospect',
      amount: 3000,
      created_at: '2023-05-08T09:15:00Z',
      user: { name: 'Alex Johnson' }
    },
    {
      id: 4,
      name: 'Mobile App Development',
      company: { name: 'Tech Innovators' },
      contact: { name: 'Emily Chen' },
      stage: 'qualified',
      amount: 15000,
      created_at: '2023-05-05T11:45:00Z',
      user: { name: 'David Wilson' }
    },
    {
      id: 5,
      name: 'Content Marketing Strategy',
      company: { name: 'Creative Solutions' },
      contact: { name: 'Michael Brown' },
      stage: 'prospect',
      amount: 4500,
      created_at: '2023-05-01T16:20:00Z',
      user: { name: 'Maria Garcia' }
    }
  ];

  const displayLeads = leads.length > 0 ? leads : sampleLeads;

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

  return (
    <AppLayout title="Leads Pipeline">
      <Head title="Leads Pipeline" />

      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Leads Pipeline</h1>
          <p className="text-muted-foreground">
            Manage and track your sales leads
          </p>
        </div>
        <Button className="w-full md:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          Add Lead
        </Button>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <CardTitle>Active Leads</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[250px]">Lead Name</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Stage</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Owner</TableHead>
                    <TableHead>Created</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {displayLeads.map((lead) => (
                    <TableRow key={lead.id}>
                      <TableCell className="font-medium">{lead.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Building2 className="mr-2 h-4 w-4 text-gray-400" />
                          {lead.company?.name || 'No company'}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={lead.stage === 'prospect' ? 'outline' : 'secondary'}>
                          {lead.stage === 'prospect' ? 'Prospect' : 'Qualified'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <DollarSign className="mr-2 h-4 w-4 text-gray-400" />
                          {lead.amount ? formatCurrency(lead.amount) : 'N/A'}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <User className="mr-2 h-4 w-4 text-gray-400" />
                          {lead.user?.name || 'Unassigned'}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Calendar className="mr-2 h-4 w-4 text-gray-400" />
                          {formatDate(lead.created_at)}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
