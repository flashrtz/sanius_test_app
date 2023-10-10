import React, { useState, useEffect } from "react";
import {
  Image,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import axios from "axios";
import { FontAwesome } from "@expo/vector-icons";

import colors, { TMDB_API_KEY } from "../config/colors";
import Loader from "../components/Loader";
import Screen from "../components/Screen";
import * as commonService from "../services/commonService";
import AsyncStorage from "@react-native-async-storage/async-storage";

function FavoriteScreen({ navigation }) {
  const [data, setData] = useState({
    searchedMovies: null,
    nowPlaying: null,
    topRatedMovies: null,
  });
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [currentData, setCurrentData] = useState([]);

  const apiKey = TMDB_API_KEY;
  const apiReq = async () => {
    try {
      let currentListString = await AsyncStorage.getItem("favorites");
      let filmIds = currentListString ? JSON.parse(currentListString) : [];
      if (filmIds.length > 0) {
        let req = [];
        for (let i = 0; i < filmIds.length; i++) {
          req.push(
            axios(
              `https://api.themoviedb.org/3/movie/${filmIds[i]}?api_key=${apiKey}&language=en-US`
            )
          );
        }

        const resFilmFavs = await Promise.all(req);
        const favoriteList = resFilmFavs.map((item) => item.data);
        setCurrentData(favoriteList);
      }
    } catch (err) {
      console.log(err);
    }

    if (loading) {
      setLoading(false);
    }
  };

  useEffect(() => {
    apiReq();
  }, []);

  return (
    <Screen style={styles.container}>
      <View>
        <Text style={styles.mainTitle}>Movie Browser App</Text>
      </View>

      <View>
        {loading ? (
          <Loader />
        ) : (
          <View>
            <View>
              <Text style={styles.favTitle}>My Favorites</Text>
              {currentData.length == 0 ? (
                <Text style={styles.notFound}>
                  No Favorites. Please add your favorites.
                </Text>
              ) : (
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  style={styles.imageMargin}
                  data={currentData}
                  renderItem={(element) => {
                    return (
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("MovieScreen", {
                            id: element.item.id,
                          })
                        }
                        style={styles.mainAlign}
                      >
                        <Image
                          style={styles.image}
                          source={{
                            uri: `https://image.tmdb.org/t/p/w500${element.item.poster_path}`,
                          }}
                        />
                        <Text style={styles.title}>
                          {element.item.original_title}
                        </Text>
                      </TouchableOpacity>
                    );
                  }}
                  keyExtractor={(item) => item.id}
                />
              )}
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate("HomeScreen")}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.medium,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    width: "100%",
    marginVertical: 5,
  },
  buttonText: {
    color: colors.black,
    fontSize: 18,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: "center",
  },
  highlight: {
    color: colors.secondary,
  },
  icon: {
    marginRight: 10,
  },
  image: {
    width: 180,
    height: 200,
    resizeMode: "cover",
    borderRadius: 5,
    marginRight: 8,
  },
  imageMargin: {
    marginTop: 20,
    marginLeft: 20,
    height: "60%",
  },
  input: {
    backgroundColor: colors.white,
    borderRadius: 25,
    flexDirection: "row",
    width: "95%",
    padding: 15,
    marginVertical: 10,
    alignSelf: "center",
  },
  inputText: {
    fontSize: 18,
    color: colors.black,
    width: "60%",
  },
  notFound: {
    alignSelf: "center",
    paddingTop: 25,
    color: colors.white,
    fontSize: 16,
  },
  subtitle: {
    fontSize: 20,
    color: colors.white,
    marginTop: 30,
    marginLeft: 20,
    fontWeight: "bold",
  },
  mainTitle: {
    color: "#e13c3c", //colors.white,
    fontSize: 32,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 20,
  },
  favTitle: {
    color: colors.white,
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 20,
  },
  tabButtons: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#eee",
  },
  tabButton: {
    padding: 10,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  activeTabButton: {
    borderBottomColor: "#f55d24",
  },
  tabButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  tabContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: colors.white,
    fontSize: 20,
    padding: 10,
    fontWeight: "bold",
    alignSelf: "center",
    textAlign: "center",
  },
  mainAlign: {
    marginBottom: 10,
    alignItems: "center",
  },
});

export default FavoriteScreen;
