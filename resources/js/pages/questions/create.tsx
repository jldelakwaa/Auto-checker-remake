import QuestionCreate from '@/components/question-create';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { questions_import, questions_index } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Import } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create Questions',
        href: questions_index().url,
    },
];

export default function CreateQuestion() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Question" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex justify-end items-center">
                    <h3 className="text-md font-medium flex items-center gap-2">Already built questions?
                        <Button variant="default" asChild>
                            <Link href={questions_import()}>
                                <Import className="h-4 w-4" />Import
                            </Link>
                        </Button>
                    </h3>
                </div>
                <QuestionCreate />
            </div>
        </AppLayout>
    );
}
