import QuestionCreate from '@/components/question-create';
import { Button } from '@/components/ui/button';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import AppLayout from '@/layouts/app-layout';
import { questions_import, questions_index } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Import } from 'lucide-react';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create Questions',
        href: questions_index().url,
    },
];

export default function CreateQuestion() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [questionField , setQuestionField] = useState(1);
    const form = useForm({
        title: '',
        description: '',
        questions: [], // Pass from QuestionCreate
    });

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
                <FieldGroup>
                    {/* Title and Description */}
                    <Field>
                        <FieldLabel>Title</FieldLabel>
                        <Input type="text" placeholder="Enter title" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </Field>
                    <Field>
                        <FieldLabel>Description</FieldLabel>
                        <Textarea placeholder="Enter description" value={description} onChange={(e) => setDescription(e.target.value)} />
                    </Field>
                </FieldGroup>
                <div className='italic text-sm text-gray-500'>
                    <p >Note: </p>
                    <ul className='list-disc list-inside'>
                        <li>Max of only 20 questions.</li>
                        <li>You can only create one type of question.</li>
                    </ul>
                </div>
                <QuestionCreate />
                
            </div>
        </AppLayout>
    );
}
