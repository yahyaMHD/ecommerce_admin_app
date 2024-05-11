import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  Pressable,
  ActivityIndicator,
  Alert,
  StyleSheet,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

import { colors } from "../../../../constants/Theme";
import {
  useAddcategory,
  useCategorytList,
  useDeleteCategory,
} from "../../../../api";

const Categories = () => {
  const defaultImage = require("../../../../assets/images/defaultSlider.jpg");
  const [selectedImage, setSelectedImage] = useState(null);
  const [categoryName, setCategoryName] = useState("");

  const { mutate: addCategory } = useAddcategory();
  const { mutate: deleteCategory } = useDeleteCategory();
  const { data: categoriesData, isLoading } = useCategorytList();
  const navigation = useNavigation();

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    } else {
      Alert.alert("Image Picker", "You did not select any image.");
    }
  };

  const validate = () => {
    if (categoryName && selectedImage) {
      addCategory(
        { name: categoryName, image: selectedImage },
        {
          onSuccess: () => {
            navigation.goBack();
          },
        }
      );
    } else {
      Alert.alert("Validation", "Please fill all the fields.");
    }
  };

  const handleDelete = (id) => {
    Alert.alert(
      "Delete Category",
      "Are you sure you want to delete this category?",
      [
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            deleteCategory(id, {
              onSuccess: () => {
                navigation.goBack();
              },
            });
          },
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ]
    );
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Category Image:</Text>
          <Image
            source={selectedImage ? { uri: selectedImage } : defaultImage}
            style={styles.image}
          />
          <Text style={styles.selectImage} onPress={pickImageAsync}>
            Select Image
          </Text>

          <Text style={styles.label}>Category Name:</Text>
          <TextInput
            value={categoryName}
            onChangeText={setCategoryName}
            style={styles.input}
            placeholder="Enter category name"
          />
          <Pressable style={styles.addButton} onPress={validate}>
            <Text style={styles.addButtonText}>Add Category</Text>
          </Pressable>
        </View>

        {isLoading ? (
          <ActivityIndicator size="large" color={colors.blue} />
        ) : (
          <View style={styles.categoryContainer}>
            {categoriesData &&
              categoriesData.map((category, index) => (
                <View key={index} style={styles.category}>
                  <Text style={styles.categoryText}>{category.name}</Text>
                  <Pressable onPress={() => handleDelete(category.id)}>
                    <AntDesign name="delete" size={24} color="red" />
                  </Pressable>
                </View>
              ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default Categories;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    alignSelf: "center",
    marginBottom: 10,
  },
  selectImage: {
    fontSize: 18,
    color: colors.blue,
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    fontSize: 18,
    marginHorizontal: 30,
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: colors.blue,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    marginHorizontal: 30,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  categoryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  category: {
    backgroundColor: "#E0E0E0",
    margin: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: "700",
  },
});
