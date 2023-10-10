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

import colors, { TMDB_API_KEY } from "../config/constants";
import Loader from "../components/Loader";
import Screen from "../components/Screen";
import * as commonService from "../services/commonService";

function HomeScreen({ navigation }) {
  const [data, setData] = useState({
    searchedMovies: null,
    nowPlaying: null,
    topRatedMovies: null,
  });
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [activeTab, setActiveTab] = useState(0);
  const [showSearch, setShowSearch] = useState(false);
  const [currentData, setCurrentData] = useState([]);

  const apiReq = async () => {
    try {
      const resSearchedMovies = await commonService.searchMovie({
        searchInput,
      });
      const resNowPlaying = await commonService.getNowPlayingMovies();
      const resTopRatedMovies = await commonService.getTopRatedMovies();
      const resPopularMovies = await commonService.getPopularMovies();
      const resUpComingMovies = await commonService.getPopularMovies();

      setData({
        searchedMovies: resSearchedMovies.data.results,
        nowPlaying: resNowPlaying.data.results,
        topRatedMovies: resTopRatedMovies.data.results,
        popularMovies: resPopularMovies.data.results,
        upComingMovies: resUpComingMovies.data.results,
      });
      setCurrentData(
        resSearchedMovies.data.results.length > 0
          ? resSearchedMovies.data.results
          : resNowPlaying.data.results
      );
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

  const handleTabPress = (index) => {
    setActiveTab(index);

    switch (index) {
      case 0:
        setCurrentData(data.nowPlaying);
        break;
      case 1:
        setCurrentData(data.popularMovies);
        break;
      case 2:
        setCurrentData(data.topRatedMovies);
        break;
      case 3:
        setCurrentData(data.upComingMovies);
        break;
      default:
        break;
    }
    setShowSearch(false);
  };

  return (
    <Screen style={styles.container}>
      <View>
        <Text style={styles.mainTitle}>Movie Browser App</Text>
      </View>
      <View>
        <TouchableOpacity onPress={() => navigation.navigate("FavoriteScreen")}>
          <Text style={styles.favTitle}>★ My Favorites</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.input}>
        <FontAwesome
          name="search"
          size={24}
          color={colors.black}
          style={styles.icon}
        />
        <TextInput
          placeholder="Find a movie..."
          style={styles.inputText}
          onChangeText={(text) => setSearchInput(text)}
          name="search"
        ></TextInput>
      </View>
      <TouchableOpacity
        onPress={() => {
          apiReq();
          setShowSearch(true);
          setActiveTab(-1);
        }}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>

      {/********Tab Panel*****started**/}

      <View style={styles.tabButtons}>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 0 && styles.activeTabButton]}
          onPress={() => handleTabPress(0)}
        >
          <Text
            style={[styles.tabButtonText, activeTab === 0 && styles.highlight]}
          >
            Now Playing
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 1 && styles.activeTabButton]}
          onPress={() => handleTabPress(1)}
        >
          <Text
            style={[styles.tabButtonText, activeTab === 1 && styles.highlight]}
          >
            Popular
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 2 && styles.activeTabButton]}
          onPress={() => handleTabPress(2)}
        >
          <Text
            style={[styles.tabButtonText, activeTab === 2 && styles.highlight]}
          >
            Top Rated
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, activeTab === 3 && styles.activeTabButton]}
          onPress={() => handleTabPress(3)}
        >
          <Text
            style={[styles.tabButtonText, activeTab === 3 && styles.highlight]}
          >
            Upcoming
          </Text>
        </TouchableOpacity>
      </View>

      {/********Tab Panel*****ended**/}

      <View>
        {loading ? (
          <Loader />
        ) : (
          <View>
            {showSearch == true && (
              <View>
                <Text style={styles.subtitle}>
                  Search
                  <Text style={styles.highlight}> Results</Text>
                </Text>
                <View>
                  {data.searchedMovies.length == 0 ? (
                    <Text style={styles.notFound}>
                      Sorry, we couldn't find that movie. Try again.
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
              </View>
            )}
            {showSearch == false && (
              <View>
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
              </View>
            )}
          </View>
        )}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.secondary,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    padding: 15,
    width: 250,
    marginVertical: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: colors.white,
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
    color: "#e13c3c",
    fontSize: 32,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 20,
  },
  favTitle: {
    color: "#d5885c",
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

export default HomeScreen;
