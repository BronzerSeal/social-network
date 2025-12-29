import { PrismaClient } from "../generated/prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";
import { PrismaPg } from "@prisma/adapter-pg";

// v1:
// const globalForPrisma = global as unknown as {
//   prisma: PrismaClient;
// };

// const prisma =
//   globalForPrisma.prisma ||
//   new PrismaClient({
//     accelerateUrl: process.env.DATABASE_URL!,
//   }).$extends(withAccelerate());

// if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// v2:
// const prisma = new PrismaClient({
//   accelerateUrl: process.env.DATABASE_URL!,
// }).$extends(withAccelerate());

// v3:
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
};

const isProd = process.env.NODE_ENV === "production";
console.log(isProd);

const prisma = isProd
  ? new PrismaClient({
      accelerateUrl: process.env.DATABASE_URL!, // prisma+postgres://
    }).$extends(withAccelerate())
  : globalForPrisma.prisma ||
    new PrismaClient({
      adapter,
    });

export default prisma;
