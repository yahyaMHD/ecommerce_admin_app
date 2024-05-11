import { StyleSheet, Text, View, Image, Dimensions, FlatList, TouchableOpacity, Pressable } from 'react-native'
import React, { useState } from 'react'

import { colors } from '@/constants/Theme';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';
import { useProductList } from '@/api/products';

const { width, height } = Dimensions.get('window')



const Products = ({ selectedCategory, searchText }:any) => {

    const { data: productList } = useProductList()

    const fetchedProducts = searchText.length > 0 ? productList?.filter(p => p.name.includes(searchText)) : selectedCategory == null ? productList : productList?.filter(p => p.category === selectedCategory)

    const navigation = useNavigation()

    const [heart, setHeart] = useState(null)

    return (
        <View style={{ flex: 1, padding: 5, alignItems: 'center', justifyContent: 'center', }}>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={fetchedProducts}
                renderItem={({ item, index }) => <Product item={item} index={index} setHeart={setHeart} heart={heart} />}
                numColumns={2}
                scrollEnabled={false}
            />
        </View>
    )
}

export default Products

const Product = ({ item, index, setHeart, heart }:any) => {

    return (

        <View style={styles.Product} key={index}  >
            <Image source={{ uri: item.image }} style={{ width: '100%', height: height * 0.2, borderRadius: 10 }} />

            <View style={{ flex: 1, marginVertical: 10 }}>
                <Text style={{ fontSize: 22, fontWeight: '700', textAlign: 'center' }}>{item.name}</Text>

                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                        <Text style={{ fontSize: 22, fontWeight: '700' }}>{item.price}</Text>
                        <Text style={{ color: colors.orange, fontWeight: '800', fontSize: 16 }}>DA</Text>
                    </View>
                    <AntDesign name="heart" size={24} color={heart == item.id ? 'red' : 'gray'} onPress={() => setHeart(item.id)} />
                </View>
                <Pressable onPress={() => router.push({pathname:'/Home/Details',params:{itemId : item.id} })} style={{ borderRadius: 20, backgroundColor: colors.orange, padding: 8 }} >
                    <Text style={{ color: colors.white, fontWeight: '700', marginHorizontal: 6, fontSize: 16, textAlign: 'center' }}>voir plus</Text>
                </Pressable>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    Product: {
        paddingTop: 15,
        paddingBottom: 5,
        paddingHorizontal: 10,
        backgroundColor: '#F7F7F7',
        borderRadius: 20,
        elevation: 10,
        width: width * 0.45,
        height: height * 0.40,
        margin: 5,
    }
})