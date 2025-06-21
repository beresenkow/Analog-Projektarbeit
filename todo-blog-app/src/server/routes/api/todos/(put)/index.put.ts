import { defineEventHandler, readBody } from 'h3';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const updatedTodo = await prisma.todo.update({
    where: {
      id: body.id,
    },
    data: {
      title: body.title,
      description: body.description,
      linkedBlog: body.linkedBlog,
      done: body.done,
    },
  });

  return updatedTodo;
});
