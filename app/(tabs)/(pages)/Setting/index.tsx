import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../../../../constants/Theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Link } from "expo-router";
const Setting = () => {
  const { top } = useSafeAreaInsets();
  const paddingTop = top > 0 ? top + 10 : 30;

  return (
    <View style={[styles.container, { paddingTop }]}>
        <View style={styles.button}>
      <Link href="/(tabs)/(pages)/Setting/AddSlider">
          <Text>Add Slider</Text>
      </Link>
        </View>

      <View style={styles.button}>
        <Link href="/(tabs)/(pages)/Setting/AddCategories">
          <Text>Add Category</Text>
        </Link>
      </View>
      <View style={styles.button}>
        <Link href="/(tabs)/(pages)/Setting/(topTabs)/waitting">
          <Text>orders</Text>
        </Link>
      </View>
    </View>
  );
};

export default Setting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderColor: colors.blue,
    borderRadius: 5,
  },
});
