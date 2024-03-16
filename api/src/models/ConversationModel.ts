import mongoose, { Schema, Document } from 'mongoose';

export interface Conversation extends Document {
    conversationId: number;
    personOneId: number;
    personTwoId: number;
    messages: number[];
    lastUpdated: Date;
}

const ConversationSchema: Schema = new Schema({
    conversationId: { type: Number, required: false },
    personOneId: { type: Number, required: true },
    personTwoId: { type: Number, required: true },
    messages: [{ type: Number, ref: 'Message' }],
});

// Define pre-save middleware to set the conversationId field to the size of the collection +1
ConversationSchema.pre<Conversation>('save', async function(next) {
    if(this.conversationId === undefined) {
    console.log('pre save middleware' + await this.collection.countDocuments());
    this.conversationId = await this.collection.countDocuments() + 1;
    }

    next();
});

export default mongoose.model<Conversation>('Conversation', ConversationSchema);
