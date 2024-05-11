import { StyleSheet, Text, View, Image, TextInput, Pressable } from 'react-native'
import React, { useState } from 'react'

import * as ImagePicker from 'expo-image-picker';
import { useCreateProduct } from '../../api/products';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../constants/Theme';

const CreateProduct = () => {

    const navigation = useNavigation()

    const {mutate: createProduct} = useCreateProduct()


    const [selectedImage, setSelectedImage] = useState(null)
    const [productName, setProductName] = useState('')
    const [productPrice, setProductPrice] = useState(null)
    const [productSmallDescription, setProductSmallDescription] = useState('')
    const [productLongDescription, setProductLongDescription] = useState('')
    const [productCategory, setProductCategory] = useState('')
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
        createProduct({
            name: productName,
            image: selectedImage,
            category: productCategory,
            price: parseFloat(productPrice),
            smallDescription: productSmallDescription,
            longDescription: productLongDescription,
        }, {
            onSuccess: () => navigation.goBack(),
            onError: (error) => alert(`Error: ${error.message}`),
        });
    };


    return (
        <View style={{ flex: 1 }}>
            <View style={{ alignItems: 'center', justifyContent: 'center' }} >
                <Text>choose product's image</Text>
                <Image source={{ uri: selectedImage }} style={{ width: 100, height: 100 }} />
                <Text style={{ color: 'blue', fontSize: 18 }} onPress={() => pickImageAsync()} >select Image</Text>
                <View style={{ justifyContent: 'center' }}>

                    <View>
                        <Text>Prodct's name :</Text>
                        <TextInput value={productName} onChangeText={(v) => setProductName(v)} placeholder="product's name" placeholderTextColor={'gray'} autoCorrect={false} style={styles.TextInput} />
                    </View>
                    <View>
                        <Text>Prodct's price :</Text>
                        <TextInput value={productPrice} onChangeText={(v) => setProductPrice(v)} placeholder="product's price" placeholderTextColor={'gray'} autoCorrect={false} style={styles.TextInput} />
                    </View>
                </View>
                <View>
                    <Text>Prodct's smallDescription :</Text>
                    <TextInput value={productSmallDescription} onChangeText={(v) => setProductSmallDescription(v)} placeholder="product's smallDescription" placeholderTextColor={'gray'} autoCorrect={false} style={styles.TextInput} />
                </View>
                <View>
                    <Text>Prodct's longDescription :</Text>
                    <TextInput value={productLongDescription} onChangeText={(v) => setProductLongDescription(v)} placeholder="product's longDescription" placeholderTextColor={'gray'} autoCorrect={false} style={styles.TextInput} />
                </View>
                <View>
                    <Text>Prodct's category :</Text>
                    <TextInput value={productCategory} onChangeText={(v) => setProductCategory(v)} placeholder="product's category" placeholderTextColor={'gray'} autoCorrect={false} style={styles.TextInput} />
                </View>

            </View>
            <View>
                <Pressable style={{ padding: 10, backgroundColor: colors.blue, borderRadius: 40, alignItems: 'center', margin: 20 }} onPress={() => validate()} >
                    <Text>Add Product</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default CreateProduct

const styles = StyleSheet.create({
    TextInput: {
        height: 40,
        width: 300,
        marginTop: 8,
        marginHorizontal: 20,
        paddingHorizontal: 10,
        alignSelf: 'center',
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 20,
        borderColor: 'gray'
    }
})