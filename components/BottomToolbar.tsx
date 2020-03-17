import React from "react";
import { Image, StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
  bottomToolbar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    height: 72,
    borderRadius: 76,
    padding: 16,
    backgroundColor: "#FFFFFF",
    marginTop: 16
  },
  filler: {
    flexGrow: 1
  },
  image: {
    width: 40,
    height: 40,
    marginRight: 10
  },
  mainImage: {
    width: 40,
    height: 40
  }
});

export const BottomToolbar = () => (
  <View style={styles.bottomToolbar}>
    <Image style={styles.image} source={require("../assets/plus.png")} />
    <Image style={styles.image} source={require("../assets/person.png")} />
    <Image style={styles.image} source={require("../assets/clip.png")} />
    <Image style={styles.image} source={require("../assets/timer.png")} />
    <Image style={styles.image} source={require("../assets/mic.png")} />
    <View style={styles.filler} />
    <Image style={styles.mainImage} source={require("../assets/rhino.png")} />
  </View>
);
