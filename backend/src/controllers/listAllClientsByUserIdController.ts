import { Request, Response } from 'express';
import { ListAllClientsByUserIdService } from '../services/listAllClientsByUserIdService';

export class ListAllClientsByUserIdController {
  async handle(request: Request, response: Response) {
    const { id } = request.params

    const listAllClientsByUserIdService = new ListAllClientsByUserIdService()
    const clients = await listAllClientsByUserIdService.execute(id)

    return response.json(clients);
  }
}