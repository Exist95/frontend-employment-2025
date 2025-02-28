import { useQuery } from "@tanstack/react-query";

const fetchPokemon = async (limit: number, offset: number) => {
  const res = await fetch(`http://localhost:3000/api/pokemon?limit=${limit}&offset=${offset}`);
  if (!res.ok) {
    throw new Error('포켓몬 데이터 가져오기 실패')
  }
  return res.json();
}

export const usePokemonData = (limit: number, offset: number) => {
  return useQuery({
    queryKey: ['pokemon', limit, offset],
    queryFn: () => fetchPokemon(limit, offset),
    enabled: false
  })
}