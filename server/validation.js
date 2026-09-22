import { z } from "zod";

const phoneSchema = z
  .string()
  .trim()
  .min(7, "Enter a valid phone number")
  .max(24, "Enter a valid phone number")
  .regex(/^[+0-9()\-\s]+$/, "Enter a valid phone number");

const emailSchema = z.string().trim().email("Enter a valid work email").max(160);
const planSchema = z.enum(["Basic", "Pro", "Advanced"]);

export const signupSchema = z.object({
  fullName: z.string().trim().min(2).max(100),
  workEmail: emailSchema,
  phone: phoneSchema,
  companyName: z.string().trim().min(2).max(140),
  role: z.enum(["Owner / Founder", "Admin / Operations", "Manager", "Other"]),
  businessType: z.enum([
    "Education consultancy",
    "Admissions / counselling business",
    "Service business",
    "Other",
  ]),
  teamSize: z.enum(["1-5", "6-20", "21-50", "51+"]),
  monthlyLeads: z.enum(["0-99", "100-499", "500-1999", "2000+"]),
  needs: z
    .array(
      z.enum([
        "Lead & source tracking",
        "Admissions workflow",
        "Walk-ins & counselling",
        "Revenue & collections",
        "Advanced analytics",
        "Customization & white-label",
      ])
    )
    .max(6),
  recommendedPlan: planSchema,
  selectedPlan: planSchema,
});

export const demoSchema = z.object({
  fullName: z.string().trim().min(2).max(100),
  companyName: z.string().trim().min(2).max(140),
  workEmail: emailSchema,
  phone: phoneSchema,
  teamSize: z.enum(["1-5", "6-20", "21-50", "51+"]),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Choose a valid date"),
  time: z.enum(["10:00 AM", "11:30 AM", "2:00 PM", "4:00 PM", "5:30 PM"]),
  note: z.string().trim().max(1000).optional().default(""),
});

export function zodFields(error) {
  return Object.fromEntries(
    error.issues.map((issue) => [String(issue.path[0] || "form"), issue.message])
  );
}
