import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../lib/db';
import User from '../../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { phone, password } = req.body;

  await dbConnect();

  const user = await User.findOne({ phone });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign({ userId: user._id, phone: user.phone }, process.env.JWT_SECRET!, {
    expiresIn: '7d',
  });

  res.status(200).json({ token });
}
