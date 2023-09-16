import { NextResponse } from 'next/server'

const BASE_URL = 'http://localhost:3000'

async function getById (id: string) {
  const res = await fetch(BASE_URL + `/terceros/${id}`, {
    headers: {
      'Content-Type': 'application/json'
      // Authorization: `Basic ${infojobsToken}`
    }
  })
  const data = await res.json()
  return data
}
// async function update ({ id, input }: { id: string, input: Tercero }) {
//   const res = await fetch(BASE_URL + `/terceros/${id}`, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(input)
//   })
//   const data = await res.json()
//   return data
// }

export async function GET (_request: Request, { params: { id } }: { params: { id: string } }) {
  try {
    const tercero = await getById(id)

    if (tercero.length === 0) {
      return NextResponse.json({ message: 'Tercero not found' }, { status: 404 })
    }

    return NextResponse.json(tercero[0])
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 })
  }
}

// type terceroPut = Omit<Tercero, 'id' | 'fecha_ingreso'>
export async function PUT (request: Request, { params: { id } }: { params: { id: string } }) {
  const data = await request.formData()
  console.log('🚀 ~ file: route.ts:45 ~ PUT ~ data:', data)
  try {
    const terceroInput = {
      id_nacional: data.get('id_nacional'),
      nombres: data.get('nombres'),
      apellidos: data.get('apellidos'),
      fecha_nacimiento: data.get('fecha_nacimiento'),
      estado_civil: data.get('estado_civil'),
      genero: data.get('genero'),
      procedencia: data.get('procedencia'),
      residencia: data.get('residencia'),
      celular: data.get('celular')
    }
    console.log('🚀 ~ file: route.ts:45 ~ PUT ~ terceroInput:', terceroInput)
    // const tercero = await update({ id, input: terceroInput })

    return NextResponse.json(terceroInput)
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 })
  }
}

// export async function DELETE (request, { params }) {
//   try {
//     const result = await conn.query('DELETE FROM product WHERE id = ?', [
//       params.id
//     ])

//     if (result.affectedRows === 0) {
//       return NextResponse.json(
//         {
//           message: 'Producto no encontrado'
//         },
//         {
//           status: 404
//         }
//       )
//     }

//     return new Response(null, {
//       status: 204
//     })
//   } catch (error) {
//     return NextResponse.json(
//       {
//         message: error.message
//       },
//       { status: 500 }
//     )
//   }
// }

// export async function PUT (request, { params }) {
//   try {
//     const data = await request.formData()
//     const image = data.get('image')
//     const updateData = {
//       name: data.get('name'),
//       price: data.get('price'),
//       description: data.get('description')
//     }

//     if (!data.get('name')) {
//       return NextResponse.json(
//         {
//           message: 'Name is required'
//         },
//         {
//           status: 400
//         }
//       )
//     }

//     if (image) {
//       const buffer = await processImage(image)

//       const res = await new Promise((resolve, reject) => {
//         cloudinary.uploader
//           .upload_stream(
//             {
//               resource_type: 'image'
//             },
//             async (err, result) => {
//               if (err) {
//                 console.log(err)
//                 reject(err)
//               }

//               resolve(result)
//             }
//           )
//           .end(buffer)
//       })

//       updateData.image = res.secure_url

//       const result = await conn.query('UPDATE product SET ? WHERE id = ?', [
//         updateData,
//         params.id
//       ])

//       if (result.affectedRows === 0) {
//         return NextResponse.json(
//           {
//             message: 'Producto no encontrado'
//           },
//           {
//             status: 404
//           }
//         )
//       }

//       const updatedProduct = await conn.query(
//         'SELECT * FROM product WHERE id = ?',
//         [params.id]
//       )

//       return NextResponse.json(updatedProduct[0])
//     }
//   } catch (error) {
//     console.log(error)
//     return NextResponse.json(
//       {
//         message: error.message
//       },
//       { status: 500 }
//     )
//   }
// }
