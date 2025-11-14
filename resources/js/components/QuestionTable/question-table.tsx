'use client'

import { useState, useEffect } from "react"
import { columns, Question } from "./columns"
import { DataTable } from "./data-table"

async function getData(): Promise<Question[]> {
    try {
        const response = await fetch('/api/questions');
        if (!response.ok) {
            throw new Error('Failed to fetch questions');
        }
        const questions = await response.json();
        return questions.map((q: any) => ({
            id: q.id,
            title: q.title,
            description: q.qdescription,
            type: q.type,
        }));
    } catch (error) {
        console.error('Error fetching questions:', error);
        return [];
    }
}

export default function QuestionTable() {
    const [data, setData] = useState<Question[]>([])

    useEffect(() => {
        getData().then(setData)
    }, [])

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data} />
        </div>
    )
}