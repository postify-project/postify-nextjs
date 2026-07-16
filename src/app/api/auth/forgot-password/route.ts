import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import crypto from "crypto";
import { sendEmail } from "@/lib/mailer";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { email } = await req.json();

    const user = await User.findOne({ email });
    if (!user)
      return NextResponse.json(
        { message: "If the email exists, a reset link has been sent." },
        { status: 200 },
      );

    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = new Date(Date.now() + 1 * 60 * 60 * 1000); // 1 hour
    await user.save();

    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${resetToken}`;

    await sendEmail({
      to: email,
      subject: "Password Reset Request",
      html: `<div style="font-family:sans-serif; background:#0B0F19; color:#fff; padding:20px; border-radius:8px;">
              <h2>Reset Password</h2>
              <p>Click the link below to safely reset your password:</p>
              <a href="${resetUrl}" style="color:#38bdf8; font-weight:bold;">Reset Password Link</a>
             </div>`,
    });

    return NextResponse.json(
      { message: "If the email exists, a reset link has been sent." },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
