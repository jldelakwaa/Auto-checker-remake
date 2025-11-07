import {
    Field,
    FieldGroup,
    FieldLabel,
    FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
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

export default function QuestionCreate() {
    const [questionNumber, setQuestionNumber] = useState(1);
    const [defaultQuestionScore, setDefaultQuestionScore] = useState(1);
    const [answerType, setAnswerType] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [questionType, setQuestionType] = useState("multiple-choice");
    const [options, setOptions] = useState<string[]>([]);
    return (
        <div>
            <div className="w-full p-4 rounded-lg shadow-lg">
                <form>
                    <FieldGroup>
                        <FieldSet>
                            <FieldGroup>
                                <Field>
                                    <FieldLabel>Title</FieldLabel>
                                    <Input type="text" placeholder="Enter title" />
                                </Field>
                                <Field>
                                    <FieldLabel>Description</FieldLabel>
                                    <Textarea placeholder="Enter description" />
                                </Field>
                            </FieldGroup>

                            {/* Question Section */}
                            <FieldGroup className="bg-amber-50 p-4 rounded-lg">
                                <div className="grid grid-cols-3 gap-4">
                                    <Field className="col-span-2"> 
                                        <FieldLabel>Question {questionNumber}</FieldLabel>
                                        <Textarea placeholder="Enter question" />
                                    </Field>

                                    <div className="flex gap-4">
                                    <Field>
                                        <FieldLabel>Type</FieldLabel>
                                        <Select value={questionType} onValueChange={setQuestionType}>
                                            <SelectTrigger id="question-type">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
                                                <SelectItem value="check-box">Check Box</SelectItem>
                                                <SelectItem value="true-false">True or False</SelectItem>
                                                <SelectItem value="enumeration">Enumeration</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </Field>

                                    <Field>
                                        <FieldLabel>Points</FieldLabel>
                                        <Input type="number" placeholder="Enter points"
                                            value={defaultQuestionScore}
                                            onChange={(e) => setDefaultQuestionScore(Number(e.target.value))} />
                                    </Field>
                                    </div>
                                </div>

                                {/* Answer Section */}
                                <QuestionEnumeration questionType={questionType} />
                                <QuestionTrueFalse questionType={questionType} />
                                <QuestionMultipleChoice questionType={questionType} />

                            </FieldGroup>
                        </FieldSet>
                    </FieldGroup>
                </form>
            </div>
        </div>

    );
}