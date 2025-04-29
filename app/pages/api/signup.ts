import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import dbConnect from '../../lib/db';
import User from '../../models/User';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { phone, password } = req.body;

  await dbConnect();

  const existing = await User.findOne({ phone });
  if (existing) return res.status(400).json({ error: 'User already exists' });

  // const hashed = await bcrypt.hash(password, 10);
  // const user = await User.create({ phone, password: hashed });

  res.status(201).json({ message: 'User created successfully' });
}
