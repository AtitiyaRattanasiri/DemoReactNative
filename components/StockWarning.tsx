import React from "react";
import { Text } from "react-native";

type Props = {
  totalAllocated: number;
  stockLeft: number;
};

const StockWarning: React.FC<Props> = ({ totalAllocated, stockLeft }) => {
  if (totalAllocated >= stockLeft) return null;
  return (
    <Text style={{ color: "orange", marginTop: 8 }}>
      Stock remaining not fully allocated.
    </Text>
  );
};

export default StockWarning;