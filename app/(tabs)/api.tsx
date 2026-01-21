// Mock data
import { Order, StatusType } from "../(tabs)/types";
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

const customerNames = ["Balerion", "Meraxes", "Syrax", "Vhagar", "Caraxes"];

export const getVersionKey = async (): Promise<string> => {
  await delay(300);
  return "v1.0.0";
};

export const getRemainingStock = async (): Promise<number> => {
  await delay(300);
  return 10;
};

export const fetchOrdersByVersion = async (
  version: string,
  page: number,
  pageSize: number
): Promise<Order[]> => {
  await delay(500);

  const mockOrders: Order[] = [...Array(pageSize)].map((_, i) => {
    const status: StatusType =
      i % 3 === 0 ? "EMERGENCY" : i % 3 === 1 ? "OVER_DUE" : "NEW";
    const pricePerUnit = status === "EMERGENCY" ? 750 : 515.75;

    return {
      id: `ORDER-${page * pageSize + i + 1}`,
      status,
      customer: {
        name: customerNames[Math.floor(Math.random() * customerNames.length)],
        creditRemaining: Math.floor(Math.random() * 5000) + 1000,
      },
      product: {
        name: "Salmon",
      },
      pricePerUnit,
      requestQty: Math.floor(Math.random() * 20) + 1,
    };
  });

  return mockOrders;
};
