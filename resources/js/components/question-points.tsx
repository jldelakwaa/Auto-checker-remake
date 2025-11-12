import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

interface QuestionPointsProps {
    points: number;
    onPointsChange: (points: number) => void;
}

export default function QuestionPoints({ points, onPointsChange }: QuestionPointsProps) {
    
    return (
        <Field>
            <FieldLabel>Points each</FieldLabel>
            <Input type="number" placeholder="Enter points"
                value={points}
                onChange={(e) => {
                    const newPoints = Math.max(1, Number(e.target.value));
                    onPointsChange(newPoints);
                }}
                min={1} />
        </Field>
    );
}