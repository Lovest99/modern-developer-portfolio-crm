import { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { type NavGroup, type NavItem } from '@/types';

interface SidebarSearchProps {
    navGroups: NavGroup[];
}

interface SearchResult {
    group: string;
    item: NavItem;
}

export function SidebarSearch({ navGroups }: SidebarSearchProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    // Focus input on mount
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Ctrl+K or Cmd+K to focus search
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                inputRef.current?.focus();
            }

            // Escape to clear search
            if (e.key === 'Escape' && document.activeElement === inputRef.current) {
                setSearchTerm('');
                inputRef.current?.blur();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Search functionality
    useEffect(() => {
        if (searchTerm.trim() === '') {
            setSearchResults([]);
            return;
        }

        const term = searchTerm.toLowerCase();
        const results: SearchResult[] = [];

        navGroups.forEach(group => {
            group.items.forEach(item => {
                if (
                    item.title.toLowerCase().includes(term) ||
                    group.title.toLowerCase().includes(term)
                ) {
                    results.push({
                        group: group.title,
                        item
                    });
                }
            });
        });

        setSearchResults(results);
    }, [searchTerm, navGroups]);

    return (
        <div className="px-3 py-2">
            <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                    ref={inputRef}
                    type="text"
                    className="w-full py-2 pl-10 pr-10 text-sm bg-sidebar-accent/30 border border-sidebar-border rounded-md focus:outline-none focus:ring-2 focus:ring-sidebar-accent focus:border-transparent"
                    placeholder="Search menu... (Ctrl+K)"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onFocus={() => setIsSearching(true)}
                    onBlur={() => setTimeout(() => setIsSearching(false), 200)}
                />
                {searchTerm && (
                    <button
                        className="absolute inset-y-0 right-0 flex items-center pr-3"
                        onClick={() => setSearchTerm('')}
                    >
                        <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                    </button>
                )}
            </div>

            {isSearching && searchResults.length > 0 && (
                <div className="absolute z-10 mt-1 w-[calc(100%-24px)] bg-white dark:bg-gray-800 border border-sidebar-border rounded-md shadow-lg max-h-60 overflow-y-auto">
                    <ul className="py-1">
                        {searchResults.map((result, index) => (
                            <li key={index}>
                                <Link
                                    href={result.item.href}
                                    className="flex items-center px-4 py-2 text-sm hover:bg-sidebar-accent/20"
                                    onClick={() => setSearchTerm('')}
                                >
                                    {result.item.icon && <result.item.icon className="h-4 w-4 mr-2 text-gray-500" />}
                                    <div>
                                        <div className="font-medium">{result.item.title}</div>
                                        <div className="text-xs text-gray-500">{result.group}</div>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
