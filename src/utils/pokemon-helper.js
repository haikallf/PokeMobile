export const getPokemonIdByUrl = (url) => {
  const parts = url.split("/");
  return parts[parts.length - 2];
};
