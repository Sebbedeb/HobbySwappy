import { hello } from "../routes/data.js";
import { categories, users, wares, messages } from "../routes/data.js";

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

    conversation: (_parent: never, args: { senderId: number, receiverId: number }) => {

      if(!users.find((user) => user.userId === args.senderId) || !users.find((user) => user.userId === args.receiverId)) {
        throw new Error("User not found");
      }
      const sender = users.find((user) => user.userId === args.senderId);
      const receiver = users.find((user) => user.userId === args.receiverId);

      const conversation = {
        senderId: args.senderId,
        receiverId: args.receiverId,
        messages: messages.filter((message) => {
          return (message.messageSender === sender?.userName && message.messageReceiver === receiver?.userName || message.messageSender === receiver?.userName && message.messageReceiver === sender?.userName);
        }),
      };
      return conversation;
    }
  }
}

export { QueryResolvers };