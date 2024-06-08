import PDFDocument from 'pdfkit'
import axios from 'axios'

async function fetchImage (src: string): Promise<Buffer> {
  const image = await axios.get(src, { responseType: 'arraybuffer' })
  return image.data
}

export async function generatePDF (pokemon: any) {
  return new Promise<Buffer>(async (resolve, reject) => {
    const doc = new PDFDocument()
    let buffers: any[] = []

    doc.on('data', buffers.push.bind(buffers))
    doc.on('end', () => {
      const pdfData = Buffer.concat(buffers)
      resolve(pdfData)
    })
    doc.on('error', err => {
      reject(err)
    })

    try {
      doc.fontSize(25).text(pokemon.name, { align: 'center' })

      if (pokemon.sprites && pokemon.sprites.front_default) {
        const imageUrl = pokemon.sprites.front_default
        console.log(`Downloading image from URL: ${imageUrl}`)
        const imageBuffer = await fetchImage(imageUrl)

        // Insertar la imagen descargada en el PDF
        doc
          .image(imageBuffer, {
            fit: [150, 150],
            align: 'center',
            valign: 'center'
          })
          .moveDown()
        const logo = await fetchImage(imageUrl)
        doc.image(logo, 0, 200)
      }

      doc
        .fontSize(15)
        .text(`Height: ${pokemon.height ?? 'N/A'}`)
        .moveDown(0.5)
      doc
        .fontSize(15)
        .text(`Weight: ${pokemon.weight ?? 'N/A'}`)
        .moveDown(0.5)
      doc.fontSize(15).text('Abilities:').moveDown(0.5)

      if (pokemon.abilities && Array.isArray(pokemon.abilities)) {
        pokemon.abilities.forEach((ability: any) => {
          doc.text(ability.ability.name).moveDown(0.5)
        })
      } else {
        doc.text('No abilities found.').moveDown(0.5)
      }

      doc.end()
    } catch (err) {
      reject(err)
    }
  })
}
