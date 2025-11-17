import { Table } from "@tanstack/react-table";
import { Input } from "../ui/input";

export default function QuestionFilter<TData>({ table }: { table: Table<TData> }) {
    return (

        <div className="flex items-center py-4">
            <Input
                placeholder="Filter titles..."
                value={table.getState().globalFilter ?? ""}
                onChange={(event) =>
                    table.setGlobalFilter(event.target.value)
                }
                className="max-w-sm"
            />
        </div>
    );
}   