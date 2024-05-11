import { View, Text, TextInput, Image, Pressable, ActivityIndicator, Alert } from 'react-native'
import React, { useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import { colors } from '../../constants/Theme';
import { useAddcategory, useCategorytList, useDeleteCategory } from '../../api';

import { useNavigation } from '@react-navigation/native'

import { AntDesign } from '@expo/vector-icons';

const Categories = () => {

  const [selectedImage, setSelectedImage] = useState(null)
  const [categoryName, setCategoryName] = useState('')

  const { mutate: addCategory } = useAddcategory()
  const {mutate: deleteCategory} = useDeleteCategory()


  const { data: categoriesData, error, isLoading } = useCategorytList()


  const navigation = useNavigation()


  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowshandleDeleteEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    } else {
      alert('You did not select any image.');
    }
  };


  const validate = () => {
    addCategory({ name: categoryName, image: selectedImage }, {
      onSuccess: () => {
        navigation.goBack()
      }
    })
  }




  const handleDelete  = (id) => {
    return (
      Alert.alert("delete category", "are you sure you want to change the category ?", [
        {
          text: "Delete",
          style: 'destructive',
          onPress: () => {
            deleteCategory(id, {onSuccess: () => {
              navigation.goBack()
            }})
          }
        },
        {
          text: "Cancel",
          style: 'cancel'
        },
      ])
    )
  }



  return (

    <View>
      <View style={{ gap: 10 }}>
        <View>
          <Text>category image</Text>
          <Image source={{ uri: selectedImage }} style={{ width: 100, height: 100 }} />
          <Text style={{ color: 'blue', fontSize: 18 }} onPress={() => pickImageAsync()} >select Image</Text>
        </View>
        <View>
          <Text>category name :</Text>
          <TextInput value={categoryName} onChangeText={(name) => setCategoryName(name)} style={{ borderWidth: 1, marginHorizontal: 30, marginVertical: 10, fontSize: 18 }} placeholder='enter category name' />
        </View>
        <Pressable style={{ padding: 10, backgroundColor: colors.blue, borderRadius: 40, alignItems: 'center', margin: 20 }} onPress={() => validate()} >
          <Text>Add Category</Text>
        </Pressable>
      </View>

      {isLoading ? <ActivityIndicator /> : (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}  >
          {categoriesData.map((category, index) => {
            return (
              <View  style={{ backgroundColor: '#E0E0E0', margin: 10, padding: 10, borderRadius: 100 , flexDirection:'row', gap:5}} >
                <Text style={{ fontSize: 16, fontWeight: '700', color: '#000' }} > {category.name} </Text>
                <Pressable onPress={() => handleDelete (category.id)} key={index} >
                  <AntDesign name="delete" size={24} color="red" />
                </Pressable>
              </View>
            )
          })}
        </View>
      )}


    </View>
  )
}

export default Categories