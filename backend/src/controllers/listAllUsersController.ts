import { Request, Response } from 'express';
import { ListAllUsersService } from '../services/listAllUsersService';

export class ListAllUsersController {
  async handle(request: Request, response: Response) {

    const listAllUsersService = new ListAllUsersService()
    const users = await listAllUsersService.execute()
    
    return response.json(users);
  }
}