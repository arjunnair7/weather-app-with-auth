import { Request } from 'express';

export interface RequestWithUser extends Request {
  user?: any; // Adjust the type of 'user' as needed, e.g., `{ id: number, username: string }`
}
