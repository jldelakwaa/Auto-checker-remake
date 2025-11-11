import { useState } from 'react';
import { Field, FieldLabel } from "@/components/ui/field"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Delete, GripVertical } from 'lucide-react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface QuestionCheckboxProps {
    questionType: string;
}

interface SortableOptionProps {
    option: { id: string; value: string; label: string; placeholder: string; text: string };
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
            <Checkbox className="cursor-pointer" value={option.value} id={option.id}/>
            {/* {option.label} */}
            <Input type="text" placeholder={option.placeholder} value={option.text} onChange={(e) => updateOptionText(option.id, e.target.value)} className="ml-2"/>
            <Delete className={`h-7 w-7 ${optionsLength <= minLimit ? 'opacity-50' : 'cursor-pointer hover:text-red-500'}`}
                onClick={optionsLength > minLimit ? () => removeOption(option.id) : undefined} />
        </div>
    );
}

export default function QuestionCheckbox({ questionType }: QuestionCheckboxProps) {

    const [options, setOptions] = useState([
        { id: 'option1', value: 'option1', label: 'A', placeholder: 'Option 1', text: '' },
        { id: 'option2', value: 'option2', label: 'B', placeholder: 'Option 2', text: '' },
        { id: 'option3', value: 'option3', label: 'C', placeholder: 'Option 3', text: '' },
    ]);
    const minLimit = 3;
    const maxLimit = 6;

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
                placeholder: `Option ${index + 1}`,
            }));
            setOptions(updatedOptions);
        }
    };

    const updateOptionText = (id: string, text: string) => {
        setOptions(options.map(option => option.id === id ? { ...option, text } : option));
    };

    const addOption = () => {
        const lastLabel = options[options.length - 1].label;
        const nextLabel = String.fromCharCode(lastLabel.charCodeAt(0) + 1);
        const nextIndex = options.length + 1;
        const newOption = {
            id: `option${nextIndex}`,
            value: `option${nextIndex}`,
            label: nextLabel,
            placeholder: `Option ${nextIndex}`,
            text: ''
        };
        if (options.length < maxLimit) {
            setOptions([...options, newOption]);
        }
    };

    const removeOption = (id: string) => {
        if (options.length > minLimit) {
            const filteredOptions = options.filter(option => option.id !== id);
            const updatedOptions = filteredOptions.map((option, index) => ({
                id: `option${index + 1}`,
                value: option.value,
                label: String.fromCharCode(65 + index), // 'A' is 65 in ASCII
                placeholder: `Option ${String.fromCharCode(65 + index)}`,
                text: option.text
            }));
            setOptions(updatedOptions);
        }
    };

    return (
        <>
            {questionType === "check-box" && (
                <Field>
                    <FieldLabel>Options</FieldLabel>
                    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                        <SortableContext items={options.map(o => o.id)} strategy={verticalListSortingStrategy}>

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
                                    <Checkbox value="add-option" className="pointer-events-none cursor-default " />
                                    <Button variant="link" type="button"
                                        className='cursor-pointer'
                                        onClick={addOption}
                                        disabled={options.length >= maxLimit}>
                                        Add Option
                                    </Button>
                                </div>
                            )}

                        </SortableContext>
                    </DndContext>
                </Field>
            )}
        </>
    );
}