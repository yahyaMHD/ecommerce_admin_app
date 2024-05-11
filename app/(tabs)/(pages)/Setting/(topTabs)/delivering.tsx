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
import { useDeleteOrder, useOrderList, useUpdateOrder } from "@/api/orders";
import { router } from "expo-router";
import moment from "moment"; // Add this at the top of your file
import { colors } from "@/constants/Theme";

import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("screen");
const emptyList = require('../../../../../assets/images/emptyList.png')


export default function delivering() {
  const { data: orderList, isLoading } = useOrderList();

  const fetchDeliveringOrders = orderList?.filter(
    (o) => o.order_status === "delivering"
  );

  return isLoading ? (
    <ActivityIndicator />
  ) : fetchDeliveringOrders?.length?(
    <View style={{ flex: 1 }}>
      <FlatList
        data={fetchDeliveringOrders}
        renderItem={({ item }) => <Item item={item} />}
      />
    </View>
  ):(
    <View>
      <Image source={emptyList} style={{width:width, height:height*0.5, justifyContent:'center', marginTop:20}} />
    </View>)
}

const Item = ({ item }: any) => {
  const formattedDate = moment(item.created_at).fromNow();

  const { mutate: deleteOrder } = useDeleteOrder();
  const { mutate: updateOrder } = useUpdateOrder();

  const DeliveredOrder = () => {
    Alert.alert(
      "Have you delivered the order ?",
      "this act will make the order as done status ",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Accept",
          onPress: () => {
            updateOrder(
              {
                id: item.id,
                name: item.name,
                address: item.address,
                phone_number: item.phone_number,
                total_price: item.total_price,
                order_status: "done",
                products: item.products,
              },
              {
                onSuccess: () => {
                  router.push("/(tabs)/(pages)/Setting/(topTabs)/done");
                },
              }
            );
          },
        },
      ]
    );
  };
  const DeclineOrder = () => {
    Alert.alert(
      "Do you want to decline the order ?",
      "this act will remove the order ",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Decline",
          onPress: () => {
            deleteOrder(item.id);
          },
        },
      ]
    );
  };

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
            backgroundColor: colors.orange,
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
        <Pressable style={{ margin: 4 }} onPress={DeliveredOrder}>
          <Text
            style={{
              padding: 5,
              borderRadius: 100,
              backgroundColor: "green",
              color: colors.white,
              fontWeight: "800",
              textAlign: "center",
            }}
          >
            Delivered
          </Text>
        </Pressable>
        <Pressable style={{ margin: 4 }} onPress={DeclineOrder}>
          <Text
            style={{
              padding: 5,
              borderRadius: 100,
              backgroundColor: "red",
              color: colors.white,
              fontWeight: "800",
              textAlign: "center",
            }}
          >
            Stop
          </Text>
        </Pressable>
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
