import AppLayout from '@/layouts/app-layout';
import { questions_import } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Import Questions',
        href: questions_import().url,
    },
];

export default function ImportQuestions() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Import Questions" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <p className="text-muted-foreground italic">import</p>
            </div>
        </AppLayout>
    );
}
