import React, { PropsWithChildren } from 'react';
import { usePage } from '@inertiajs/react';
import { SharedData } from '@/types';
import AppLayout from './app-layout';

const AdminLayout: React.FC<PropsWithChildren> = ({ children }) => {
    const { auth } = usePage<SharedData>().props;

    return (
        <AppLayout>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                {children}
            </div>
        </AppLayout>
    );
};

export default AdminLayout;
