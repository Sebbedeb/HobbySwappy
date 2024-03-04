import { hello } from '../routes/data.js';

const MutationResolvers = {
    Mutation: {
        helloSomethingElse: (_parent: never, args: {something: string}, _context: never, _info: never) => {
            hello.push("Hello " + args.something + "!");
        }
    }
};

export { MutationResolvers };