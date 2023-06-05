
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const data = await prisma.todo.findMany()
        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ message: error.message });
    }
}

export async function POST(req: any) {
    const { title } = req.json()
    try {
        const data = await prisma.todo.create({
            data: {
                title: title as string,
            },
        });

        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ message: error.message });
    }
}