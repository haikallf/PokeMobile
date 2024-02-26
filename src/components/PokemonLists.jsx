import { View, Text, FlatList, ActivityIndicator, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { globalStyles } from "../styles/globalStyles";
import { getAllPokemons } from "../services/pokemon-api";
import { getPokemonIdByUrl } from "../utils/pokemon-helper";
import PokemonCard from "./PokemonCard";

export default function PokemonLists(props) {
  const [pokemons, setPokemons] = useState([]);
  const [section, setSection] = useState(0);
  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchPokemons();
  }, [offset]);

  const fetchPokemons = async () => {
    setIsLoading(true);
    try {
      const data = await getAllPokemons(offset);
      console.log(data);
      setPokemons([...pokemons, ...data.results]);
      setIsLoading(false);
    } catch (error) {
      Alert.alert(
        "Failed to fetch Pokémons",
        "An error has ocurred when try to load the Pokémons, please try again."
      );
      setIsLoading(false);
    }
  };

  const fetchMorePokemons = () => {
    setSection(section + 1);
    setOffset(25 * section);
  };
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        contentContainerStyle={{ paddingLeft: 16, paddingRight: 16 }}
        data={pokemons}
        renderItem={({ item }) => (
          <PokemonCard
            id={getPokemonIdByUrl(item.url)}
            name={item.name}
            onPress={() =>
              props.navigation
                ? props.navigation.navigate("Details", {
                    id: getPokemonIdByUrl(item.url),
                    name: item.name,
                  })
                : props.setPokemon(item.url)
            }
          />
        )}
        keyExtractor={(item) => getPokemonIdByUrl(item.url)}
        ListFooterComponent={() => {
          return isLoading ? <ActivityIndicator size="large" /> : null;
        }}
        onEndReached={fetchMorePokemons}
        ItemSeparatorComponent={() => <View style={globalStyles.separator} />}
      />
    </View>
  );
}
