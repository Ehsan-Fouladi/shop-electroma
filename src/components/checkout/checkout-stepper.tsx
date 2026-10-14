"use client";

import { Check } from "lucide-react";

import { toPersianDigits } from "@/lib/formatters/number";
import { cn } from "@/lib/utils/cn";
import { Fragment } from "react/jsx-runtime";

export interface CheckoutStepItem {
  id: number;
  title: string;
  shortTitle: string;
  description: string;
  icon?: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
}

export interface CheckoutStepperProps {
  steps: CheckoutStepItem[];
  currentStep: number;
  onStepClick?: (stepId: number) => void;
  canNavigateToStep?: (stepId: number) => boolean;
  className?: string;
}

/**
 * Accessible, responsive RTL checkout stepper component following the Electroma design system.
 * Connectors, badges, icons, and labels are fully aligned with Persian RTL layout and touch targets.
 */
export function CheckoutStepper({
  steps,
  currentStep,
  onStepClick,
  canNavigateToStep,
  className,
}: CheckoutStepperProps) {
  const currentStepItem = steps.find((s) => s.id === currentStep) || steps[0];
  const progressPercent = Math.round(
    ((currentStep - 1) / (steps.length - 1)) * 100,
  );

  return (
    <nav
      aria-label="مراحل فرایند خرید و تسویه حساب"
      className={cn(
        "rounded-xl border border-line bg-surface p-4 shadow-soft sm:p-5",
        className,
      )}
    >
      <ol className="flex items-center justify-between w-full">
        {steps.map((s, index) => {
          const isCompleted = currentStep > s.id;
          const isCurrent = currentStep === s.id;
          const isUpcoming = currentStep < s.id;
          const isClickable = canNavigateToStep
            ? canNavigateToStep(s.id)
            : isCompleted;
          const isLast = index === steps.length - 1;

          return (
            <Fragment key={s.id}>
              {/* Step item */}
              <li className="relative flex flex-col items-center">
                <button
                  type="button"
                  disabled={!isClickable}
                  onClick={() => {
                    if (isClickable && onStepClick) {
                      onStepClick(s.id);
                    }
                  }}
                  aria-current={isCurrent ? "step" : undefined}
                  aria-label={`مرحله ${toPersianDigits(s.id)}: ${s.title}${
                    isCompleted
                      ? " (تکمیل‌شده — کلیک جهت ویرایش)"
                      : isCurrent
                        ? " (مرحله جاری)"
                        : " (مرحله بعد)"
                  }`}
                  className={cn(
                    "group flex flex-col items-center gap-1.5 rounded-lg p-1 transition-all text-center",
                    isClickable
                      ? "cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary hover:opacity-90"
                      : "cursor-default",
                  )}
                >
                  {/* Step circle indicator */}
                  <span
                    className={cn(
                      "grid size-9 shrink-0 place-items-center rounded-full text-label font-bold transition-all sm:size-10",
                      isCurrent &&
                        "bg-primary text-white ring-4 ring-primary/20 shadow-soft scale-105",
                      isCompleted &&
                        "bg-brand-soft text-brand-active border border-primary/30 group-hover:bg-primary/20",
                      isUpcoming &&
                        "bg-surface-muted text-disabled-ink border border-line-subtle",
                    )}
                  >
                    {isCompleted ? (
                      <Check className="size-4.5 stroke-[2.5]" aria-hidden />
                    ) : (
                      <span className="tabular" dir="rtl">
                        {toPersianDigits(s.id)}
                      </span>
                    )}
                  </span>

                  {/* Step labels */}
                  <div className="flex flex-col items-center">
                    <span
                      className={cn(
                        "text-caption font-bold transition-colors whitespace-nowrap sm:text-body-sm",
                        isCurrent
                          ? "text-brand-active"
                          : isCompleted
                            ? "text-ink"
                            : "text-subtle-ink",
                      )}
                    >
                      <span className="sm:hidden">{s.shortTitle}</span>
                      <span className="hidden sm:inline">{s.title}</span>
                    </span>

                    <span className="hidden text-caption text-subtle-ink md:inline">
                      {isCurrent
                        ? "در حال تکمیل"
                        : isCompleted
                          ? "تأییدشده"
                          : s.description}
                    </span>
                  </div>
                </button>
              </li>

              {/* Progress Connector Line */}
              {!isLast && (
                <div
                  className="flex-1 mx-1.5 sm:mx-3 mb-6 sm:mb-8"
                  aria-hidden="true"
                >
                  <div
                    className={cn(
                      "h-1 rounded-full transition-colors duration-300",
                      isCompleted ? "bg-primary" : "bg-line",
                    )}
                  />
                </div>
              )}
            </Fragment>
          );
        })}
      </ol>

      {/* Mobile progress summary bar */}
      <div className="mt-3 flex items-center justify-between border-t border-line-subtle pt-2.5 sm:hidden text-caption">
        <span className="font-medium text-ink">
          مرحله {toPersianDigits(currentStep)} از{" "}
          {toPersianDigits(steps.length)}: {currentStepItem.title}
        </span>
        <span className="font-medium text-brand-active tabular">
          {toPersianDigits(progressPercent)}٪ پیشرفت
        </span>
      </div>
    </nav>
  );
}
