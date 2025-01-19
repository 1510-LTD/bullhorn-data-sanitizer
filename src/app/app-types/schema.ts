import { z } from "zod";

export const ParamsSchema = {
  CandidateId: z.object({
    candidateId: z.string().uuid()
  }),
  Id: z.object({
    id: z.string().uuid()
  }),
  NumericId: z.object({
    id: z.coerce.number().int()
  }),
  CompanyId: z.object({
    companyId: z.string().uuid()
  }),
  ContactId: z.object({
    contactId: z.string().uuid()
  }),
  UserId: z.object({
    userId: z.string().uuid()
  })
} as const;
