import { View, Text, TextInput, Image, Pressable, ActivityIndicator, Alert, ScrollView } from 'react-native'
import React, { useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import { colors } from '../../constants/Theme';

import { useNavigation } from '@react-navigation/native'
import { useAddImageSlider, useDeleteImageSlider, useSliderList } from '../../api/slider';


const SliderContole = () => {

    const [selectedImage, setSelectedImage] = useState()
    const { mutate: addImage } = useAddImageSlider()
    const {mutate: deleteImage} = useDeleteImageSlider()
    const { data: images, error, isLoading } = useSliderList()

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
        addImage({ image: selectedImage }, {
            onSuccess: () => {
                navigation.goBack()
            }
        })
    }


    return (

        <View style={{ flex: 1 }}>
            <View style={{ gap: 10 }}>
                <View>
                    <Text>slider image</Text>
                    <Image source={{ uri: selectedImage }} style={{ width: 100, height: 100 }} />
                    <Text style={{ color: 'blue', fontSize: 18 }} onPress={() => pickImageAsync()} >select Image</Text>
                </View>
            </View>

            <Pressable style={{ padding: 10, backgroundColor: colors.blue, borderRadius: 40, alignItems: 'center', margin: 20 }} onPress={() => validate()} >
                <Text>Add Image</Text>
            </Pressable>

            <ScrollView>

                <View>
                    {isLoading ? <ActivityIndicator /> : (
                        images.map((image, index) => (
                            <View key={index}>
                                <Image source={{ uri: image.image }} style={{ width: 100, height: 100 }} />
                                <Pressable onPress={() => deleteImage(image.id, {onSuccess: () => {
                                    navigation.goBack()
                                }})} >
                                    <Text >delete</Text>
                                </Pressable>
                            </View>
                        ))
                    )}
                </View>

            </ScrollView>
        </View>
    )
}

export default SliderContole