import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import TodoList from "./todo-list";

import Link from "next/link";
import { AlertDataEmpty } from "./alert-data-empty";
import { getServerSession } from "next-auth";

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const session = await getServerSession();

  // !session && redirect("/login");

  // PAGINATION
  const { page } = searchParams;
  let halaman;
  if (page == undefined) {
    halaman = 1;
  } else if (+page < 1) {
    redirect("/todo");
  } else if (+page < 1) {
    redirect("/todo");
  } else {
    halaman = +page;
  }
  const ambil = 10;

  const allTodo = await prisma.todo.findMany({
    // orderBy: { isComplete: "asc" },
    orderBy: [{ isComplete: "asc" }, { updatedAt: "desc" }],
    skip: (halaman - 1) * ambil,
    take: ambil,
  });

  const totalData = allTodo.length;

  // if (halaman > 1 && totalData <= 0) {
  //   redirect("/todo");
  // }

  async function handleSubmit(formData: FormData) {
    "use server";
    let { title } = Object.fromEntries(formData);
    // let title  = Object.fromEntries(formData).title;

    console.log("oscar");

    await prisma.todo.create({
      data: {
        title: title as string,
      },
    });

    revalidatePath("/todo");
    // redirect("/todo");
  }

  async function todoCompleted(id: number, isComplete: boolean) {
    "use server";
    await prisma.todo.update({
      where: { id },
      data: {
        isComplete: !isComplete,
      },
    });

    revalidatePath("/todo");
  }

  async function deleteTodo(id: number) {
    "use server";
    await prisma.todo.delete({
      where: { id },
    });

    revalidatePath("/todo");
  }

  async function updateTodo(id: number, newTitle: string) {
    "use server";
    await prisma.todo.update({
      where: { id },
      data: {
        title: newTitle,
      },
    });

    revalidatePath("/todo");
  }

  return (
    <div className="flex flex-col">
      <Button
        variant={"link"}
        asChild
        className="text-3xl leading-normal my-5 self-start"
      >
        <Link href={"/todo"}>To Do List</Link>
      </Button>

      <form action={handleSubmit} className="flex gap-3" key={allTodo[0]?.id}>
        <Input placeholder="..." name="title" autoFocus />
        <Button type="submit">Add</Button>
      </form>

      {totalData >= 1 ? (
        <>
          <div className="mt-10 flex flex-col">
            {allTodo.map((item) => (
              <TodoList
                id={item.id}
                isComplete={item.isComplete}
                title={item.title}
                key={item.id}
                todoCompleted={todoCompleted}
                deleteTodo={deleteTodo}
                updateTodo={updateTodo}
              />
            ))}
          </div>
        </>
      ) : (
        <AlertDataEmpty />
      )}

      <div className="flex gap-3  justify-between my-4">
        <div className="text-sm">Halaman {halaman}</div>
        <div className="flex gap-2">
          <Button
            disabled={halaman <= 1 ? true : false}
            variant={"outline"}
            size={"sm"}
          >
            <Link href={`/todo?page=${halaman - 1}`} className="p-5">
              Sebelumnya
            </Link>
          </Button>

          <Button
            disabled={totalData < ambil ? true : false}
            variant={"outline"}
            size={"sm"}
          >
            <Link href={`/todo?page=${halaman + 1}`} className="p-5">
              Selanjutnya
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
