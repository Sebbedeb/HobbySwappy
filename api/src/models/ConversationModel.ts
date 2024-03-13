import mongoose, { Schema, Document } from 'mongoose';
import { Message } from './MessageModel';

export interface Conversation extends Document {
    conversationId: number;
    personOneId: number;
    personTwoId: number;
    messages: number[];
}

const ConversationSchema: Schema = new Schema({
    conversationId: { type: Number, required: false },
    personOneId: { type: Number, required: true },
    personTwoId: { type: Number, required: true },
    messages: [{ type: Number, ref: 'Message' }]
});

// Define pre-save middleware to set the conversationId field to the size of the collection +1
ConversationSchema.pre<Conversation>('save', async function(next) {
    console.log('pre save middleware' + await this.collection.countDocuments());
    this.conversationId = await this.collection.countDocuments() + 1;
    next();
});

export default mongoose.model<Conversation>('Conversation', ConversationSchema);
