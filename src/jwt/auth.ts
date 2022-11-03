const jwt = require("jsonwebtoken")
const config = process.env

const verifyToken = (req: Express.Request, res: Express.Response, next: any) => {
  const token = req.headers["x-access-token"]
  if (!token) {
    return res.status(403).send("A token is required for authentication")
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN)
    req.user = decoded
    return next()
  } catch (err) {
    return res.status(401).send("Invalid Token")
  }
}

module.exports = verifyToken