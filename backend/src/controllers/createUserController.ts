import { Request, Response } from 'express';
import { CreateUserService } from '../services/CreateUserService';

export class CreateUserController {
  async handle(request: Request, response: Response) {

    const { name } = request.body

    const createUserService = new CreateUserService()
    const user = await createUserService.execute(name);

    return response.json(user);
  }
}