# Table Component Updates

## 1. LeadsPipeline.tsx Table Update

First, update the imports:

```tsx
import {
  Table,
  TableHead,
  TableHeadCell,
  TableBody,
  TableRow,
  TableCell,
  EmptyTableRow,
  SortableTableHeadCell
} from '@/components/ui/table';
```

Then replace the table section:

```tsx
<Table>
  <TableHead>
    <SortableTableHeadCell
      field="name"
      currentSortField={sortField}
      currentSortDirection={sortDirection}
      onSort={handleSort}
    >
      Name
    </SortableTableHeadCell>
    <SortableTableHeadCell
      field="company_id"
      currentSortField={sortField}
      currentSortDirection={sortDirection}
      onSort={handleSort}
    >
      Company
    </SortableTableHeadCell>
    <SortableTableHeadCell
      field="stage"
      currentSortField={sortField}
      currentSortDirection={sortDirection}
      onSort={handleSort}
    >
      Stage
    </SortableTableHeadCell>
    <SortableTableHeadCell
      field="amount"
      currentSortField={sortField}
      currentSortDirection={sortDirection}
      onSort={handleSort}
    >
      Value
    </SortableTableHeadCell>
    <SortableTableHeadCell
      field="assigned_to"
      currentSortField={sortField}
      currentSortDirection={sortDirection}
      onSort={handleSort}
    >
      Owner
    </SortableTableHeadCell>
    <SortableTableHeadCell
      field="created_at"
      currentSortField={sortField}
      currentSortDirection={sortDirection}
      onSort={handleSort}
    >
      Created
    </SortableTableHeadCell>
    <TableHeadCell className="relative">
      <span className="sr-only">Actions</span>
    </TableHeadCell>
  </TableHead>
  <TableBody>
    {leads.data && leads.data.length > 0 ? (
      leads.data.map((lead) => (
        <TableRow key={lead.id}>
          <TableCell className="font-medium text-gray-900">
            <Link
              href={route('sales.leads.show', lead.id)}
              className="hover:text-indigo-600"
            >
              {lead.name}
            </Link>
          </TableCell>
          <TableCell>
            <div className="flex items-center">
              <Building2 className="mr-2 h-4 w-4 text-gray-400" />
              {lead.company?.name || 'No company'}
            </div>
          </TableCell>
          <TableCell>
            <Badge variant="outline" className={getStageColor(lead.stage)}>
              {lead.stage === 'prospect' ? 'Prospect' : 'Qualified'}
            </Badge>
          </TableCell>
          <TableCell>
            <div className="flex items-center">
              <DollarSign className="mr-2 h-4 w-4 text-gray-400" />
              <span className="font-medium">{lead.amount ? formatCurrency(lead.amount) : 'N/A'}</span>
            </div>
          </TableCell>
          <TableCell>
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-2 text-primary font-medium">
                {(lead.assignee?.name || lead.creator?.name || '?').charAt(0)}
              </div>
              <span>{lead.assignee?.name || lead.creator?.name || 'Unassigned'}</span>
            </div>
          </TableCell>
          <TableCell>
            <div className="flex items-center">
              <CalendarIcon className="mr-2 h-4 w-4 text-gray-400" />
              <span title={new Date(lead.created_at).toLocaleString()}>
                {formatDistanceToNow(new Date(lead.created_at), { addSuffix: true })}
              </span>
            </div>
          </TableCell>
          <TableCell className="text-right">
            <div className="flex justify-end space-x-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    Actions
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href={route('sales.leads.show', lead.id)}>
                      View Details
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={route('sales.leads.edit', lead.id)}>
                      Edit Lead
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href={route('sales.leads.destroy', lead.id)}
                      method="delete"
                      as="button"
                      className="w-full text-left text-destructive hover:text-destructive"
                    >
                      Delete Lead
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </TableCell>
        </TableRow>
      ))
    ) : (
      <EmptyTableRow
        colSpan={7}
        message="No leads found. Try adjusting your search or filter to find what you're looking for."
      />
    )}
  </TableBody>
</Table>
```

