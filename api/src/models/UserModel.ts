import mongoose, { Schema, Document } from 'mongoose';
import { Ware } from './WareModel';

export interface User extends Document {
    userId: number;
    userName: string;
    userPassword: string;
    userAddress: string;
    userZip: number;
    wares?: number[];
}

const UserSchema: Schema = new Schema({
    userId: { type: Number, required: false },
    userName: { type: String, required: true },
    userPassword: { type: String, required: true },
    userAddress: { type: String, required: true },
    userZip: { type: Number, required: true },
    wares: [{ type: Number, ref: 'Ware'}]
});

// Define pre-save middleware to set the userId field to the size of the collection +1
UserSchema.pre<User>('save', async function(next) {
    this.userId = await this.collection.countDocuments() + 1;
    next();
});

export default mongoose.model<User>('User', UserSchema);
