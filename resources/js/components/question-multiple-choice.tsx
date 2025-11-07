import { useState } from 'react';
import { Field, FieldLabel } from "@/components/ui/field"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Delete } from 'lucide-react';

interface QuestionMultipleChoiceProps {
    questionType: string;
}

export default function QuestionMultipleChoice({ questionType }: QuestionMultipleChoiceProps) {
    const initialOptions = [
        { id: 'option1', value: 'option1', label: 'A', placeholder: 'Option A text' },
        { id: 'option2', value: 'option2', label: 'B', placeholder: 'Option B text' },
        { id: 'option3', value: 'option3', label: 'C', placeholder: 'Option C text' },
    ];
    const [options, setOptions] = useState(initialOptions);

    const addOption = () => {
        const lastLabel = options[options.length - 1].label;
        const nextLabel = String.fromCharCode(lastLabel.charCodeAt(0) + 1);
        const nextIndex = options.length + 1;
        const newOption = {
            id: `option${nextIndex}`,
            value: `option${nextIndex}`,
            label: nextLabel,
            placeholder: `Option ${nextLabel} text`
        };
        setOptions([...options, newOption]);
    };

    const removeOption = (id: string) => {
        setOptions(options.filter(option => option.id !== id));
    };

    return (
        <>
            {questionType === "multiple-choice" && (
                <Field>
                    <FieldLabel>Options</FieldLabel>
                    <RadioGroup name="multiple-choice-options" className="flex flex-col gap-4">
                        {options.map(option => (
                            <div key={option.id} className="flex items-center gap-2">
                                <RadioGroupItem className="cursor-pointer" value={option.value} id={option.id} /> {option.label}
                                <Input type="text" placeholder={option.placeholder} className="ml-2"/>
                                <Delete className='h-7 w-7 cursor-pointer hover:text-red-500' onClick={() => removeOption(option.id)}/>
                            </div>
                        ))}
                        <Button variant="link" className="mt-2 p-0" type="button" onClick={addOption}>Add Option</Button>
                    </RadioGroup>
                </Field>
            )}
        </>
    );
}