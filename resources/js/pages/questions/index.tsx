import AppLayout from '@/layouts/app-layout';
import { questions } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Questions',
        href: questions().url,
    },
];

export default function Questions() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Questions" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <h1 className="text-2xl font-bold">Questions</h1>
                <p className="text-muted-foreground">Your questions page content will go here.</p>
            </div>
        </AppLayout>
    );
}
