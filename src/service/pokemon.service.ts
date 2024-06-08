const POKEAPI_URL = 'https://pokeapi.co/api/v2/pokemon'

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

  console.log(`Fetching data from URL: ${POKEAPI_URL}`)

  const response = await fetch(POKEAPI_URL)
  const data = await response.json()

  let pokemons = data.results
  const totalCount = pokemons.length
  console.log(`Fetched ${totalCount} pokemons`)

  // Filter by search term
  if (search) {
    pokemons = pokemons.filter((pokemon: any) => pokemon.name.includes(search))
    console.log(
      `Filtered pokemons, ${pokemons.length} remaining after search filter`
    )
  }

  // Sort alphabetically
  pokemons.sort((a: any, b: any) => a.name.localeCompare(b.name))

  // Paginate results
  const paginatedPokemons = pokemons.slice((page - 1) * limit, page * limit)
  console.log(
    `Returning ${paginatedPokemons.length} pokemons for page ${page} with limit ${limit}`
  )

  return { count: totalCount, results: paginatedPokemons }
}

export async function getPokemonByName (name: string) {
  const response = await fetch(`${POKEAPI_URL}/${name}`)
  const data = await response.json()
  return data
}
