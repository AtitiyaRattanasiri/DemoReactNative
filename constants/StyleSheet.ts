import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fafafa",
  },
  container2: {
    flex: 1,
    justifyContent: "center", // กลางแนวตั้ง
    alignItems: "center",     // กลางแนวนอน
    backgroundColor: "#fafafa",
  },
  allocationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  summaryText: {
    marginRight: 20,
    fontSize: 16,
    color: "black",
  },
  summaryStrong: {
    fontWeight: "bold",
    color: "black",
  },
  orderCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 24,
    marginBottom: 16,
    shadowColor: "#eee",
    shadowOpacity: 1,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    elevation: 3,
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  orderId: {
    fontWeight: "500",
    fontSize: 16,
    marginRight: 12,
  },
  badge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
    color: "white",
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  badgeEmergency: {
    backgroundColor: "#E53E3E",
  },
  badgeOverDue: {
    backgroundColor: "#DD6B20",
  },
  badgeNew: {
    backgroundColor: "#000000",
  },
  orderInfoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  infoColumn: {
    flex: 1,
    minWidth: 100,
    paddingHorizontal: 6,
  },
  label: {
    fontSize: 13,
    fontWeight: "normal",
    marginBottom: 4,
    color: "#a6a6a6",
  },
  hr: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginVertical: 8,
  },
  QtyRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    width: 80,
    paddingVertical: 4,
    paddingHorizontal: 8,
    fontSize: 14,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
  },
  openButton: {
    backgroundColor: '#2563eb',
    padding: 12,
    borderRadius: 8
  },
  buttonText: {
    color: 'white',
    fontWeight: '600'
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modal: {
    width: '85%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10
  },
  cancelButton: {
    marginRight: 12,
    padding: 10
  },
  loginButton: {
    backgroundColor: '#2563eb',
    padding: 10,
    borderRadius: 8
  },
  button: {
    backgroundColor: "#2563eb",
    padding: 14,
    borderRadius: 8,
    marginTop: 8,
  },
  title1: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 24,
    textAlign: "center",
  },
  input1: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  button1: {
    backgroundColor: "#2563eb",
    padding: 14,
    borderRadius: 8,
    marginTop: 8,
  },
  buttonText1: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
  },
  loginCard: {
    width: "100%",
    maxWidth: 400,       // ⭐ สำคัญ: จำกัดความกว้าง
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 4,
  },
  errorText: {
    color: "red",
    marginBottom: 8,
    textAlign: "center",
  },
  resetButton: {
    borderWidth: 1,
    borderColor: "#2563eb",
    padding: 14,
    borderRadius: 8,
    marginTop: 8,
    marginRight: 8,
    flex: 1,
  },
  resetButtonText: {
    color: "#2563eb",
    textAlign: "center",
    fontWeight: "600",
  },
});