import React from "react";
import {View, StyleSheet, ScrollView} from "react-native";

const PersonDetailsScreen = () => {
    return <ScrollView contentContainerStyle={styles.screen}>

    </ScrollView>
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});

export default PersonDetailsScreen;