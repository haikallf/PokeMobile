import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import { globalStyles } from "../styles/globalStyles";
import PokemonLists from "./PokemonLists";

export default function PokemonSheet(props) {
  return (
    <SafeAreaView style={globalStyles.safeAreaView}>
      <PokemonLists setPokemon={props.setPokemon} />
    </SafeAreaView>
  );
}
