import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/screens/Home";
import PokemonDetails from "./src/screens/PokemonDetails";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
