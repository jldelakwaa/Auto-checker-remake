import QuestionCreate from '@/components/question-create';
import AppLayout from '@/layouts/app-layout';
import { questions_import, questions_index } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

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
                <h3 className="text-lg font-medium flex justify-end">Already built questions?
                    <Link href={questions_import()}
                        className='text-blue-500 hover:underline ml-2'>
                        Import
                    </Link>
                </h3>
                <QuestionCreate />
            </div>
        </AppLayout>
    );
}
