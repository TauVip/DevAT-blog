import { Request, Response, NextFunction } from 'express'
import Users from '../models/userModel'
import jwt from 'jsonwebtoken'
import { IDecodedToken } from '../config/interface'

const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')
    if (!token) return res.status(400).json({ msg: 'Invalid Authentication.' })

    const decoded = jwt.verify(token, `${process.env.ACCESS_TOKEN_SECRET}`)
    console.log(decoded)
  } catch (err: any) {
    return res.status(500).json({ msg: err.message })
  }
}
export default auth
