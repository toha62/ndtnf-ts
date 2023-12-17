import { Types } from 'mongoose';
import User from '../models/usersSchema';

type CallbackUser = (err: string | null, user?: User | false) => void;
export type CallbackDeserializeUser = (err: string | null, userId: Types.ObjectId) => void;

export default CallbackUser;
