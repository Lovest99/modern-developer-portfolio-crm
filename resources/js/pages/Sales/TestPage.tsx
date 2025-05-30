import React from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function TestPage() {
  return (
    <AppLayout title="Test Page">
      <Head title="Test Page" />

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Test Page</CardTitle>
          </CardHeader>
          <CardContent>
            <p>This is a simple test page to check if the layout works correctly.</p>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
