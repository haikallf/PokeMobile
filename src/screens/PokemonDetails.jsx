import { View, Text } from "react-native";
import React from "react";

export default function PokemonDetails({ route }) {
  const { id, name } = route.params;

  return (
    <View>
      <Text>ID: {id}</Text>
      <Text>Name: {name}</Text>
    </View>
  );
}
