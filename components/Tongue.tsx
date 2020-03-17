import React from "react";
import { Image, StyleSheet, View } from "react-native";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    height: 55
  },
  leftRectOutside: {
    width: 16,
    height: 16,
    backgroundColor: "#FFFFFF"
  },
  leftRectInside: {
    width: 16,
    height: 16,
    backgroundColor: "#F6F7F8",
    borderBottomRightRadius: 16
  },
  rightRectOutside: {
    width: 16,
    height: 16,
    backgroundColor: "#FFFFFF"
  },
  rightRectInside: {
    width: 16,
    height: 16,
    backgroundColor: "#F6F7F8",
    borderBottomLeftRadius: 16
  },
  centerRect: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    width: 72,
    height: 55,
    borderTopRightRadius: 36,
    borderTopLeftRadius: 36,
    backgroundColor: "#FFFFFF"
  },
  cross: {
    width: 40,
    height: 40
  }
});

export const Tongue = () => (
  <View style={styles.container}>
    <View style={styles.leftRectOutside}>
      <View style={styles.leftRectInside}></View>
    </View>
    <View style={styles.centerRect}>
      <Image style={styles.cross} source={require("../assets/cross.png")} />
    </View>
    <View style={styles.rightRectOutside}>
      <View style={styles.rightRectInside}></View>
    </View>
  </View>
);
