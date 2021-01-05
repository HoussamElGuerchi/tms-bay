import React, { useEffect, useState, useCallback } from "react";
import {View, StyleSheet, Alert, SafeAreaView} from "react-native";
import { Text, Spinner, List, Divider } from "@ui-kitten/components"

import Item from "../../components/UI/Item";
import { REACT_APP_TMDB_API_KEY } from "@env";
import Colors from "../../constants/Colors";

const SearchScreen = props => {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [queryResult, setQueryResult] = useState([]);

    const query = props.navigation.getParam("query");
    const api_key = REACT_APP_TMDB_API_KEY;

    const renderItem = ({item}) => (
        <Item
            item={item}
            onItemPress={handleItemPress}
        />
    )

    const handleItemPress = (id, mediaType) => {
        let routeName = "";

        if (mediaType === "tv") {
            routeName = "TvDetails"
        } else if ( mediaType === "movie" ) {
            routeName = "MovieDetails"
        } else if ( mediaType === "person" ) {
            routeName = "PersonDetails"
        }

        props.navigation.navigate({
            routeName,
            params: { mediaId: id }
        })
    }

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
        fetchQuery();
    }, [fetchQuery]);

    useEffect(() => {
        if (error !== null) {
            Alert.alert("Oops!", error, [{
                text: "Go Back",
                style: "destructive",
                onPress: () => {
                    props.navigation.pop()
                }
            }])
        }
    }, [error])

    if (isLoading) {
        return <View style={{...styles.screen, ...styles.center}}>
            <Spinner size="large" />
        </View>
    }
    return <View style={styles.screen}>
        { queryResult.length === 0 ? <View>
            <Text>Nothnig found matching '{query}'</Text>
        </View> : 
        <SafeAreaView style={styles.listContainer}>
            <List
                data={queryResult}
                keyExtractor={(item) => `${item.id}`}
                renderItem={renderItem}
                ItemSeparatorComponent={Divider}
                contentContainerStyle={styles.list}
                showsHorizontalScrollIndicator={false}
            />
        </SafeAreaView> }
    </View>
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: Colors.light
    },
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    space: {
        marginVertical: 10
    },
    listContainer: {
        flex: 1
    }
});

SearchScreen.navigationOptions =  {
    headerTitle: "Search Results"
}

export default SearchScreen;