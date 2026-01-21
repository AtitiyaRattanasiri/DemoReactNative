// types.ts
export type StatusType = "EMERGENCY" | "OVER_DUE" | "NEW";

export type Order = {
  id: string;
  status: StatusType;
  customer: {
    name: string;
    creditRemaining: number;
  };
  product: {
    name: string;
  };
  pricePerUnit: number;
  requestQty: number;
};
