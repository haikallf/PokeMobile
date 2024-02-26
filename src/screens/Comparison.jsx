import { View, Text, StyleSheet } from "react-native";
import React, { useCallback, useMemo, useRef, useState } from "react";
import BottomSheet, { useBottomSheetSpringConfigs } from "@gorhom/bottom-sheet";
import PokemonSheet from "../components/PokemonSheet";

export default function Comparison(props) {
  const [leftPokemon, setLeftPokemon] = useState("");
  const [rightPokemon, setRightPokemon] = useState("");
  const [selectedPokemon, setSelectedPokemon] = useState(0);

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

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
      }}
    >
      <View style={styles.card} onTouchStart={() => handleExpandPress(0)}>
        <Text>{leftPokemon == "" ? "Pokemon 1" : leftPokemon}</Text>
      </View>
      <Text>VS</Text>
      <View style={styles.card} onTouchStart={() => handleExpandPress(1)}>
        <Text>{rightPokemon == "" ? "Pokemon 2" : rightPokemon}</Text>
      </View>

      <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        animationConfigs={animationConfigs}
        animateOnMount={true}
        enablePanDownToClose={true}
      >
        <PokemonSheet />
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    justifyContent: "center",
    height: 200,
    width: 140,
    backgroundColor: "red",
  },
  container: {
    marginTop: 8,
  },
});
