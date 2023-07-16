import { verifyJWT } from "../auth/auth";
import { prisma } from "../db/prismaInit";
import { UserResolvers } from "../generated/graphql";

const userResolver: UserResolvers = {
  boxes: async ({}, { boxId }, { jwt }, {}) => {
    const decoded = verifyJWT(jwt);
    if (boxId) {
      return await prisma.box.findMany({
        where: {
          userId: decoded.userId,
          id: boxId,
        },
        include: { items: true },
      });
    } else {
      return await prisma.box.findMany({
        where: {
          userId: decoded.userId,
        },
        include: { items: true },
      });
    }
  },
};

export default userResolver;
