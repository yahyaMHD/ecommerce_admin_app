import { View, Text } from 'react-native'
import React from 'react'

import{createMaterialTopTabNavigator, MaterialTopTabNavigationOptions, MaterialTopTabNavigationEventMap} from'@react-navigation/material-top-tabs'
import { withLayoutContext } from 'expo-router'
import { ParamListBase, TabNavigationState } from '@react-navigation/native'


const {Navigator} = createMaterialTopTabNavigator()


export const MaterialTopTabs = withLayoutContext<
MaterialTopTabNavigationOptions,
typeof Navigator,
TabNavigationState<ParamListBase>,
MaterialTopTabNavigationEventMap
>(Navigator)

const Layout = () => {
    return <MaterialTopTabs
    screenOptions={{
        tabBarActiveTintColor:'black',
        tabBarLabelStyle:{fontWeight:'bold'},
        tabBarIndicatorStyle:{backgroundColor:'green', height:3}
    }}
    >
        <MaterialTopTabs.Screen name='waitting' options={{title:'waitting'}}/>
        <MaterialTopTabs.Screen name='delivering' options={{title:'delivering'}}/>
        <MaterialTopTabs.Screen name='done' options={{title:'Done'}}/>
    </MaterialTopTabs>
}

export default Layout