import { conversations, hello } from "../routes/data.js";
import { categories, users, wares, messages } from "../routes/data.js";
import { User } from "../routes/types.js";

const QueryResolvers = {
  Query: {
    users: () => users,
    user: (_parent: never, args: { userId: number }) => {
      return users.find((user) => user.userId === args.userId);
    },
    categories: () => categories,

    wares: () => wares,
    ware: (_parent: never, args: { wareId: number }) => {
      return wares.find((ware) => ware.wareId === args.wareId);
    },
      

    conversation: (_parent: never, args: { conversationId: number}) => {
      return conversations.find((conversation) => {
        return conversation.conversationId === args.conversationId;
      });
    },

    conversations: (_parent: never, args: { userId: number }) => {
      if(!users.find((user) => user.userId === args.userId)) {
        throw new Error("User not found");
      }
      return conversations.filter((conversations) => { 
        return conversations.personOneId === args.userId || conversations.personOneId === args.userId;
      });
    },
  }
}

export { QueryResolvers };