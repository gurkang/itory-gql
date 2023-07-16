import { UserResolvers } from "../generated/graphql";

const userResolver: UserResolvers = {
  items: async ({ id }, args, {}, {}) => {
    return [];
  },
};

export default userResolver;
