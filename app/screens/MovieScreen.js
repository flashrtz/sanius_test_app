import React, { useState, useEffect } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import axios from "axios";

import colors, { TMDB_API_KEY } from "../config/constants";
import Loader from "../components/Loader";
import Screen from "../components/Screen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as commonService from "../services/commonService";

function MovieScreen({ route, navigation }) {
  const { id } = route.params;

  const [selectedMovie, setSelectedMovie] = useState();
  const [loading, setLoading] = useState(true);
  const [isHidden, setIsHidden] = useState(false);

  const apiKey = TMDB_API_KEY;

  const apiReq = async () => {
    try {
      const respSelectedMovie = await commonService.getMovieById(id);
      setSelectedMovie(respSelectedMovie.data);
      let currentListString = await AsyncStorage.getItem("favorites");
      const filmIds = currentListString ? JSON.parse(currentListString) : [];
      if (filmIds.includes(id)) {
        setIsHidden(true);
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

  const addToFavorites = async (id) => {
    let currentListString = await AsyncStorage.getItem("favorites");
    const filmIds = currentListString ? JSON.parse(currentListString) : [];
    filmIds.push(id);
    await AsyncStorage.setItem("favorites", JSON.stringify(filmIds));
    setIsHidden(true);
  };

  return (
    <Screen style={styles.container}>
      {loading ? (
        <Loader />
      ) : (
        <View style={styles.card}>
          <View>
            <View>
              <Text style={styles.title}>{selectedMovie.title}</Text>
            </View>
            <Image
              style={styles.image}
              source={{
                uri: `https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`,
              }}
            />
          </View>
          <View style={styles.detailsContainer}>
            <View>
              <Text style={styles.ratingTitle}>
                ★ {Number(selectedMovie.vote_average).toFixed(1)}{" "}
              </Text>
            </View>
            <View>
              <Text style={styles.release}>
                Release date:
                {selectedMovie.release_date}
              </Text>
            </View>
            <ScrollView style={styles.scrollStyle}>
              <Text style={styles.description}>{selectedMovie.overview}</Text>
            </ScrollView>
            {!isHidden && (
              <View>
                <TouchableOpacity
                  onPress={() => addToFavorites(selectedMovie.id)}
                >
                  <Text style={styles.ratingTitle}>★ Add to Favorites</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      )}

      <TouchableOpacity
        onPress={() => navigation.navigate("HomeScreen")}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
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
    width: 150,
    marginVertical: 5,
  },
  buttonText: {
    color: colors.black,
    fontSize: 18,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  card: {
    backgroundColor: colors.secondary,
    width: "90%",
    flex: 1,
    borderRadius: 15,
    margin: 10,
    overflow: "hidden",
  },
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: "center",
  },
  description: {
    color: colors.white,
    fontSize: 18,
    padding: 10,
  },
  detailsContainer: {
    padding: 10,
  },
  image: {
    width: "100%",
    height: 400,
  },
  title: {
    color: colors.black,
    fontSize: 30,
    padding: 10,
    fontWeight: "bold",
    alignSelf: "center",
  },
  release: {
    alignSelf: "center",
    color: colors.white,
    fontSize: 20,
    fontWeight: "bold",
  },
  ratingTitle: {
    alignSelf: "center",
    color: "#FFD700",
    fontSize: 20,
    fontWeight: "bold",
  },
  scrollStyle: {
    maxHeight: "45%",
    marginBottom: 5,
  },
});

export default MovieScreen;
