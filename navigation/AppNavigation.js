import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import Colors from "../constants/Colors";

import DetailsScreen from "../screens/Home/DetailsScreen";
import LandingScreen from "../screens/Home/LandingScreen";
import SearchScreen from "../screens/Home/SearchScreen";



const HomeNavigator = createStackNavigator({
    Home: LandingScreen,
    Search: SearchScreen,
    Details: DetailsScreen
}, {
    defaultNavigationOptions: {
        headerTintColor: Colors.primary,
        headerStyle: {
            backgroundColor: Colors.darkVariant,
            shadowOpacity: 0,
            elevation: 0
        }
    }
});

export default createAppContainer(HomeNavigator);