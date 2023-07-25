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
  items: async ({}, { itemId }, { jwt }, {}) => {
    const decoded = verifyJWT(jwt);
    if (itemId) {
      return await prisma.item.findMany({
        where: {
          userId: decoded.userId,
          id: itemId,
        },
        include: { box: true },
      });
    } else {
      return await prisma.item.findMany({
        where: {
          userId: decoded.userId,
        },
        include: { box: true },
      });
    }
  },
};

export default userResolver;
