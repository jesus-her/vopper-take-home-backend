import { Request, Response } from 'express'
import { getPokemons, getPokemonByName } from '../service/pokemon.service'
import { generatePDF } from '../utils/pdfGenerator'

export async function getPokemonsHandler (req: Request, res: Response) {
  const limit = parseInt(req.query.limit as string, 10) || 10
  const page = parseInt(req.query.page as string, 10) || 1
  const search = req.query.search as string | undefined

  try {
    const { count, results } = await getPokemons({ limit, page, search })
    res.json({ count, results })
  } catch (error) {
    res.status(500).send({ message: 'Error fetching Pokémon data' })
  }
}

export async function generatePDFHandler (req: Request, res: Response) {
  const { name } = req.params

  try {
    const pokemon = await getPokemonByName(name)
    if (!pokemon) {
      return res.status(404).send({ message: 'Pokemon not found' })
    }
    const pdfBuffer = await generatePDF(pokemon)

    res.setHeader('Content-Disposition', `attachment; filename=${name}.pdf`)
    res.setHeader('Content-Type', 'application/pdf')
    res.send(pdfBuffer)
  } catch (error) {
    console.error('Error generating PDF:', error)
    res.status(500).send({ message: 'Error generating PDF' })
  }
}
