import { StyleSheet } from "react-native";
import { globalColors } from "./globalColors";

export const globalStyles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: "#fff",
    flex: 1,
  },
  separator: {
    height: 1,
    backgroundColor: globalColors.systemGray,
  },
});
