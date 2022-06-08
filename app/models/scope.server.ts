import type { User, Scope } from "@prisma/client";

import { prisma } from "~/db.server";

export type { Scope } from "@prisma/client";

export function getScope({
  id,
  userId,
}: Pick<Scope, "id"> & {
  userId: User["id"];
}) {
  return prisma.scope.findFirst({
    where: { id, userId },
  });
}

export function getScopeListItems({ userId }: { userId: User["id"] }) {
  return prisma.scope.findMany({
    where: { userId },
    select: { id: true, name: true },
    orderBy: { updatedAt: "desc" },
  });
}

export function createScope({
  name,
  userId,
}: Pick<Scope, "name"> & {
  userId: User["id"];
}) {
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

export function deleteScope({
  id,
  userId,
}: Pick<Scope, "id"> & { userId: User["id"] }) {
  return prisma.scope.deleteMany({
    where: { id, userId },
  });
}
