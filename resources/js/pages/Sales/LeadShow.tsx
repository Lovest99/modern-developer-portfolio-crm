import React from 'react';
import { Head, Link } from '@inertiajs/react';
import {
  ArrowLeftIcon,
  PencilIcon,
  OfficeBuildingIcon,
  CurrencyDollarIcon,
  CalendarIcon,
  UserIcon,
  DocumentTextIcon,
  BriefcaseIcon,
  PhoneIcon,
  MailIcon,
  ChevronRightIcon,
  TrashIcon
} from '@heroicons/react/solid';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

export default function LeadShow({ lead }) {
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
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getStageColor = (stage) => {
    switch (stage) {
      case 'prospect':
        return 'bg-gray-100 text-gray-800';
      case 'qualified':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <AppLayout title={`Lead: ${lead.name}`}>
      <Head title={`Lead: ${lead.name}`} />

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={() => window.history.back()}
            className="gap-2"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Back to Leads
          </Button>

          <div className="flex gap-2">
            <Button asChild variant="outline">
              <Link href={route('sales.deals.create', { lead_id: lead.id })}>
                <BriefcaseIcon className="h-4 w-4 mr-2" />
                Convert to Deal
              </Link>
            </Button>
            <Button asChild>
              <Link href={route('sales.leads.edit', lead.id)}>
                <PencilIcon className="h-4 w-4 mr-2" />
                Edit Lead
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            {/* Lead Details */}
            <Card>
              <CardHeader>
                <CardTitle>Lead Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold">{lead.name}</h2>
                  <Badge className={`mt-2 ${getStageColor(lead.stage)}`}>
                    {lead.stage === 'prospect' ? 'Prospect' : 'Qualified'}
                  </Badge>
                </div>

                <Separator />

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Company</h3>
                    <div className="mt-1 flex items-center">
                      <OfficeBuildingIcon className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="text-lg font-medium">
                        {lead.company?.name || 'No company'}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Estimated Value</h3>
                    <div className="mt-1 flex items-center">
                      <CurrencyDollarIcon className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="text-lg font-medium">
                        {lead.amount ? formatCurrency(lead.amount) : 'Not specified'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Owner</h3>
                    <div className="mt-1 flex items-center">
                      <UserIcon className="h-5 w-5 text-gray-400 mr-2" />
                      <span>{lead.user?.name || 'Unassigned'}</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Created</h3>
                    <div className="mt-1 flex items-center">
                      <CalendarIcon className="h-5 w-5 text-gray-400 mr-2" />
                      <span>{formatDate(lead.created_at)}</span>
                    </div>
                  </div>
                </div>

                {lead.notes && (
                  <>
                    <Separator />
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-2">Notes</h3>
                      <div className="prose max-w-none">
                        <p>{lead.notes}</p>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Company Information */}
            {lead.company && (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle>Company Information</CardTitle>
                  <Button asChild variant="ghost" size="sm">
                    <Link href={route('contacts.companies.show', lead.company.id)}>
                      View Company
                      <ChevronRightIcon className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center">
                    <OfficeBuildingIcon className="h-8 w-8 text-primary/20 mr-4" />
                    <div>
                      <p className="text-lg font-medium">{lead.company.name}</p>
                      {lead.company.industry && (
                        <p className="text-sm text-gray-500">{lead.company.industry}</p>
                      )}
                    </div>
                  </div>

                  {lead.company.website && (
                    <div className="flex items-center">
                      <div className="w-8 mr-4"></div>
                      <a
                        href={lead.company.website.startsWith('http') ? lead.company.website : `https://${lead.company.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        {lead.company.website}
                      </a>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          <div className="space-y-6">
            {/* Lead Metadata */}
            <Card>
              <CardHeader>
                <CardTitle>Lead Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Stage</h3>
                  <div className="mt-1 flex items-center">
                    <BriefcaseIcon className="h-4 w-4 text-gray-400 mr-2" />
                    <Badge className={`${getStageColor(lead.stage)}`}>
                      {lead.stage === 'prospect' ? 'Prospect' : 'Qualified'}
                    </Badge>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">Created</h3>
                  <div className="mt-1 flex items-center">
                    <CalendarIcon className="h-4 w-4 text-gray-400 mr-2" />
                    <span>{formatDate(lead.created_at)}</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">Last Updated</h3>
                  <div className="mt-1 flex items-center">
                    <CalendarIcon className="h-4 w-4 text-gray-400 mr-2" />
                    <span>{formatDate(lead.updated_at)}</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">Lead ID</h3>
                  <div className="mt-1 flex items-center">
                    <DocumentTextIcon className="h-4 w-4 text-gray-400 mr-2" />
                    <span>{lead.id}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link href={route('sales.leads.edit', lead.id)}>
                    <PencilIcon className="h-4 w-4 mr-2" />
                    Edit Lead
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link href={route('sales.deals.create', { lead_id: lead.id })}>
                    <BriefcaseIcon className="h-4 w-4 mr-2" />
                    Convert to Deal
                  </Link>
                </Button>
                {lead.company && (
                  <Button asChild variant="outline" className="w-full justify-start">
                    <Link href={route('contacts.companies.show', lead.company.id)}>
                      <OfficeBuildingIcon className="h-4 w-4 mr-2" />
                      View Company
                    </Link>
                  </Button>
                )}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="destructive" className="w-full justify-start">
                      <TrashIcon className="h-4 w-4 mr-2" />
                      Delete Lead
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link
                        href={route('sales.leads.destroy', lead.id)}
                        method="delete"
                        as="button"
                        className="w-full text-left text-red-600 hover:text-red-700"
                      >
                        Confirm Delete
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
