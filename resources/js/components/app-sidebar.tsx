import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard, questions_index, questions_create } from '@/routes';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, ScanText, LayoutGrid, FileQuestion, FilePenLine, Users  } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Questions',
        href: questions_index(),
        icon: FileQuestion,
        items: [
            {
                title: 'My Questions',
                href: questions_index(),
            },
            {
                title: 'Create Question',
                href: questions_create(),
            },
            {
                title: 'Import Questions',
                href: '#',
            },
        ],
    },
    {
        title: 'Answers',
        href: '#',
        icon: FilePenLine,
        items: [
            {
                title: 'My Answers',
                href: '#',
            },
            {
                title: 'Pendings',
                href: '#',
            },
        ],
    },
    {
        title: 'Connect',
        href: '#',
        icon: Users,
        items: [
            {
                title: 'Friends',
                href: '#',
            },
            {
                title: 'Add Friend',
                href: '#',
            },
        ],
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'Set-up OCR',
        href: '#',
        icon: ScanText,
    },
    {
        title: 'Guide',
        href: '#',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
