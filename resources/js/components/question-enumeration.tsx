import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "./ui/input";

interface QuestionEnumerationProps {
    questionType: string;
}

export default function QuestionEnumeration({ questionType }: QuestionEnumerationProps) {
    return (
        <>
            {questionType === "enumeration" && (
                <Field>
                    <FieldLabel>Answer</FieldLabel>
                    <Input type="text" placeholder="Enter Answer" 
                    />
                </Field>
            )}
        </>

    );
}