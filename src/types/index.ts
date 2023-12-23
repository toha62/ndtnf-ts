import { Types } from 'mongoose';

type CallbackUser = (err: string | null, user?: Express.User | false) => void;
export type CallbackDeserializeUser = (err: string | null, userId: Types.ObjectId) => void;

export default CallbackUser;
