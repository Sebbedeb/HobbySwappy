type Ware = {
    wareId: number;
    wareTitle: string;
    wareDescription: string;
    warePrice: number;
    wareCategory: Category;
    User?: User;
}

type User = {
    userId: number;
    userName: string;
    userPassword: string;
    userAdress: string;
    userZip: number
    wares?: Ware[];
}

type Message = {
    messageId: number;
    messageText: string;
    messageDate: Date;
    messageSender: string;
    messageReceiver: string;
}

type Conversation = {
    senderId: number;
    receiverId: number;
    messages: Message[];
}

type Category = {
    categoryId: number;
    categoryName: "Trading Cards" | "Board Games" | "Video Games" | "Books" | "Clothes" | "Electronics" | "Sports Equipment" | "Antiques" | "Other" | "Crafting";
    categoryDescription: string;
}

export type { Ware, User, Message, Category, Conversation };