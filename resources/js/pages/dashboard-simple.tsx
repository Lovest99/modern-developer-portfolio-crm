import React from 'react';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
  return (
    <div className="py-12">
      <Head title="Dashboard" />
      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
          <div className="p-6 bg-white border-b border-gray-200">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="mt-4">Welcome to your dashboard!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
