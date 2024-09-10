import { z } from "zod";

export const playerSchema = z.object({
  firstname: z.string().min(2).max(200).trim(),
  lastname: z.string().min(2).max(200).trim(),
  team: z.number().int().positive().optional(),
  birthdate: z
    // .coerce.date()
    .string()
    // .regex(/^\d{4}-\d{2}-\d{2}$/, {
    //   message: "La fecha debe estar en el formato 'YYYY-MM-DD'",
    // })
    .date()
    .min(new Date("1900-01-01"))
    .max(new Date())
    .optional(),
});

export const matchSchema = z.object({
  home: z.number().int().positive(),
  away: z.number().int().positive(),
  datetime: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/, {
      message: "El día y la hora deben estar en el formato 'YYYY-MM-DDTHH:mm'",
    })
    // .datetime()
    // .min(new Date("1900-01-01T00:00"))
    .optional(),
  data_home_goals: z
    .array(
      z.object({
        goal_id: z.number().int().positive().max(50),
        player: z.number().int().nonnegative().nullable(),
        minute: z.number().int().positive().max(999).nullable(),
      })
    )
    .max(50)
    .optional(),
  data_away_goals: z
    .array(
      z.object({
        goal_id: z.number().int().positive().max(50),
        player: z.number().int().nonnegative().nullable(),
        minute: z.number().int().positive().max(999).nullable(),
      })
    )
    .max(50)
    .optional(),
  tournament: z.number().int().positive(),
  round: z.enum([
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "quarter_finals",
    "semifinal",
    "final",
  ]),
});
