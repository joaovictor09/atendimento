import { PrismaClient } from '@prisma/client';
import moment from 'moment';
import { ChangeAttendanceType } from './ChangeAttendanceType';

export class VerifyIfAttendanceIsValidyService {
  async execute(id: string) {

    const prismaClient = new PrismaClient();
    const changeAttendanceType = new ChangeAttendanceType()

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

    if (!clients) {
      throw new Error('attendance doesnt exists!');
    };


    clients.map(async (client) => {
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
        });
      }
    });
    
    return 
  }
}