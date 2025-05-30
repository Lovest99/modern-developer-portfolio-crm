import React, { useState } from 'react';
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
  TagIcon,
  ClipboardListIcon,
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function DealDetail({ deal, products }) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

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
      case 'proposal':
        return 'bg-indigo-100 text-indigo-800';
      case 'closed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStageName = (stage) => {
    switch (stage) {
      case 'prospect':
        return 'Prospect';
      case 'qualified':
        return 'Qualified';
      case 'proposal':
        return 'Proposal';
      case 'closed':
        return 'Closed';
      default:
        return stage;
    }
  };

  const handleDelete = () => {
    router.delete(route('sales.deals.destroy', deal.id));
  };

  // Calculate total value of products
  const totalProductsValue = products.reduce((total, product) => {
    return total + (product.pivot.quantity * (product.monthly_price || 0));
  }, 0);

  return (
    <AppLayout title={`Deal: ${deal.name}`}>
      <Head title={`Deal: ${deal.name}`} />

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={() => window.history.back()}
            className="gap-2"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Back to Deals
          </Button>

          <div className="flex gap-2">
            <Button asChild>
              <Link href={route('sales.deals.edit', deal.id)}>
                <PencilIcon className="h-4 w-4 mr-2" />
                Edit Deal
              </Link>
            </Button>

            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="gap-2">
                  <TrashIcon className="h-4 w-4" />
                  Delete Deal
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the deal
                    and all associated data.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDelete}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="md:col-span-2 space-y-6">
            {/* Deal Details */}
            <Card>
              <CardHeader>
                <CardTitle>Deal Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold">{deal.name}</h2>
                  <Badge className={`mt-2 ${getStageColor(deal.stage)}`}>
                    {getStageName(deal.stage)}
                  </Badge>
                </div>

                <Separator />

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Company</h3>
                    <div className="mt-1 flex items-center">
                      <OfficeBuildingIcon className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="text-lg font-medium">
                        {deal.company?.name || 'No company'}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Deal Value</h3>
                    <div className="mt-1 flex items-center">
                      <CurrencyDollarIcon className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="text-lg font-medium">
                        {deal.amount ? formatCurrency(deal.amount) : 'Not specified'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Owner</h3>
                    <div className="mt-1 flex items-center">
                      <UserIcon className="h-5 w-5 text-gray-400 mr-2" />
                      <span>{deal.user?.name || 'Unassigned'}</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Created</h3>
                    <div className="mt-1 flex items-center">
                      <CalendarIcon className="h-5 w-5 text-gray-400 mr-2" />
                      <span>{formatDate(deal.created_at)}</span>
                    </div>
                  </div>
                </div>

                {deal.description && (
                  <>
                    <Separator />
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-2">Description</h3>
                      <div className="prose max-w-none">
                        <p>{deal.description}</p>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Products */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle>Products</CardTitle>
                <Button asChild variant="outline" size="sm">
                  <Link href={route('sales.deals.edit', deal.id)}>
                    Add Products
                  </Link>
                </Button>
              </CardHeader>
              <CardContent>
                {products.length > 0 ? (
                  <div className="space-y-4">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-3 px-4">Product</th>
                            <th className="text-center py-3 px-4">Quantity</th>
                            <th className="text-right py-3 px-4">Price</th>
                            <th className="text-right py-3 px-4">Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {products.map((product) => (
                            <tr key={product.id} className="border-b">
                              <td className="py-3 px-4">
                                <div className="flex items-center">
                                  <TagIcon className="h-4 w-4 text-gray-400 mr-2" />
                                  <Link
                                    href={route('sales.products.show', product.id)}
                                    className="hover:text-primary hover:underline"
                                  >
                                    {product.name}
                                  </Link>
                                </div>
                                {product.category && (
                                  <span className="text-xs text-gray-500 ml-6 mt-1 block">
                                    {product.category}
                                  </span>
                                )}
                              </td>
                              <td className="text-center py-3 px-4">
                                {product.pivot.quantity}
                              </td>
                              <td className="text-right py-3 px-4">
                                {formatCurrency(product.monthly_price || 0)}
                                <span className="text-xs text-gray-500">/mo</span>
                              </td>
                              <td className="text-right py-3 px-4 font-medium">
                                {formatCurrency((product.pivot.quantity * (product.monthly_price || 0)))}
                              </td>
                            </tr>
                          ))}
                          <tr className="bg-gray-50">
                            <td colSpan={3} className="py-3 px-4 text-right font-medium">
                              Total
                            </td>
                            <td className="text-right py-3 px-4 font-bold">
                              {formatCurrency(totalProductsValue)}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <TagIcon className="h-12 w-12 text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900">No products added</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Add products to this deal to track what you're selling.
                    </p>
                    <Button asChild className="mt-4">
                      <Link href={route('sales.deals.edit', deal.id)}>
                        Add Products
                      </Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Tabs for additional information */}
            <Card>
              <CardContent className="pt-6">
                <Tabs defaultValue="notes">
                  <TabsList className="w-full justify-start mb-6 bg-muted/50">
                    <TabsTrigger value="notes">Notes</TabsTrigger>
                    <TabsTrigger value="activities">Activities</TabsTrigger>
                    <TabsTrigger value="files">Files</TabsTrigger>
                  </TabsList>

                  <TabsContent value="notes" className="space-y-4">
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <DocumentTextIcon className="h-12 w-12 text-gray-300 mb-4" />
                      <h3 className="text-lg font-medium text-gray-900">No notes yet</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Add notes to keep track of important information about this deal.
                      </p>
                      <Button className="mt-4">
                        Add Note
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="activities" className="space-y-4">
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <ClipboardListIcon className="h-12 w-12 text-gray-300 mb-4" />
                      <h3 className="text-lg font-medium text-gray-900">No activities recorded</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Activities will be shown here when you interact with this deal.
                      </p>
                    </div>
                  </TabsContent>

                  <TabsContent value="files" className="space-y-4">
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <DocumentTextIcon className="h-12 w-12 text-gray-300 mb-4" />
                      <h3 className="text-lg font-medium text-gray-900">No files attached</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Attach files such as contracts or proposals to this deal.
                      </p>
                      <Button className="mt-4">
                        Upload File
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            {/* Deal Metadata */}
            <Card>
              <CardHeader>
                <CardTitle>Deal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Stage</h3>
                  <div className="mt-1 flex items-center">
                    <BriefcaseIcon className="h-4 w-4 text-gray-400 mr-2" />
                    <Badge className={getStageColor(deal.stage)}>
                      {getStageName(deal.stage)}
                    </Badge>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">Created</h3>
                  <div className="mt-1 flex items-center">
                    <CalendarIcon className="h-4 w-4 text-gray-400 mr-2" />
                    <span>{formatDate(deal.created_at)}</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">Last Updated</h3>
                  <div className="mt-1 flex items-center">
                    <CalendarIcon className="h-4 w-4 text-gray-400 mr-2" />
                    <span>{formatDate(deal.updated_at)}</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500">Deal ID</h3>
                  <div className="mt-1 flex items-center">
                    <DocumentTextIcon className="h-4 w-4 text-gray-400 mr-2" />
                    <span>{deal.id}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Company Information */}
            {deal.company && (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle>Company</CardTitle>
                  <Button asChild variant="ghost" size="sm">
                    <Link href={route('contacts.companies.show', deal.company.id)}>
                      View Company
                      <ChevronRightIcon className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center">
                    <OfficeBuildingIcon className="h-8 w-8 text-primary/20 mr-4" />
                    <div>
                      <p className="text-lg font-medium">{deal.company.name}</p>
                      {deal.company.industry && (
                        <p className="text-sm text-gray-500">{deal.company.industry}</p>
                      )}
                    </div>
                  </div>

                  {deal.company.website && (
                    <div className="flex items-center">
                      <div className="w-8 mr-4"></div>
                      <a
                        href={deal.company.website.startsWith('http') ? deal.company.website : `https://${deal.company.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        {deal.company.website}
                      </a>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button asChild variant="outline" className="w-full justify-start">
                  <Link href={route('sales.deals.edit', deal.id)}>
                    <PencilIcon className="h-4 w-4 mr-2" />
                    Edit Deal
                  </Link>
                </Button>

                {deal.stage !== 'closed' && (
                  <Button asChild variant="outline" className="w-full justify-start">
                    <Link href={route('sales.deals.update-stage', [deal.id, { stage: 'closed' }])} method="put">
                      <CheckIcon className="h-4 w-4 mr-2" />
                      Mark as Closed
                    </Link>
                  </Button>
                )}

                <Button asChild variant="outline" className="w-full justify-start">
                  <Link href={route('projects.create', { deal_id: deal.id })}>
                    <BriefcaseIcon className="h-4 w-4 mr-2" />
                    Create Project from Deal
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
