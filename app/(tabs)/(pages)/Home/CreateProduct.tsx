import { StyleSheet, Text, View, Image, TextInput, Pressable, ScrollView } from 'react-native'
import React, { useState } from 'react'

import * as ImagePicker from 'expo-image-picker';
import { useCreateProduct } from '../../../../api/products';
import { colors } from '../../../../constants/Theme';
import { useCategorytList } from '../../../../api'
import { router } from 'expo-router'

const CreateProduct = () => {

    const defaultImage = require('../../../../assets/images/defaultSlider.jpg')


    const { data: categoryList } = useCategorytList();
    const { mutate: createProduct } = useCreateProduct()


    const [selectedImage, setSelectedImage] = useState(null)
    const [productName, setProductName] = useState('')
    const [productPrice, setProductPrice] = useState('')
    const [description, setDescription] = useState('')

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
            price: parseFloat(productPrice? productPrice : "0"),
            description: description,
        }, {
            onSuccess: () => router.back(),
            onError: (error) => alert(`Error: ${error.message}`),
        });
    };

    const selectedCategory = (cat:any) => {
        setProductCategory(cat.name)

    }

    return (
        <View style={{ flex: 1, marginTop:20 }}>
            <View style={{ alignItems: 'center', justifyContent: 'center' }} >
                <Text style={{fontSize:18, fontWeight:'700', margin:10}} >choose product's image</Text>
                <Image source={selectedImage?  { uri: selectedImage } : defaultImage} style={{ width: 100, height: 100 }} />
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
                    <Text>Prodct's description :</Text>
                    <TextInput value={description} onChangeText={(v) => setDescription(v)} placeholder="product's description" placeholderTextColor={'gray'} autoCorrect={false} style={styles.TextInput} />
                </View>
                <View style={{marginVertical:10, justifyContent:'center', alignItems:'center'}}>
                    <Text style={{marginBottom:10, fontSize:18, fontWeight:'700'}}>choose category  :</Text>
                    {/* <TextInput value={productCategory} onChangeText={(v) => setProductCategory(v)} placeholder="product's category" placeholderTextColor={'gray'} autoCorrect={false} style={styles.TextInput} /> */}

                    <View style={{ flexDirection: 'row'}}>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                            {categoryList && categoryList.map((cat, index) => (
                                <Pressable onPress={() => selectedCategory(cat)} key={index} style={{backgroundColor: cat.name == productCategory ? 'green' : colors.orange , paddingHorizontal:20, paddingVertical:10, margin:2, borderRadius:100}}>
                                    <Text style={{ color:colors.white , fontWeight:'900', letterSpacing:1}} >{cat.name}</Text>
                                </Pressable >
                            ))}
                        </ScrollView>
                    </View>

                    <View>

                    </View>
                </View>

            </View>
            <View>
                <Pressable style={{ padding: 10, backgroundColor: colors.blue, borderRadius: 40, alignItems: 'center', margin: 20 }} onPress={() => validate()} >
                    <Text style={{color:'#fff', fontSize:22, fontWeight:'700'}}>Add Product</Text>
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