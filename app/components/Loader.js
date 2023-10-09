import React, { useState, useEffect } from "react";
import { StyleSheet, Text } from "react-native";
import AnimatedLoader from "react-native-animated-loader";

import colors from "../config/colors";

function Loader(props) {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    setInterval(() => {
      setVisible(!visible);
    }, 5000);
  }, []);
  return (
    <AnimatedLoader
      visible={visible}
      source={require("../../98195-loader.json")}
      overlayColor="rgba(255,255,255,.75)"
      animationStyle={styles.lottie}
      speed={1}
    >
      <Text style={styles.text}>Loading...</Text>
    </AnimatedLoader>
  );
}

const styles = StyleSheet.create({
  lottie: {
    width: 100,
    height: 100,
  },
  text: {
    color: colors.black,
    fontSize: 18,
    marginTop: 10,
  },
});

export default Loader;
