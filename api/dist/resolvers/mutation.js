import { hello } from '../routes/data.js';
const MutationResolvers = {
    Mutation: {
        helloSomethingElse: (_parent, args, _context, _info) => {
            hello.push("Hello " + args.something + "!");
        }
    }
};
export { MutationResolvers };
