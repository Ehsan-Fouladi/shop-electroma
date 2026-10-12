"use client";

import { Container, Section } from "@/components/layout/container";
import { SectionHeading } from "@/components/layout/section-heading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

export interface EditorPickGroup {
  value: string;
  label: string;
  /** Server-rendered grid for this tab. */
  content: React.ReactNode;
}

/**
 * Merchandising block that breaks the rail rhythm: a tabbed editorial grid on a
 * tinted band. Grids are rendered on the server and passed in per tab.
 */
export function EditorPick({ groups }: { groups: EditorPickGroup[] }) {
  const [value, setValue] = useState(groups[0]?.value ?? "");

  return (
    <Section className="bg-surface-soft" aria-labelledby="editor-pick-title">
      <Container className="flex flex-col gap-5 sm:gap-6">
        <h2 id="editor-pick-title" className="sr-only">
          منتخب سردبیر
        </h2>

        <Tabs
          dir="rtl"
          value={value}
          onValueChange={setValue}
          className="flex flex-col gap-5 sm:gap-6"
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              title="منتخب سردبیر"
              subtitle="محصولاتی که بر اساس بررسی کارشناسی و امتیاز کاربران انتخاب شده‌اند"
              href="/collections"
              linkLabel="همه مجموعه‌ها"
            />

            <TabsList className="no-scrollbar max-w-full overflow-x-auto self-start lg:self-auto">
              {groups.map((group) => (
                <TabsTrigger key={group.value} value={group.value}>
                  {group.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {groups.map((group) => (
            <TabsContent key={group.value} value={group.value}>
              {group.content}
            </TabsContent>
          ))}
        </Tabs>
      </Container>
    </Section>
  );
}