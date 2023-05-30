import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}


// export async function handleComplete(id: number, isComplete: boolean) {
//   await prisma.todo.update({
//     where: { id },
//     data: { isComplete: !isComplete },
//   });
// }


export default prisma;