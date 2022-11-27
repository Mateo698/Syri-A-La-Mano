import db from '../../util/database'
export default async (req, res) => {
  const { body, method } = req;

  const data = JSON.parse(body)
  console.log(data.userData);
  if (method == "POST") {
    if (data.userData.type == "admin") {
      let query = await db.query('SELECT * FROM APERTURAS')
      const openings = query.rows.map((item) => ({
        id: item.id,
        salon: item.salon,
        edificio: item.edificio,
        apertura: item.hora_inicio
        , cierre: hora_fin
      }))

    } else {
      let openings = [{
        salon: "302L",
        apertura: "6:30 PM",
        cierre: "8:30 PM"
      },
      {
        salon: "505E",
        apertura: "2:00 PM",
        cierre: "4:00 PM"
      },
      {
        salon: "101D",
        apertura: "4:00 PM",
        cierre: "6:00 PM"
      },
      ]
      res.status(200).json({ data: openings })
    }

  }
}