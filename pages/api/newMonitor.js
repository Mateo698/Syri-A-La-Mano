import db from '../../util/database'
export default async (req, res) => {
    const { body, method } = req;
    console.log(body.newMonitor);
    const data = body.newMonitor
    let response = await db.query('SELECT * FROM USERS WHERE username = $1 AND password = $2 AND email = $3 AND name = $4'
    ,[data.username,data.password,data.email,data.nombre])
    if(response.rows.length != 0){
        res.status(200).json({data:0})
    }else{
        let insert = await db.query("INSERT INTO USERS VALUES($1,$2,$3,$4,'monit')",[data.username,data.password,data.email,data.nombre])
        res.status(200).json({data:1})
    }
}