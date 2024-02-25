import {
  View,
  Text,
  Image,
  SafeAreaView,
  StyleSheet,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { getPokemonById, getPokemonImgById } from "../services/pokemon-api";
import { globalStyles } from "../styles/globalStyles";
import { AbilityCard } from "../components/AbilityCard";

export default function PokemonDetails({ route }) {
  const { id, name } = route.params;
  const [pokemon, setPokemon] = useState({});
  const [types, setTypes] = useState([]);

  const fetchPokemon = async () => {
    try {
      const data = await getPokemonById(id);
      setPokemon(data); // This updates the pokemon state
    } catch (error) {
      console.error(error);
      Alert.alert(
        "Failed to fetch Pokémon",
        "An error has occurred when trying to load the Pokémon, please try again."
      );
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, [id]);

  useEffect(() => {
    if (pokemon.types) {
      const typeNames = pokemon.types.map((type) => type.type.name);
      setTypes(typeNames);
    }
  }, [pokemon]);

  return (
    <SafeAreaView style={{ ...globalStyles.safeAreaView }}>
      <View style={globalStyles.safeAreaMargin}>
        <View style={styles.hStack}>
          <Image
            source={{ uri: getPokemonImgById(id) }}
            style={{ width: 120, height: 120 }}
          />
          <View>
            <Text>ID: {id}</Text>
            <Text style={globalStyles.title1}>{name}</Text>
          </View>
        </View>

        <View style={styles.container}>
          <Text style={globalStyles.title2}>Info</Text>
          <Text>Height: {pokemon.height}</Text>
          <Text>Weight: {pokemon.weight}</Text>
          <Text>Type:</Text>
          {types.map((elmt, index) => (
            <Text key={index}>- {elmt}</Text>
          ))}
        </View>

        <View style={styles.container}>
          <Text style={globalStyles.title2}>Stats</Text>
          {pokemon.stats?.map((stat) => (
            <Text>
              {stat.stat.name}:{stat.base_stat}
            </Text>
          ))}
        </View>

        <View style={styles.container}>
          <Text style={globalStyles.title2}>Abilities</Text>
          <AbilityCard abilities={pokemon.abilities} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  hStack: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    height: 100,
  },
  container: {
    marginTop: 8,
  },
});
