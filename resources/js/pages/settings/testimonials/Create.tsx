import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import AdminLayout from '@/layouts/AdminLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Star } from 'lucide-react';
import React from 'react';

const TestimonialCreate: React.FC = () => {
    const { toast } = useToast();

    // Show a test toast when the component mounts
    React.useEffect(() => {
        setTimeout(() => {
            toast({
                title: 'Page Loaded',
                description: 'The testimonial creation page has loaded successfully.',
                variant: 'success',
                duration: 3000,
            });
        }, 500);
    }, []);

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        role: '',
        company: '',
        company_logo: '',
        profile_image: '',
        content: '',
        rating: 5,
        is_active: true,
        display_order: 0,
        // File objects for uploads
        profile_image_file: null as File | null,
        company_logo_file: null as File | null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Create FormData object for file uploads
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('role', data.role);
        formData.append('company', data.company);
        formData.append('content', data.content);
        formData.append('rating', data.rating.toString());
        formData.append('is_active', data.is_active ? '1' : '0');
        formData.append('display_order', data.display_order.toString());

        // Add profile image (file or URL)
        if (data.profile_image_file) {
            formData.append('profile_image', data.profile_image_file);
        } else if (data.profile_image) {
            formData.append('profile_image', data.profile_image);
        }

        // Add company logo (file or URL)
        if (data.company_logo_file) {
            formData.append('company_logo', data.company_logo_file);
        } else if (data.company_logo) {
            formData.append('company_logo', data.company_logo);
        }

        post(route('settings.testimonials.store'), formData, {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                // Show success toast with a slight delay to ensure it's visible
                setTimeout(() => {
                    toast({
                        title: 'Testimonial Created',
                        description: `Testimonial from ${data.name} has been created successfully.`,
                        variant: 'success',
                        duration: 5000, // 5 seconds
                    });

                    // Log for debugging
                    console.log('Testimonial created successfully');
                }, 100);
            },
            onError: (errors) => {
                // Show error toast with a slight delay to ensure it's visible
                setTimeout(() => {
                    toast({
                        title: 'Error',
                        description: 'Failed to create testimonial. Please check the form and try again.',
                        variant: 'destructive',
                        duration: 5000, // 5 seconds
                    });

                    // Log errors for debugging
                    console.error('Testimonial creation failed:', errors);
                }, 100);
            },
        });
    };

    const renderRatingStars = () => {
        return Array.from({ length: 5 }).map((_, index) => (
            <button key={index} type="button" onClick={() => setData('rating', index + 1)} className="focus:outline-none">
                <Star className={`h-6 w-6 ${index < data.rating ? 'text-yellow-500' : 'text-gray-300'}`} />
            </button>
        ));
    };

    return (
        <AdminLayout>
            <Head title="Add Testimonial" />

            <div className="py-6">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-6 flex items-center">
                        <Button variant="ghost" asChild className="mr-4">
                            <Link href={route('settings.testimonials.index')}>
                                <ArrowLeft className="mr-1 h-5 w-5" />
                                Back
                            </Link>
                        </Button>
                        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Add New Testimonial</h1>
                    </div>

                    <Card>
                        <form onSubmit={handleSubmit}>
                            <CardHeader>
                                <CardTitle>Testimonial Information</CardTitle>
                                <CardDescription>Add a new client testimonial to showcase on your portfolio.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Client Name</Label>
                                        <Input id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} placeholder="John Doe" />
                                        {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="role">Client Role</Label>
                                        <Input
                                            id="role"
                                            value={data.role}
                                            onChange={(e) => setData('role', e.target.value)}
                                            placeholder="CEO & Founder"
                                        />
                                        {errors.role && <p className="text-sm text-red-500">{errors.role}</p>}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="company">Company</Label>
                                        <Input
                                            id="company"
                                            value={data.company}
                                            onChange={(e) => setData('company', e.target.value)}
                                            placeholder="Acme Inc."
                                        />
                                        {errors.company && <p className="text-sm text-red-500">{errors.company}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="rating">Rating</Label>
                                        <div className="flex space-x-1">{renderRatingStars()}</div>
                                        {errors.rating && <p className="text-sm text-red-500">{errors.rating}</p>}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div className="space-y-4">
                                        <div>
                                            <Label htmlFor="profile_image_file">Profile Image Upload</Label>
                                            <Input
                                                id="profile_image_file"
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0] || null;
                                                    setData('profile_image_file', file);
                                                }}
                                                className="mt-1"
                                            />
                                            <p className="mt-1 text-xs text-gray-500">Upload a profile image for the client. Max size: 2MB.</p>
                                        </div>

                                        <div>
                                            <Label htmlFor="profile_image">Or Profile Image URL</Label>
                                            <Input
                                                id="profile_image"
                                                value={data.profile_image}
                                                onChange={(e) => setData('profile_image', e.target.value)}
                                                placeholder="https://example.com/profile.jpg"
                                                className="mt-1"
                                            />
                                            <p className="mt-1 text-xs text-gray-500">Alternatively, enter a URL for the client's profile image.</p>
                                        </div>

                                        {errors.profile_image && <p className="text-sm text-red-500">{errors.profile_image}</p>}
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <Label htmlFor="company_logo_file">Company Logo Upload</Label>
                                            <Input
                                                id="company_logo_file"
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0] || null;
                                                    setData('company_logo_file', file);
                                                }}
                                                className="mt-1"
                                            />
                                            <p className="mt-1 text-xs text-gray-500">Upload a logo for the company. Max size: 2MB.</p>
                                        </div>

                                        <div>
                                            <Label htmlFor="company_logo">Or Company Logo URL</Label>
                                            <Input
                                                id="company_logo"
                                                value={data.company_logo}
                                                onChange={(e) => setData('company_logo', e.target.value)}
                                                placeholder="https://example.com/logo.svg"
                                                className="mt-1"
                                            />
                                            <p className="mt-1 text-xs text-gray-500">Alternatively, enter a URL for the company logo.</p>
                                        </div>

                                        {errors.company_logo && <p className="text-sm text-red-500">{errors.company_logo}</p>}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="content">Testimonial Content</Label>
                                    <Textarea
                                        id="content"
                                        value={data.content}
                                        onChange={(e) => setData('content', e.target.value)}
                                        placeholder="Write the testimonial content here..."
                                        rows={5}
                                    />
                                    {errors.content && <p className="text-sm text-red-500">{errors.content}</p>}
                                </div>

                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="display_order">Display Order</Label>
                                        <Input
                                            id="display_order"
                                            type="number"
                                            min="0"
                                            value={data.display_order}
                                            onChange={(e) => setData('display_order', parseInt(e.target.value))}
                                        />
                                        <p className="text-xs text-gray-500">
                                            Lower numbers will be displayed first. Leave as 0 for automatic ordering.
                                        </p>
                                        {errors.display_order && <p className="text-sm text-red-500">{errors.display_order}</p>}
                                    </div>

                                    <div className="flex h-full items-center space-x-2 pt-8">
                                        <Switch
                                            id="is_active"
                                            checked={data.is_active}
                                            onCheckedChange={(checked) => setData('is_active', checked)}
                                        />
                                        <Label htmlFor="is_active">Active</Label>
                                        <p className="ml-2 text-xs text-gray-500">Only active testimonials will be displayed on your website.</p>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-between">
                                <Button variant="outline" asChild>
                                    <Link href={route('settings.testimonials.index')}>Cancel</Link>
                                </Button>
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Saving...' : 'Save Testimonial'}
                                </Button>
                            </CardFooter>
                        </form>
                    </Card>
                </div>
            </div>
        </AdminLayout>
    );
};

export default TestimonialCreate;