## 2. Quotes.tsx Table Update

First, update the imports:

```tsx
import {
  Table,
  TableHead,
  TableHeadCell,
  TableBody,
  TableRow,
  TableCell,
  EmptyTableRow,
  SortableTableHeadCell
} from '@/components/ui/table';
```

Then replace the table section:

```tsx
<Table>
  <TableHead>
    <SortableTableHeadCell
      field="quote_number"
      currentSortField={sortField}
      currentSortDirection={sortDirection}
      onSort={handleSort}
    >
      Quote #
    </SortableTableHeadCell>
    <SortableTableHeadCell
      field="title"
      currentSortField={sortField}
      currentSortDirection={sortDirection}
      onSort={handleSort}
    >
      Title
    </SortableTableHeadCell>
    <SortableTableHeadCell
      field="company_id"
      currentSortField={sortField}
      currentSortDirection={sortDirection}
      onSort={handleSort}
    >
      Client
    </SortableTableHeadCell>
    <SortableTableHeadCell
      field="amount"
      currentSortField={sortField}
      currentSortDirection={sortDirection}
      onSort={handleSort}
    >
      Amount
    </SortableTableHeadCell>
    <SortableTableHeadCell
      field="status"
      currentSortField={sortField}
      currentSortDirection={sortDirection}
      onSort={handleSort}
    >
      Status
    </SortableTableHeadCell>
    <SortableTableHeadCell
      field="expiry_date"
      currentSortField={sortField}
      currentSortDirection={sortDirection}
      onSort={handleSort}
    >
      Expiry Date
    </SortableTableHeadCell>
    <TableHeadCell className="relative">
      <span className="sr-only">Actions</span>
    </TableHeadCell>
  </TableHead>
  <TableBody>
    {sampleQuotes.length > 0 ? (
      sampleQuotes.map((quote) => (
        <TableRow key={quote.id}>
          <TableCell className="font-medium text-gray-900">
            <Link
              href={route('sales.quotes.show', quote.id)}
              className="hover:text-indigo-600"
            >
              {quote.quote_number}
            </Link>
          </TableCell>
          <TableCell>
            <div className="flex items-center">
              <DocumentTextIcon className="mr-2 h-4 w-4 text-gray-400" />
              <span className="font-medium">{quote.title}</span>
            </div>
          </TableCell>
          <TableCell>
            <div className="flex items-center">
              <OfficeBuildingIcon className="mr-2 h-4 w-4 text-gray-400" />
              <span>{quote.company?.name || 'No client'}</span>
            </div>
          </TableCell>
          <TableCell>
            <div className="flex items-center">
              <CurrencyDollarIcon className="mr-2 h-4 w-4 text-gray-400" />
              <span className="font-medium">{formatCurrency(quote.amount)}</span>
            </div>
          </TableCell>
          <TableCell>
            {getStatusBadge(quote.status)}
          </TableCell>
          <TableCell>
            <div className="flex items-center">
              <CalendarIcon className="mr-2 h-4 w-4 text-gray-400" />
              <span>{new Date(quote.expiry_date).toLocaleDateString()}</span>
            </div>
          </TableCell>
          <TableCell className="text-right">
            <div className="flex justify-end space-x-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    Actions
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href={route('sales.quotes.show', quote.id)}>
                      View Details
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={route('sales.quotes.edit', quote.id)}>
                      Edit Quote
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="#">
                      <DocumentDownloadIcon className="mr-2 h-4 w-4" />
                      Download PDF
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="#">
                      <MailIcon className="mr-2 h-4 w-4" />
                      Send to Client
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href={route('sales.quotes.destroy', quote.id)}
                      method="delete"
                      as="button"
                      className="w-full text-left text-destructive hover:text-destructive"
                    >
                      Delete Quote
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </TableCell>
        </TableRow>
      ))
    ) : (
      <EmptyTableRow
        colSpan={7}
        message="No quotes found. Create your first quote to get started."
      />
    )}
  </TableBody>
</Table>
```

