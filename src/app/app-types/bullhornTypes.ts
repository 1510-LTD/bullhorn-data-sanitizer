import { z } from "zod";

export type BhRecipient = {
  id: string;
  title?: string;
  firstName: string;
  lastName?: string;
  surname?: string;
  email?: string;
  customTextBlock3?: string;
  customText10?: string;
  massMailOptOut?: boolean;
  occupation?: string;
  dateOfBirth?: string;
  phone?: string;
  searchEntity?: string;
  owner?: { name?: unknown };
  address?: {
    address1?: string;
    address2?: string;
    city?: string;
    state?: string;
    zip?: string;
    countryID?: string;
  };
};

export type BhDuplicates = {
  [key: number]: Array<{ [key: string]: unknown }>;
};

export type BhCandidate = {
  id: string;
  title?: string;
  firstName: string;
  lastName?: string;
  surname?: string;
  email?: string;
  customTextBlock3?: string;
  dateOfBirth?: string;
};

export type BhCompany = {
  id: string;
  name: string;
  companyURL?: string;
  phone?: string;
  fullAddress?: string;
};

export type BhJob = {
  id: string;
  title?: string;
  userId?: string;
  clientUserID?: string;
  startDate?: string;
  dateEnd?: string;
  salaryUnit?: string;
  payRate?: number;
  clientBillRate?: number;
  locationID?: string;
};

export type BhContact = {
  id: string;
  firstName: string;
  lastName?: string;
  email?: string;
};

export type BhHotlist = {
  id: string;
  name: string;
} & Record<string, unknown>;

export const BhQuerySchema = z.object({
  ids: z.array(z.number()).optional(),
  query: z.string().trim().optional(),
  page: z.number().optional(),
  limit: z.number().optional()
});

export type BhQueryParams = z.infer<typeof BhQuerySchema>;
