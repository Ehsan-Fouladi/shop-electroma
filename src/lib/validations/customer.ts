import { z } from "zod";

export const toLatinDigits = (value: string) =>
  value.replace(/[۰-۹]/g, (digit) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(digit)));

export const phoneField = z
  .string()
  .trim()
  .min(1, "شماره تماس را وارد کنید.")
  .refine((value) => /^(?:\+98|0098|0)?9\d{9}$/.test(toLatinDigits(value).replace(/[\s-]/g, "")), {
    message: "شماره موبایل معتبر وارد کنید.",
  });

export const emailField = z
  .string()
  .trim()
  .email("ایمیل معتبر وارد کنید.")
  .optional()
  .or(z.literal(""));

export const addressSchema = z.object({
  title: z.string().trim().min(1, "عنوان نشانی را وارد کنید."),
  recipient: z.string().trim().min(2, "نام گیرنده را کامل وارد کنید."),
  phone: phoneField,
  province: z.string().trim().min(2, "استان را انتخاب یا وارد کنید."),
  city: z.string().trim().min(2, "شهر را وارد کنید."),
  address: z.string().trim().min(10, "نشانی باید حداقل ۱۰ نویسه باشد."),
  postalCode: z
    .string()
    .trim()
    .refine((value) => /^\d{10}$/.test(toLatinDigits(value).replace(/[\s-]/g, "")), {
      message: "کد پستی باید ۱۰ رقم باشد.",
    }),
  unit: z.string().trim().max(12, "شماره واحد بیش از حد طولانی است."),
  building: z.string().trim().max(12, "شماره پلاک بیش از حد طولانی است."),
});

export function isValidIranianNationalCode(input: string): boolean {
  if (!input) return false;
  const code = toLatinDigits(input).trim();
  if (!/^\d{10}$/.test(code)) return false;
  // Repetitive all-same digits (0000000000, 1111111111, ...) are invalid
  if (/^(\d)\1{9}$/.test(code)) return false;

  const check = Number.parseInt(code[9], 10);
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += Number.parseInt(code[i], 10) * (10 - i);
  }
  const rem = sum % 11;
  return (rem < 2 && check === rem) || (rem >= 2 && check === 11 - rem);
}

export const profileSchema = z.object({
  name: z.string().trim().min(2, "نام و نام خانوادگی را وارد کنید."),
  phone: phoneField,
  email: emailField,
  birthDate: z.string().trim().max(20, "تاریخ تولد معتبر نیست.").optional().or(z.literal("")),
  nationalCode: z
    .string()
    .trim()
    .refine((v) => !v || isValidIranianNationalCode(v), {
      message: "کد ملی ۱۰ رقمی واردشده با الگوریتم کنترلی منطبق نیست.",
    })
    .optional()
    .or(z.literal("")),
  shebaNumber: z
    .string()
    .trim()
    .refine((v) => !v || /^\d{24}$/.test(toLatinDigits(v).replace(/\s/g, "")), {
      message: "شماره شبا باید ۲۴ رقم (بدون IR) باشد.",
    })
    .optional()
    .or(z.literal("")),
});

export const loginSchema = z.object({
  contact: z.string().trim().min(3, "شماره موبایل یا ایمیل را وارد کنید."),
  password: z.string().min(6, "رمز عبور باید حداقل ۶ نویسه باشد."),
});

export const registerSchema = z
  .object({
    name: z.string().trim().min(2, "نام و نام خانوادگی را وارد کنید."),
    phone: phoneField,
    email: emailField,
    password: z.string().min(8, "رمز عبور باید حداقل ۸ نویسه باشد."),
    confirmPassword: z.string().min(1, "تکرار رمز عبور را وارد کنید."),
    acceptTerms: z.boolean().refine((val) => val === true, {
      message: "برای ادامه، قوانین و مقررات را بپذیرید.",
    }),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "رمز عبور و تکرار آن یکسان نیستند.",
    path: ["confirmPassword"],
  });

export const contactSchema = z
  .string()
  .trim()
  .min(3, "شماره موبایل یا ایمیل را وارد کنید.")
  .refine((value) => {
    const normalized = toLatinDigits(value).replace(/[\s-]/g, "");
    return (
      /^\+?[\w.!#$%&'*+/=?^`{|}~-]+@[\w.-]+\.[A-Za-z]{2,}$/.test(value) ||
      /^(?:\+98|0098|0)?9\d{9}$/.test(normalized)
    );
  }, "شماره موبایل یا ایمیل معتبر وارد کنید.");

export const forgotPasswordSchema = z.object({
  contact: contactSchema,
});

export const verifyCodeSchema = z.object({
  code: z
    .string()
    .trim()
    .refine((value) => /^\d{6}$/.test(toLatinDigits(value)), "کد نمایشی باید ۶ رقم باشد."),
});

export const resetPasswordSchema = z
  .object({
    password: z.string().min(8, "رمز عبور باید حداقل ۸ نویسه باشد."),
    confirmPassword: z.string().min(1, "تکرار رمز عبور را وارد کنید."),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "رمز عبور و تکرار آن یکسان نیستند.",
    path: ["confirmPassword"],
  });

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "رمز عبور فعلی را وارد کنید."),
    newPassword: z.string().min(8, "رمز عبور جدید باید حداقل ۸ نویسه باشد."),
    confirmPassword: z.string().min(1, "تکرار رمز عبور جدید را وارد کنید."),
  })
  .refine((values) => values.newPassword === values.confirmPassword, {
    message: "رمز عبور جدید و تکرار آن یکسان نیستند.",
    path: ["confirmPassword"],
  });

export const returnRequestSchema = z.object({
  orderId: z.string().min(1, "لطفاً سفارش مورد نظر را انتخاب کنید."),
  productId: z.string().min(1, "لطفاً کالای مورد نظر را مشخص کنید."),
  reason: z.string().min(1, "علت درخواست مرجوعی را مشخص کنید."),
  description: z.string().trim().min(10, "توضیحات مرجوعی باید حداقل ۱۰ نویسه باشد."),
});

export const contactFormSchema = z.object({
  name: z.string().trim().min(2, "نام و نام خانوادگی باید حداقل ۲ نویسه باشد."),
  phone: phoneField,
  email: z.string().trim().email("ایمیل معتبر وارد کنید.").optional().or(z.literal("")),
  subject: z.string().min(1, "موضوع پیام را مشخص کنید."),
  message: z.string().trim().min(10, "متن پیام باید حداقل ۱۰ نویسه باشد."),
});

export const reviewFormSchema = z.object({
  rating: z.number().min(1, "لطفاً به این کالا امتیاز دهید.").max(5),
  name: z.string().trim().min(2, "نام نمایشی باید حداقل ۲ حرف باشد."),
  review: z.string().trim().min(5, "متن نظر باید حداقل ۵ حرف باشد."),
});

export const newsletterSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "ایمیل خود را وارد کنید.")
    .email("ایمیل وارد‌شده معتبر نیست."),
});

export type AddressFormValues = z.infer<typeof addressSchema>;
export type ProfileFormValues = z.infer<typeof profileSchema>;
export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;
export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;
export type VerifyCodeFormValues = z.infer<typeof verifyCodeSchema>;
export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;
export type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;
export type ReturnRequestFormValues = z.infer<typeof returnRequestSchema>;
export type ContactFormValues = z.infer<typeof contactFormSchema>;
export type ReviewFormValues = z.infer<typeof reviewFormSchema>;
export type NewsletterFormValues = z.infer<typeof newsletterSchema>;
