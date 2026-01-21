import React from "react";
import { Text, View } from "react-native";
import type { Order } from "../app/(tabs)/types";
import { styles } from "../constants/StyleSheet";

type Props = {
  orders: Order[];
  allocationMap: Record<string, number>;
  stockLeft: number;
};

const AllocationSummary: React.FC<Props> = ({
  orders,
  allocationMap,
  stockLeft,
}) => {
  const totalPrice = orders.reduce(
    (sum, o) => sum + o.pricePerUnit * (allocationMap[o.id] || 0),
    0
  );

  return (
    <View style={styles.summaryRow}>
      <Text style={styles.summaryText}>
        Salmon <Text style={styles.summaryStrong}>{stockLeft}</Text> Unit
      </Text>
      <Text style={styles.summaryText}>
        Total{" "}
        <Text style={styles.summaryStrong}>{totalPrice.toFixed(2)} THB</Text>
      </Text>
    </View>
  );
};

export default AllocationSummary;
