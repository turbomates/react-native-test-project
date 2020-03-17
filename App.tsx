import React, { useEffect } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { useObserver } from "mobx-react";

import { AppStore } from "./AppStore";
import { Tongue } from "./components/Tongue";
import { BottomToolbar } from "./components/BottomToolbar";
import { Dropdown } from "./components/Dropdown";

const store = new AppStore();

export default function App() {
  useEffect(() => {
    store.hydrate().then(() => {
      store.loadData();
    });
  }, []);

  return useObserver(() => (
    <View style={styles.container}>
      <Tongue />
      <View style={styles.box}>
        <Dropdown
          label="Pick country"
          options={store.countryOptions}
          value={store.selectedCountryId}
          onSelect={store.selectCountryId}
        />
        <Dropdown
          label="Pick ccurrency"
          options={store.currencyOptions}
          value={store.selectedCurrencyId}
          onSelect={store.selectCurrencyId}
        />
      </View>
      <BottomToolbar />
    </View>
  ));
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#F6F7F8",
    alignItems: "center",
    justifyContent: "flex-end",
    borderRadius: 8,
    padding: 16
  },
  box: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    width: "100%",
    height: Platform.OS === "ios" ? 212 : 162,
    paddingTop: 12,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 16,
    backgroundColor: "#FFFFFF"
  }
});
