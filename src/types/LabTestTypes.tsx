// labtest.types.ts

export type PriceType = "FIXED" | "VARIABLE";

export interface LabTest {
  _id: string;
  code: string;
  billingCode: string;
  name: string;
  department: string;
  sampleType: string;
  price: number;
  priceType: PriceType;
  turnaroundTime: string;
  homeCollectionAllowed: boolean;
  preparationInstructions: string;
  isActive: boolean;
}

export type LabTestFormData = Omit<LabTest, "_id" | "isActive">;
