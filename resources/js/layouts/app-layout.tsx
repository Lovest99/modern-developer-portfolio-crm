import React, { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import {
  Home as HomeIcon,
  Users as UsersIcon,
  User,
  UserCircle,
  Briefcase as BriefcaseIcon,
  DollarSign as CurrencyDollarIcon,
  BarChart,
  BarChart2 as ChartBarIcon,
  Settings as CogIcon,
  Bell as BellIcon,
  Search as SearchIcon,
  ChevronDown,
  LogOut,
  Menu as MenuIcon,
  X as XIcon,
  ChevronRight,
  Sparkles,
  Bot,
  Network,
  Building2,
  FileBarChart,
  ShieldAlert,
  Users
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Toaster } from '@/components/ui/toaster';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

export default function AppLayout({ title, children, breadcrumbs = [] }) {
  const { auth } = usePage().props;
  const isMobile = useIsMobile();
  const [openItems, setOpenItems] = useState({});
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Navigation items
  const navigation = [
    {
      name: 'Dashboard',
      icon: HomeIcon,
      current: typeof window !== 'undefined' && window.location.pathname.startsWith('/dashboard'),
      children: [
        { name: 'Overview', href: '/dashboard' },
        { name: 'Activity Feed', href: '/dashboard/activity' },
      ]
    },
    {
      name: 'Sales & Revenue',
      icon: CurrencyDollarIcon,
      current: typeof window !== 'undefined' && window.location.pathname.startsWith('/sales'),
      children: [
        { name: 'Leads Pipeline', href: '/sales/leads' },
        { name: 'Deals Board', href: '/sales/deals-board' },
        { name: 'Quotes/Proposals', href: '/sales/quotes' },
        { name: 'Sales Forecast', href: '/sales/forecast' },
        { name: 'Products Catalog', href: '/sales/products' },
      ]
    },
    {
      name: 'Client Management',
      icon: Users,
      current: typeof window !== 'undefined' && window.location.pathname.startsWith('/clients'),
      children: [
        { name: 'Clients List', href: '/clients' },
        { name: 'Client Profiles', href: '/clients/profiles' },
        { name: 'Communications Log', href: '/clients/communications' },
        { name: 'Churn Analysis', href: '/clients/churn' },
      ]
    },
    {
      name: 'Project Management',
      icon: BriefcaseIcon,
      current: typeof window !== 'undefined' && window.location.pathname.startsWith('/projects'),
      children: [
        { name: 'Projects Board', href: '/projects' },
        { name: 'My Tasks', href: '/projects/tasks/my' },
        { name: 'Team Assignments', href: '/projects/tasks' },
        { name: 'Time Tracking', href: '/projects/time' },
        { name: 'Deliverables', href: '/projects/deliverables' },
      ]
    },
    {
      name: 'Marketing',
      icon: ChartBarIcon,
      current: typeof window !== 'undefined' && window.location.pathname.startsWith('/marketing'),
      children: [
        { name: 'Campaigns', href: '/marketing/campaigns' },
        { name: 'Newsletter Subscribers', href: '/marketing/subscribers' },
        { name: 'Website Contacts', href: '/marketing/website-contacts' },
        { name: 'Marketing Analytics', href: '/marketing/analytics' },
      ]
    },
    {
      name: 'AI Agent',
      icon: Bot,
      current: typeof window !== 'undefined' && window.location.pathname.startsWith('/ai'),
      children: [
        { name: 'Conversation History', href: '/ai/conversations' },
        { name: 'Playbooks', href: '/ai/playbooks' },
        { name: 'Training Data', href: '/ai/training' },
        { name: 'Performance Reports', href: '/ai/reports' },
      ]
    },
    {
      name: 'Affiliate Program',
      icon: Network,
      current: typeof window !== 'undefined' && window.location.pathname.startsWith('/affiliates'),
      children: [
        { name: 'Affiliate Dashboard', href: '/affiliates/dashboard' },
        { name: 'Referral Tracking', href: '/affiliates/referrals' },
        { name: 'Payouts', href: '/affiliates/payouts' },
        { name: 'Promo Materials', href: '/affiliates/materials' },
      ]
    },
    {
      name: 'Contacts & Companies',
      icon: Building2,
      current: typeof window !== 'undefined' && window.location.pathname.startsWith('/contacts'),
      children: [
        { name: 'Contact Directory', href: '/contacts/directory' },
        { name: 'Company Profiles', href: '/contacts/companies' },
        { name: 'Contact Form Submissions', href: '/contacts/submissions' },
      ]
    },
    {
      name: 'Reports & Analytics',
      icon: FileBarChart,
      current: typeof window !== 'undefined' && window.location.pathname.startsWith('/reports'),
      children: [
        { name: 'Sales Performance', href: '/reports/sales' },
        { name: 'Project Metrics', href: '/reports/projects' },
        { name: 'Client Health Scores', href: '/reports/clients' },
        { name: 'Custom Reports', href: '/reports/custom' },
      ]
    },
    {
      name: 'Settings',
      icon: CogIcon,
      current: typeof window !== 'undefined' && window.location.pathname.startsWith('/settings'),
      children: [
        { name: 'Profile', href: '/settings/profile' },
        { name: 'Appearance', href: '/settings/appearance' },
        { name: 'Testimonials', href: '/settings/testimonials' },
      ]
    },
    {
      name: 'Administration',
      icon: ShieldAlert,
      current: typeof window !== 'undefined' && window.location.pathname.startsWith('/admin'),
      children: [
        { name: 'User Management', href: '/admin/users' },
        { name: 'Role Permissions', href: '/admin/roles' },
        { name: 'System Settings', href: '/settings/system' },
        { name: 'API Tokens', href: '/settings/api-tokens' },
        { name: 'Audit Logs', href: '/admin/logs' },
      ]
    },
  ];

  // Sample notifications - in a real app, these would come from the backend
  const notifications = [
    { id: 1, content: 'New lead assigned to you', time: '5 min ago', read: false },
    { id: 2, content: 'Project "Website Redesign" updated', time: '1 hour ago', read: false },
    { id: 3, content: 'Task deadline approaching: "Create mockups"', time: '3 hours ago', read: true },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  // Initialize open state for navigation items that are current
  useEffect(() => {
    const initialOpenState = {};
    navigation.forEach(item => {
      if (item.children && item.current) {
        initialOpenState[item.name] = true;
      }
    });
    setOpenItems(initialOpenState);
  }, []);

  // Toggle collapsible navigation items
  const toggleNavItem = (name) => {
    setOpenItems(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  // Close mobile menu when navigating
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  // Get user initials for avatar fallback
  const getUserInitials = (name) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  // Render navigation items
  const renderNavItems = (isMobileView = false) => {
    return navigation.map((item) => (
      <div key={item.name} className={isMobileView ? 'mb-1' : 'mb-0.5'}>
        {!item.children ? (
          <Link
            href={item.href}
            onClick={isMobileView ? closeMobileMenu : undefined}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
              item.current
                ? "bg-primary/10 text-primary font-semibold"
                : "text-foreground hover:bg-muted hover:text-primary",
              isMobileView ? "py-2.5" : ""
            )}
          >
            <item.icon className="h-5 w-5" />
            <span>{item.name}</span>
          </Link>
        ) : (
          <Collapsible
            open={openItems[item.name]}
            onOpenChange={() => toggleNavItem(item.name)}
          >
            <CollapsibleTrigger asChild>
              <button
                className={cn(
                  "flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  item.current
                    ? "bg-primary/10 text-primary font-semibold"
                    : "text-foreground hover:bg-muted hover:text-primary",
                  isMobileView ? "py-2.5" : ""
                )}
              >
                <div className="flex items-center gap-3">
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </div>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 transition-transform",
                    openItems[item.name] ? "rotate-180" : ""
                  )}
                />
              </button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className={cn(
                "ml-9 mt-1 flex flex-col gap-1",
                isMobileView ? "gap-1.5" : ""
              )}>
                {item.children.map((subItem) => (
                  <Link
                    key={subItem.name}
                    href={subItem.href}
                    onClick={isMobileView ? closeMobileMenu : undefined}
                    className={cn(
                      "rounded-md px-3 py-1.5 text-sm transition-colors",
                      typeof window !== 'undefined' && window.location.pathname === subItem.href
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-foreground hover:bg-muted hover:text-primary"
                    )}
                  >
                    {subItem.name}
                  </Link>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        )}
      </div>
    ));
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-64 border-r bg-card lg:block">
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center border-b px-4">
            <Link href="/dashboard" className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-primary" />
              <span className="text-lg font-semibold">Portfolio CRM</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-3">
            {renderNavItems()}
          </nav>

          {/* User Profile */}
          <div className="border-t p-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted">
                  <Avatar className="h-8 w-8 border border-border">
                    <AvatarImage src={auth.user.avatar} alt={auth.user.name} />
                    <AvatarFallback className="bg-primary/10 text-primary">{getUserInitials(auth.user.name)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 text-left">
                    <p className="font-medium text-foreground">{auth.user.name}</p>
                    <p className="text-xs text-muted-foreground">Account settings</p>
                  </div>
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/settings" className="flex cursor-pointer items-center">
                    <CogIcon className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings/appearance" className="flex cursor-pointer items-center">
                    <Sparkles className="mr-2 h-4 w-4" />
                    <span>Appearance</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings/testimonials" className="flex cursor-pointer items-center">
                    <Users className="mr-2 h-4 w-4" />
                    <span>Testimonials</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link
                    href="/logout"
                    method="post"
                    as="button"
                    className="flex w-full cursor-pointer items-center text-destructive hover:text-destructive"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent side="left" className="w-[280px] p-0 sm:max-w-sm">
          <SheetHeader className="border-b p-4">
            <SheetTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <span>Portfolio CRM</span>
            </SheetTitle>
          </SheetHeader>
          <div className="flex h-[calc(100vh-60px)] flex-col">
            <nav className="flex-1 overflow-y-auto p-3">
              {renderNavItems(true)}
            </nav>
            <div className="border-t p-3">
              <div className="flex items-center gap-3 rounded-md px-3 py-2">
                <Avatar className="h-9 w-9 border border-border">
                  <AvatarImage src={auth.user.avatar} alt={auth.user.name} />
                  <AvatarFallback className="bg-primary/10 text-primary">{getUserInitials(auth.user.name)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium text-foreground">{auth.user.name}</p>
                  <div className="flex gap-3 mt-1">
                    <Link
                      href="/settings"
                      className="text-xs text-muted-foreground hover:text-foreground"
                    >
                      Settings
                    </Link>
                    <Link
                      href="/settings/appearance"
                      className="text-xs text-muted-foreground hover:text-foreground"
                    >
                      Appearance
                    </Link>
                    <Link
                      href="/settings/testimonials"
                      className="text-xs text-muted-foreground hover:text-foreground"
                    >
                      Testimonials
                    </Link>
                    <Link
                      href="/logout"
                      method="post"
                      as="button"
                      className="text-xs text-destructive hover:text-destructive/80"
                    >
                      Log out
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex flex-1 flex-col lg:pl-64">
        {/* Top Navigation Bar */}
        <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-card px-4 sm:px-6">
          {/* Mobile Menu Trigger */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(true)}
          >
            <MenuIcon className="h-5 w-5" />
            <span className="sr-only">Open menu</span>
          </Button>

          {/* Breadcrumbs */}
          <div className="hidden items-center gap-1 md:flex">
            <Link
              href="/dashboard"
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Dashboard
            </Link>
            {breadcrumbs.map((item, index) => (
              <React.Fragment key={index}>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
                {item.href ? (
                  <Link
                    href={item.href}
                    className="text-sm font-medium text-muted-foreground hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className="text-sm font-medium">{item.label}</span>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Search */}
          <div className="relative ml-auto flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <SearchIcon className="h-4 w-4 text-muted-foreground" />
            </div>
            <Input
              type="search"
              placeholder="Search..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <BellIcon className="h-5 w-5" />
                {unreadCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center"
                  >
                    {unreadCount}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {notifications.length === 0 ? (
                <div className="py-6 text-center">
                  <p className="text-sm text-muted-foreground">No notifications</p>
                </div>
              ) : (
                <div className="max-h-[300px] overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={cn(
                        "flex flex-col gap-1 px-4 py-2 hover:bg-muted",
                        !notification.read && "bg-primary/5"
                      )}
                    >
                      <p className="text-sm">{notification.content}</p>
                      <p className="text-xs text-muted-foreground">{notification.time}</p>
                    </div>
                  ))}
                </div>
              )}
              <DropdownMenuSeparator />
              <div className="p-2">
                <Button variant="outline" size="sm" className="w-full">
                  View all notifications
                </Button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu (Desktop) */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={auth.user.avatar} alt={auth.user.name} />
                  <AvatarFallback>{getUserInitials(auth.user.name)}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">{auth.user.name}</p>
                  <p className="text-xs text-muted-foreground">{auth.user.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/settings/profile" className="flex cursor-pointer items-center">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings" className="flex cursor-pointer items-center">
                  <CogIcon className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link
                  href="/logout"
                  method="post"
                  as="button"
                  className="flex w-full cursor-pointer items-center"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        {/* Page Content */}
        <main className="flex-1">
          <div className="py-6 px-6 md:px-8 max-w-full">
            {children}
          </div>
        </main>
      </div>

      {/* Toast notifications */}
      <Toaster />
    </div>
  );
}
