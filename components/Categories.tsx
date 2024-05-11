import React, { useState } from 'react';
import { View, Text, Image, Pressable, StyleSheet, FlatList } from 'react-native';
import { colors } from '@/constants/Theme';
import { useCategorytList } from '@/api';

const Categories = ({ selectedCategory, handelSelectedCategory }:any) => {
  const { data: categories } = useCategorytList();

  // to choose the all category 
  let isNull = selectedCategory == null 
  return (
    <View>
      <View style={{ marginVertical: 10, marginHorizontal: 10 }}>
        <Text style={{ color: colors.blue, fontSize: 20, fontWeight: '800' }}>Categories</Text>
      </View>

      <FlatList
        ListHeaderComponent={<Pressable onPress={() => handelSelectedCategory(null)} style={[styles.categoryContainer, {backgroundColor: isNull ? '#202020' : '#fff'}]}><Text style={{fontSize:22, fontWeight:'700' ,color: isNull? '#fff' : '#202020'}}>all</Text></Pressable>}
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CategoryItem item={item} handelSelectedCategory={handelSelectedCategory} selectedCategory={selectedCategory} />
        )}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ alignItems: 'center' }}
      />
    </View>
  );
};

export default Categories;

const CategoryItem = ({ item, handelSelectedCategory, selectedCategory }:any) => {
  let isActiveCategory = selectedCategory === item.name
  const backgroundColor = isActiveCategory ? colors.blue : colors.white
  const color = isActiveCategory ? colors.white : colors.black
  const borderColor = isActiveCategory ? colors.orange : colors.blue
  return (
    <Pressable
      onPress={() => handelSelectedCategory(item.name)}
      style={[styles.categoryContainer, {
        borderColor,
        backgroundColor,
      }]}
    >
      <Image source={{ uri: item.image }} style={{ width: 40, height: 40 }} />
      <Text
        style={{
          fontWeight: '700',
          fontSize: 18,
          color,
        }}
      >
        {item.name}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginHorizontal: 10,
    borderWidth: 1,
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 50,
  }

});
