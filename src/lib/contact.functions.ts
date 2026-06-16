import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";

const InquirySchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  inquiry_type: z.enum(["general", "reservation", "event"]),
  guests: z.number().int().min(1).max(500).optional().nullable(),
  event_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional().or(z.literal("")),
  message: z.string().trim().min(1).max(2000),
});

export const submitInquiry = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => InquirySchema.parse(data))
  .handler(async ({ data }) => {
    const url = process.env.SUPABASE_URL!;
    const key = process.env.SUPABASE_PUBLISHABLE_KEY!;
    const supabase = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false, storage: undefined },
    });

    const { error } = await supabase.from("contact_inquiries").insert({
      name: data.name,
      email: data.email,
      phone: data.phone || null,
      inquiry_type: data.inquiry_type,
      guests: data.guests ?? null,
      event_date: data.event_date || null,
      message: data.message,
    });

    if (error) {
      console.error("[contact_inquiries] insert failed", error);
      return { ok: false as const, error: "insert_failed" };
    }
    return { ok: true as const };
  });
