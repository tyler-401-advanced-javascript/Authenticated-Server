import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

export interface iUsers extends mongoose.Document {
  username: string;
  password: string;
  email: string;
}

const usersSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, select: true },
  password: { type: String, required: true, select: true },
  email: { type: String, required: true , select: true }
})


export default mongoose.model<iUsers>('users', usersSchema);
