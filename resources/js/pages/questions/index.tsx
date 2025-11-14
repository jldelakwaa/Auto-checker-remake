import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { questions_index, questions_create, questions_import } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Import, SquarePlus  } from 'lucide-react';
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
            <div className="flex h-full flex-1 gap-4 overflow-x-auto rounded-xl p-4">
                <Button variant="default" asChild>
                    <Link href={questions_create()}>
                        <SquarePlus className="mr-2 h-4 w-4" /> Create Question
                    </Link>
                </Button>

                <Button variant="default" asChild>
                    <Link href={questions_import()}>
                        <Import className="mr-2 h-4 w-4" /> Import Questions
                    </Link>
                </Button>
            </div>

            {/* Filter */}
            <div>

            </div>
            {/* Table */}
            <div>
                <QuestionTable />
            </div>
        </AppLayout>
    );
}
