import PDFDocument from 'pdfkit'
import axios from 'axios'
import { createCanvas, loadImage } from 'canvas'

async function fetchImage (src: string): Promise<Buffer> {
  const image = await axios.get(src, { responseType: 'arraybuffer' })
  return image.data
}

async function convertToRGB (imageBuffer: Buffer): Promise<Buffer> {
  const img = await loadImage(imageBuffer)
  const canvas = createCanvas(img.width, img.height)
  const ctx = canvas.getContext('2d')
  ctx.drawImage(img, 0, 0, img.width, img.height)
  return canvas.toBuffer('image/png')
}

export async function generatePDF (pokemon: any) {
  return new Promise<Buffer>(async (resolve, reject) => {
    const doc = new PDFDocument({ margin: 50 })
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
      // Establecer borde de la carta
      doc.rect(25, 25, doc.page.width - 50, doc.page.height - 50).stroke()

      // Nombre del Pokémon en negrita y tamaño grande
      doc
        .fontSize(30)
        .font('Helvetica-Bold')
        .text(pokemon.name, { align: 'center' })
        .moveDown(1.5)

      // Posicionar imagen y texto
      if (pokemon.sprites && pokemon.sprites.front_default) {
        const imageUrl = pokemon.sprites.front_default
        const imageBuffer = await fetchImage(imageUrl)
        const rgbBuffer = await convertToRGB(imageBuffer)

        // Insertar la imagen a la izquierda
        const imageX = 50
        const imageY = 150
        doc.image(rgbBuffer, imageX, imageY, { width: 150, height: 150 })

        // Insertar texto a la derecha de la imagen
        const textX = imageX + 200
        const textY = imageY

        doc
          .fontSize(15)
          .font('Helvetica')
          .text(`Height: ${pokemon.height ?? 'N/A'}`, textX, textY)
          .moveDown(0.5)
        doc.text(`Weight: ${pokemon.weight ?? 'N/A'}`).moveDown(0.5)
        doc.font('Helvetica-Bold').text('Abilities:').moveDown(0.5)

        if (pokemon.abilities && Array.isArray(pokemon.abilities)) {
          pokemon.abilities.forEach((ability: any) => {
            doc
              .font('Helvetica')
              .text(`- ${ability.ability.name}`)
              .moveDown(0.5)
          })
        } else {
          doc.font('Helvetica').text('No abilities found.').moveDown(0.5)
        }
      }

      doc.end()
    } catch (err) {
      reject(err)
    }
  })
}
