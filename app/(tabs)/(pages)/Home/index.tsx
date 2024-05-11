import React, { useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Dimensions,
  ScrollView,
  Image,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/constants/Theme";
import Categories from "../../../../components/Categories";
import Products from "../../../../components/Products";
import { Link } from "expo-router";
import { useSliderList } from "@/api/slider";
const { width, height } = Dimensions.get("window");

interface ImageCardProps {
  item: {
    image: string;
  };
  index: number;
}

const Home: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [searchText, setSearchText] = useState("");

  const flatListRef = useRef<FlatList>(null);
  const { data: imagesList , isLoading} = useSliderList();

  const handleEndReach = () => {
    if (flatListRef.current && imagesList && imagesList.length > 0) {
      flatListRef.current.scrollToIndex({ index: 0, animated: true });
    }
  };

  
  return isLoading? <ActivityIndicator size={40}  color="blue" style={{justifyContent:'center', alignItems:'center', flex:1}} /> : (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Ionicons
            style={{ padding: 2 }}
            name="search-sharp"
            size={30}
            color="black"
          />
          <View style={{ flex: 1 }}>
            <TextInput
              value={searchText}
              onChangeText={(p) => setSearchText(p)}
              style={{ fontSize: 20 }}
              placeholder="search on shoppyTec"
            />
          </View>
        </View>
        <Link href="/(tabs)/(pages)/Home/CreateProduct" asChild>
          <MaterialIcons name="add-box" size={30} color={colors.orange} />
        </Link>
      </View>

      <ScrollView>
        <SliderHeader />
        <FlatList
          ref={flatListRef}
          data={imagesList}
          renderItem={({ item, index }) => (
            <ImageCard item={item} index={index} />
          )}
          horizontal={true}
          pagingEnabled
          snapToAlignment="center"
          showsHorizontalScrollIndicator={false}
          onEndReached={handleEndReach}
        />

        <View>
          <Categories
            selectedCategory={selectedCategory}
            handelSelectedCategory={setSelectedCategory}
          />
        </View>

        <View style={{ flex: 1, marginVertical: 10 }}>
          <View style={{ marginHorizontal: 10 }}>
            <Text
              style={{ color: colors.blue, fontSize: 20, fontWeight: "800" }}
            >
              Products
            </Text>
          </View>
          <Products
            selectedCategory={selectedCategory}
            searchText={searchText}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const ImageCard: React.FC<ImageCardProps> = ({ item, index }) => {
  return (
    <View key={index} style={styles.imageCardContainer}>
      <Image source={{ uri: item.image }} style={styles.imageCard} />
    </View>
  );
};

const SliderHeader = () => {
  return (
    <View style={styles.logoContainer}>
      <Ionicons name="storefront-outline" size={24} color="black" />
      <Text style={styles.logo}>
        <Text style={{ color: colors.blue }}>SHOP</Text>
        <Text style={{ color: colors.orange }}>P</Text>
        <Text style={{ color: colors.violette }}>TEC</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    paddingTop: 40,
    paddingBottom: 10,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#202020",
  },
  searchContainer: {
    flexDirection: "row",
    flex: 1,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "#F7F7F7",
    alignItems: "center",
    marginRight: 10, // Used instead of gap
  },
  logo: {
    fontSize: height * 0.03,
    fontWeight: "700",
  },
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    margin: 10,
  },
  imageCardContainer: {
    padding: 10,
    backgroundColor: "#F7F7F7",
    borderRadius: 20,
    elevation: 10,
    marginRight: 30, // Used instead of gap
  },
  imageCard: {
    width: 200,
    height: 120,
    borderRadius: 20,
  },
});

export default Home;
