import mongoose, { Schema, Document } from 'mongoose';

export interface Category extends Document {
    categoryId: number;
    categoryName: CategoryName;
    categoryDescription: string;
}

enum CategoryName {
    NerdyStuff = 'Nerdy Stuff',
    CreativeStuff = 'Creative Stuff',
    Sports = 'Sports',
    TradingCards = 'Trading Cards',
    BoardGames = 'Board Games',
    VideoGames = 'Video Games',
    Books = 'Books',
    Clothes = 'Clothes',
    Electronics = 'Electronics',
    SportsEquipment = 'Sports Equipment',
    Antiques = 'Antiques',
    Other = 'Other',
    Crafting = 'Crafting'
}

const CategorySchema: Schema = new Schema({
    categoryId: { type: Number, required: false },
    categoryName: { type: String, enum: Object.values(CategoryName), required: true },
    categoryDescription: { type: String, required: true }
});

//pre save middleware to set the categoryId field to the size of the collection +1
CategorySchema.pre<Category>('save', async function(next) {
    this.categoryId = await this.collection.countDocuments() + 1;
    next();
});

export default mongoose.model<Category>('Category', CategorySchema);
