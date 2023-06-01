"use server"

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getAllTodos(page: any) {
    let halaman;
    const ambil = 10;
    if (page == undefined) {
        halaman = 1;
    } else if (+page < 1) {
        redirect("/todo");
    } else if (+page < 1) {
        redirect("/todo");
    } else {
        halaman = +page;
    }

    const allTodo = await prisma.todo.findMany({
        orderBy: [{ isComplete: "asc" }, { updatedAt: "desc" }],
        skip: (halaman - 1) * ambil,
        take: ambil,
    });

    const totalData = allTodo.length;

    return { allTodo, totalData, halaman, ambil }

}

export async function addTodo(formData: FormData) {
    let { title } = Object.fromEntries(formData);

    // let title  = Object.fromEntries(formData).title;

    await prisma.todo.create({
        data: {
            title: title as string,
        },
    });

    revalidatePath("/todo-client");
}

export async function todoCompleted(id: number, isComplete: boolean) {
    await prisma.todo.update({
        where: { id },
        data: {
            isComplete: !isComplete,
        },
    });

    revalidatePath("/todo-client");
}

export async function deleteTodo(id: number) {
    await prisma.todo.delete({
        where: { id },
    });

    revalidatePath("/todo-client");
}

export async function updateTodo(id: number, newTitle: string) {
    await prisma.todo.update({
        where: { id },
        data: {
            title: newTitle,
        },
    });

    revalidatePath("/todo-client");
}