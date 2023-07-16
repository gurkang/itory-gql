import { generateJWT, verifyJWT } from "../auth/auth";
import { prisma } from "../db/prismaInit";
import { MutationResolvers } from "../generated/graphql";

const mutations: MutationResolvers = {
  login: async (_, { email, password }, {}) => {
    const user = await prisma.user.findUnique({
      where: {
        email: email.toLowerCase(),
      },
    });
    if (!user) {
      throw new Error("No user found");
    }
    if (user.password !== password) {
      throw new Error("Wrong password");
    }
    const jwt = generateJWT(user.id);
    return {
      token: jwt,
    };
  },
  register: async (_, { user }, {}) => {
    const newUser = await prisma.user.create({
      data: {
        email: user.email.toLowerCase(),
        password: user.password,
      },
    });
    const jwt = generateJWT(newUser.id);
    return {
      token: jwt,
    };
  },
  updateItem: async (_, { item }, { jwt }) => {
    const decoded = verifyJWT(jwt);
    const existingItem = await prisma.item.findUnique({
      where: {
        id: item.id,
        userId: decoded.userId,
      },
    });
    const updatedItem = await prisma.item.update({
      where: {
        id: item.id,
        userId: decoded.userId,
      },
      data: {
        name: item.name ?? existingItem?.name,
        quantity: item.quantity ?? existingItem?.quantity,
        box: {
          connect: {
            id: item.boxId ?? existingItem?.boxId ?? undefined,
          },
        },
      },
    });
    return updatedItem;
  },
  createBox: async (_, { name }, { jwt }, {}) => {
    const decoded = verifyJWT(jwt);
    try {
      const box = await prisma.box.create({
        data: {
          name,
          User: {
            connect: {
              id: decoded.userId,
            },
          },
        },
        include: {
          items: true,
        },
      });
      return {
        id: box.id,
        name: box.name,
        items: [],
      };
    } catch (error) {
      return null;
    }
  },
  updateBox: async (_, { box }, { jwt }) => {
    const decoded = verifyJWT(jwt);
    const existingBox = await prisma.box.findUnique({
      where: {
        id: box.id,
        userId: decoded.userId,
      },
    });
    const updatedBox = await prisma.box.update({
      where: {
        id: box.id,
        userId: decoded.userId,
      },
      data: {
        name: box.name ?? existingBox?.name,
        description: box.description ?? existingBox?.description,
      },
    });
    return updatedBox;
  },
  createItem: async (_, { item }, { jwt }) => {
    const decoded = verifyJWT(jwt);
    if (item.boxId) {
      const newItem = await prisma.item.create({
        data: {
          name: item.boxId,
          quantity: item.quantity ?? 0,
          box: {
            connect: {
              id: item.boxId,
            },
          },
          User: {
            connect: {
              id: decoded.userId,
            },
          },
        },
      });
      return newItem;
    } else {
      const newItem = await prisma.item.create({
        data: {
          name: item.name,
          quantity: item.quantity ?? 0,
          box: undefined,
          User: {
            connect: {
              id: decoded.userId,
            },
          },
        },
        include: {
          box: true,
        },
      });
      return newItem;
    }
  },
  deleteBox: async (_, { id }) => {
    try {
      await prisma.box.delete({
        where: {
          id: id,
        },
        include: {
          items: true,
        },
      });
      return true;
    } catch (error) {
      return false;
    }
  },
  deleteItem: async (_, { id }, { jwt }) => {
    const decoded = verifyJWT(jwt);
    try {
      await prisma.item.delete({
        where: {
          id: id,
          userId: decoded.userId,
        },
      });
      return true;
    } catch (error) {
      return false;
    }
  },
};

export default mutations;
