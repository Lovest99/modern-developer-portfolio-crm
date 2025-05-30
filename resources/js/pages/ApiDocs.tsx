import React from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
  {
    label: 'API Documentation',
    href: '/api-docs',
  },
];

function ApiDocs() {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="API Documentation" />
      <div className="w-full px-4 py-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">API Documentation</h1>
          <p className="mt-2 text-gray-600">Use these endpoints to interact with your portfolio data</p>
        </div>

        <div className="space-y-8">
          {/* Authentication */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Authentication</h3>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <p className="mb-4">All protected endpoints require a valid API token. You can generate a token in your account settings.</p>
              <p className="mb-4">Include your token in the Authorization header:</p>
              <div className="bg-gray-100 p-4 rounded-md">
                <code>Authorization: Bearer YOUR_API_TOKEN</code>
              </div>
            </div>
          </div>

          {/* User Management */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">User Management</h3>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <div className="space-y-6">
                <div>
                  <h4 className="text-md font-medium text-gray-900">Get Current User</h4>
                  <p className="mt-1 text-sm text-gray-500">GET /api/user</p>
                  <p className="mt-1 text-sm text-gray-500">Optional query parameters: with</p>
                </div>
                <div>
                  <h4 className="text-md font-medium text-gray-900">Update Current User</h4>
                  <p className="mt-1 text-sm text-gray-500">PUT /api/user</p>
                </div>
                <div>
                  <h4 className="text-md font-medium text-gray-900">List Users (Admin only)</h4>
                  <p className="mt-1 text-sm text-gray-500">GET /api/users</p>
                  <p className="mt-1 text-sm text-gray-500">Optional query parameters: role, with, search, sort_by, sort_direction, per_page</p>
                </div>
                <div>
                  <h4 className="text-md font-medium text-gray-900">Get User (Admin only)</h4>
                  <p className="mt-1 text-sm text-gray-500">GET /api/users/{'{id}'}</p>
                  <p className="mt-1 text-sm text-gray-500">Optional query parameters: with</p>
                </div>
                <div>
                  <h4 className="text-md font-medium text-gray-900">Create User (Admin only)</h4>
                  <p className="mt-1 text-sm text-gray-500">POST /api/users</p>
                </div>
                <div>
                  <h4 className="text-md font-medium text-gray-900">Update User (Admin only)</h4>
                  <p className="mt-1 text-sm text-gray-500">PUT /api/users/{'{id}'}</p>
                </div>
                <div>
                  <h4 className="text-md font-medium text-gray-900">Delete User (Admin only)</h4>
                  <p className="mt-1 text-sm text-gray-500">DELETE /api/users/{'{id}'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Projects */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Projects</h3>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <div className="space-y-6">
                <div>
                  <h4 className="text-md font-medium text-gray-900">List Projects</h4>
                  <p className="mt-1 text-sm text-gray-500">GET /api/projects</p>
                  <p className="mt-1 text-sm text-gray-500">Optional query parameters: status, user_id, deal_id, with, per_page, sort_by, sort_direction</p>
                </div>
                <div>
                  <h4 className="text-md font-medium text-gray-900">Get Project</h4>
                  <p className="mt-1 text-sm text-gray-500">GET /api/projects/{'{id}'}</p>
                  <p className="mt-1 text-sm text-gray-500">Optional query parameters: with</p>
                </div>
                <div>
                  <h4 className="text-md font-medium text-gray-900">Create Project</h4>
                  <p className="mt-1 text-sm text-gray-500">POST /api/projects</p>
                </div>
                <div>
                  <h4 className="text-md font-medium text-gray-900">Update Project</h4>
                  <p className="mt-1 text-sm text-gray-500">PUT /api/projects/{'{id}'}</p>
                </div>
                <div>
                  <h4 className="text-md font-medium text-gray-900">Delete Project</h4>
                  <p className="mt-1 text-sm text-gray-500">DELETE /api/projects/{'{id}'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tasks */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Tasks</h3>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <div className="space-y-6">
                <div>
                  <h4 className="text-md font-medium text-gray-900">List Tasks</h4>
                  <p className="mt-1 text-sm text-gray-500">GET /api/tasks</p>
                  <p className="mt-1 text-sm text-gray-500">Optional query parameters: status, priority, project_id, assigned_to, created_by, due_date_from, due_date_to, with, sort_by, sort_direction, per_page</p>
                </div>
                <div>
                  <h4 className="text-md font-medium text-gray-900">Get Task</h4>
                  <p className="mt-1 text-sm text-gray-500">GET /api/tasks/{'{id}'}</p>
                  <p className="mt-1 text-sm text-gray-500">Optional query parameters: with</p>
                </div>
                <div>
                  <h4 className="text-md font-medium text-gray-900">Create Task</h4>
                  <p className="mt-1 text-sm text-gray-500">POST /api/tasks</p>
                </div>
                <div>
                  <h4 className="text-md font-medium text-gray-900">Update Task</h4>
                  <p className="mt-1 text-sm text-gray-500">PUT /api/tasks/{'{id}'}</p>
                </div>
                <div>
                  <h4 className="text-md font-medium text-gray-900">Delete Task</h4>
                  <p className="mt-1 text-sm text-gray-500">DELETE /api/tasks/{'{id}'}</p>
                </div>
                <div>
                  <h4 className="text-md font-medium text-gray-900">My Tasks</h4>
                  <p className="mt-1 text-sm text-gray-500">GET /api/my-tasks</p>
                  <p className="mt-1 text-sm text-gray-500">Optional query parameters: status, sort_by, sort_direction, per_page</p>
                </div>
              </div>
            </div>
          </div>

          {/* Clients */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Clients</h3>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <div className="space-y-6">
                <div>
                  <h4 className="text-md font-medium text-gray-900">List Clients</h4>
                  <p className="mt-1 text-sm text-gray-500">GET /api/clients</p>
                  <p className="mt-1 text-sm text-gray-500">Optional query parameters: status, client_since_from, client_since_to, with, search, sort_by, sort_direction, per_page</p>
                </div>
                <div>
                  <h4 className="text-md font-medium text-gray-900">Get Client</h4>
                  <p className="mt-1 text-sm text-gray-500">GET /api/clients/{'{id}'}</p>
                  <p className="mt-1 text-sm text-gray-500">Optional query parameters: with</p>
                </div>
                <div>
                  <h4 className="text-md font-medium text-gray-900">Create Client</h4>
                  <p className="mt-1 text-sm text-gray-500">POST /api/clients</p>
                </div>
                <div>
                  <h4 className="text-md font-medium text-gray-900">Update Client</h4>
                  <p className="mt-1 text-sm text-gray-500">PUT /api/clients/{'{id}'}</p>
                </div>
                <div>
                  <h4 className="text-md font-medium text-gray-900">Delete Client</h4>
                  <p className="mt-1 text-sm text-gray-500">DELETE /api/clients/{'{id}'}</p>
                </div>
                <div>
                  <h4 className="text-md font-medium text-gray-900">Client Statistics</h4>
                  <p className="mt-1 text-sm text-gray-500">GET /api/clients/statistics</p>
                </div>
              </div>
            </div>
          </div>

          {/* Deals */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Deals</h3>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <div className="space-y-6">
                <div>
                  <h4 className="text-md font-medium text-gray-900">List Deals</h4>
                  <p className="mt-1 text-sm text-gray-500">GET /api/deals</p>
                  <p className="mt-1 text-sm text-gray-500">Optional query parameters: stage, client_id, assigned_to, close_date_from, close_date_to, value_min, value_max, with, search, sort_by, sort_direction, per_page</p>
                </div>
                <div>
                  <h4 className="text-md font-medium text-gray-900">Get Deal</h4>
                  <p className="mt-1 text-sm text-gray-500">GET /api/deals/{'{id}'}</p>
                  <p className="mt-1 text-sm text-gray-500">Optional query parameters: with</p>
                </div>
                <div>
                  <h4 className="text-md font-medium text-gray-900">Create Deal</h4>
                  <p className="mt-1 text-sm text-gray-500">POST /api/deals</p>
                </div>
                <div>
                  <h4 className="text-md font-medium text-gray-900">Update Deal</h4>
                  <p className="mt-1 text-sm text-gray-500">PUT /api/deals/{'{id}'}</p>
                </div>
                <div>
                  <h4 className="text-md font-medium text-gray-900">Delete Deal</h4>
                  <p className="mt-1 text-sm text-gray-500">DELETE /api/deals/{'{id}'}</p>
                </div>
                <div>
                  <h4 className="text-md font-medium text-gray-900">Deal Statistics</h4>
                  <p className="mt-1 text-sm text-gray-500">GET /api/deals/statistics</p>
                </div>
                <div>
                  <h4 className="text-md font-medium text-gray-900">My Deals</h4>
                  <p className="mt-1 text-sm text-gray-500">GET /api/my-deals</p>
                  <p className="mt-1 text-sm text-gray-500">Optional query parameters: stage, sort_by, sort_direction, per_page</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contacts & Companies */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Contacts & Companies</h3>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <div className="space-y-6">
                <div>
                  <h4 className="text-md font-medium text-gray-900">List Contacts</h4>
                  <p className="mt-1 text-sm text-gray-500">GET /api/contacts</p>
                  <p className="mt-1 text-sm text-gray-500">Optional query parameters: company_id, type, with, search, sort_by, sort_direction, per_page</p>
                </div>
                <div>
                  <h4 className="text-md font-medium text-gray-900">Get Contact</h4>
                  <p className="mt-1 text-sm text-gray-500">GET /api/contacts/{'{id}'}</p>
                  <p className="mt-1 text-sm text-gray-500">Optional query parameters: with</p>
                </div>
                <div>
                  <h4 className="text-md font-medium text-gray-900">Create Contact</h4>
                  <p className="mt-1 text-sm text-gray-500">POST /api/contacts</p>
                </div>
                <div>
                  <h4 className="text-md font-medium text-gray-900">Update Contact</h4>
                  <p className="mt-1 text-sm text-gray-500">PUT /api/contacts/{'{id}'}</p>
                </div>
                <div>
                  <h4 className="text-md font-medium text-gray-900">Delete Contact</h4>
                  <p className="mt-1 text-sm text-gray-500">DELETE /api/contacts/{'{id}'}</p>
                </div>
                <div>
                  <h4 className="text-md font-medium text-gray-900">Convert Contact to Client</h4>
                  <p className="mt-1 text-sm text-gray-500">POST /api/contacts/{'{id}'}/convert-to-client</p>
                </div>
                <div>
                  <h4 className="text-md font-medium text-gray-900">List Companies</h4>
                  <p className="mt-1 text-sm text-gray-500">GET /api/companies</p>
                  <p className="mt-1 text-sm text-gray-500">Optional query parameters: industry, with, search, sort_by, sort_direction, per_page</p>
                </div>
                <div>
                  <h4 className="text-md font-medium text-gray-900">Get Company</h4>
                  <p className="mt-1 text-sm text-gray-500">GET /api/companies/{'{id}'}</p>
                  <p className="mt-1 text-sm text-gray-500">Optional query parameters: with</p>
                </div>
                <div>
                  <h4 className="text-md font-medium text-gray-900">Create Company</h4>
                  <p className="mt-1 text-sm text-gray-500">POST /api/companies</p>
                </div>
                <div>
                  <h4 className="text-md font-medium text-gray-900">Update Company</h4>
                  <p className="mt-1 text-sm text-gray-500">PUT /api/companies/{'{id}'}</p>
                </div>
                <div>
                  <h4 className="text-md font-medium text-gray-900">Delete Company</h4>
                  <p className="mt-1 text-sm text-gray-500">DELETE /api/companies/{'{id}'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Communications */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Communications</h3>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <div className="space-y-6">
                <div>
                  <h4 className="text-md font-medium text-gray-900">List Communications</h4>
                  <p className="mt-1 text-sm text-gray-500">GET /api/communications</p>
                  <p className="mt-1 text-sm text-gray-500">Optional query parameters: client_id, channel, direction, user_id, date_from, date_to, with, search, sort_by, sort_direction, per_page</p>
                </div>
                <div>
                  <h4 className="text-md font-medium text-gray-900">Get Communication</h4>
                  <p className="mt-1 text-sm text-gray-500">GET /api/communications/{'{id}'}</p>
                  <p className="mt-1 text-sm text-gray-500">Optional query parameters: with</p>
                </div>
                <div>
                  <h4 className="text-md font-medium text-gray-900">Create Communication</h4>
                  <p className="mt-1 text-sm text-gray-500">POST /api/communications</p>
                </div>
                <div>
                  <h4 className="text-md font-medium text-gray-900">Update Communication</h4>
                  <p className="mt-1 text-sm text-gray-500">PUT /api/communications/{'{id}'}</p>
                </div>
                <div>
                  <h4 className="text-md font-medium text-gray-900">Delete Communication</h4>
                  <p className="mt-1 text-sm text-gray-500">DELETE /api/communications/{'{id}'}</p>
                </div>
                <div>
                  <h4 className="text-md font-medium text-gray-900">My Communications</h4>
                  <p className="mt-1 text-sm text-gray-500">GET /api/my-communications</p>
                  <p className="mt-1 text-sm text-gray-500">Optional query parameters: client_id, sort_by, sort_direction, per_page</p>
                </div>
              </div>
            </div>
          </div>

          {/* Time Entries */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Time Entries</h3>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <div className="space-y-6">
                <div>
                  <h4 className="text-md font-medium text-gray-900">List Time Entries</h4>
                  <p className="mt-1 text-sm text-gray-500">GET /api/time-entries</p>
                  <p className="mt-1 text-sm text-gray-500">Optional query parameters: project_id, task_id, user_id, date_from, date_to, billable, with, sort_by, sort_direction, per_page</p>
                </div>
                <div>
                  <h4 className="text-md font-medium text-gray-900">Get Time Entry</h4>
                  <p className="mt-1 text-sm text-gray-500">GET /api/time-entries/{'{id}'}</p>
                  <p className="mt-1 text-sm text-gray-500">Optional query parameters: with</p>
                </div>
                <div>
                  <h4 className="text-md font-medium text-gray-900">Create Time Entry</h4>
                  <p className="mt-1 text-sm text-gray-500">POST /api/time-entries</p>
                </div>
                <div>
                  <h4 className="text-md font-medium text-gray-900">Update Time Entry</h4>
                  <p className="mt-1 text-sm text-gray-500">PUT /api/time-entries/{'{id}'}</p>
                </div>
                <div>
                  <h4 className="text-md font-medium text-gray-900">Delete Time Entry</h4>
                  <p className="mt-1 text-sm text-gray-500">DELETE /api/time-entries/{'{id}'}</p>
                </div>
                <div>
                  <h4 className="text-md font-medium text-gray-900">My Time Entries</h4>
                  <p className="mt-1 text-sm text-gray-500">GET /api/my-time-entries</p>
                  <p className="mt-1 text-sm text-gray-500">Optional query parameters: project_id, task_id, date_from, date_to, sort_by, sort_direction, per_page</p>
                </div>
                <div>
                  <h4 className="text-md font-medium text-gray-900">Current Time Entry</h4>
                  <p className="mt-1 text-sm text-gray-500">GET /api/time-entries/current</p>
                </div>
                <div>
                  <h4 className="text-md font-medium text-gray-900">Start Time Tracking</h4>
                  <p className="mt-1 text-sm text-gray-500">POST /api/time-entries/start</p>
                </div>
                <div>
                  <h4 className="text-md font-medium text-gray-900">Stop Time Tracking</h4>
                  <p className="mt-1 text-sm text-gray-500">PUT /api/time-entries/{'{id}'}/stop</p>
                </div>
                <div>
                  <h4 className="text-md font-medium text-gray-900">Project Time Summary</h4>
                  <p className="mt-1 text-sm text-gray-500">GET /api/projects/{'{id}'}/time-summary</p>
                  <p className="mt-1 text-sm text-gray-500">Optional query parameters: date_from, date_to</p>
                </div>
              </div>
            </div>
          </div>

          {/* Campaigns */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Campaigns</h3>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <div className="space-y-6">
                <div>
                  <h4 className="text-md font-medium text-gray-900">List Campaigns</h4>
                  <p className="mt-1 text-sm text-gray-500">GET /api/campaigns</p>
                  <p className="mt-1 text-sm text-gray-500">Optional query parameters: status, type, start_date_from, start_date_to, with, search, sort_by, sort_direction, per_page</p>
                </div>
                <div>
                  <h4 className="text-md font-medium text-gray-900">Get Campaign</h4>
                  <p className="mt-1 text-sm text-gray-500">GET /api/campaigns/{'{id}'}</p>
                  <p className="mt-1 text-sm text-gray-500">Optional query parameters: with</p>
                </div>
                <div>
                  <h4 className="text-md font-medium text-gray-900">Create Campaign</h4>
                  <p className="mt-1 text-sm text-gray-500">POST /api/campaigns</p>
                </div>
                <div>
                  <h4 className="text-md font-medium text-gray-900">Update Campaign</h4>
                  <p className="mt-1 text-sm text-gray-500">PUT /api/campaigns/{'{id}'}</p>
                </div>
                <div>
                  <h4 className="text-md font-medium text-gray-900">Delete Campaign</h4>
                  <p className="mt-1 text-sm text-gray-500">DELETE /api/campaigns/{'{id}'}</p>
                </div>
                <div>
                  <h4 className="text-md font-medium text-gray-900">Campaign Statistics</h4>
                  <p className="mt-1 text-sm text-gray-500">GET /api/campaigns/{'{id}'}/statistics</p>
                </div>
                <div>
                  <h4 className="text-md font-medium text-gray-900">Add Subscribers to Campaign</h4>
                  <p className="mt-1 text-sm text-gray-500">POST /api/campaigns/{'{id}'}/subscribers</p>
                </div>
                <div>
                  <h4 className="text-md font-medium text-gray-900">Remove Subscribers from Campaign</h4>
                  <p className="mt-1 text-sm text-gray-500">DELETE /api/campaigns/{'{id}'}/subscribers</p>
                </div>
              </div>
            </div>
          </div>

          {/* Website Contacts */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Website Contacts</h3>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <div className="space-y-6">
                <div>
                  <h4 className="text-md font-medium text-gray-900">Submit Contact Form (Public)</h4>
                  <p className="mt-1 text-sm text-gray-500">POST /api/contacts/submit</p>
                </div>
                <div>
                  <h4 className="text-md font-medium text-gray-900">List Contact Submissions</h4>
                  <p className="mt-1 text-sm text-gray-500">GET /api/website-contacts</p>
                  <p className="mt-1 text-sm text-gray-500">Optional query parameters: status, assigned_to, date_from, date_to, with, search, sort_by, sort_direction, per_page</p>
                </div>
                <div>
                  <h4 className="text-md font-medium text-gray-900">Get Contact Submission</h4>
                  <p className="mt-1 text-sm text-gray-500">GET /api/website-contacts/{'{id}'}</p>
                  <p className="mt-1 text-sm text-gray-500">Optional query parameters: with</p>
                </div>
                <div>
                  <h4 className="text-md font-medium text-gray-900">Update Contact Submission</h4>
                  <p className="mt-1 text-sm text-gray-500">PUT /api/website-contacts/{'{id}'}</p>
                </div>
                <div>
                  <h4 className="text-md font-medium text-gray-900">Delete Contact Submission</h4>
                  <p className="mt-1 text-sm text-gray-500">DELETE /api/website-contacts/{'{id}'}</p>
                </div>
                <div>
                  <h4 className="text-md font-medium text-gray-900">Contact Statistics</h4>
                  <p className="mt-1 text-sm text-gray-500">GET /api/website-contacts/statistics</p>
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter Subscribers */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Newsletter Subscribers</h3>
            </div>
            <div className="px-4 py-5 sm:p-6">
              <div className="space-y-6">
                <div>
                  <h4 className="text-md font-medium text-gray-900">Subscribe to Newsletter (Public)</h4>
                  <p className="mt-1 text-sm text-gray-500">POST /api/newsletter/subscribe</p>
                </div>
                <div>
                  <h4 className="text-md font-medium text-gray-900">Confirm Subscription (Public)</h4>
                  <p className="mt-1 text-sm text-gray-500">POST /api/newsletter/confirm</p>
                </div>
                <div>
                  <h4 className="text-md font-medium text-gray-900">Unsubscribe from Newsletter (Public)</h4>
                  <p className="mt-1 text-sm text-gray-500">DELETE /api/newsletter/unsubscribe/{'{subscriber}'}</p>
                </div>
                <div>
                  <h4 className="text-md font-medium text-gray-900">List Subscribers</h4>
                  <p className="mt-1 text-sm text-gray-500">GET /api/newsletter-subscribers</p>
                  <p className="mt-1 text-sm text-gray-500">Optional query parameters: status, date_from, date_to, search, sort_by, sort_direction, per_page</p>
                </div>
                <div>
                  <h4 className="text-md font-medium text-gray-900">Get Subscriber</h4>
                  <p className="mt-1 text-sm text-gray-500">GET /api/newsletter-subscribers/{'{id}'}</p>
                </div>
                <div>
                  <h4 className="text-md font-medium text-gray-900">Update Subscriber</h4>
                  <p className="mt-1 text-sm text-gray-500">PUT /api/newsletter-subscribers/{'{id}'}</p>
                </div>
                <div>
                  <h4 className="text-md font-medium text-gray-900">Subscriber Statistics</h4>
                  <p className="mt-1 text-sm text-gray-500">GET /api/newsletter-subscribers/statistics</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

export default ApiDocs;
