import { PrismaClient } from '@prisma/client';

export class ListAllUsersService {
  async execute() {

    const prismaClient = new PrismaClient();
    const users = await prismaClient.user.findMany()

    return users
  }
}