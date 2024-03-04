type Person = {
    id: string;
    name: string;
    email: string;
    age?: number;
    adress?: Adress;
};

type Adress = {
    id: string;
    street: string;
    city: string;
    zip: string;
    persons?: Person[];
};
export { Person, Adress };