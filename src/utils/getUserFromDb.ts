import prisma from "./prisma";

const getUserFromDb = async (email: string) => {
  return await (prisma.user.findUnique as any)({
    where: {
      email,
    },
  });
};

export default getUserFromDb;
