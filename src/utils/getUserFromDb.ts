import prisma from "./prisma";

const getUserFromDb = async (email: string) => {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
};

export default getUserFromDb;
