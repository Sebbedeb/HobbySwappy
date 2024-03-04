type ware = {
    wareId: string;
    wareTitle: string;
    wareDescription: string;
    warePrice: number;
}

type user = {
    userId: string;
    userName: string;
    userPassword: string;
    userAdress: string;
}

type message = {
    messageId: string;
    messageText: string;
    messageDate: Date;
    messageSender: string;
    messageReceiver: string;
}

type category = {
    categoryId: string;
    categoryName: "Trading Cards" | "Board Games" | "Video Games" | "Books" | "Clothes" | "Electronics" | "Sports Equipment" | "Antiques" | "Other";
    categoryDescription: string;
}