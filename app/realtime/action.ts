"use server"

import prisma from "@/lib/prisma"
const delay = () => new Promise<void>((res) => setTimeout(() => res(), 3000));


export async function getTodo() {
    const data = await prisma.todo.findMany()
    return data
}

export async function addTodo(title: any) {

    await prisma.todo.create({
        data: {
            title: title as string,
        },
    });

    // return todo
}