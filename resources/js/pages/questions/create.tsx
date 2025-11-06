import AppLayout from '@/layouts/app-layout';
import { questions_index } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Questions',
        href: questions_index().url,
    },
];

export default function Questions() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Question" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <p className="text-muted-foreground italic">Create</p>
            </div>
        </AppLayout>
    );
}
