import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "./ui/input";

interface QuestionEnumerationProps {
    questionType: string;
    answer: string;
    onAnswerChange: (answer: string) => void;
}

export default function QuestionEnumeration({ questionType, answer, onAnswerChange }: QuestionEnumerationProps) {
    return (
        <>
            {questionType === "enumeration" && (
                <Field>
                    <FieldLabel>Answer</FieldLabel>
                    <Input type="text" placeholder="Enter Answer" value={answer} onChange={(e) => onAnswerChange(e.target.value)} />
                </Field>
            )}
        </>

    );
}