import React, { useEffect, useState, useCallback } from "react";
import {View, StyleSheet, ScrollView, Alert} from "react-native";
import { Text, Spinner } from "@ui-kitten/components"

import { REACT_APP_TMDB_API_KEY } from "@env";
import Colors from "../../constants/Colors";

const SearchScreen = props => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [queryResult, setQueryResult] = useState([]);

    const query = props.navigation.getParam("query");
    const api_key = REACT_APP_TMDB_API_KEY;

    const fetchQuery = useCallback(
        async () => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=${api_key}&query=${query}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                if (!response.ok) {
                    const errorResult = await response.json();
                    throw new Error(errorResult["status_message"]);
                }
    
                const result = await response.json();
                console.log(result.results.length);
                setQueryResult(result.results);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        },
        [isLoading, error],
    );

    useEffect(() => {
        // fetch(`https://api.themoviedb.org/3/search/multi?api_key=f4d99b3567fb217391c6e1132d107acb&query=${query}`, {
        //     method: "GET",
        //     headers: {
        //         "Content-Type": "application/json"
        //     }
        // })
        // .then(response => response.json())
        // .then(result => console.log(result.results))
        // .catch(err => console.log(err.message))
        // .finally(() => setIsLoading(false));

        fetchQuery();
    }, [fetchQuery]);

    useEffect(() => {
        if (error !== null) {
            Alert.alert("Oops!", error, [
                {
                    text: "Go Back",
                    style: "destructive",
                    onPress: () => {
                        props.navigation.pop()
                    }
                }
            ])
        }
    }, [error])

    if (isLoading) {
        return <View style={{...styles.screen, ...styles.center}}>
            <Spinner size="large" />
        </View>
    }
    return <ScrollView style={styles.screen}>
        <Text>{query}</Text>
    </ScrollView>
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: Colors.dark,
        padding: 20
    },
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});

SearchScreen.navigationOptions =  {
    headerTitle: "Search Results"
}

export default SearchScreen;