import { Link } from "@remix-run/react";

export default function ScopeIndexPage() {
  return (
    <p>
      No note selected. Select a scope on the left, or{" "}
      <Link to="new" className="text-blue-500 underline">
        create a new scope.
      </Link>
    </p>
  );
}
