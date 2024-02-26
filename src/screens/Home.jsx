import {
  Alert,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
  View,
  TouchableOpacity,
  Text,
  Button,
  StyleSheet,
} from "react-native";
import React from "react";
import { getAllPokemons } from "../services/pokemon-api";
import PokemonCard from "../components/PokemonCard";
import { getPokemonIdByUrl } from "../utils/pokemon-helper";
import { globalStyles } from "../styles/globalStyles";
import PokemonLists from "../components/PokemonLists";

export default function Home({ navigation }) {
  return (
    <SafeAreaView style={globalStyles.safeAreaView}>
      <View style={styles.hStack}>
        <Text>Compare 2 Pokémons</Text>
        <Button
          title="Compare"
          onPress={() => {
            navigation.navigate("Comparison");
          }}
        />
      </View>
      <PokemonLists navigation={navigation} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  hStack: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 40,
    marginLeft: 16,
    marginRight: 16,
  },
  container: {
    marginTop: 8,
  },
});
