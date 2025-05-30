import React, { useState } from 'react';
import { usePage, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserCircle } from 'lucide-react';

export default function Profile() {
  const { auth, errors } = usePage().props;
  const user = auth.user;

  const [values, setValues] = useState({
    name: user.name,
    email: user.email,
    current_password: '',
    password: '',
    password_confirmation: '',
    photo: null,
  });

  const [photoPreview, setPhotoPreview] = useState(null);

  const handleChange = (e) => {
    const key = e.target.id;
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;

    setValues(values => ({
      ...values,
      [key]: value,
    }));
  };

  const handlePhotoChange = (e) => {
    if (!e.target.files.length) return;

    const file = e.target.files[0];
    setValues(values => ({
      ...values,
      photo: file,
    }));

    const reader = new FileReader();
    reader.onload = (e) => {
      setPhotoPreview(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const updateProfileInformation = (e) => {
    e.preventDefault();

    router.post(route('user-profile-information.update'), {
      _method: 'PUT',
      name: values.name,
      email: values.email,
    }, {
      preserveScroll: true,
    });
  };

  const updatePassword = (e) => {
    e.preventDefault();

    router.put(route('user-password.update'), {
      current_password: values.current_password,
      password: values.password,
      password_confirmation: values.password_confirmation,
    }, {
      preserveScroll: true,
      onSuccess: () => {
        setValues({
          ...values,
          current_password: '',
          password: '',
          password_confirmation: '',
        });
      },
    });
  };

  const updateProfilePhoto = (e) => {
    e.preventDefault();

    if (!values.photo) return;

    const formData = new FormData();
    formData.append('photo', values.photo);
    formData.append('_method', 'PUT');

    router.post(route('user-profile-photo.update'), formData, {
      preserveScroll: true,
      onSuccess: () => {
        setPhotoPreview(null);
        setValues({
          ...values,
          photo: null,
        });
      },
    });
  };

  return (
    <AppLayout title="Profile Settings">
      <div className="space-y-6">
        {/* Profile Photo */}
        <Card>
          <CardHeader
            title="Profile Photo"
            description="Update your profile photo"
          />
          <CardContent>
            <form onSubmit={updateProfilePhoto} className="space-y-6">
              <div className="flex items-center space-x-6">
                <div className="flex-shrink-0">
                  {photoPreview ? (
                    <img
                      src={photoPreview}
                      alt="Profile preview"
                      className="h-24 w-24 rounded-full object-cover"
                    />
                  ) : user.profile_photo_url ? (
                    <img
                      src={user.profile_photo_url}
                      alt={user.name}
                      className="h-24 w-24 rounded-full object-cover"
                    />
                  ) : (
                    <UserCircle className="h-24 w-24 text-muted-foreground" />
                  )}
                </div>

                <div className="flex-1">
                  <label
                    htmlFor="photo"
                    className="block text-sm font-medium text-foreground"
                  >
                    Photo
                  </label>
                  <div className="mt-2 flex items-center gap-3">
                    <input
                      type="file"
                      id="photo"
                      name="photo"
                      accept="image/*"
                      className="sr-only"
                      onChange={handlePhotoChange}
                      ref={input => input && (input.value = '')}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="cursor-pointer"
                      onClick={() => document.getElementById('photo')?.click()}
                    >
                      Change
                    </Button>
                    {user.profile_photo_url && (
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() => {
                          if (confirm('Are you sure you want to remove your profile photo?')) {
                            router.delete(route('user-profile-photo.destroy'));
                          }
                        }}
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    JPG, PNG or GIF up to 2MB
                  </p>
                </div>
              </div>

              {photoPreview && (
                <div className="flex justify-end">
                  <Button
                    type="submit"
                    variant="primary"
                  >
                    Save Photo
                  </Button>
                </div>
              )}
            </form>
          </CardContent>
        </Card>

        {/* Profile Information */}
        <Card>
          <CardHeader
            title="Profile Information"
            description="Update your account's profile information"
          />
          <CardContent>
            <form onSubmit={updateProfileInformation} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-foreground"
                >
                  Name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
                {errors.name && (
                  <p className="mt-2 text-sm text-destructive">{errors.name}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-foreground"
                >
                  Email
                </label>
                <div className="mt-2">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
                {errors.email && (
                  <p className="mt-2 text-sm text-destructive">{errors.email}</p>
                )}
              </div>

              <div className="flex justify-end">
                <Button
                  type="submit"
                  variant="default"
                  size="sm"
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  Update Profile
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Update Password */}
        <Card>
          <CardHeader
            title="Update Password"
            description="Ensure your account is using a long, random password to stay secure"
          />
          <CardContent>
            <form onSubmit={updatePassword} className="space-y-6">
              <div>
                <label
                  htmlFor="current_password"
                  className="block text-sm font-medium text-foreground"
                >
                  Current Password
                </label>
                <div className="mt-2">
                  <input
                    type="password"
                    id="current_password"
                    name="current_password"
                    value={values.current_password}
                    onChange={handleChange}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
                {errors.current_password && (
                  <p className="mt-2 text-sm text-destructive">{errors.current_password}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-foreground"
                >
                  New Password
                </label>
                <div className="mt-2">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
                {errors.password && (
                  <p className="mt-2 text-sm text-destructive">{errors.password}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="password_confirmation"
                  className="block text-sm font-medium text-foreground"
                >
                  Confirm Password
                </label>
                <div className="mt-2">
                  <input
                    type="password"
                    id="password_confirmation"
                    name="password_confirmation"
                    value={values.password_confirmation}
                    onChange={handleChange}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  type="submit"
                  variant="default"
                  size="sm"
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  Update Password
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Two Factor Authentication */}
        <Card>
          <CardHeader
            title="Two Factor Authentication"
            description="Add additional security to your account using two factor authentication"
          />
          <CardContent>
            <p className="text-sm text-muted-foreground">
              When two factor authentication is enabled, you will be prompted for a secure, random token during authentication. You may retrieve this token from your phone's Google Authenticator application.
            </p>

            <div className="mt-5">
              {user.two_factor_enabled ? (
                <div className="space-y-6">
                  <div className="text-sm text-foreground">
                    You have enabled two factor authentication.
                  </div>

                  <div className="flex">
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        if (confirm('Are you sure you want to disable two factor authentication?')) {
                          router.delete(route('two-factor.disable'));
                        }
                      }}
                    >
                      Disable
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="text-sm text-foreground">
                    You have not enabled two factor authentication.
                  </div>

                  <div className="flex">
                    <Button
                      type="button"
                      variant="default"
                      size="sm"
                      onClick={() => router.post(route('two-factor.enable'))}
                    >
                      Enable
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Browser Sessions */}
        <Card>
          <CardHeader
            title="Browser Sessions"
            description="Manage and log out your active sessions on other browsers and devices"
          />
          <CardContent>
            <p className="text-sm text-muted-foreground">
              If necessary, you may log out of all of your other browser sessions across all of your devices. Some of your recent sessions are listed below; however, this list may not be exhaustive. If you feel your account has been compromised, you should also update your password.
            </p>

            <div className="mt-5">
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => {
                  if (confirm('Are you sure you want to log out of all other browser sessions?')) {
                    router.delete(route('other-browser-sessions.destroy'), {
                      preserveScroll: true,
                    });
                  }
                }}
              >
                Log Out Other Browser Sessions
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Delete Account */}
        <Card>
          <CardHeader
            title="Delete Account"
            description="Permanently delete your account"
          />
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Once your account is deleted, all of its resources and data will be permanently deleted. Before deleting your account, please download any data or information that you wish to retain.
            </p>

            <div className="mt-5">
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => {
                  if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
                    router.delete(route('current-user.destroy'));
                  }
                }}
              >
                Delete Account
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
