"use client";

import { Check, Edit2, MapPin, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { AccountPageHeading } from "@/components/account/account-page-heading";
import { AddressForm } from "@/components/account/address-form";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useCustomerStore } from "@/store/customer-store";
import type { CustomerAddress } from "@/types/customer";
import { useState } from "react";

export default function AccountAddressesPage() {
  const addresses = useCustomerStore((state) => state.addresses);
  const addAddress = useCustomerStore((state) => state.addAddress);
  const updateAddress = useCustomerStore((state) => state.updateAddress);
  const removeAddress = useCustomerStore((state) => state.removeAddress);
  const setDefaultAddress = useCustomerStore((state) => state.setDefaultAddress);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<CustomerAddress | null>(null);

  const handleDelete = (id: string, title: string) => {
    removeAddress(id);
    toast.success(`نشانی «${title}» حذف شد.`);
  };

  const handleSetDefault = (id: string, title: string) => {
    setDefaultAddress(id);
    toast.success(`نشانی «${title}» به عنوان پیش‌فرض انتخاب شد.`);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <AccountPageHeading
          title="نشانی‌های تحویل"
          description="مدیریت نشانی‌ها جهت تسریع در فرآیند ثبت و ارسال سفارش‌ها."
        />
        <Button onClick={() => setIsAddOpen(true)}>
          <Plus aria-hidden />
          افزودن نشانی جدید
        </Button>
      </div>

      {addresses.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-xl border border-line bg-surface p-8 text-center shadow-soft sm:p-12">
          <span className="grid size-14 place-items-center rounded-full bg-surface-muted text-subtle-ink">
            <MapPin className="size-8" aria-hidden />
          </span>
          <div>
            <h2 className="text-title font-bold text-ink">هنوز نشانی ثبت نکرده‌اید</h2>
            <p className="mt-1 text-body-sm text-subtle-ink">
              برای تسریع در خرید و دریافت بسته‌ها، یک نشانی ثبت کنید.
            </p>
          </div>
          <Button onClick={() => setIsAddOpen(true)}>افزودن اولین نشانی</Button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {addresses.map((addr) => (
            <article
              key={addr.id}
              className="flex flex-col justify-between rounded-xl border border-line bg-surface p-5 shadow-soft transition-colors hover:border-line-strong"
            >
              <div>
                <div className="flex items-center justify-between gap-2 border-b border-line-subtle pb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-ink">{addr.title}</span>
                    {addr.isDefault && (
                      <span className="rounded-full bg-brand-soft px-2.5 py-0.5 text-caption font-medium text-brand-active">
                        پیش‌فرض
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      aria-label={`ویرایش نشانی ${addr.title}`}
                      onClick={() => setEditingAddress(addr)}
                    >
                      <Edit2 className="size-4" aria-hidden />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-sm"
                      aria-label={`حذف نشانی ${addr.title}`}
                      className="text-sale hover:bg-sale-soft"
                      onClick={() => handleDelete(addr.id, addr.title)}
                    >
                      <Trash2 className="size-4" aria-hidden />
                    </Button>
                  </div>
                </div>

                <div className="mt-3 flex flex-col gap-1 text-body-sm text-body">
                  <p>{addr.address}</p>
                  <p className="text-caption text-subtle-ink">
                    استان: {addr.province} • شهر: {addr.city}
                    {addr.building ? ` • پلاک: ${addr.building}` : ""}
                    {addr.unit ? ` • واحد: ${addr.unit}` : ""}
                  </p>
                  <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-caption text-subtle-ink">
                    <span>گیرنده: {addr.recipient}</span>
                    <span dir="ltr">تلفن: {addr.phone}</span>
                  </div>
                  <p className="text-caption text-subtle-ink">کد پستی: {addr.postalCode}</p>
                </div>
              </div>

              {!addr.isDefault && (
                <div className="mt-4 border-t border-line-subtle pt-3">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="w-full text-brand hover:text-brand-active"
                    onClick={() => handleSetDefault(addr.id, addr.title)}
                  >
                    <Check aria-hidden />
                    تنظیم به عنوان نشانی پیش‌فرض
                  </Button>
                </div>
              )}
            </article>
          ))}
        </div>
      )}

      {/* Add Dialog */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>افزودن نشانی جدید</DialogTitle>
          </DialogHeader>
          <AddressForm
            onSubmit={(vals) => {
              addAddress({ ...vals, isDefault: addresses.length === 0 });
              setIsAddOpen(false);
              toast.success("نشانی جدید با موفقیت ذخیره شد.");
            }}
            onCancel={() => setIsAddOpen(false)}
            submitLabel="ذخیره نشانی"
          />
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog
        open={Boolean(editingAddress)}
        onOpenChange={(open) => {
          if (!open) setEditingAddress(null);
        }}
      >
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>ویرایش نشانی</DialogTitle>
          </DialogHeader>
          {editingAddress && (
            <AddressForm
              address={editingAddress}
              onSubmit={(vals) => {
                updateAddress(editingAddress.id, vals);
                setEditingAddress(null);
                toast.success("نشانی به‌روزرسانی شد.");
              }}
              onCancel={() => setEditingAddress(null)}
              submitLabel="ذخیره تغییرات"
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
