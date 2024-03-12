import mongoose, { Schema, Document } from 'mongoose';

export interface Category extends Document {
    categoryId: number;
    categoryName: CategoryName;
    categoryDescription: string;
}

enum CategoryName {
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
    categoryId: { type: Number, required: true },
    categoryName: { type: String, enum: Object.values(CategoryName), required: true },
    categoryDescription: { type: String, required: true }
});

export default mongoose.model<Category>('Category', CategorySchema);
