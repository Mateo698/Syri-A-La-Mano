export default async (req, res) => {
    const { body, method } = req;
    
    const data = JSON.parse(body)
    console.log(data);
    if (method == "POST") {
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
      res.status(200).json({data: openings})
    }
  }