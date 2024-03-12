import mongoose, { Schema, Document } from 'mongoose';
import { Message } from './MessageModel';

export interface Conversation extends Document {
    conversationId: number;
    personOneId: number;
    personTwoId: number;
    messages: Message[];
}

const ConversationSchema: Schema = new Schema({
    conversationId: { type: Number, required: true },
    personOneId: { type: Number, required: true },
    personTwoId: { type: Number, required: true },
    messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }]
});

export default mongoose.model<Conversation>('Conversation', ConversationSchema);
