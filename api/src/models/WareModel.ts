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
    wareId: { type: Number, required: false },
    wareTitle: { type: String, required: true },
    wareDescription: { type: String, required: true },
    warePrice: { type: Number, required: true },
    wareCategory: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    userId: { type: Number, ref: 'UserId', required: true }
});

// Define pre-save middleware to set the wareId field to the size of the collection +1
WareSchema.pre<Ware>('save', async function(next) {
    this.wareId = await this.collection.countDocuments() + 1;
    next();
});

export default mongoose.model<Ware>('Ware', WareSchema);
