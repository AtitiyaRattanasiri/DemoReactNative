import React, { useCallback, useEffect, useState } from "react";
import { Modal, Pressable, Text, TouchableOpacity, View } from "react-native";
import AllocationSummary from "../../components/AllocationSummary";
import OrderList from "../../components/OrderList";
import StockWarning from "../../components/StockWarning";
import { styles } from "../../constants/StyleSheet";
import { fetchOrdersByVersion, getRemainingStock, getVersionKey } from "./api";
import type { Order } from "./types";

const PAGE_SIZE = 10;

const priorityMap = { EMERGENCY: 3, OVER_DUE: 2, NEW: 1 };

type Props = {
  onLogout: () => void;
};

export default function SalmonAllocationScreen({ onLogout }: Props) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [versionKey, setVersionKey] = useState("");
  const [stockLeft, setStockLeft] = useState(0);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [allocationMap, setAllocationMap] = useState<Record<string, number>>(
    {}
  );

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const autoAssignAllocation = (orders: Order[], stockLeft: number) => {
    const sortedOrders = [...orders].sort((a, b) => {
      if (priorityMap[b.status] !== priorityMap[a.status]) {
        return priorityMap[b.status] - priorityMap[a.status];
      }
      return parseInt(a.id.split("-")[1]) - parseInt(b.id.split("-")[1]);
    });

    let remainingStock = stockLeft;
    const allocation: Record<string, number> = {};

    for (const order of sortedOrders) {
      if (remainingStock <= 0) break;
      const maxByCredit = Math.floor(
        order.customer.creditRemaining / order.pricePerUnit
      );
      const maxAlloc = Math.min(order.requestQty, maxByCredit, remainingStock);
      allocation[order.id] = maxAlloc;
      remainingStock -= maxAlloc;
    }
    return allocation;
  };

  const loadVersionAndData = useCallback(async () => {
    const latestVersion = await getVersionKey();
    if (versionKey !== latestVersion) {
      setVersionKey(latestVersion);
      setOrders([]);
      setPage(0);
      const remaining = await getRemainingStock();
      setStockLeft(remaining);
      setAllocationMap({});
    }
  }, [versionKey]);

  useEffect(() => {
    const loadOrders = async () => {
      if (loading || !versionKey) return;
      setLoading(true);
      const newOrders = await fetchOrdersByVersion(versionKey, page, PAGE_SIZE);
      setOrders((prev) => [...prev, ...newOrders]);
      setLoading(false);
    };
    loadOrders();
  }, [page, versionKey]);

  useEffect(() => {
    if (orders.length === 0) {
      setAllocationMap({});
      return;
    }
    setAllocationMap(autoAssignAllocation(orders, stockLeft));
  }, [orders, stockLeft]);

  useEffect(() => {
    const totalAllocated = Object.values(allocationMap).reduce(
      (a, b) => a + b,
      0
    );
    if (totalAllocated < stockLeft && !loading) {
      setPage((prev) => prev + 1);
    }
  }, [allocationMap, stockLeft, loading]);

  useEffect(() => {
    loadVersionAndData();
  }, []);

  const updateAllocation = (orderId: string, qty: number) => {
    setAllocationMap((prev) => {
      const newAlloc = { ...prev, [orderId]: qty };
      const total = Object.values(newAlloc).reduce((a, b) => a + b, 0);
      return total <= stockLeft ? newAlloc : prev;
    });
  };

  const totalAllocated = Object.values(allocationMap).reduce(
    (a, b) => a + b,
    0
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.allocationHeader}>
        <Text style={styles.title}>Allocation</Text>

        <TouchableOpacity onPress={() => setShowLogoutModal(true)}>
          <Text
            style={{
              color: "#E53E3E",
              fontWeight: "600",
              fontSize: 14,
            }}
          >
            Logout
          </Text>
        </TouchableOpacity>
      </View>

      <AllocationSummary
        orders={orders}
        allocationMap={allocationMap}
        stockLeft={stockLeft}
      />

      <View style={{ height: 16 }} />

      <OrderList
        orders={orders}
        allocationMap={allocationMap}
        stockLeft={stockLeft}
        loading={loading}
        onAllocationChange={updateAllocation}
        onLoadMore={() => {
          if (!loading) setPage((prev) => prev + 1);
        }}
      />

      <StockWarning totalAllocated={totalAllocated} stockLeft={stockLeft} />

      {/* 🔔 Logout Popup */}
      <Modal transparent visible={showLogoutModal} animationType="fade">
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.4)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "#fff",
              width: 300,
              borderRadius: 12,
              padding: 20,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "600" }}>
              Confirm Logout
            </Text>

            <Text style={{ marginTop: 12 }}>Are you sure to logout?</Text>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                marginTop: 20,
              }}
            >
              <Pressable
                onPress={() => setShowLogoutModal(false)}
                style={{ marginRight: 16 }}
              >
                <Text style={{ color: "#4A5568" }}>No</Text>
              </Pressable>

              <Pressable
                onPress={() => {
                  setShowLogoutModal(false);
                  onLogout();
                }}
              >
                <Text style={{ color: "#E53E3E", fontWeight: "600" }}>Yes</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
