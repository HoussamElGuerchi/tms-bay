import React, { useRef, useState } from "react";
import {View, StyleSheet, ImageBackground, TouchableWithoutFeedback, Keyboard, Alert} from "react-native";
import { Text, Input, Icon } from "@ui-kitten/components";

import Colors from "../../constants/Colors";

const LandingScreen = props => {
    const [searchInput, setSearchInput] = useState("");
    const searchIcon = useRef();

    const handleSearchButton = () => {
        searchIcon.current.startAnimation();
        if (searchInput === "" || searchInput === null) {
            Alert.alert("Empty Search", "Make sure to fill search input", [
                {text: "Ok", style: "default"}
            ])
        } else {
            props.navigation.navigate({
                routeName: "Search",
                params: {
                    query: searchInput
                }
            });
        }
    }

    const searchButton = (props) => ( <TouchableWithoutFeedback onPress={() => handleSearchButton()}>
        <Icon 
            {...props}
            name="search-outline"
            animation="zoom"
            ref={searchIcon}
        />
    </TouchableWithoutFeedback> );

    return <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} style={{flex: 1}}>
        <View style={styles.screen}>
            {/* <ImageBackground source={bg} style={styles.imageBg}> */}
                <View style={styles.container}>
                    <Text category="h1" style={styles.space}>Welcome.</Text>
                    <Text category="h5" style={styles.space}>Millions of movies, TV shows and people to discover. Explore now.</Text>
                    <Input
                        placeholder="Search a movie, tv show, person..."
                        value={searchInput}
                        returnKeyType="search"
                        autoCorrect={false}
                        autoCompleteType="off"
                        size="medium"
                        style={styles.space}
                        accessoryRight={searchButton}
                        onChangeText={text => setSearchInput(text)}
                    />
                </View>
            {/* </ImageBackground> */}

            <View style={styles.container}>
                <Text category="h4">Recent Searches</Text>
            </View>
        </View>
    </TouchableWithoutFeedback>
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: Colors.light
    },
    imageBg: {
        width: "100%",
    },
    container: {
        padding: 20
    },
    space: {
        marginVertical: 10
    }
});

export default LandingScreen;