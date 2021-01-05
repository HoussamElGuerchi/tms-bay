import React from "react";
import { StyleSheet, Image } from "react-native";
import { ListItem, Text } from "@ui-kitten/components";

const Item = props => {
    const imagesRep = "https://image.tmdb.org/t/p/w92";

    const getImageSource = () => {
        let imageSource;

        if ( ("profile_path" in props.item) && props.item['profile_path'] !== null ) {
            imageSource = {
                uri: `${imagesRep}${props.item['profile_path']}`
            }
        } else if (("poster_path" in props.item) && props.item['poster_path'] !== null) {
            imageSource = {
                uri: `${imagesRep}${props.item['poster_path']}`
            }
        } else {
            imageSource = require("../../assets/images/image-not-available.png");
        }

        return imageSource;
    }

    const handleItemPress = () => {
        props.onItemPress(props.item.id, props.item["media_type"]);
    }

    return <ListItem
        title={
            ("original_name" in props.item) ? props.item["original_name"] :
                ("original_title" in props.item) ? props.item["original_title"] : props.item.name
        }
        description={(props.item["media_type"].charAt(0).toUpperCase() + props.item["media_type"].slice(1))}
        accessoryLeft={() => (
            <Image
                source={getImageSource()}
                style={styles.image}
            />)
        }
        onPress={handleItemPress}
    />
};

const styles = StyleSheet.create({
    image: {
        width: 50,
        height: 50
    }
});

export default Item;