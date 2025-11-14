import {
    Field,
    FieldGroup,
    FieldLabel,
    FieldSet,
} from "@/components/ui/field"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import QuestionTrueFalse from "./question-true-false"
import QuestionEnumeration from "./question-enumeration"
import QuestionMultipleChoice from "./question-multiple-choice"
import QuestionCheckbox from "./question-checkbox"
import { Button } from "./ui/button"
import { Trash2, Copy, Plus } from 'lucide-react';
import QuestionPoints from "./question-points"

interface Option {
    id: string;
    value: string;
    label: string;
    placeholder: string;
    text: string;
}

interface Question {
    id: number;
    description: string;
    type: string;
    question: string;
    points: number;
    options: Option[];
    enumerationAnswer: string;
    trueFalseSelected: string;
    checkboxSelected: string[];
    isNew: boolean;
}

export default function QuestionCreate() {
    const [questions, setQuestions] = useState<Question[]>([{
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
    }]);
    const [questionTypes] = useState([
        { value: 'multiple-choice', label: 'Multiple Choice' },
        { value: 'check-box', label: 'Check Box' },
        { value: 'true-false', label: 'True or False' },
        { value: 'enumeration', label: 'Enumeration' },
    ]);

    const updateQuestion = (id: number, field: keyof Question, value: unknown) => {
        setQuestions(questions.map(q => q.id === id ? { ...q, [field]: value } : q));
    };

    const addQuestion = () => {
        const newQuestion: Question = {
            id: questions.length > 0 ? Math.max(...questions.map(q => q.id)) + 1 : 1,
            description: '',
            type: questions[0]?.type || 'multiple-choice',
            question: '',
            points: questions[0]?.points || 1,
            options: [
                { id: 'option1', value: 'option1', label: 'A', placeholder: 'Option A', text: '' },
                { id: 'option2', value: 'option2', label: 'B', placeholder: 'Option B', text: '' },
                { id: 'option3', value: 'option3', label: 'C', placeholder: 'Option C', text: '' },
            ],
            enumerationAnswer: '',
            trueFalseSelected: 'true',
            checkboxSelected: [],
            isNew: true,
        };
        setQuestions([...questions, newQuestion]);
    };

    const copyQuestion = (question: Question) => {
        const newQuestion = { ...question, id: Date.now(), isNew: true };
        setQuestions([...questions, newQuestion]);
    };

    const deleteQuestion = (id: number) => {
        if (questions.length > 1) {
            setQuestions(questions.filter(q => q.id !== id));
        }
    };

    const SubmitForm = () => {
        // Handle form submission logic here
        console.log('Submitting questions:', questions);
    };

    return (
        <div>
            <div className="w-full p-4 rounded-lg shadow-lg">
                <form>
                    <FieldGroup>
                        <FieldSet>
                            {questions.map((q, index) => (
                                <FieldGroup key={q.id} className="bg-amber-50 p-4 rounded-lg">
                                    
                                    <div className={`grid grid-cols-3 gap-4 
                                        ${q.isNew ? 'hidden' : ''}`} //hide if copy/add
                                    >
                                        {/* Question description */}
                                        <Field className="col-span-2">
                                            <FieldLabel>Question Description</FieldLabel>
                                            <Textarea placeholder="Enter question description" value={q.description} onChange={(e) => updateQuestion(q.id, 'description', e.target.value)} />
                                        </Field>

                                        <div className="flex gap-4">
                                            {/* Question Type */}
                                            <Field>
                                                <FieldLabel>Type</FieldLabel>
                                                <Select value={q.type} onValueChange={(value) => setQuestions(questions.map(question => ({ ...question, type: value })))}>
                                                    <SelectTrigger id="question-type">
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {questionTypes.map((type) => (
                                                            <SelectItem key={type.value} value={type.value}>
                                                                {type.label}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </Field>

                                            {/* Question Points */}
                                            <QuestionPoints points={q.points} onPointsChange={(points) => setQuestions(questions.map(question => ({ ...question, points })))} />

                                        </div>
                                    </div>

                                    {/* Question with index */}
                                    <Field className={`col-span-2`}>
                                        <FieldLabel>Question {index + 1}</FieldLabel>
                                        <Textarea placeholder="Enter question" value={q.question} onChange={(e) => updateQuestion(q.id, 'question', e.target.value)} />
                                    </Field>

                                    {/* Show appropriate question type component */}
                                    <QuestionEnumeration questionType={q.type} answer={q.enumerationAnswer} onAnswerChange={(answer) => updateQuestion(q.id, 'enumerationAnswer', answer)} />
                                    <QuestionTrueFalse questionType={q.type} selected={q.trueFalseSelected} onSelectedChange={(selected) => updateQuestion(q.id, 'trueFalseSelected', selected)} />
                                    <QuestionMultipleChoice questionType={q.type} options={q.options} onOptionsChange={(options) => updateQuestion(q.id, 'options', options)} />
                                    <QuestionCheckbox questionType={q.type} options={q.options} selected={q.checkboxSelected} onSelectedChange={(selected) => updateQuestion(q.id, 'checkboxSelected', selected)} onOptionsChange={(options) => updateQuestion(q.id, 'options', options)} />

                                    <div className="flex justify-end gap-2">
                                        {/* Add Question */}
                                        <Button variant="default" type="button" className="bg-green-500 hover:bg-transparent hover:text-green-500 hover:border-green-500 border cursor-pointer" onClick={addQuestion}>
                                            <Plus className="h-4 w-4" />
                                        </Button>

                                        {/* Copy Question */}
                                        <Button variant="default" type="button" className="bg-gray-500 hover:bg-transparent hover:text-gray-500 hover:border-gray-500 border cursor-pointer" onClick={() => copyQuestion(q)}>
                                            <Copy className="h-4 w-4" />
                                        </Button>

                                        {/* Delete Question */}
                                        {index > 0 && (
                                            <Button variant="destructive" type="button" className="hover:bg-transparent hover:text-red-500 hover:border-red-500 border cursor-pointer" onClick={() => deleteQuestion(q.id)}>
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        )}
                                    </div>
                                </FieldGroup>
                            ))}
                            <Button variant="default" className="cursor-pointer self-end" type="submit" onClick={SubmitForm}>
                                Submit
                            </Button>
                        </FieldSet>
                    </FieldGroup>
                </form>
            </div>
        </div>

    );
}