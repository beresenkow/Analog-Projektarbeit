import { defineEventHandler, getRouterParam } from 'h3';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id');
  const todo = await prisma.todo.findUnique({
    where: { id: Number(id) },
  });
  return todo;
});
