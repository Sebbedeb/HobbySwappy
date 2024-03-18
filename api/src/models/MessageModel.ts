import mongoose, { Schema, Document } from 'mongoose';

export interface Message extends Document {
    messageId: number;
    messageText: string;
    messageDate: Date;
    senderId: Number;
    receiverId: Number;
}

const MessageSchema: Schema = new Schema({
    messageId: { type: Number, required: false },
    messageText: { type: String, required: true },
    messageDate: { type: Date, required: false },
    senderId: { type: Number, ref: 'User', required: true },
    receiverId: { type: Number, ref: 'User', required: true }
});

// Define pre-save middleware to set the messageDate field to the current date
MessageSchema.pre<Message>('save', async function(next) {
    this.messageDate = new Date();
    this.messageId = await this.collection.countDocuments() + 1;
    console.log(this.messageId);

    next();
});

export default mongoose.model<Message>('Message', MessageSchema);
