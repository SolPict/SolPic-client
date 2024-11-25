import React from "react";
import { Redirect } from "expo-router";

export default function StartPage() {
  return <Redirect href="/(tabs)/Home" />;
}
