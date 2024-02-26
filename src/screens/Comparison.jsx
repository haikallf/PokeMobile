import { View, Text, StyleSheet, Alert, Image, Dimensions } from "react-native";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import BottomSheet, { useBottomSheetSpringConfigs } from "@gorhom/bottom-sheet";
import PokemonSheet from "../components/PokemonSheet";
import { getPokemonIdByUrl } from "../utils/pokemon-helper";
import { getPokemonById } from "../services/pokemon-api";

export default function Comparison(props) {
  const [leftPokemon, setLeftPokemon] = useState(null);
  const [leftPokemonUrl, setLeftPokemonUrl] = useState("");

  const [rightPokemon, setRightPokemon] = useState(null);
  const [rightPokemonUrl, setRightPokemonUrl] = useState("");

  const [selectedPokemon, setSelectedPokemon] = useState(0);
  const statNames = [
    "hp",
    "attack",
    "defense",
    "special-attack",
    "special-defense",
    "speed",
  ];

  const [isLoading, setIsLoading] = useState(false);

  const windowWidth = Dimensions.get("window").width;

  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ["25%", "50%", "90%"], []);
  const animationConfigs = useBottomSheetSpringConfigs({
    damping: 80,
    overshootClamping: true,
    restDisplacementThreshold: 0.1,
    restSpeedThreshold: 0.1,
    stiffness: 500,
  });

  const handleExpandPress = useCallback((idx) => {
    console.log(idx);
    bottomSheetRef.current?.expand();
    setSelectedPokemon(idx);
  }, []);

  const handleClosePress = useCallback(() => {
    bottomSheetRef.current?.close();
  }, []);

  const setPokemon = (pokemonUrl) => {
    selectedPokemon == 0
      ? setLeftPokemonUrl(pokemonUrl)
      : setRightPokemonUrl(pokemonUrl);
  };

  useEffect(() => {
    if (leftPokemonUrl != "" || rightPokemonUrl != "") {
      fetchPokemon();
    }

    console.log("changing");
  }, [leftPokemonUrl, rightPokemonUrl]);

  const fetchPokemon = async () => {
    setIsLoading(true);
    try {
      console.log(leftPokemonUrl);
      if (selectedPokemon == 0) {
        const data = await getPokemonById(getPokemonIdByUrl(leftPokemonUrl));
        setLeftPokemon(data);
      } else {
        const data = await getPokemonById(getPokemonIdByUrl(rightPokemonUrl));
        setRightPokemon(data);
      }
      setIsLoading(false);
      handleClosePress();
    } catch (error) {
      console.log("error");
      Alert.alert(
        "Failed to fetch Pokémon",
        "An error has ocurred when try to load the Pokémon, please try again."
      );
      setIsLoading(false);
      handleClosePress();
    }
  };

  const renderStatBar = (statName) => {
    const leftStat =
      leftPokemon?.stats.find((stat) => stat.stat.name === statName)
        ?.base_stat || 0;
    const rightStat =
      rightPokemon?.stats.find((stat) => stat.stat.name === statName)
        ?.base_stat || 0;

    const maxStat = Math.max(leftStat, rightStat);
    const leftWidth = (leftStat / maxStat) * windowWidth * 0.35;
    const rightWidth = (rightStat / maxStat) * windowWidth * 0.35;

    return (
      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}
      >
        <View style={{ flex: 1 }}>
          <Text>{statName}</Text>
          <View
            style={{
              width: leftWidth,
              height: 20,
              backgroundColor: "blue",
              marginRight: 4,
            }}
          >
            <Text style={{ color: "white" }}>{leftStat}</Text>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <Text>{statName}</Text>
          <View
            style={{
              width: rightWidth,
              height: 20,
              backgroundColor: "red",
              marginLeft: 4,
            }}
          >
            <Text style={{ color: "white" }}>{rightStat}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <>
      <View
        style={{
          flex: 1,
          marginLeft: 16,
          marginRight: 16,
        }}
      >
        <View
          style={{
            height: 200,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <View style={styles.card} onTouchStart={() => handleExpandPress(0)}>
            <Image
              source={{
                uri:
                  leftPokemon == null
                    ? "https://image.similarpng.com/very-thumbnail/2021/06/Cross-mark-icon-in-red-color-on-transparent-background-PNG.png"
                    : leftPokemon?.sprites?.front_default,
              }}
              style={{ width: 100, height: 100 }}
            />
            <Text>{leftPokemon == null ? "Pokemon 1" : leftPokemon.name}</Text>
          </View>
          <Text>VS</Text>
          <View style={styles.card} onTouchStart={() => handleExpandPress(1)}>
            <Image
              source={{
                uri:
                  rightPokemon == null
                    ? "https://image.similarpng.com/very-thumbnail/2021/06/Cross-mark-icon-in-red-color-on-transparent-background-PNG.png"
                    : rightPokemon?.sprites?.front_default,
              }}
              style={{ width: 100, height: 100 }}
            />
            <Text>
              {rightPokemon == null ? "Pokemon 2" : rightPokemon.name}
            </Text>
          </View>
        </View>

        <View>
          {leftPokemon != null && rightPokemon != null ? (
            <View>{statNames.map((statName) => renderStatBar(statName))}</View>
          ) : (
            <></>
          )}
        </View>
      </View>

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        animationConfigs={animationConfigs}
        animateOnMount={true}
        enablePanDownToClose={true}
      >
        <PokemonSheet setPokemon={setPokemon} />
      </BottomSheet>
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    justifyContent: "center",
    height: 200,
    width: 140,
  },
  container: {
    marginTop: 8,
  },
});