## 3. Products.tsx Table Update

First, update the imports:

```tsx
import {
  Table,
  TableHead,
  TableHeadCell,
  TableBody,
  TableRow,
  TableCell,
  EmptyTableRow,
  SortableTableHeadCell
} from '@/components/ui/table';
```

Then replace the table section:

```tsx
<Table>
  <TableHead>
    <SortableTableHeadCell
      field="name"
      currentSortField={sortField}
      currentSortDirection={sortDirection}
      onSort={handleSort}
    >
      Product Name
    </SortableTableHeadCell>
    <SortableTableHeadCell
      field="category"
      currentSortField={sortField}
      currentSortDirection={sortDirection}
      onSort={handleSort}
    >
      Category
    </SortableTableHeadCell>
    <SortableTableHeadCell
      field="monthly_price"
      currentSortField={sortField}
      currentSortDirection={sortDirection}
      onSort={handleSort}
    >
      Monthly Price
    </SortableTableHeadCell>
    <SortableTableHeadCell
      field="annual_price"
      currentSortField={sortField}
      currentSortDirection={sortDirection}
      onSort={handleSort}
    >
      Annual Price
    </SortableTableHeadCell>
    <TableHeadCell className="relative">
      <span className="sr-only">Actions</span>
    </TableHeadCell>
  </TableHead>
  <TableBody>
    {products.data.length > 0 ? (
      products.data.map((product) => (
        <TableRow key={product.id}>
          <TableCell className="font-medium text-gray-900">
            <Link
              href={route('sales.products.show', product.id)}
              className="hover:text-indigo-600"
            >
              {product.name}
            </Link>
          </TableCell>
          <TableCell>
            {product.category ? (
              <Badge variant="outline" className="capitalize">
                <TagIcon className="mr-1 h-3 w-3" />
                {product.category}
              </Badge>
            ) : (
              <span className="text-gray-500">Uncategorized</span>
            )}
          </TableCell>
          <TableCell>
            <div className="flex items-center">
              <CurrencyDollarIcon className="mr-2 h-4 w-4 text-gray-400" />
              {product.monthly_price ? formatCurrency(product.monthly_price) : 'N/A'}
              <span className="ml-1 text-xs text-gray-500">/mo</span>
            </div>
          </TableCell>
          <TableCell>
            <div className="flex items-center">
              <CurrencyDollarIcon className="mr-2 h-4 w-4 text-gray-400" />
              {product.annual_price ? formatCurrency(product.annual_price) : 'N/A'}
              <span className="ml-1 text-xs text-gray-500">/yr</span>
            </div>
          </TableCell>
          <TableCell className="text-right">
            <div className="flex justify-end space-x-2">
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
                      className="w-full text-left text-destructive hover:text-destructive"
                    >
                      Delete Product
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </TableCell>
        </TableRow>
      ))
    ) : (
      <EmptyTableRow
        colSpan={5}
        message="No products found. Create your first product to get started."
      />
    )}
  </TableBody>
</Table>
```

## Implementation Notes

1. **Common Changes Across All Tables:**
   - Replaced `TableHeader` and `TableHead` with `TableHead` and `TableHeadCell` for consistency
   - Replaced custom sort buttons with `SortableTableHeadCell` component
   - Added proper spacing and alignment in table cells
   - Improved empty state handling with `EmptyTableRow` component
   - Standardized action buttons layout with flex justify-end

2. **Specific Improvements:**
   - **LeadsPipeline**: Improved sorting UI, standardized cell formatting
   - **Quotes**: Improved action dropdown positioning, better empty state handling
   - **Products**: Consistent styling for prices, better category display

3. **Benefits:**
   - More consistent UI across all tables
   - Better accessibility with proper ARIA attributes
   - Improved code maintainability with reusable components
   - Consistent sorting behavior across all tables
