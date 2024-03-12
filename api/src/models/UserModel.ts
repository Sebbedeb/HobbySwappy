import mongoose, { Schema, Document } from 'mongoose';
import { Ware } from './WareModel';

export interface User extends Document {
    userId: number;
    userName: string;
    userPassword: string;
    userAddress: string;
    userZip: number;
    wares?: Ware[];
}

const UserSchema: Schema = new Schema({
    userId: { type: Number, required: true },
    userName: { type: String, required: true },
    userPassword: { type: String, required: true },
    userAddress: { type: String, required: true },
    userZip: { type: Number, required: true },
    wares: [{ type: Schema.Types.ObjectId, ref: 'Ware' }]
});

export default mongoose.model<User>('User', UserSchema);
