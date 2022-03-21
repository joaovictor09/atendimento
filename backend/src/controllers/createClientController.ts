import { Request, Response } from 'express';
import { CreateClientService } from '../services/CreateClientService';

export class CreateClientController {
  async handle(request: Request, response: Response) {

    const { name, userId } = request.body

    const createClientService = new CreateClientService()
    const client = await createClientService.execute({ name, userId })
    
    return response.json(client);
  }
}