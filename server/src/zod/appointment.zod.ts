import z from "zod";

export const AppointmentSchema = z.object({
  appointmentDate: z.string(),
  message: z.string(),
});

export type IAppointmentSchema = z.infer<typeof AppointmentSchema>;
