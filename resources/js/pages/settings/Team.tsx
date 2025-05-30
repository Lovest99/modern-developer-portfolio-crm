import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import {
  Table,
  TableHead,
  TableHeadCell,
  TableBody,
  TableRow,
  TableCell,
  EmptyTableRow
} from '@/components/ui/table';
import { Button, LinkButton, IconButton } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SearchFilter } from '@/components/ui/filters';
import {
  Plus as PlusIcon,
  Pencil as PencilIcon,
  Trash as TrashIcon,
  UserCircle as UserCircleIcon,
  Mail as MailIcon,
  Key as KeyIcon,
  ShieldCheck as ShieldCheckIcon
} from 'lucide-react';

export default function Team({ users, roles }) {
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [search, setSearch] = useState('');

  const [inviteValues, setInviteValues] = useState({
    email: '',
    role: '',
  });

  const [roleValues, setRoleValues] = useState({
    role: '',
  });

  const handleInviteChange = (e) => {
    const key = e.target.id;
    const value = e.target.value;

    setInviteValues(values => ({
      ...values,
      [key]: value,
    }));
  };

  const handleRoleChange = (e) => {
    const key = e.target.id;
    const value = e.target.value;

    setRoleValues(values => ({
      ...values,
      [key]: value,
    }));
  };

  const sendInvitation = (e) => {
    e.preventDefault();

    router.post(route('team.invite'), inviteValues, {
      onSuccess: () => {
        setShowInviteModal(false);
        setInviteValues({
          email: '',
          role: '',
        });
      },
    });
  };

  const updateRole = (e) => {
    e.preventDefault();

    if (!selectedUser) return;

    router.put(route('team.update-role', selectedUser.id), roleValues, {
      onSuccess: () => {
        setShowRoleModal(false);
        setSelectedUser(null);
        setRoleValues({
          role: '',
        });
      },
    });
  };

  const deleteUser = (id) => {
    if (confirm('Are you sure you want to remove this user from the team?')) {
      router.delete(route('team.destroy', id));
    }
  };

  const filteredUsers = search
    ? users.filter(user =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase())
      )
    : users;

  const getRoleBadge = (role) => {
    switch (role) {
      case 'admin':
        return <Badge variant="red">Admin</Badge>;
      case 'manager':
        return <Badge variant="indigo">Manager</Badge>;
      case 'member':
        return <Badge variant="blue">Member</Badge>;
      default:
        return <Badge variant="gray">{role}</Badge>;
    }
  };

  return (
    <AppLayout title="Team Settings">
      <div className="space-y-6">
        {/* Team Members */}
        <Card>
          <CardHeader
            title="Team Members"
            description="Manage your team members and their account permissions"
            actions={
              <Button
                variant="primary"
                onClick={() => setShowInviteModal(true)}
              >
                <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                Invite User
              </Button>
            }
          />
          <CardContent>
            <div className="mb-4">
              <SearchFilter
                value={search}
                onChange={setSearch}
                onSubmit={() => {}}
                placeholder="Search team members..."
                className="w-full sm:w-64"
              />
            </div>

            <Table>
              <TableHead>
                <TableHeadCell>Name</TableHeadCell>
                <TableHeadCell>Email</TableHeadCell>
                <TableHeadCell>Role</TableHeadCell>
                <TableHeadCell>Status</TableHeadCell>
                <TableHeadCell className="relative">
                  <span className="sr-only">Actions</span>
                </TableHeadCell>
              </TableHead>
              <TableBody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium text-gray-900">
                        <div className="flex items-center">
                          {user.profile_photo_url ? (
                            <img
                              src={user.profile_photo_url}
                              alt={user.name}
                              className="h-8 w-8 rounded-full mr-3"
                            />
                          ) : (
                            <UserCircleIcon className="h-8 w-8 text-gray-300 mr-3" />
                          )}
                          <span>{user.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <a
                          href={`mailto:${user.email}`}
                          className="flex items-center text-gray-500 hover:text-indigo-600"
                        >
                          <MailIcon className="h-4 w-4 mr-1" />
                          <span>{user.email}</span>
                        </a>
                      </TableCell>
                      <TableCell>
                        {getRoleBadge(user.role)}
                      </TableCell>
                      <TableCell>
                        {user.email_verified_at ? (
                          <Badge variant="green">Verified</Badge>
                        ) : (
                          <Badge variant="yellow">Pending</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <IconButton
                            icon={ShieldCheckIcon}
                            variant="transparent"
                            size="sm"
                            srText="Change role"
                            onClick={() => {
                              setSelectedUser(user);
                              setRoleValues({ role: user.role });
                              setShowRoleModal(true);
                            }}
                          />
                          <IconButton
                            icon={TrashIcon}
                            variant="transparent"
                            size="sm"
                            srText="Remove user"
                            onClick={() => deleteUser(user.id)}
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <EmptyTableRow
                    colSpan={5}
                    message={
                      search
                        ? "No team members match your search."
                        : "No team members found. Invite some users to get started."
                    }
                  />
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Roles */}
        <Card>
          <CardHeader
            title="Roles"
            description="Configure the roles and permissions for your team"
          />
          <CardContent>
            <div className="space-y-6">
              {roles.map((role) => (
                <div key={role.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                  <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                    <div className="flex items-center">
                      <ShieldCheckIcon className="h-5 w-5 text-gray-400 mr-2" />
                      <h3 className="text-lg font-medium leading-6 text-gray-900 capitalize">
                        {role.name}
                      </h3>
                    </div>
                    <LinkButton
                      href={route('settings.roles.edit', role.id)}
                      variant="white"
                      size="sm"
                    >
                      Edit Permissions
                    </LinkButton>
                  </div>
                  <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
                    <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
                      Permissions
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {Object.keys(role.permissions).map((permission) => (
                        <Badge key={permission} variant="blue">
                          {permission}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={sendInvitation}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 sm:mx-0 sm:h-10 sm:w-10">
                      <MailIcon className="h-6 w-6 text-indigo-600" aria-hidden="true" />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Invite Team Member
                      </h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Invite a new user to join your team. They will receive an email with instructions to join.
                        </p>

                        <div className="mt-4 space-y-4">
                          <div>
                            <label
                              htmlFor="email"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Email
                            </label>
                            <div className="mt-1">
                              <input
                                type="email"
                                id="email"
                                name="email"
                                value={inviteValues.email}
                                onChange={handleInviteChange}
                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                required
                              />
                            </div>
                          </div>

                          <div>
                            <label
                              htmlFor="role"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Role
                            </label>
                            <div className="mt-1">
                              <select
                                id="role"
                                name="role"
                                value={inviteValues.role}
                                onChange={handleInviteChange}
                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                required
                              >
                                <option value="">Select a role</option>
                                {roles.map((role) => (
                                  <option key={role.id} value={role.name}>
                                    {role.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <Button
                    type="submit"
                    variant="primary"
                    className="w-full sm:w-auto sm:ml-3"
                  >
                    Send Invitation
                  </Button>
                  <Button
                    type="button"
                    variant="white"
                    className="mt-3 w-full sm:mt-0 sm:w-auto"
                    onClick={() => setShowInviteModal(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Change Role Modal */}
      {showRoleModal && selectedUser && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={updateRole}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 sm:mx-0 sm:h-10 sm:w-10">
                      <ShieldCheckIcon className="h-6 w-6 text-indigo-600" aria-hidden="true" />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Change Role
                      </h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Update the role for {selectedUser.name}.
                        </p>

                        <div className="mt-4">
                          <label
                            htmlFor="role"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Role
                          </label>
                          <div className="mt-1">
                            <select
                              id="role"
                              name="role"
                              value={roleValues.role}
                              onChange={handleRoleChange}
                              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              required
                            >
                              {roles.map((role) => (
                                <option key={role.id} value={role.name}>
                                  {role.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <Button
                    type="submit"
                    variant="primary"
                    className="w-full sm:w-auto sm:ml-3"
                  >
                    Save
                  </Button>
                  <Button
                    type="button"
                    variant="white"
                    className="mt-3 w-full sm:mt-0 sm:w-auto"
                    onClick={() => {
                      setShowRoleModal(false);
                      setSelectedUser(null);
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  );
}
