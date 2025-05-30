import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Clipboard, Key, Trash2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

export default function ApiTokens({ tokens, flash }) {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('settings.api-tokens.store'), {
      onSuccess: () => {
        reset('name');
      },
    });
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      toast({
        title: 'Copied to clipboard',
        description: 'The API token has been copied to your clipboard.',
      });
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const deleteToken = (id) => {
    if (confirm('Are you sure you want to delete this API token?')) {
      window.axios.delete(route('settings.api-tokens.destroy', id))
        .then(() => {
          window.location.reload();
        });
    }
  };

  return (
    <AppLayout breadcrumbs={[
      { label: 'Settings', href: '/settings' },
      { label: 'API Tokens', href: '/settings/api-tokens' }
    ]}>
      <Head title="API Tokens" />
      <div className="w-full px-4 py-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">API Tokens</h1>
          <p className="mt-2 text-gray-600">Create and manage API tokens for accessing the API</p>
        </div>

        {flash?.token && (
          <Alert className="mb-6 bg-green-50 border-green-200">
            <Key className="h-4 w-4 text-green-600" />
            <AlertTitle className="text-green-800">New API Token Created</AlertTitle>
            <AlertDescription className="text-green-700">
              <p className="mb-2">Please copy your new API token. For security reasons, it won't be shown again.</p>
              <div className="flex items-center space-x-2 p-2 bg-green-100 rounded-md">
                <code className="text-sm font-mono break-all">{flash.token}</code>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(flash.token)}
                  className="text-green-700 hover:text-green-800 hover:bg-green-200"
                >
                  <Clipboard className="h-4 w-4" />
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Create New Token</CardTitle>
              <CardDescription>
                Create a new API token to access the API from your applications
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Token Name</Label>
                    <Input
                      id="name"
                      placeholder="My App Token"
                      value={data.name}
                      onChange={(e) => setData('name', e.target.value)}
                    />
                    {errors.name && (
                      <p className="text-sm text-red-500">{errors.name}</p>
                    )}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={processing}>
                  Create Token
                </Button>
              </CardFooter>
            </form>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Your API Tokens</CardTitle>
              <CardDescription>
                Manage your existing API tokens
              </CardDescription>
            </CardHeader>
            <CardContent>
              {tokens.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tokens.map((token) => (
                      <TableRow key={token.id}>
                        <TableCell>{token.name}</TableCell>
                        <TableCell>{new Date(token.created_at).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteToken(token.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-4 text-gray-500">
                  No API tokens found
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
