import { Types } from 'mongoose';
import { injectable } from 'inversify';

@injectable()
export default abstract class UserRepository {
  abstract createUser(userData: Express.User): Promise<Express.User | null>;

  abstract getUserById(id: Types.ObjectId): Promise<Express.User | null>;

  abstract getUserByName(username: string): Promise<Express.User | null>;

  abstract fillDb(): void;
}
