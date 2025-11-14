import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { questions_index, questions_create, questions_import } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Import, SquarePlus } from 'lucide-react';
import QuestionTable from '@/components/QuestionTable/question-table';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Questions',
        href: questions_index().url,
    },
];

export default function Questions() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Questions" />
            <div>
                
            </div>

            <div className="flex justify-end h-full flex-1 gap-4 rounded-xl p-4">
                <Button variant="create" asChild >
                    <Link href={questions_create()}>
                        <SquarePlus className="mr-2 h-4 w-4" /> Create Question
                    </Link>
                </Button>

                <Button variant="import" asChild>
                    <Link href={questions_import()}>
                        <Import className="mr-2 h-4 w-4" /> Import Questions
                    </Link>
                </Button>
            </div>

            {/* Filter */}
            <div>

            </div>
            {/* Table */}
            <div className="flex h-full gap-4 rounded-xl p-4">
                <QuestionTable />
            </div>
        </AppLayout>
    );
}
