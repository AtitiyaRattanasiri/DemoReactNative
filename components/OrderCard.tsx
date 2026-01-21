import React, { useEffect, useState } from "react";
import { Text, TextInput, View } from "react-native";
import type { Order } from "../app/(tabs)/types";
import { styles } from "../constants/StyleSheet";

type OrderCardProps = {
  order: Order;
  stockLeft: number;
  allocation: number;
  onAllocationChange: (qty: number) => void;
};

const OrderCard: React.FC<OrderCardProps> = ({
  order,
  stockLeft,
  allocation,
  onAllocationChange,
}) => {
  const availableCredit = order.customer.creditRemaining;
  const maxQtyByCredit = Math.floor(availableCredit / order.pricePerUnit);
  const maxQty = Math.min(order.requestQty, stockLeft, maxQtyByCredit);

  const badgeStyle = () => {
    switch (order.status) {
      case "EMERGENCY":
        return styles.badgeEmergency;
      case "OVER_DUE":
        return styles.badgeOverDue;
      default:
        return styles.badgeNew;
    }
  };

  const [inputText, setInputText] = useState(
    allocation === 0 ? "" : allocation.toString()
  );

  useEffect(() => {
    setInputText(allocation === 0 ? "" : allocation.toString());
  }, [allocation]);

  return (
    <View style={styles.orderCard}>
      <View style={styles.orderHeader}>
        <Text style={styles.orderId}>{order.id}</Text>
      </View>
      <View style={styles.orderHeader}>
        <Text style={[styles.badge, badgeStyle()]}>{order.status}</Text>
      </View>

      <View style={styles.orderInfoRow}>
        <View style={styles.infoColumn}>
          <Text style={styles.label}>Customer</Text>
          <Text>{order.customer.name}</Text>
        </View>
        <View style={styles.infoColumn}>
          <Text style={styles.label}>Credit Remaining</Text>
          <Text>{order.customer.creditRemaining.toFixed(2)} THB</Text>
        </View>
        <View style={styles.infoColumn}>
          <Text style={styles.label}>Closing</Text>
          <Text>{order.customer.creditRemaining.toFixed(2)} THB</Text>
        </View>
      </View>

      <View style={styles.hr} />

      <View style={styles.orderInfoRow}>
        <View style={styles.infoColumn}>
          <Text style={styles.label}>Product</Text>
          <Text>{order.product.name}</Text>
        </View>
        <View style={styles.infoColumn}>
          <Text style={styles.label}>Remark</Text>
          <Text>1 day delivery Product</Text>
        </View>
        <View style={styles.infoColumn} />
      </View>

      <View style={styles.orderInfoRow}>
        <View style={styles.infoColumn}>
          <Text style={styles.label}>Price Per Unit</Text>
          <Text>{order.pricePerUnit.toFixed(2)} THB</Text>
        </View>
        <View style={styles.infoColumn}>
          <Text style={styles.label}>Request Qty</Text>
          <Text>{order.requestQty} Unit</Text>
        </View>
        <View style={styles.infoColumn}>
          <Text style={styles.label}>Qty</Text>
          <View style={styles.QtyRow}>
            <TextInput
              style={[
                styles.input,
                allocation > maxQty ? { borderColor: "red" } : {},
              ]}
              keyboardType="number-pad"
              value={inputText}
              onChangeText={(text) => {
                const clean = text.replace(/[^0-9]/g, "");
                setInputText(clean);

                if (clean === "") {
                  onAllocationChange(0);
                  return;
                }

                const value = parseInt(clean, 10);
                if (!isNaN(value) && value <= maxQty) {
                  onAllocationChange(value);
                }
              }}
              maxLength={5}
            />
            {allocation > maxQty && (
              <Text style={{ color: "red", fontSize: 12, marginLeft: 6 }}>
                Max {maxQty} units allowed
              </Text>
            )}
            <Text> Unit</Text>
          </View>
        </View>
      </View>

      {(inputText === "" || parseInt(inputText, 10) === 0) &&
        order.requestQty > 0 && (
          <Text style={{ color: "orange", marginTop: 4 }}>
            No salmon allocated — please review
          </Text>
        )}
    </View>
  );
};

export default OrderCard;
