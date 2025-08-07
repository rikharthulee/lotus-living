import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
  const { name, email, phone, message } = await req.json();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER, // ✅ YOU as the sender
    to: process.env.EMAIL_USER, // ✅ Send it to yourself
    replyTo: email, // ✅ So you can reply to the user
    subject: `New Contact Form Submission from ${name}`,
    text: `Name: ${name}
    Email: ${email}
    Phone: ${phone}

    Message:
    ${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email failed:", error);
    return NextResponse.json(
      { error: "Email failed to send" },
      { status: 500 }
    );
  }
}
