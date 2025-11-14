import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Question = {
  id: number;
  title: string;
  description: string;
  type: string;
}

export const columns: ColumnDef<Question>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
    {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "type",
    header: "Type",
  },

]