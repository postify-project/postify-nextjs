import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/lib/mailer";
import { validateEmail, validatePassword } from "@/lib/validations";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }

    if (!validateEmail(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 },
      );
    }

    if (!validatePassword(password)) {
      return NextResponse.json(
        {
          error:
            "Password must be 8+ chars, contain an uppercase letter and a number",
        },
        { status: 400 },
      );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 400 },
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 mins

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      otp,
      otpExpires,
    });

    await sendEmail({
      to: email,
      subject: "Verify your Account - OTP",
      html: `<div style="font-family:sans-serif; background:#0B0F19; color:#fff; padding:20px; border-radius:8px;">
              <h2>Welcome ${name}!</h2>
              <p>Your OTP verification code is: <strong style="color:#38bdf8; font-size:24px;">${otp}</strong></p>
              <p>Valid for 15 minutes.</p>
             </div>`,
    });

    return NextResponse.json(
      { message: "User created. Verify OTP sent to email.", email },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
