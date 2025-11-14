import { Field, FieldLabel } from "@/components/ui/field"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Delete, GripVertical } from 'lucide-react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface Option {
    id: string;
    value: string;
    label: string;
    placeholder: string;
    text: string;
}

interface QuestionMultipleChoiceProps {
    questionType: string;
    options: Option[];
    onOptionsChange: (options: Option[]) => void;
}

interface SortableOptionProps {
    option: Option;
    updateOptionText: (id: string, text: string) => void;
    removeOption: (id: string) => void;
    minLimit: number;
    optionsLength: number;
}

function SortableOption({ option, updateOptionText, removeOption, minLimit, optionsLength }: SortableOptionProps) {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useSortable({ id: option.id });

    const style = {
        transform: CSS.Transform.toString(transform),
    };

    return (
        <div ref={setNodeRef} style={style} className={`flex items-center gap-2 ${isDragging ? 'opacity-50' : ''}`}>
            <div {...attributes} {...listeners} className="cursor-grab">
                <GripVertical className="h-5 w-5 text-gray-500" />
            </div>
            <RadioGroupItem className="cursor-pointer" value={option.value} id={option.id} />
            {option.label}
            <Input type="text" placeholder={option.placeholder} value={option.text} onChange={(e) => updateOptionText(option.id, e.target.value)} className="ml-2" />
            <Delete className={`h-7 w-7 ${optionsLength <= minLimit ? 'opacity-50' : 'cursor-pointer hover:text-red-500'}`}
                onClick={optionsLength > minLimit ? () => removeOption(option.id) : undefined} />
        </div>
    );
}

export default function QuestionMultipleChoice({ questionType, options, onOptionsChange }: QuestionMultipleChoiceProps) {

    const minLimit = 3;
    const maxLimit = 5;

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
            const oldIndex = options.findIndex((option) => option.id === active.id);
            const newIndex = options.findIndex((option) => option.id === over.id);
            const newOptions = arrayMove(options, oldIndex, newIndex);
            // Update labels
            const updatedOptions = newOptions.map((option, index) => ({
                ...option,
                id: `option${index + 1}`,
                value: `option${index + 1}`,
                label: String.fromCharCode(65 + index),
                placeholder: `Option ${String.fromCharCode(65 + index)}`,
            }));
            onOptionsChange(updatedOptions);
        }
    };

    const updateOptionText = (id: string, text: string) => {
        const newOptions = options.map(option => option.id === id ? { ...option, text } : option);
        onOptionsChange(newOptions);
    };

    const addOption = () => {
        const lastLabel = options.length > 0 ? options[options.length - 1].label : '@'; // '@' is before 'A'
        const nextLabel = String.fromCharCode(lastLabel.charCodeAt(0) + 1);
        const nextIndex = options.length + 1;
        const newOption = {
            id: `option${nextIndex}`,
            value: `option${nextIndex}`,
            label: nextLabel,
            placeholder: `Option ${nextLabel}`,
            text: ''
        };
        if (options.length < maxLimit) {
            onOptionsChange([...options, newOption]);
        }
    };

    const removeOption = (id: string) => {
        if (options.length > minLimit) {
            const filteredOptions = options.filter(option => option.id !== id);
            const updatedOptions = filteredOptions.map((option, index) => ({
                id: `option${index + 1}`,
                value: `option${index + 1}`,
                label: String.fromCharCode(65 + index),
                placeholder: `Option ${String.fromCharCode(65 + index)}`,
                text: option.text
            }));
            onOptionsChange(updatedOptions);
        }
    };

    return (
        <>
            {questionType === "multiple-choice" && (
                <Field>
                    <FieldLabel>Options</FieldLabel>
                    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                        <SortableContext items={options.map(o => o.id)} strategy={verticalListSortingStrategy}>
                            <RadioGroup name="multiple-choice-options" className="flex flex-col gap-4" defaultValue='option1' required>
                                {options.map(option => (
                                    <SortableOption
                                        key={option.id}
                                        option={option}
                                        updateOptionText={updateOptionText}
                                        removeOption={removeOption}
                                        minLimit={minLimit}
                                        optionsLength={options.length}
                                    />
                                ))}
                                {options.length < maxLimit && (
                                <div className='flex items-center gap-2 ml-7'>
                                    <RadioGroupItem value="add-option" className="pointer-events-none cursor-default" />
                                    <Button variant="link" type="button"
                                        className='cursor-pointer'
                                        onClick={addOption}
                                        disabled={options.length >= maxLimit}>
                                        Add Option
                                    </Button>
                                </div>
                                )}
                            </RadioGroup>
                        </SortableContext>
                    </DndContext>
                </Field>
            )}
        </>
    );
}