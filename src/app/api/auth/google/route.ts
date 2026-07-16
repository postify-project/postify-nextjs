import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { credential } = await req.json();

    // Verify Google ID Token securely via API fetching rather than pulling external heavy libs
    const googleRes = await fetch(
      `https://oauth2.googleapis.com/tokeninfo?id_token=${credential}`,
    );
    const profile = await googleRes.json();

    if (profile.error) {
      return NextResponse.json(
        { error: "Invalid Google Identity token" },
        { status: 400 },
      );
    }

    let user = await User.findOne({ email: profile.email });

    if (!user) {
      user = await User.create({
        name: profile.name,
        email: profile.email,
        googleId: profile.sub,
        isVerified: true, // Google accounts are pre-verified
      });
    } else if (!user.googleId) {
      user.googleId = profile.sub;
      await user.save();
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });

    return NextResponse.json(
      { message: "Google authentication successful", token, user },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
