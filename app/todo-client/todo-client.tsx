import { Button } from "@/components/ui/button";
import TodoList from "./_components/todo-list";
import Link from "next/link";
import { deleteTodo, getAllTodos, todoCompleted, updateTodo } from "./actions";
import { AlertDataEmpty } from "./_components/alert-data-empty";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default async function TodoClient({
  page,
}: {
  page: string | number | undefined;
}) {
  const { allTodo, totalData, halaman, ambil } = await getAllTodos(page);

  return (
    <>
      <div>
        {totalData >= 1 ? (
          <div className="mt-10 flex flex-col">
            <TodoList
              allTodo={allTodo}
              todoCompleted={todoCompleted}
              deleteTodo={deleteTodo}
              updateTodo={updateTodo}
            />
          </div>
        ) : (
          <AlertDataEmpty />
        )}
      </div>

      <div className="flex gap-3  justify-between items-center my-4">
        <div className="text-sm">Halaman {halaman}</div>
        <div className="flex gap-2">
          <Button
            disabled={halaman <= 1 ? true : false}
            variant={"outline"}
            size={"sm"}
          >
            <Link href={`/todo-client?page=${halaman - 1}`} className="p-3">
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </Button>

          <Button
            disabled={totalData < ambil ? true : false}
            variant={"outline"}
            size={"sm"}
          >
            <Link href={`/todo-client?page=${halaman + 1}`} className="p-3">
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>
    </>
  );
}

// export const revalidate = 60