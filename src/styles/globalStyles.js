import { StyleSheet } from "react-native";
import { globalColors } from "./globalColors";

const fontWeights = {
  bold: "700",
  semiBold: "600",
  medium: "500",
  regular: "400",
};

export const globalStyles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "flex-start",
  },
  safeAreaMargin: {
    marginLeft: 16,
    marginRight: 16,
  },
  separator: {
    height: 1,
    backgroundColor: globalColors.systemGray,
  },
  largeTitle: {
    fontSize: 34,
    fontWeight: fontWeights.bold,
  },
  title1: {
    fontSize: 28,
    fontWeight: fontWeights.semiBold,
  },
  title2: {
    fontSize: 22,
    fontWeight: fontWeights.semiBold,
  },
  title3: {
    fontSize: 20,
    fontWeight: fontWeights.semiBold,
  },
  footnote: {
    fontSize: 23,
    fontWeight: fontWeights.regular,
  },
});
