import { defineEventHandler, getRouterParams } from 'h3';
import { Prisma, PrismaClient } from '@prisma/client';
import { createError } from 'h3';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const params = getRouterParams(event);
    const id = parseInt(params['id']);

    if (isNaN(id)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid ID'
      });
    }

    const deletedTodo = await prisma.todo.delete({
      where: {
        id: id,
      }
    });

    return {
      status: 'success',
      message: 'Todo successfully deleted',
      data: deletedTodo
    };

  } catch (error) {
    if ((error as Prisma.PrismaClientKnownRequestError).code === 'P2025') {
      throw createError({
        statusCode: 404,
        statusMessage: 'Todo not found'
      });
    }

    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error'
    });
  }
});
