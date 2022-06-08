import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useCatch, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";

import type { Scope } from "~/models/scope.server";
import { deleteScope } from "~/models/scope.server";
import { getScope } from "~/models/scope.server";
import { requireUserId } from "~/session.server";

type LoaderData = {
  scope: Scope;
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const userId = await requireUserId(request);
  invariant(params.scopeId, "scopeId not found");

  const scope = await getScope({ userId, id: params.scopeId });
  if (!scope) {
    throw new Response("Not Found", { status: 404 });
  }
  return json<LoaderData>({ scope });
};

export const action: ActionFunction = async ({ request, params }) => {
  const userId = await requireUserId(request);
  invariant(params.scopeId, "scopeId not found");

  await deleteScope({ userId, id: params.scopeId });

  return redirect("/scopes");
};

export default function ScopeDetailsPage() {
  const data = useLoaderData() as LoaderData;

  return (
    <div>
      <h3 className="text-2xl font-bold">{data.scope.name}</h3>
      <hr className="my-4" />
      <Form method="post">
        <button
          type="submit"
          className="rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
        >
          Delete
        </button>
      </Form>
    </div>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);

  return <div>An unexpected error occurred: {error.message}</div>;
}

export function CatchBoundary() {
  const caught = useCatch();

  if (caught.status === 404) {
    return <div>Scope not found</div>;
  }

  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}
