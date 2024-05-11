import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import QueryProvider from "@/api/provider/QueryProvider";

export default function _layout() {
  return (
    <QueryProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{headerShown:false}}/>
        </Stack>
    </QueryProvider>
  );
}
