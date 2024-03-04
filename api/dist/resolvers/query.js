import { persons, adresses } from "../routes/data.js";
const QueryResolvers = {
    Query: {
        hello: () => "Hello world!",
        persons: () => persons,
        person: (_parent, args, _context, _info) => {
            return persons.find((person) => person.id === args.id);
        },
        adresses: () => adresses,
        adress: (_parent, args, _context, _info) => {
            return adresses.find((adress) => adress.id === args.id);
        },
        peopleOnAdress: (_parent, args, _context, _info) => {
            return persons.filter((person) => person.adress?.id === args.id);
        },
        //Add a query to get a person by email.
        personByEmail: (_parent, args, _context, _info) => {
            return persons.find((person) => person.email === args.email);
        },
        //Add a query to get all addresses by zip code.
        adressesByZip: (_parent, args, _context, _info) => {
            return adresses.filter((adress) => adress.zip === args.zip);
        },
    }
};
export { QueryResolvers };
