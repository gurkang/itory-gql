import { GraphQLError } from "graphql";
import { verifyJWT } from "../auth/auth";
import { prisma } from "../db/prismaInit";
import { QueryResolvers, User } from "../generated/graphql";

const queries: QueryResolvers = {
  boxes: async (_, { limit }, { jwt }) => {
    const decoded = verifyJWT(jwt);
    if (limit) {
      return await prisma.box.findMany({
        where: {
          userId: decoded.userId,
        },
        include: { items: true },
        take: limit,
      });
    }
    return await prisma.box.findMany({
      where: {
        userId: decoded.userId,
      },
      include: { items: true },
    });
  },
  items: (_, { limit }, { jwt }) => {
    const decoded = verifyJWT(jwt);
    if (limit) {
      return prisma.item.findMany({
        where: {
          userId: decoded.userId,
        },
        include: { box: true },
        take: limit,
      });
    }
    return prisma.item.findMany({
      where: {
        userId: decoded.userId,
      },
      include: { box: true },
    });
  },
  me: async (_, __, { jwt }) => {
    const decoded = verifyJWT(jwt);
    const user = await prisma.user.findUnique({
      where: {
        id: decoded.userId,
      },
    });
    if (!user) {
      throw new GraphQLError("No user found");
    }
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      boxes: await prisma.box.findMany({
        where: {
          userId: decoded.userId,
        },
        include: { items: true },
      }),
    };
  },
};

export default queries;
