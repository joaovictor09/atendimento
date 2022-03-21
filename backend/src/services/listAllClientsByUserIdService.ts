import { PrismaClient } from '@prisma/client';
import moment from 'moment';
import 'moment/locale/pt-br';
import { VerifyIfAttendanceIsValidyService } from './VerifyIfAttendanceIsValidyService';

export class ListAllClientsByUserIdService {
  async execute(id: string) {

    moment.locale('pt-br');


    const prismaClient = new PrismaClient();
    const verifyIfAttendanceIsValidy = new VerifyIfAttendanceIsValidyService    

    await verifyIfAttendanceIsValidy.execute(id)

    const clients = await prismaClient.client.findMany({
        where: {
          user_id: id
        },
        select: {
          name: true,
          Attendance: {
            select: {
              id: true,
              last_attendance: true,
              attendance: true
            }
          }
        }
      });
    
    const newClients = []
    
    clients.map((client) => {
      newClients.push({
        "name": client.name,
        "last_attendance": moment(client.Attendance[0].last_attendance).format("D [de] MMMM"),
        "attendanceType": client.Attendance[0].attendance
      })
    })

    return newClients
  }
}