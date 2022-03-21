import { PrismaClient } from '@prisma/client';
import { ChangeAttendanceType } from './ChangeAttendanceType';

export class UpdateAttendanceService {
  async execute(id: string) {

    const changeAttendanceType = new ChangeAttendanceType
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

    const user = await prismaClient.client.findUnique({
      where: {
        id
      },
      include: {
        user: {
          select: {
            id: true
          }
        }
      }
    })

    const newAttendanceType = !attendance?.attendance
    const attendanceId = attendance?.id as string;
    await changeAttendanceType.withData(attendanceId, newAttendanceType)

    return (
      await prismaClient.client.findMany({
        where: {
          user_id: user?.user_id
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
    )
  }
}