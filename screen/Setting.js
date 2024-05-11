import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../constants/Theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import { useCategoryList } from '../api/index';

const Setting = () => {
  const { top } = useSafeAreaInsets();
  const paddingTop = top > 0 ? top + 10 : 30;
  const navigation = useNavigation();

  return (
    <View style={[styles.container, { paddingTop }]}>
      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('sliderControle')}>
        <Text>Add Slider</Text>
      </Pressable>

      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('AddCategories')}>
        <Text>Add Categories</Text>
      </Pressable>
    </View>
  );
};

export default Setting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderColor: colors.blue,
    borderRadius: 5,
  },
});
