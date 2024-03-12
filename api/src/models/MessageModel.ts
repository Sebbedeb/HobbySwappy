import mongoose, { Schema, Document } from 'mongoose';

export interface Message extends Document {
    messageId: number;
    messageText: string;
    messageDate: Date;
    senderId: number;
    receiverId: number;
}

const MessageSchema: Schema = new Schema({
    messageId: { type: Number, required: true },
    messageText: { type: String, required: true },
    messageDate: { type: Date, required: true },
    senderId: { type: Number, required: true },
    receiverId: { type: Number, required: true }
});

export default mongoose.model<Message>('Message', MessageSchema);
