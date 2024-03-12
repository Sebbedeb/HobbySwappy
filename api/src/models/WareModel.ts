import mongoose, { Schema, Document } from 'mongoose';
import { User } from './UserModel';
import { Category } from './CategoryModel';

export interface Ware extends Document {
    wareId: number;
    wareTitle: string;
    wareDescription: string;
    warePrice: number;
    wareCategory: Category;
    user?: User;
}

const WareSchema: Schema = new Schema({
    wareId: { type: Number, required: true },
    wareTitle: { type: String, required: true },
    wareDescription: { type: String, required: true },
    warePrice: { type: Number, required: true },
    wareCategory: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

export default mongoose.model<Ware>('Ware', WareSchema);
