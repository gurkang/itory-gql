import { generateJWT, verifyJWT } from "../auth/auth";
import { prisma } from "../db/prismaInit";
import { MutationResolvers } from "../generated/graphql";
import * as bcrypt from "bcryptjs";

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
    if (bcrypt.compareSync(password, user.password) === false) {
      throw new Error("Wrong password");
    }
    const jwt = generateJWT(user.id);
    return {
      token: jwt,
      expiresIn: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    };
  },
  register: async (_, { user }, {}) => {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(user.password, salt);
    console.log(hashedPassword);
    const newUser = await prisma.user.create({
      data: {
        email: user.email.toLowerCase(),
        password: hashedPassword,
      },
    });
    const jwt = generateJWT(newUser.id);
    return {
      token: jwt,
      expiresIn: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    };
  },
  updateItem: async (_, { item }, { jwt }) => {
    console.log(item);
    const decoded = verifyJWT(jwt);
    const existingItem = await prisma.item.findUnique({
      where: {
        id: item.id,
        userId: decoded.userId,
      },
    });
    if (item.boxId === null || item.boxId === undefined) {
      const updatedItem = await prisma.item.update({
        where: {
          id: item.id,
          userId: decoded.userId,
        },
        data: {
          name: item.name ?? existingItem?.name,
          quantity: item.quantity ?? existingItem?.quantity,
          box: {
            disconnect: true,
          },
        },
      });
      return updatedItem;
    } else {
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
    }
  },
  createBox: async (_, { name, description }, { jwt }, {}) => {
    const decoded = verifyJWT(jwt);
    try {
      const box = await prisma.box.create({
        data: {
          name,
          description,
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
        description: box.description,
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
          name: item.name,
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
