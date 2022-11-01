
export default async (req, res) => {
  const { body, method } = req;
  
  const data = JSON.parse(body)
  console.log(data);
  if (method == "POST") {
    let current = {turnoId: "4659",edificios:"F,C"}
    res.status(200).json({data: current})
  }
}