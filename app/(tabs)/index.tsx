import { Animated, Dimensions, Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { colors } from '../../constants/Theme'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { router } from 'expo-router'
const { width, height } = Dimensions.get('window')




const Welcome = () => {

    const welcomeImage = require('../../assets/images/welcome.png')
    // animtaions 

    let duration = 1000

    //image animation

    let fadeImageAnimation = useRef(new Animated.Value(0)).current
    let moveImageAnimation = useRef(new Animated.ValueXY({ x: 0, y: 250 })).current

    // button animation 

    let moveButton = useRef(new Animated.ValueXY({ x: 0, y: 250 })).current

    // handel image animation 

    const handleImageAnimation = () => {
        Animated.sequence([
            Animated.timing(fadeImageAnimation, {
                toValue: 1,
                duration,
                useNativeDriver: true
            }),
            Animated.spring(moveImageAnimation, {
                toValue: { x: 0, y: 0 },
                useNativeDriver: true
            })
        ]).start()
    }
    // handel button animation 

    const handleMoveButton = () => {
        Animated.spring(moveButton, {
            toValue: { x: 0, y: 0 },
            delay: duration + 300,
            useNativeDriver: true
        }).start()
    }

    useEffect(() => {
        handleImageAnimation()
        handleMoveButton()
    }, [handleImageAnimation, handleMoveButton, ])


    const { top } = useSafeAreaInsets()
    const paddingTop = top > 0 ? top + 10 : 30
    return (
        <View style={[styles.container, { paddingTop }]}>
            <View style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={styles.logoContainer}>
                    <Text style={styles.logo}>
                        <Text style={{ color: colors.blue }} >SHOP</Text>
                        <Text style={{ color: colors.orange }}>P</Text>
                        <Text style={{ color: colors.violette }}>TEC</Text>
                    </Text>
                </View>
                <Animated.View style={{ opacity: fadeImageAnimation, transform: moveImageAnimation.getTranslateTransform() }}>
                    <Image source={welcomeImage} style={[styles.image, {borderRadius:300}]} />
                </Animated.View>
            </View>
            <Pressable onPress={() => router.push('/(tabs)/(pages)/Home/')} >
                <Animated.View style={[styles.circle, { transform: moveButton.getTranslateTransform() }]}>
                    <Text style={styles.circleText}>START</Text>
                </Animated.View>
            </Pressable>
        </View>
    )
}

export default Welcome

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    imageContainer: {

    },
    image: {
        width: width > 700 ? 300 : width * 0.8,
        height: height > 700 ? 300 : height * 0.4,
    },
    logoContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 3,
        borderRadius: 30,
        borderColor: colors.blue

    },
    logo: {
        fontSize: height * 0.08,
        fontWeight: '700'
    },
    circle: {
        padding: 30,
        borderRadius: 100,
        backgroundColor: colors.orange,
        alignSelf: 'center',
        width: 130,
        height: 130,
        marginTop: height * 0.10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    circleText: {
        color: colors.white,
        fontSize: 22,
        fontWeight: '700'
    }
})