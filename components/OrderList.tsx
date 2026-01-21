import React from "react";
import { FlatList } from "react-native";
import type { Order } from "../app/(tabs)/types";
import OrderCard from "../components/OrderCard";

type Props = {
  orders: Order[];
  allocationMap: Record<string, number>;
  stockLeft: number;
  loading: boolean;
  onAllocationChange: (orderId: string, qty: number) => void;
  onLoadMore: () => void;
};

const OrderList: React.FC<Props> = ({
  orders,
  allocationMap,
  stockLeft,
  loading,
  onAllocationChange,
  onLoadMore,
}) => {
  return (
    <FlatList
      data={orders}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <OrderCard
          order={item}
          allocation={allocationMap[item.id] || 0}
          stockLeft={stockLeft}
          onAllocationChange={(qty) => onAllocationChange(item.id, qty)}
        />
      )}
      onEndReachedThreshold={0.2}
      onEndReached={() => {
        if (!loading) onLoadMore();
      }}
    />
  );
};

export default OrderList;
