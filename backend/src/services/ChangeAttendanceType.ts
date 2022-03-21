import { PrismaClient } from '@prisma/client';
import moment from 'moment';

export class ChangeAttendanceType {
  async withoutData(attendanceId: string, newAttendanceType: boolean) {

    const prismaClient = new PrismaClient();
    await prismaClient.attendance.update({
      where: {
        id: attendanceId
      },
      data: {
        attendance: newAttendanceType
      }
    })
    return 
  }

  async withData(attendanceId: string, newAttendanceType: boolean){
    const prismaClient = new PrismaClient();
    await prismaClient.attendance.update({
      where: {
        id: attendanceId
      },
      data: {
        attendance: newAttendanceType,
        last_attendance: moment().format()       
      }
    })
    return
  }
}