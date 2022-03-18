import { PrismaClient } from '@prisma/client';

interface IClient {
  name: string;
  userId: string;
}

export class CreateClientService {
  async execute({ name, userId }:IClient) {

    const prismaClient = new PrismaClient();

    /**
     * VERIFY IF USER EXISTS
     */

    const user_exist = await prismaClient.user.findUnique({ where: { id: userId } })

    if (!user_exist) {
      throw new Error("This user doesnt exists!")
    }

    /**
     * ELSE SAVE CLIENT IN THE DATABASE
     */

    const client = await prismaClient.client.create({
      data: {
        name,
        user: {
          connect: {
            id: userId
          }
        }
      }
    })

    /**
     * AND CREATE ATTENDANCE AND OPTIMIZATION TABLES
     */

    await prismaClient.attendance.create({
      data: {
        client: {
          connect: {
            id: client.id
          }
        }
      }
    })

    await prismaClient.optimization.create({
      data: {
        client: {
          connect: {
            id: client.id
          }
        }
      }
    })

    return client
  }
}