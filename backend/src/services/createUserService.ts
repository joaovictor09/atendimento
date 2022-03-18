import { PrismaClient } from '@prisma/client';

export class CreateUserService {
  async execute(name: string) {

    const prismaClient = new PrismaClient();

    const user = await prismaClient.user.create({
      data: {
        name
      }
    })

    return user
  }
}