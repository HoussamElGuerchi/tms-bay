import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import Colors from "../constants/Colors";

import DetailsScreen from "../screens/Home/DetailsScreen";
import LandingScreen from "../screens/Home/LandingScreen";
import SearchScreen from "../screens/Home/SearchScreen";
import TvDetailsScreen from "../screens/Home/Details/TvDetailsScreen";
import MovieDetailsScreen from "../screens/Home/Details/MovieDetailsScreen";
import PersonDetailsScreen from "../screens/Home/Details/PersonDetailsScreen";


const HomeNavigator = createStackNavigator({
    Home: LandingScreen,
    Search: SearchScreen,
    TvDetails: TvDetailsScreen,
    MovieDetails: MovieDetailsScreen,
    PersonDetails: PersonDetailsScreen
}, {
    defaultNavigationOptions: {
        headerTintColor: Colors.light,
        headerBackTitleVisible: false,
        headerStyle: {
            backgroundColor: Colors.primary,
            shadowOpacity: 0,
            elevation: 0
        }
    }
});

export default createAppContainer(HomeNavigator);