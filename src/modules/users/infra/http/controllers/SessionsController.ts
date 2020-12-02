import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUser = container.resolve(AuthenticateUserService);

    const { user: userAuthenticated, token } = await authenticateUser.execute({
      email,
      password,
    });

    const user = {
      id: userAuthenticated.id,
      name: userAuthenticated.name,
      email: userAuthenticated.email,
      created_at: userAuthenticated.created_at,
      updated_at: userAuthenticated.updated_at,
    };

    return response.json({ user, token });
  }
}
