const POKEAPI_URL = 'https://pokeapi.co/api/v2/pokemon?limit=10000'

interface GetPokemonsParams {
  limit?: number
  page?: number
  search?: string
}

interface PokemonResult {
  count: number
  results: any[]
}

export async function getPokemons (
  params: GetPokemonsParams
): Promise<PokemonResult> {
  const { limit = 10, page = 1, search } = params

  const response = await fetch(POKEAPI_URL)
  const data = await response.json()

  let pokemons = data.results

  // Filter by search term
  if (search) {
    pokemons = pokemons.filter((pokemon: any) => pokemon.name.includes(search))
  }

  // Calculate the new total count after filtering
  const filteredCount = pokemons.length

  // Sort alphabetically
  pokemons.sort((a: any, b: any) => a.name.localeCompare(b.name))

  // Paginate results
  const paginatedPokemons = pokemons.slice((page - 1) * limit, page * limit)

  return { count: filteredCount, results: paginatedPokemons }
}

export async function getPokemonByName (name: string) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
  const data = await response.json()
  return data
}
