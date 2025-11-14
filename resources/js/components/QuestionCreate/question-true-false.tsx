import { Field, FieldLabel } from "@/components/ui/field"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"

interface QuestionTrueFalseProps {
    questionType: string;
    selected: string;
    onSelectedChange: (selected: string) => void;
}

export default function QuestionTrueFalse({ questionType, selected, onSelectedChange }: QuestionTrueFalseProps) {
    return (
        <>
            {questionType === "true-false" && (
                <Field>
                    <FieldLabel>Options</FieldLabel>
                    <RadioGroup name="true-false-options" className="flex flex-col gap-4" value={selected} onValueChange={onSelectedChange} required>
                        <div>
                            <RadioGroupItem value="true" id="true" className="cursor-pointer" /> True
                        </div>
                        <div>
                            <RadioGroupItem value="false" id="false" className="cursor-pointer" /> False
                        </div>  
                    </RadioGroup>
                </Field>
            )}
        </>

    );
}