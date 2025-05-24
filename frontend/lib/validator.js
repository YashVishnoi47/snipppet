"use client";

import { z } from "zod";

export const roommFormSchema = z.object({
  roomName: z.string().min(2).max(50),
  codingLang: z.string(),
  idPublic: z.boolean().default(false),
});

export const userUpdateSchema = z.object({
  email: z.string().email(),
  FirstName: z.string().min(2).max(50),
  LastName: z.string().min(2).max(50),
  aboutUser: z.string().min(2).max(50),
});
