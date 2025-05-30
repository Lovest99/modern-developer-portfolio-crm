import React from 'react';
import {
  ArrowDown as ArrowSmDownIcon,
  ArrowUp as ArrowSmUpIcon,
  DollarSign as CurrencyDollarIcon,
  User as UsersIcon,
  Briefcase as BriefcaseIcon,
  Clock as ClockIcon,
  CheckCircle as CheckCircleIcon,
  Mail as MailIcon
} from 'lucide-react';

export function StatCard({ title, value, icon: Icon, change, changeType, className = '' }) {
  return (
    <div className={`rounded-lg border bg-card shadow-sm ${className}`}>
      <div className="p-6">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground truncate">{title}</p>
            <h3 className="text-2xl font-bold">{value}</h3>
          </div>
        </div>
      </div>
      {change && (
        <div className="border-t px-6 py-3">
          <div className="text-sm">
            <div className="flex items-center">
              {changeType === 'increase' ? (
                <ArrowSmUpIcon className="h-4 w-4 text-green-500" aria-hidden="true" />
              ) : (
                <ArrowSmDownIcon className="h-4 w-4 text-red-500" aria-hidden="true" />
              )}
              <span
                className={`ml-1 font-medium ${
                  changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {change}
              </span>
              <span className="ml-1 text-muted-foreground">from previous period</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export function StatGrid({ children, cols = 4, className = '' }) {
  const colClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <div className={`grid gap-4 ${colClasses[cols]} ${className}`}>
      {children}
    </div>
  );
}

export function RevenueStats({
  totalRevenue,
  averageDealSize,
  conversionRate,
  className = ''
}) {
  return (
    <StatGrid cols={3} className={className}>
      <StatCard
        title="Total Revenue"
        value={`$${totalRevenue.toLocaleString()}`}
        icon={CurrencyDollarIcon}
      />
      <StatCard
        title="Average Deal Size"
        value={`$${averageDealSize.toLocaleString()}`}
        icon={CurrencyDollarIcon}
      />
      <StatCard
        title="Conversion Rate"
        value={`${conversionRate}%`}
        icon={CheckCircleIcon}
      />
    </StatGrid>
  );
}

export function ClientStats({
  totalClients,
  activeClients,
  newClients,
  churnRate,
  className = ''
}) {
  return (
    <StatGrid cols={4} className={className}>
      <StatCard
        title="Total Clients"
        value={totalClients.toLocaleString()}
        icon={UsersIcon}
      />
      <StatCard
        title="Active Clients"
        value={activeClients.toLocaleString()}
        icon={UsersIcon}
      />
      <StatCard
        title="New Clients (30d)"
        value={newClients.toLocaleString()}
        icon={UsersIcon}
        change={`${newClients > 0 ? '+' : ''}${newClients}`}
        changeType={newClients >= 0 ? 'increase' : 'decrease'}
      />
      <StatCard
        title="Churn Rate"
        value={`${churnRate}%`}
        icon={UsersIcon}
      />
    </StatGrid>
  );
}

export function ProjectStats({
  activeProjects,
  completedProjects,
  totalTasks,
  completedTasks,
  className = ''
}) {
  return (
    <StatGrid cols={4} className={className}>
      <StatCard
        title="Active Projects"
        value={activeProjects.toLocaleString()}
        icon={BriefcaseIcon}
      />
      <StatCard
        title="Completed Projects"
        value={completedProjects.toLocaleString()}
        icon={BriefcaseIcon}
      />
      <StatCard
        title="Total Tasks"
        value={totalTasks.toLocaleString()}
        icon={CheckCircleIcon}
      />
      <StatCard
        title="Completion Rate"
        value={`${Math.round((completedTasks / totalTasks) * 100)}%`}
        icon={CheckCircleIcon}
      />
    </StatGrid>
  );
}

export function MarketingStats({
  subscribers,
  openRate,
  clickRate,
  websiteContacts,
  className = ''
}) {
  return (
    <StatGrid cols={4} className={className}>
      <StatCard
        title="Newsletter Subscribers"
        value={subscribers.toLocaleString()}
        icon={MailIcon}
      />
      <StatCard
        title="Email Open Rate"
        value={`${openRate}%`}
        icon={MailIcon}
      />
      <StatCard
        title="Email Click Rate"
        value={`${clickRate}%`}
        icon={MailIcon}
      />
      <StatCard
        title="Website Contacts"
        value={websiteContacts.toLocaleString()}
        icon={UsersIcon}
      />
    </StatGrid>
  );
}
