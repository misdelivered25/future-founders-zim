import { z } from "zod";

const phoneRegex = /^\+?[0-9\s().-]{7,20}$/;

export const registrationSchema = z.object({
  full_name: z.string().trim().min(2, "Full name is required."),
  age: z.coerce.number().int().min(14, "Future Founders accepts youths aged 14 to 39.").max(39, "Future Founders accepts youths aged 14 to 39."),
  gender: z.string().trim().min(1, "Gender is required."),
  phone_number: z.string().trim().regex(phoneRegex, "Enter a valid phone number."),
  whatsapp_number: z.string().trim().regex(phoneRegex, "Enter a valid WhatsApp number."),
  email: z.string().trim().email("Enter a valid email address.").transform((v) => v.toLowerCase()),
  location: z.string().trim().optional().nullable(),
  school_university_business: z.string().trim().optional().nullable(),
  area_of_interest: z.string().trim().min(1, "Area of interest is required."),
  reason_for_joining: z.string().trim().min(10, "Tell us a little more about why you want to join."),
  consent: z.literal(true, { errorMap: () => ({ message: "You must accept the privacy notice." }) }),
});

export type RegistrationInput = z.input<typeof registrationSchema>;
export type RegistrationRecord = z.output<typeof registrationSchema>;

export const contactSchema = z.object({
  full_name: z.string().trim().min(2),
  email: z.string().trim().email().transform((v) => v.toLowerCase()),
  phone_number: z.string().trim().optional().nullable(),
  reason: z.string().trim().optional().nullable(),
  message: z.string().trim().min(5),
});

export const donationSchema = z.object({
  full_name: z.string().trim().min(2),
  email: z.string().trim().email().transform((v) => v.toLowerCase()),
  phone_number: z.string().trim().optional().nullable(),
  amount: z.coerce.number().positive(),
  purpose: z.string().trim().min(1),
  payment_method: z.string().trim().min(1),
  message: z.string().trim().optional().nullable(),
});
