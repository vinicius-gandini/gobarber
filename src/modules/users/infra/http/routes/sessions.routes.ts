import { Router } from 'express';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authenticateUser = new AuthenticateUserService();

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
});

export default sessionsRouter;
