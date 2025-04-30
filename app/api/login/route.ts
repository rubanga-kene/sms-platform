import dbConnect from '../../lib/db';
import User from '../../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();
  const { phoneNumber, password } = body;

  await dbConnect();

  const user = await User.findOne({ phoneNumber });
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, { expiresIn: '7d' });

  return NextResponse.json({
    token,
    user: {
      fullName: user.fullName,
      phoneNumber: user.phoneNumber
    }
  });
}
