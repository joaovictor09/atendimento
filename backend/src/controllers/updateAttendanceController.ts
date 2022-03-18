import { Request, Response } from 'express';
import { UpdateAttendanceService } from '../services/updateAttendanceService';

export class UpdateAttendanceController {
  async handle(request: Request, response: Response) {

    const { id } = request.params
    
    const updateAttendanceService = new UpdateAttendanceService()
    const attendance = await updateAttendanceService.execute(id)

    return response.json(attendance);
  }
}