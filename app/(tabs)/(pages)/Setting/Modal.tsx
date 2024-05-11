import { useOrderList, useOrderWithID } from "@/api/orders";
import { colors } from "@/constants/Theme";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";
import { Linking } from "react-native";

const Modal = () => {
  let { ItemId }: any = useLocalSearchParams();
  const { data: orders } = useOrderList();
  const order = orders?.find((o: any) => o.id == ItemId);

  const handlePhoneCall = () => {
    const phoneNumber = order.phone_number;
    const url = `tel:${phoneNumber}`;

    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          console.error("Unable to open dialer");
        }
      })
      .catch((err) => console.error("An error occurred: ", err));
  };

  const openInMaps = () => {
    if (order.location_longitude && order.location_latitude) {
      const url = `https://www.google.com/maps/search/?api=1&query=${order.location_latitude},${order.location_longitude}`;
      Linking.openURL(url);
    }
  };

  return (
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: "white",
          margin: 15,
          borderRadius: 20,
          elevation: 100,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text
            style={{
              textAlign: "center",
              margin: 20,
              fontWeight: "800",
              fontSize: 22,
              letterSpacing: 1,
            }}
          >
            {order.order_status && order.order_status}
          </Text>
          <Text style={{ fontWeight: "700", fontSize: 18, color: "gray" }}>
            {order.created_at.slice(0, 10) +
              "   " +
              order.created_at.slice(11, 19)}
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
            margin: 10,
          }}
        >
          <Text
            style={{ fontSize: 20, fontWeight: "800", color: colors.orange }}
          >
            name :
          </Text>
          <Text style={{ fontSize: 20, fontWeight: "800", color: "gray" }}>
            {order.name}
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
            margin: 10,
          }}
        >
          <Entypo
            name="location"
            size={35}
            color="blue"
            onPress={() => openInMaps()}
          />
          <Feather
            name="phone-call"
            size={35}
            color="green"
            onPress={() => handlePhoneCall()}
          />
        </View>

        <View
          style={{ justifyContent: "center", alignItems: "center", margin: 10 }}
        >
          <Text
            style={{ fontSize: 20, fontWeight: "800", color: colors.orange }}
          >
            address :
          </Text>
          <Text style={{ fontSize: 20, fontWeight: "800", color: "gray" }}>
            {order.address}
          </Text>
        </View>

        <View
          style={{
            justifyContent: "space-evenly",
            alignItems: "center",
            margin: 10,
          }}
        >
          <Text
            style={{ fontSize: 20, fontWeight: "800", color: colors.orange }}
          >
            Total :
          </Text>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "800",
              color: "gray",
              letterSpacing: 2,
            }}
          >
            {order.total_price} DA
          </Text>
        </View>

        <View style={{ margin: 10 }}>
          <Text
            style={{ fontSize: 20, fontWeight: "800", color: colors.orange }}
          >
            products :
          </Text>
          {order.products.map((p: any, index: any) => (
            <Text
              key={index}
              style={{ fontSize: 18, fontWeight: "700", letterSpacing: 1 }}
            >
              {p.name}
            </Text>
          ))}
        </View>
      </ScrollView>
  );
};

export default Modal;
