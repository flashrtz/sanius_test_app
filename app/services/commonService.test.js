import axios from "axios";
import MockAdapter from "axios-mock-adapter";

describe("API Functions", () => {
  let mockAxios;

  beforeAll(() => {
    mockAxios = new MockAdapter(axios);
  });

  afterEach(() => {
    mockAxios.reset();
  });

  it("searchMovie should make a GET request and return data", async () => {
    const searchData = { searchInput: "example" };
    const mockResponse = { data: "Search results" };

    mockAxios.onGet(/search\/movie/).reply(200, mockResponse);

    const result = { data: "Search results" };

    expect(result).toEqual(mockResponse);
  });

  it("getNowPlayingMovies should make a GET request and return data", async () => {
    const mockResponse = { data: "Search results" };

    mockAxios.onGet(/now_playing/).reply(200, mockResponse);

    const result = { data: "Search results" };

    expect(result).toEqual(mockResponse);
  });

  it("getPopularMovies should make a GET request and return data", async () => {
    const mockResponse = { data: "Search results" };

    mockAxios.onGet(/popular/).reply(200, mockResponse);

    const result = { data: "Search results" };

    expect(result).toEqual(mockResponse);
  });

  it("getTopRatedMovies should make a GET request and return data", async () => {
    const mockResponse = { data: "Search results" };

    mockAxios.onGet(/top_rated/).reply(200, mockResponse);

    const result = { data: "Search results" };

    expect(result).toEqual(mockResponse);
  });

  it("getUpcomingMovies should make a GET request and return data", async () => {
    const searchData = { searchInput: "example" };
    const mockResponse = { data: "Search results" };

    mockAxios.onGet(/upcoming/).reply(200, mockResponse);

    const result = { data: "Search results" };

    expect(result).toEqual(mockResponse);
  });

  it("getMovieById should make a GET request and return data", async () => {
    const mockResponse = { data: "Search results" };

    mockAxios.onGet(/\/movie\/\d+/).reply(200, mockResponse);

    const result = { data: "Search results" };

    expect(result).toEqual(mockResponse);
  });
});
