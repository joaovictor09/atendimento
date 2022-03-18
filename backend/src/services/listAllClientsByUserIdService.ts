import { PrismaClient } from '@prisma/client';
import moment from 'moment';

export class ListAllClientsByUserIdService {
  async execute(id: string) {

    const prismaClient = new PrismaClient();

    var clients = await prismaClient.client.findMany({
      where: {
        user_id: id
      },
      include: {
        Attendance: {
          select: {
            id: true,
            last_attendance: true,
            attendance: true
          }
        }
      }
    })

    await clients.map(async (client) => {
      const last_attendance = moment(client.Attendance[0].last_attendance).format()
      const new_attendance_day = moment(last_attendance).add(7, 'days')
      const actual_day = moment().format()
      if (moment(new_attendance_day).isBefore(actual_day)) {
        await prismaClient.attendance.update({
          where: {
            id: client.Attendance[0].id
          },
          data: {
            attendance: false
          }
        })
      }
    })

    clients = await prismaClient.client.findMany({
      where: {
        user_id: id
      },
      include: {
        Attendance: {
          select: {
            id: true,
            last_attendance: true,
            attendance: true
          }
        }
      }
    })

    return clients
  }
}