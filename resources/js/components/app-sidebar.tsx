import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { SidebarSearch } from '@/components/sidebar-search';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavGroup, type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import {
    LayoutGrid,
    BarChart3,
    Users,
    FolderKanban,
    Megaphone,
    Bot,
    Share2,
    Contact,
    LineChart,
    Settings,
    DollarSign,
    Activity,
    PieChart,
    UserCircle,
    MessageSquare,
    TrendingDown,
    ClipboardList,
    UserCheck,
    Clock,
    Package,
    Mail,
    Users2,
    MousePointerClick,
    BarChartHorizontal,
    History,
    BookOpen,
    Target,
    CreditCard,
    FileText,
    Building,
    FileInput,
    BarChart,
    Gauge,
    FileBarChart,
    UserCog,
    ShieldCheck,
    Cog,
    FileSearch
} from 'lucide-react';
import AppLogo from './app-logo';

const mainNavGroups: NavGroup[] = [
    {
        title: 'Dashboard',
        items: [
            {
                title: 'Overview',
                href: '/dashboard',
                icon: LayoutGrid,
            },
            {
                title: 'Activity Feed',
                href: '/dashboard/activity',
                icon: Activity,
                badge: {
                    text: 'New',
                    variant: 'info'
                },
            }
        ]
    },
    {
        title: 'Sales & Revenue',
        items: [
            {
                title: 'Leads Pipeline',
                href: '/sales/leads',
                icon: PieChart,
                badge: {
                    text: '5',
                    variant: 'success'
                },
            },
            {
                title: 'Deals Board',
                href: '/sales/deals-board',
                icon: DollarSign,
            },
            {
                title: 'Quotes/Proposals',
                href: '/sales/quotes',
                icon: FileText,
            },
            {
                title: 'Sales Forecast',
                href: '/sales/forecast',
                icon: BarChart3,
            },
            {
                title: 'Products Catalog',
                href: '/sales/products',
                icon: Package,
            },
            {
                title: 'Sales Calendar',
                href: '/sales/calendar',
                icon: Clock,
            }
        ]
    },
    {
        title: 'Client Management',
        items: [
            {
                title: 'Clients List',
                href: '/clients',
                icon: Users,
            },
            {
                title: 'Client Profiles',
                href: '/clients/profiles',
                icon: UserCircle,
            },
            {
                title: 'Communications Log',
                href: '/clients/communications',
                icon: MessageSquare,
            },
            {
                title: 'Churn Analysis',
                href: '/clients/churn',
                icon: TrendingDown,
            }
        ]
    },
    {
        title: 'Project Management',
        items: [
            {
                title: 'Projects Board',
                href: '/projects',
                icon: FolderKanban,
            },
            {
                title: 'My Tasks',
                href: '/projects/tasks',
                icon: ClipboardList,
                badge: {
                    text: '3',
                    variant: 'warning'
                },
            },
            {
                title: 'Team Assignments',
                href: '/projects/assignments',
                icon: UserCheck,
            },
            {
                title: 'Time Tracking',
                href: '/projects/time',
                icon: Clock,
            },
            {
                title: 'Deliverables',
                href: '/projects/deliverables',
                icon: Package,
            }
        ]
    },
    {
        title: 'Marketing',
        items: [
            {
                title: 'Campaigns',
                href: '/marketing/campaigns',
                icon: Megaphone,
            },
            {
                title: 'Newsletter Subscribers',
                href: '/marketing/subscribers',
                icon: Mail,
            },
            {
                title: 'Website Contacts',
                href: '/marketing/contacts',
                icon: Users2,
            },
            {
                title: 'Marketing Analytics',
                href: '/marketing/analytics',
                icon: MousePointerClick,
            }
        ]
    },
    {
        title: 'AI Agent',
        items: [
            {
                title: 'Conversation History',
                href: '/ai/history',
                icon: History,
            },
            {
                title: 'Playbooks',
                href: '/ai/playbooks',
                icon: BookOpen,
            },
            {
                title: 'Training Data',
                href: '/ai/training',
                icon: Bot,
            },
            {
                title: 'Performance Reports',
                href: '/ai/reports',
                icon: BarChartHorizontal,
            }
        ]
    },
    {
        title: 'Affiliate Program',
        items: [
            {
                title: 'Affiliate Dashboard',
                href: '/affiliates',
                icon: Share2,
            },
            {
                title: 'Referral Tracking',
                href: '/affiliates/tracking',
                icon: Target,
            },
            {
                title: 'Payouts',
                href: '/affiliates/payouts',
                icon: CreditCard,
            },
            {
                title: 'Promo Materials',
                href: '/affiliates/promo',
                icon: FileText,
            }
        ]
    },
    {
        title: 'Contacts & Companies',
        items: [
            {
                title: 'Contact Directory',
                href: '/contacts',
                icon: Contact,
            },
            {
                title: 'Company Profiles',
                href: '/contacts/companies',
                icon: Building,
            },
            {
                title: 'Contact Form Submissions',
                href: '/contacts/submissions',
                icon: FileInput,
            }
        ]
    },
    {
        title: 'Reports & Analytics',
        items: [
            {
                title: 'Sales Performance',
                href: '/reports/sales',
                icon: BarChart,
            },
            {
                title: 'Project Metrics',
                href: '/reports/projects',
                icon: LineChart,
            },
            {
                title: 'Client Health Scores',
                href: '/reports/client-health',
                icon: Gauge,
            },
            {
                title: 'Custom Reports',
                href: '/reports/custom',
                icon: FileBarChart,
            }
        ]
    },
    {
        title: 'Administration',
        items: [
            {
                title: 'User Management',
                href: '/admin/users',
                icon: UserCog,
            },
            {
                title: 'Role Permissions',
                href: '/admin/roles',
                icon: ShieldCheck,
            },
            {
                title: 'System Settings',
                href: '/admin/settings',
                icon: Settings,
            },
            {
                title: 'Audit Logs',
                href: '/admin/logs',
                icon: FileSearch,
                badge: {
                    text: 'Alert',
                    variant: 'destructive'
                },
            },
            {
                title: 'API Documentation',
                href: '/api-docs',
                icon: FileText,
            }
        ]
    }
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader className="border-b border-sidebar-border">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent className="overflow-y-auto scrollbar-thin scrollbar-thumb-sidebar-border scrollbar-track-transparent">
                <SidebarSearch navGroups={mainNavGroups} />
                <div className="py-2">
                    {mainNavGroups.map((group) => (
                        <NavMain key={group.title} group={group} />
                    ))}
                </div>
            </SidebarContent>

            <SidebarFooter className="border-t border-sidebar-border">
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
