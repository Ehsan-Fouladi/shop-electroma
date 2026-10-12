import { Container } from "@/components/layout/container";

export default function ShopLoading() {
  return (
    <div className="flex flex-col gap-6 py-8 animate-pulse">
      <Container>
        <div className="h-8 w-48 rounded-md bg-surface-muted" />
        <div className="mt-4 h-4 max-w-md rounded bg-surface-muted" />
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="flex flex-col gap-3 rounded-xl border border-line bg-surface p-4"
            >
              <div className="aspect-square w-full rounded-lg bg-surface-soft" />
              <div className="h-4 w-3/4 rounded bg-surface-muted" />
              <div className="h-3 w-1/2 rounded bg-surface-muted" />
              <div className="mt-2 h-5 w-2/3 rounded bg-surface-muted" />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
