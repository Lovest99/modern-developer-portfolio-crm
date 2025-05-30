import React from 'react';
import { Head } from '@inertiajs/react';

const BrowserCompatibilityMeta: React.FC = () => {
    return (
        <Head>
            {/* Standard viewport meta tag */}
            <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />

            {/* Safari-specific meta tags */}
            <meta name="apple-mobile-web-app-capable" content="yes" />
            <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

            {/* Microsoft Edge and IE compatibility */}
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

            {/* Prevent automatic phone number detection in Safari */}
            <meta name="format-detection" content="telephone=no" />

            {/* Ensure proper rendering and touch zooming for all browsers */}
            <meta name="HandheldFriendly" content="true" />

            {/* Disable automatic detection of possible phone numbers in Safari on iOS */}
            <meta name="format-detection" content="telephone=no" />

            {/* Disable automatic detection of addresses in Safari on iOS */}
            <meta name="format-detection" content="address=no" />

            {/* Disable automatic detection of email addresses in Safari on iOS */}
            <meta name="format-detection" content="email=no" />

            {/* Disable the translation prompt in Chrome */}
            <meta name="google" content="notranslate" />

            {/* Disable the "Add to Home Screen" prompt in Safari on iOS */}
            <meta name="apple-mobile-web-app-capable" content="yes" />

            {/* Specify the default theme color for all browsers that support it */}
            <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
            <meta name="theme-color" content="#1f2937" media="(prefers-color-scheme: dark)" />
        </Head>
    );
};

export default BrowserCompatibilityMeta;
