import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { getPokemonImgById } from "../services/pokemon-api";

export default function PokemonCard(props) {
  return (
    <TouchableOpacity
      onPress={() =>
        props.navigation.navigate("Details", {
          id: props.id,
          name: props.name,
        })
      }
    >
      <View style={styles.view}>
        <Image
          source={{ uri: getPokemonImgById(props.id) }}
          style={{ width: 100, height: 100 }}
        />
        <Text>{props.name}</Text>
      </View>
    </TouchableOpacity>
  );
}

export const styles = StyleSheet.create({
  view: {
    backgroundColor: "#fff",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
});
