"use server"

import prisma from "@/lib/prisma";

let todos: any = [];
const delay = () => new Promise<void>((res) => setTimeout(() => res(), 3000));

export async function getTodos() {
    const data = await prisma.todo.findMany()
    return [data]
}

export async function addTodo(todo: any) {
    await delay();
    // if (Math.random() < 0.5) throw new Error("Failed to add new item!");
    // todos = [...todos, todo];
    // return todos;
}
