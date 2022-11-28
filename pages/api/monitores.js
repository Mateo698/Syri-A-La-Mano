import db from '../../util/database'
export default async (req, res) => {
    const { body, method } = req;
    let data = JSON.parse(body)
    if (method == "POST") {
        if (data.operation == "delete") {
            console.log("amogus")
            let query = await db.query("DELETE FROM users WHERE username=$1",[data.username]);
            const monitores = query.rows.map((item) => ({ username: item.username, email: item.email, type: item.type, name: item.name }))
            res.status(200).json({ data: monitores });
        } else {
            let query = await db.query("SELECT * FROM users WHERE type='monit'");
            const monitores = query.rows.map((item) => ({ username: item.username, email: item.email, type: item.type, name: item.name }))
            res.status(200).json({ data: monitores });
        }

    } else {
        res.status(200).json({ data: [] })
    }

}