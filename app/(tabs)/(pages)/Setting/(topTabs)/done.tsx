import {
  View,
  Text,
  Dimensions,
  Pressable,
  FlatList,
  StyleSheet,
  Alert,
  Image,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { useOrderList } from "@/api/orders";
import { router } from "expo-router";
import moment from "moment"; // Add this at the top of your file
import { colors } from "@/constants/Theme";

import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("screen");
const emptyList = require('../../../../../assets/images/emptyList.png')

export default function done() {
  const { data: orderList, isLoading } = useOrderList();

  const fetchDoneOrders = orderList?.filter((o) => o.order_status === "done");

  return isLoading ? (
    <ActivityIndicator />
  ) : fetchDoneOrders?.length ? (
    <View style={{ flex: 1 }}>
      <FlatList
        data={fetchDoneOrders}
        renderItem={({ item }) => <Item item={item} />}
      />
    </View>
  ) : (
    <View>
      <Image source={emptyList} style={{width:width, height:height*0.5, justifyContent:'center', marginTop:20}} />
    </View>)
}

const Item = ({ item }:any) => {
  const formattedDate = moment(item.created_at).fromNow();

  return (
    <Pressable
      onPress={() =>
        router.push({ pathname: "/Setting/Modal", params: { ItemId: item.id } })
      }
      style={{
        margin: 10,
        elevation: 2,
        backgroundColor: "#fff",
        padding: 10,
        height: height * 0.1,
        borderRadius: 10,
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <View style={{ gap: 5 }}>
        <Text style={styles.name}>
          {item.name && item.name.length > 12
            ? item.name.slice(0, 12) + "..."
            : item.name}
        </Text>
        <Text style={styles.price}>{item.total_price} DA</Text>
      </View>
      <View style={{ gap: 5, alignItems: "center" }}>
        <Text
          style={{
            paddingHorizontal: 6,
            paddingVertical: 4,
            backgroundColor: "green",
            color: colors.white,
            width: 85,
            textAlign: "center",
            fontWeight: "700",
            fontSize: 16,
            borderRadius: 20,
          }}
        >
          {item.order_status}
        </Text>
        <Text style={{ fontSize: 14, fontWeight: "700", color: "gray" }}>
          {formattedDate}
        </Text>
      </View>
      <View>
        <Ionicons name="checkmark-circle" size={40} color="green" />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  name: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.black,
  },
  price: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.orange,
  },
});
