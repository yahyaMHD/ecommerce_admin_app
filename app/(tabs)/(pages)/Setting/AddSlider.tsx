import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Image,
  Pressable,
  ActivityIndicator,
  Alert,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../../../constants/Theme";

import {
  useAddImageSlider,
  useDeleteImageSlider,
  useSliderList,
} from "../../../../api/slider";

const SliderContole = () => {
  const defaultSlider = require("../../../../assets/images/defaultSlider.jpg");
  const [selectedImage, setSelectedImage] = useState(null);
  const { mutate: addImage } = useAddImageSlider();
  const { mutate: deleteImage } = useDeleteImageSlider();
  const { data: images, isLoading } = useSliderList();
  const navigation = useNavigation();

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    } else {
      Alert.alert("Image Selection", "You did not select any image.");
    }
  };

  const validate = () => {
    addImage(
      { image: selectedImage },
      {
        onSuccess: () => {
          navigation.goBack();
        },
      }
    );
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <Text style={styles.headerText}>Slider Image</Text>
          <Image
            source={selectedImage ? { uri: selectedImage } : defaultSlider}
            style={styles.image}
          />
          <Text style={styles.selectImageText} onPress={pickImageAsync}>
            Select Image
          </Text>
        </View>

        <Pressable style={styles.addButton} onPress={validate}>
          <Text style={styles.addButtonText}>Add Image</Text>
        </Pressable>

        <View style={styles.imageListContainer}>
          {isLoading ? (
            <ActivityIndicator size="large" color={colors.blue} />
          ) : (
            images &&
            images.map((image, index) => (
              <View style={styles.imageContainer} key={index}>
                <Image source={{ uri: image.image }} style={styles.thumbnail} />
                <Pressable
                  onPress={() =>
                    deleteImage(image.id, {
                      onSuccess: () => {
                        navigation.goBack();
                      },
                    })
                  }
                >
                  <View style={styles.deleteButton}>
                    <Text style={styles.deleteButtonText}>Delete</Text>
                  </View>
                </Pressable>
              </View>
            ))
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default SliderContole;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  innerContainer: {
    alignItems: "center",
    margin: 10,
    gap: 5,
  },
  headerText: {
    fontSize: 22,
    fontWeight: "800",
    color: colors.black,
  },
  image: {
    width: 300,
    height: 200,
    borderRadius: 20,
  },
  selectImageText: {
    color: "blue",
    fontSize: 20,
    fontWeight: "700",
  },
  addButton: {
    padding: 10,
    backgroundColor: colors.blue,
    borderRadius: 40,
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 5,
  },
  addButtonText: {
    color: colors.white,
    fontSize: 20,
    fontWeight: "800",
  },
  imageListContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    marginTop: 20,
  },
  imageContainer: {
    alignItems: "center",
  },
  thumbnail: {
    width: 200,
    height: 150,
  },
  deleteButton: {
    padding: 4,
    backgroundColor: colors.black,
    borderRadius: 40,
    alignItems: "center",
    marginHorizontal: 20,
    marginVertical: 5,
    width: 120,
    height: 40,
    justifyContent: "center",
  },
  deleteButtonText: {
    color: colors.white,
    fontWeight: "700",
    fontSize: 18,
  },
});
