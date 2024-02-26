import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/screens/Home";
import PokemonDetails from "./src/screens/PokemonDetails";
import Comparison from "./src/screens/Comparison";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ title: "PokeMobile - Haikal Lazuardi" }}
          />
          <Stack.Screen
            name="Details"
            component={PokemonDetails}
            options={{ title: "Pokemon Details" }}
          />
          <Stack.Screen
            name="Comparison"
            component={Comparison}
            options={{ title: "Pokemon Comparison" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
  },
});
