import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/components/ui/use-toast';
import AdminLayout from '@/layouts/AdminLayout';
import { Testimonial } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { ArrowDown, ArrowUp, MoreVertical, Pencil, Plus, Star, Trash } from 'lucide-react';
import React, { useState } from 'react';

interface Props {
    testimonials: Testimonial[];
}

const TestimonialsIndex: React.FC<Props> = ({ testimonials }) => {
    const [isReordering, setIsReordering] = useState(false);
    const [reorderedTestimonials, setReorderedTestimonials] = useState([...testimonials]);
    const [testimonialToDelete, setTestimonialToDelete] = useState<Testimonial | null>(null);
    const { toast } = useToast();

    const handleToggleActive = (testimonial: Testimonial) => {
        router.patch(
            route('settings.testimonials.toggle-active', testimonial.id),
            {},
            {
                preserveScroll: true,
                onSuccess: () => {
                    toast({
                        title: 'Status Updated',
                        description: `Testimonial from ${testimonial.name} has been ${testimonial.is_active ? 'deactivated' : 'activated'}.`,
                        variant: 'success',
                        duration: 5000,
                    });
                },
                onError: () => {
                    toast({
                        title: 'Error',
                        description: 'Failed to update testimonial status. Please try again.',
                        variant: 'destructive',
                        duration: 5000,
                    });
                },
            },
        );
    };

    const handleDelete = () => {
        if (testimonialToDelete) {
            const testimonialName = testimonialToDelete.name;
            router.delete(route('settings.testimonials.destroy', testimonialToDelete.id), {
                preserveScroll: true,
                onSuccess: () => {
                    setTestimonialToDelete(null);
                    toast({
                        title: 'Testimonial Deleted',
                        description: `Testimonial from ${testimonialName} has been deleted.`,
                        variant: 'success',
                        duration: 5000,
                    });
                },
                onError: () => {
                    toast({
                        title: 'Error',
                        description: 'Failed to delete testimonial. Please try again.',
                        variant: 'destructive',
                    });
                },
            });
        }
    };

    const moveTestimonial = (id: number, direction: 'up' | 'down') => {
        const currentIndex = reorderedTestimonials.findIndex((t) => t.id === id);
        if ((direction === 'up' && currentIndex === 0) || (direction === 'down' && currentIndex === reorderedTestimonials.length - 1)) {
            return;
        }

        const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
        const newOrder = [...reorderedTestimonials];
        const temp = newOrder[currentIndex];
        newOrder[currentIndex] = newOrder[newIndex];
        newOrder[newIndex] = temp;

        setReorderedTestimonials(newOrder);
    };

    const saveReordering = () => {
        const reorderedData = reorderedTestimonials.map((testimonial, index) => ({
            id: testimonial.id,
            order: index,
        }));

        router.post(
            route('settings.testimonials.reorder'),
            {
                testimonials: reorderedData,
            },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setIsReordering(false);
                    toast({
                        title: 'Order Updated',
                        description: 'Testimonials have been reordered successfully.',
                        variant: 'default',
                    });
                },
                onError: () => {
                    // Reset to original order on error
                    setReorderedTestimonials([...testimonials]);
                    setIsReordering(false);
                    toast({
                        title: 'Error',
                        description: 'Failed to reorder testimonials. Please try again.',
                        variant: 'destructive',
                    });
                },
            },
        );
    };

    const cancelReordering = () => {
        setReorderedTestimonials([...testimonials]);
        setIsReordering(false);
    };

    const renderRatingStars = (rating: number) => {
        return Array.from({ length: 5 }).map((_, index) => (
            <Star key={index} className={`h-4 w-4 ${index < rating ? 'text-yellow-500' : 'text-gray-300'}`} />
        ));
    };

    return (
        <AdminLayout>
            <Head title="Testimonials Management" />

            <div className="py-6">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-6 flex items-center justify-between">
                        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Testimonials Management</h1>
                        <div className="flex space-x-3">
                            {isReordering ? (
                                <>
                                    <Button onClick={saveReordering} variant="default">
                                        Save Order
                                    </Button>
                                    <Button onClick={cancelReordering} variant="outline">
                                        Cancel
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Button onClick={() => setIsReordering(true)} variant="outline">
                                        Reorder
                                    </Button>
                                    <Button asChild>
                                        <Link href={route('settings.testimonials.create')}>
                                            <Plus className="mr-2 h-5 w-5" />
                                            Add Testimonial
                                        </Link>
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>All Testimonials</CardTitle>
                            <CardDescription>Manage client testimonials that appear on your portfolio website.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        {isReordering && <TableHead>Order</TableHead>}
                                        <TableHead>Name</TableHead>
                                        <TableHead>Company</TableHead>
                                        <TableHead>Rating</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {(isReordering ? reorderedTestimonials : testimonials).map((testimonial) => (
                                        <TableRow key={testimonial.id}>
                                            {isReordering && (
                                                <TableCell>
                                                    <div className="flex items-center space-x-2">
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => moveTestimonial(testimonial.id, 'up')}
                                                            disabled={testimonial.id === reorderedTestimonials[0].id}
                                                        >
                                                            <ArrowUp className="h-4 w-4" />
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => moveTestimonial(testimonial.id, 'down')}
                                                            disabled={testimonial.id === reorderedTestimonials[reorderedTestimonials.length - 1].id}
                                                        >
                                                            <ArrowDown className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            )}
                                            <TableCell>
                                                <div className="flex items-center space-x-3">
                                                    <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gray-100">
                                                        {testimonial.profile_image ? (
                                                            <img
                                                                src={testimonial.profile_image}
                                                                alt={testimonial.name}
                                                                className="h-full w-full object-cover"
                                                            />
                                                        ) : (
                                                            <span className="text-xs text-gray-500">No Image</span>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <div className="font-medium">{testimonial.name}</div>
                                                        <div className="text-sm text-gray-500">{testimonial.role}</div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center space-x-3">
                                                    {testimonial.company_logo ? (
                                                        <img src={testimonial.company_logo} alt={testimonial.company} className="h-6 w-auto" />
                                                    ) : null}
                                                    <span>{testimonial.company}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex">{renderRatingStars(testimonial.rating)}</div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center space-x-2">
                                                    <Switch
                                                        checked={testimonial.is_active}
                                                        onCheckedChange={() => handleToggleActive(testimonial)}
                                                        disabled={isReordering}
                                                    />
                                                    <Badge variant={testimonial.is_active ? 'success' : 'secondary'}>
                                                        {testimonial.is_active ? 'Active' : 'Inactive'}
                                                    </Badge>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                {!isReordering && (
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" size="sm">
                                                                <MoreVertical className="h-5 w-5" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuItem asChild>
                                                                <Link href={route('settings.testimonials.edit', testimonial.id)}>
                                                                    <Pencil className="mr-2 h-4 w-4" />
                                                                    Edit
                                                                </Link>
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem
                                                                onClick={() => setTestimonialToDelete(testimonial)}
                                                                className="text-red-600"
                                                            >
                                                                <Trash className="mr-2 h-4 w-4" />
                                                                Delete
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Delete Confirmation Dialog */}
            <AlertDialog open={!!testimonialToDelete} onOpenChange={(open) => !open && setTestimonialToDelete(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This will permanently delete the testimonial from {testimonialToDelete?.name}. This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </AdminLayout>
    );
};

export default TestimonialsIndex;
