import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please provide a valid email address.",
      ],
    },
    password: {
      type: String,
      required: function (this: any) {
        return !this.googleId;
      },
      validate: {
        validator: function (this: any, v: string) {
          // If using Google OAuth, bypass standard password formatting rule check
          if (this.googleId && !v) return true;

          // Enforce 8+ chars, 1 uppercase, 1 number
          return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(v);
        },
        message:
          "Password must be at least 8 characters long, contain an uppercase letter, and a number.",
      },
    },
    googleId: { type: String, default: null },
    isVerified: { type: Boolean, default: false },
    otp: { type: String, default: null },
    otpExpires: { type: Date, default: null },
    resetPasswordToken: { type: String, default: null },
    resetPasswordExpires: { type: Date, default: null },
  },
  { timestamps: true },
);

// Prevent leaking sensitive fields when converting to JSON
UserSchema.set("toJSON", {
  transform: (_, ret) => {
    delete ret.password;
    delete ret.otp;
    delete ret.otpExpires;
    delete ret.resetPasswordToken;
    delete ret.resetPasswordExpires;
    return ret;
  },
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
