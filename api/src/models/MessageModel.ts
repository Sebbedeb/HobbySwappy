import mongoose, { Schema, Document } from 'mongoose';

export interface Message extends Document {
    messageId: number;
    messageText: string;
    messageDate: Date;
    senderId: mongoose.Types.ObjectId;
    receiverId: mongoose.Types.ObjectId;
}

const MessageSchema: Schema = new Schema({
    messageId: { type: Number, required: true },
    messageText: { type: String, required: true },
    messageDate: { type: Date, required: true },
    senderId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    receiverId: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

export default mongoose.model<Message>('Message', MessageSchema);
