import React from 'react';
import {
  Platform,
  Text
} from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';
import SelectScreen from '../screens/select/SelectMain';
import GuessScreen from '../screens/guess/GuessMain';
import COLORS from '../constants/colors';
import { Ionicons } from '@expo/vector-icons';
import {
  createMaterialBottomTabNavigator
} from 'react-navigation-material-bottom-tabs';

const tabScreenConfig = {
  Guess: {
    screen: GuessScreen,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return (<Ionicons name='bulb' size={25} color={tabInfo.tintColor} />)
      },
      tabBarColor: COLORS.primaryColor,
      tabBarLabel: <Text>Guess</Text>
    }
  },
  Select: {
    screen: SelectScreen,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return <Ionicons name='happy' size={25} color={tabInfo.tintColor} />
      },
      tabBarColor: COLORS.secondaryColor,
      tabBarLabel: <Text>Select</Text>
    }
  },
};  

const MainNavigator = Platform.OS === 'android' ? createMaterialBottomTabNavigator(
  tabScreenConfig,
  {
    activeTintColor: '#fff',
    shifting: true,
    barStyle: {
      backgroundColor: COLORS.primaryColor
    }
  }
) : createBottomTabNavigator(tabScreenConfig, {
  tabBarOptions: {
    activeTintColor: COLORS.primaryColor,
    // backgroundColor: 'yellow',
  }
});

export default createAppContainer(MainNavigator);