import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuTrigger,
    SidebarMenuContent
} from '@/components/ui/sidebar';
import { type NavGroup, type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';

export function NavMain({ group }: { group: NavGroup }) {
    const page = usePage();

    // Check if any item in the group is active
    const isGroupActive = group.items.some(item =>
        item.href === page.url ||
        (page.url.startsWith(item.href) && item.href !== '/')
    );

    // Initialize open state based on active status
    const [isOpen, setIsOpen] = useState(isGroupActive);

    // Update open state when active status changes
    useEffect(() => {
        if (isGroupActive && !isOpen) {
            setIsOpen(true);
        }
    }, [isGroupActive, page.url]);

    return (
        <SidebarGroup className="px-2 py-1">
            <SidebarGroupLabel
                className={`flex items-center justify-between cursor-pointer rounded-md px-3 py-2 transition-colors
                    ${isGroupActive
                        ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                        : 'hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground'}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="font-medium">{group.title}</span>
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </SidebarGroupLabel>

            {isOpen && (
                <SidebarMenu className="mt-1 space-y-1 px-1">
                    {group.items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton
                                asChild
                                isActive={item.href === page.url ||
                                    (page.url.startsWith(item.href) && item.href !== '/')}
                                tooltip={{ children: item.title }}
                                className="pl-4 text-sm"
                            >
                                <Link href={item.href} prefetch>
                                    {item.icon && <item.icon className="h-4 w-4" />}
                                    <span className="ml-2">{item.title}</span>
                                    {item.badge && (
                                        <span className={`ml-auto inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${
                                            item.badge.variant === 'success' ? 'bg-green-500 text-white' :
                                            item.badge.variant === 'warning' ? 'bg-yellow-500 text-white' :
                                            item.badge.variant === 'info' ? 'bg-blue-500 text-white' :
                                            item.badge.variant === 'destructive' ? 'bg-red-500 text-white' :
                                            'bg-primary text-primary-foreground'
                                        }`}>
                                            {item.badge.text}
                                        </span>
                                    )}
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            )}
        </SidebarGroup>
    );
}
