import { PrismaClient } from '@prisma/client';
import moment from 'moment';

export class UpdateAttendanceService {
  async execute(id: string) {

    const prismaClient = new PrismaClient();

    const clientExist = await prismaClient.client.findUnique({ where: { id } })

    if (!clientExist) {
      throw new Error("This client doesnt exists")
    }

    const attendance = await prismaClient.attendance.findFirst({
      where: {
        client_id: id
      }
    })

    var newAttendanceType = undefined

    if (attendance?.attendance == true){
      newAttendanceType = false
    } else {
      newAttendanceType = true
    }

    const newAttendance = await prismaClient.attendance.update({
      data: {
        attendance: newAttendanceType,
        last_attendance: moment().format()
      },
      where: {
        id: attendance?.id
      }
    })

    return newAttendance
  }
}