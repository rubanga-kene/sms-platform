import dbConnect from '../../lib/db';
import User from '../../models/User';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const formData = await req.formData();

  const fullName = formData.get('fullName') as string;
  const phoneNumber = formData.get('phoneNumber') as string;
  const password = formData.get('password') as string;
  const profilePicture = formData.get('profilePicture') as File | null;

  if (!fullName || !phoneNumber || !password) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  await dbConnect();

  const existingUser = await User.findOne({ phoneNumber });
  if (existingUser) {
    return NextResponse.json({ error: 'User already exists' }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await User.create({
    fullName,
    phoneNumber,
    password: hashedPassword,
    // You can also handle profilePicture storage here if needed
  });

  return NextResponse.json({ message: 'Signup successful' });
}

