import React, { useEffect, useState } from 'react';
import { View, Text, Image, Dimensions, Pressable, Alert, ScrollView, TextInput, StyleSheet } from 'react-native';
import { useDeleteProduct, useProduct, useUpdateProduct } from '../api/products';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { colors } from '../constants/Theme';

const { width, height } = Dimensions.get('window');

const Details = (props) => {
    const itemId = props.route.params;

    const { mutate: deleteProduct } = useDeleteProduct();
    const { mutate: updateProduct } = useUpdateProduct();
    const { data: updatingProduct } = useProduct(itemId);
    const navigation = useNavigation();

    const [selectedImage, setSelectedImage] = useState(null);
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productSmallDescription, setProductSmallDescription] = useState('');
    const [productLongDescription, setProductLongDescription] = useState('');
    const [productCategory, setProductCategory] = useState('');

    const pickImageAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowEditing: true,
            quality: 1,
        });

        if (!result.cancelled) {
            setSelectedImage(result.assets[0].uri);
        }
    };

    useEffect(() => {
        if (updatingProduct) {
            setSelectedImage(updatingProduct.image);
            setProductName(updatingProduct.name);
            setProductPrice(updatingProduct.price.toString());
            setProductSmallDescription(updatingProduct.smallDescription);
            setProductLongDescription(updatingProduct.longDescription);
            setProductCategory(updatingProduct.category);
        }
    }, [updatingProduct]);

    const handleDelete = () => {
        Alert.alert("Delete Product", "Are you sure you want to delete this product?", [
            {
                text: 'OK',
                style: 'cancel',
                onPress: () => {
                    deleteProduct(updatingProduct.id, {
                        onSuccess: () => {
                            navigation.goBack();
                        }
                    });
                }
            },
            {
                text: 'Cancel',
            }
        ]);
    };

    const handleUpdate = () => {
        Alert.alert("Update Product", "Are you sure you want to update this product?", [
            {
                text: 'OK',
                style: 'cancel',
                onPress: () => {
                    updateProduct({ id: updatingProduct.id, name: productName, image: selectedImage, category: productCategory, price: parseFloat(productPrice), smallDescription: productSmallDescription, longDescription: productLongDescription }, {
                        onSuccess: () => {
                            navigation.goBack();
                        }
                    });
                }
            },
            {
                text: 'Cancel',
            }
        ]);
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={{ uri: selectedImage }} style={styles.image} />
                <Text style={styles.updateImageText} onPress={() => pickImageAsync()}>Update Image</Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput value={productName} onChangeText={(v) => setProductName(v)} placeholder="Product Name" style={styles.input} />
                <TextInput value={productPrice} onChangeText={(v) => setProductPrice(v)} placeholder="Product Price" style={styles.input} keyboardType="numeric" />
                <TextInput value={productSmallDescription} onChangeText={(v) => setProductSmallDescription(v)} placeholder="Small Description" style={styles.input} />
                <TextInput value={productLongDescription} onChangeText={(v) => setProductLongDescription(v)} placeholder="Long Description" style={styles.input} />
                <TextInput value={productCategory} onChangeText={(v) => setProductCategory(v)} placeholder="Category" style={styles.input} />
            </View>
            <View style={styles.buttonContainer}>
                <Pressable onPress={handleUpdate} style={styles.button}>
                    <Text style={styles.buttonText}>Update</Text>
                </Pressable>
                <Pressable onPress={handleDelete} style={[styles.button, { backgroundColor: colors.red }]}>
                    <Text style={styles.buttonText}>Delete</Text>
                </Pressable>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    image: {
        width: 150,
        height: 150,
    },
    updateImageText: {
        color: 'blue',
        fontSize: 18,
        fontWeight: '700',
        marginTop: 10,
    },
    inputContainer: {
        marginHorizontal: 20,
        marginTop: 20,
    },
    input: {
        height: 40,
        width: '100%',
        marginTop: 8,
        paddingHorizontal: 10,
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 20,
        borderColor: 'gray',
    },
    buttonContainer: {
        margin: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        backgroundColor: colors.blue,
        padding: 10,
        borderRadius: 100,
        alignItems: 'center',
        flex: 1,
        marginHorizontal: 5,
    },
    buttonText: {
        color: '#A8BCFF',
        fontWeight: '700',
        fontSize: height * 0.03,
    },
});

export default Details;
