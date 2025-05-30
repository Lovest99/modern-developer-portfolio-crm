import { LucideIcon } from 'lucide-react';

export interface SharedData {
    auth: {
        user: User;
    };
    sidebarOpen?: boolean;
    flash?: {
        message?: string;
        type?: 'success' | 'error' | 'warning' | 'info';
    };
}

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
    avatar?: string;
    role?: string;
}

export interface BreadcrumbItem {
    label: string;
    href?: string;
}

export interface NavBadge {
    text: string;
    variant: 'default' | 'success' | 'warning' | 'info' | 'destructive';
}

export interface NavItem {
    title: string;
    href: string;
    icon: LucideIcon;
    badge?: NavBadge;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface Testimonial {
    id: number;
    name: string;
    role: string;
    company: string;
    company_logo: string;
    profile_image: string;
    content: string;
    rating: number;
    is_active: boolean;
    display_order: number;
    created_at?: string;
    updated_at?: string;
}
