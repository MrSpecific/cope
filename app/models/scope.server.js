import { prisma } from "~/db.server";

export function getScope({ id, userId }) {
  return prisma.scope.findFirst({
    where: { id, userId },
  });
}

export function getScopeListItems({ userId }) {
  return prisma.scope.findMany({
    where: { userId },
    select: { id: true, title: true },
    orderBy: { updatedAt: "desc" },
  });
}

export function createScope({ name, userId }) {
  return prisma.scope.create({
    data: {
      name,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
}

export function deleteScope({ id, userId }) {
  return prisma.scope.deleteMany({
    where: { id, userId },
  });
}
