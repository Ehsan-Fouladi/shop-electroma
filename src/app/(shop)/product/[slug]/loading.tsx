import { Container } from "@/components/layout/container";

export default function ProductLoading() {
  return (
    <Container className="flex flex-col gap-5 py-4 sm:gap-6 sm:py-6 lg:py-8 animate-pulse">
      {/* Breadcrumb Skeleton */}
      <div className="flex items-center gap-2">
        <div className="h-4 w-12 rounded bg-surface-muted" />
        <div className="h-4 w-4 rounded bg-surface-muted" />
        <div className="h-4 w-20 rounded bg-surface-muted" />
        <div className="h-4 w-4 rounded bg-surface-muted" />
        <div className="h-4 w-32 rounded bg-surface-muted" />
      </div>

      {/* Main Product Layout (Gallery + Buy Box) */}
      <div className="grid items-start gap-4 lg:grid-cols-2 lg:gap-5 xl:grid-cols-[minmax(0,1.06fr)_minmax(0,1fr)]">
        {/* Gallery Column */}
        <div className="flex flex-col gap-3 rounded-lg border border-line bg-surface p-3 shadow-soft">
          <div className="aspect-square w-full rounded-md bg-surface-muted" />
          <div className="flex gap-2">
            <div className="size-16 rounded-md bg-surface-muted" />
            <div className="size-16 rounded-md bg-surface-muted" />
            <div className="size-16 rounded-md bg-surface-muted" />
          </div>
        </div>

        {/* Identity & Purchase Column */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3">
            <div className="h-6 w-24 rounded-full bg-surface-muted" />
            <div className="h-8 w-3/4 rounded bg-surface-muted" />
            <div className="h-4 w-1/2 rounded bg-surface-muted" />
          </div>

          {/* Price Box */}
          <div className="h-24 w-full rounded-lg border border-line bg-surface p-4" />

          {/* Action Box */}
          <div className="flex flex-col gap-3 rounded-lg border border-line bg-surface p-4">
            <div className="h-10 w-full rounded-lg bg-surface-muted" />
            <div className="h-10 w-full rounded-lg bg-surface-muted" />
          </div>

          {/* Assurance Badges */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="h-16 rounded-lg bg-surface-muted" />
            <div className="h-16 rounded-lg bg-surface-muted" />
            <div className="h-16 rounded-lg bg-surface-muted" />
            <div className="h-16 rounded-lg bg-surface-muted" />
          </div>
        </div>
      </div>

      {/* Specs Overview Skeleton */}
      <div className="grid gap-4 lg:grid-cols-2 lg:gap-5">
        <div className="h-64 rounded-xl border border-line bg-surface p-6" />
        <div className="h-64 rounded-xl border border-line bg-surface p-6" />
      </div>
    </Container>
  );
}
