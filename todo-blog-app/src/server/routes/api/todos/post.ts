import { defineEventHandler, readBody } from 'h3';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const newTodo = await prisma.todo.create({
    data: {
      name: body.name,
      description: body.description,
      linkedBlog: body.linkedBlog,
    },
  });

  return newTodo;
});
