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
    const form = useForm({
        title: '',
        description: '',
        questions: [{
            id: 1,
            description: '',
            type: 'multiple-choice',
            question: '',
            points: 1,
            options: [
                { id: 'option1', value: 'option1', label: 'A', placeholder: 'Option A', text: '' },
                { id: 'option2', value: 'option2', label: 'B', placeholder: 'Option B', text: '' },
                { id: 'option3', value: 'option3', label: 'C', placeholder: 'Option C', text: '' },
            ],
            enumerationAnswer: '',
            trueFalseSelected: 'true',
            checkboxSelected: [],
            isNew: false,
        }],
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        form.post('/questions'); // Adjust route as needed
    };

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
                <form onSubmit={handleSubmit}>
                    <FieldGroup>
                        <Field>
                            <FieldLabel>Title</FieldLabel>
                            <Input
                                type="text"
                                placeholder="Enter title"
                                value={form.data.title}
                                onChange={(e) => form.setData('title', e.target.value)}
                            />
                        </Field>
                        <Field>
                            <FieldLabel>Description</FieldLabel>
                            <Textarea
                                placeholder="Enter description"
                                value={form.data.description}
                                onChange={(e) => form.setData('description', e.target.value)}
                            />
                        </Field>
                    </FieldGroup>
                    <div className='italic text-sm text-gray-500'>
                        <p >Note: </p>
                        <ul className='list-disc list-inside'>
                            <li>Max of only 20 questions.</li>
                            <li>You can only create one type of question.</li>
                            <li>Max of 10 points per question.</li>
                        </ul>
                    </div>
                    <QuestionCreate form={form} />
                    <div className="flex justify-end">
                        <Button type="submit" disabled={form.processing} className="mt-4">
                            Submit
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
