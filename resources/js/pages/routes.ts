import { RouteParam, RouteParamsWithQueryOverload } from '@inertiajs/core';
import { router } from '@inertiajs/react';

// Include the original route function
export function route(
    name: string,
    params?: RouteParamsWithQueryOverload,
    absolute?: boolean
): string {
    // This is just a placeholder - the actual route function is provided by Inertia
    return window.route(name, params, absolute);
}
