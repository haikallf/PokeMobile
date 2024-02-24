import axios from "axios";

export const baseURL = "https://pokeapi.co/api/v2";

export const getAllPokemons = async (offset = 0, limit = 25) => {
  const res = await axios.get(
    `${baseURL}/pokemon?limit=${25}&offset=${offset}"`
  );
  return res.data;
};

export const getPokemonById = async (id) => {
  const res = await axios.get(`${baseURL}/pokemon/${id}/`);
  return res.data;
};

export const getPokemonImgById = (id) => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
};
