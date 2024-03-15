import mongoose, { Schema, Document } from 'mongoose';
import { User } from './UserModel';
import { Category } from './CategoryModel';

export interface Ware extends Document {
    wareId: number;
    wareTitle: string;
    wareDescription: string;
    warePrice: number;
    wareCategory: number;
    userId?: number;
    imgName?: string;
}

const WareSchema: Schema = new Schema({
    wareId: { type: Number, required: false },
    wareTitle: { type: String, required: true },
    wareDescription: { type: String, required: true },
    warePrice: { type: Number, required: true },
    wareCategory: { type: Number, ref: 'Category', required: true },
    userId: { type: Number, ref: 'UserId', required: true },
    imgName: { type: String, required: false }

});

// Define pre-save middleware to set the wareId field to the size of the collection +1
WareSchema.pre<Ware>('save', async function(next) {
    if(this.wareId === undefined)
    {
        let highestId  = await this.collection.countDocuments() + 1;
        //while the found wareId is not unique, increment the wareId and check again
        while(await this.collection.findOne({wareId: highestId}) !== null)
        {
            highestId++;
        }
        this.wareId = highestId;
    }
    if(this.imgName === undefined) {
        this.imgName = "DefaultWarePhoto.png";
    }
    next();
});

export default mongoose.model<Ware>('Ware', WareSchema);
