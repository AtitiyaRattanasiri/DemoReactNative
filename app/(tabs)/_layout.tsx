import React, { useState } from "react";
import SalmonAllocationScreen from "./index";
import LoginScreen from "./login";

export default function Screen() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isLoggedIn) {
    return <LoginScreen onLoginSuccess={() => setIsLoggedIn(true)} />;
  }

  return (
    <SalmonAllocationScreen
      onLogout={() => {
        console.log("LOGOUT TRIGGERED"); // 👈 debug
        setIsLoggedIn(false);
      }}
    />
  );
}