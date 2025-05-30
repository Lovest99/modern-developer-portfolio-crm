import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import {
  ArrowLeftIcon,
  SaveIcon,
  TrashIcon,
  OfficeBuildingIcon,
  PlusIcon,
  MinusIcon
} from '@heroicons/react/solid';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
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
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { CheckIcon, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

export default function DealForm({ deal, companies, products, allProducts, users }) {
  const isEditing = !!deal;
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);

  const { data, setData, post, put, processing, errors } = useForm({
    name: deal?.name || '',
    amount: deal?.amount || '',
    stage: deal?.stage || 'prospect',
    company_id: deal?.company_id || '',
    user_id: deal?.user_id || '',
    description: deal?.description || '',
    products: products || [],
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      put(route('sales.deals.update', deal.id));
    } else {
      post(route('sales.deals.store'));
    }
  };

  const handleDelete = () => {
    window.location.href = route('sales.deals.destroy', deal.id);
  };

  const addProduct = () => {
    setData('products', [
      ...data.products,
      { product_id: '', quantity: 1 }
    ]);
  };

  const removeProduct = (index) => {
    const updatedProducts = [...data.products];
    updatedProducts.splice(index, 1);
    setData('products', updatedProducts);
  };

  const updateProduct = (index, field, value) => {
    const updatedProducts = [...data.products];
    updatedProducts[index][field] = value;
    setData('products', updatedProducts);
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
    <AppLayout title={isEditing ? `Edit Deal: ${deal.name}` : 'Create New Deal'}>
      <Head title={isEditing ? `Edit Deal` : 'New Deal'} />

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={() => window.history.back()}
            className="gap-2"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Back
          </Button>

          {isEditing && (
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
          )}
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              {/* Deal Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Deal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {/* Deal Name */}
                    <div className="space-y-2">
                      <Label htmlFor="name">Deal Name <span className="text-red-500">*</span></Label>
                      <Input
                        id="name"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        placeholder="Enter deal name or opportunity title"
                        required
                      />
                      {errors.name && (
                        <p className="text-sm text-red-500">{errors.name}</p>
                      )}
                    </div>

                    {/* Deal Value */}
                    <div className="space-y-2">
                      <Label htmlFor="amount">Deal Value</Label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <span className="text-gray-500">$</span>
                        </div>
                        <Input
                          id="amount"
                          type="number"
                          step="0.01"
                          min="0"
                          value={data.amount}
                          onChange={(e) => setData('amount', e.target.value)}
                          placeholder="0.00"
                          className="pl-8"
                        />
                      </div>
                      {errors.amount && (
                        <p className="text-sm text-red-500">{errors.amount}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {/* Company */}
                    <div className="space-y-2">
                      <Label htmlFor="company_id">Company <span className="text-red-500">*</span></Label>
                      <Popover open={companyOpen} onOpenChange={setCompanyOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={companyOpen}
                            className="w-full justify-between"
                          >
                            {data.company_id
                              ? companies.find((company) => company.id === data.company_id)?.name
                              : "Select company..."}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                          <Command>
                            <CommandInput placeholder="Search company..." />
                            <CommandEmpty>No company found.</CommandEmpty>
                            <CommandGroup>
                              {companies.map((company) => (
                                <CommandItem
                                  key={company.id}
                                  value={company.name}
                                  onSelect={() => {
                                    setData('company_id', company.id);
                                    setCompanyOpen(false);
                                  }}
                                >
                                  <CheckIcon
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      data.company_id === company.id ? "opacity-100" : "opacity-0"
                                    )}
                                  />
                                  <OfficeBuildingIcon className="mr-2 h-4 w-4 text-gray-400" />
                                  {company.name}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      {errors.company_id && (
                        <p className="text-sm text-red-500">{errors.company_id}</p>
                      )}
                    </div>

                    {/* Stage */}
                    <div className="space-y-2">
                      <Label htmlFor="stage">Stage <span className="text-red-500">*</span></Label>
                      <Select
                        value={data.stage}
                        onValueChange={(value) => setData('stage', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select stage" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="prospect">Prospect</SelectItem>
                          <SelectItem value="qualified">Qualified</SelectItem>
                          <SelectItem value="proposal">Proposal</SelectItem>
                          <SelectItem value="closed">Closed</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.stage && (
                        <p className="text-sm text-red-500">{errors.stage}</p>
                      )}
                    </div>
                  </div>

                  {/* Owner */}
                  <div className="space-y-2">
                    <Label htmlFor="user_id">Deal Owner</Label>
                    <Popover open={userOpen} onOpenChange={setUserOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={userOpen}
                          className="w-full justify-between"
                        >
                          {data.user_id
                            ? users.find((user) => user.id === data.user_id)?.name
                            : "Select owner..."}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command>
                          <CommandInput placeholder="Search user..." />
                          <CommandEmpty>No user found.</CommandEmpty>
                          <CommandGroup>
                            {users.map((user) => (
                              <CommandItem
                                key={user.id}
                                value={user.name}
                                onSelect={() => {
                                  setData('user_id', user.id);
                                  setUserOpen(false);
                                }}
                              >
                                <CheckIcon
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    data.user_id === user.id ? "opacity-100" : "opacity-0"
                                  )}
                                />
                                {user.name}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    {errors.user_id && (
                      <p className="text-sm text-red-500">{errors.user_id}</p>
                    )}
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={data.description}
                      onChange={(e) => setData('description', e.target.value)}
                      placeholder="Enter any additional information about this deal"
                      rows={4}
                    />
                    {errors.description && (
                      <p className="text-sm text-red-500">{errors.description}</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Products */}
              <Card>
                <CardHeader>
                  <CardTitle>Products</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {data.products.length > 0 ? (
                    <div className="space-y-4">
                      {data.products.map((productItem, index) => (
                        <div key={index} className="flex items-start space-x-4 p-4 border rounded-md">
                          <div className="flex-1 grid grid-cols-1 gap-4 md:grid-cols-3">
                            <div className="space-y-2">
                              <Label htmlFor={`product-${index}`}>Product</Label>
                              <Select
                                value={productItem.product_id.toString()}
                                onValueChange={(value) => updateProduct(index, 'product_id', value)}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select product" />
                                </SelectTrigger>
                                <SelectContent>
                                  {allProducts.map((product) => (
                                    <SelectItem key={product.id} value={product.id.toString()}>
                                      {product.name} - {formatCurrency(product.monthly_price || 0)}/mo
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor={`quantity-${index}`}>Quantity</Label>
                              <Input
                                id={`quantity-${index}`}
                                type="number"
                                min="1"
                                value={productItem.quantity}
                                onChange={(e) => updateProduct(index, 'quantity', parseInt(e.target.value))}
                              />
                            </div>

                            <div className="space-y-2">
                              <Label>Price</Label>
                              <div className="h-10 flex items-center px-3 text-gray-700">
                                {productItem.product_id ? (
                                  <>
                                    {formatCurrency((allProducts.find(p => p.id.toString() === productItem.product_id.toString())?.monthly_price || 0) * productItem.quantity)}
                                    <span className="text-xs text-gray-500 ml-1">/mo</span>
                                  </>
                                ) : (
                                  'Select a product'
                                )}
                              </div>
                            </div>
                          </div>

                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeProduct(index)}
                            className="mt-8"
                          >
                            <MinusIcon className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <p className="text-gray-500">No products added to this deal yet.</p>
                    </div>
                  )}

                  <Button
                    type="button"
                    variant="outline"
                    onClick={addProduct}
                    className="w-full"
                  >
                    <PlusIcon className="h-4 w-4 mr-2" />
                    Add Product
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              {/* Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Deal Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Deal Value</h3>
                    <div className="mt-1 text-2xl font-bold">
                      {data.amount ? formatCurrency(data.amount) : 'Not specified'}
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Products Value</h3>
                    <div className="mt-1 text-lg">
                      {formatCurrency(
                        data.products.reduce((total, item) => {
                          const product = allProducts.find(p => p.id.toString() === item.product_id.toString());
                          return total + (product ? (product.monthly_price || 0) * item.quantity : 0);
                        }, 0)
                      )}
                      <span className="text-xs text-gray-500 ml-1">/mo</span>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Products</h3>
                    <div className="mt-1 text-lg">
                      {data.products.length} {data.products.length === 1 ? 'product' : 'products'}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={processing}
                    >
                      <SaveIcon className="h-4 w-4 mr-2" />
                      {isEditing ? 'Update Deal' : 'Create Deal'}
                    </Button>

                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={() => window.history.back()}
                    >
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}
