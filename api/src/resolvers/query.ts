import { hello } from "../routes/data.js";

const QueryResolvers = {
  Query: {
    hello: () => hello,
  }
}

export { QueryResolvers };