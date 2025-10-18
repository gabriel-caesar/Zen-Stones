import { NextResponse } from 'next/server'
import { Resend } from 'resend'

// resend api key from env
const apiKey = process.env.RESEND_API_KEY;
console.log(apiKey)

export async function GET() {

  // instance of resend email sender
  const resend = new Resend(apiKey);

  try {

    const { data } = await resend.emails.send({
      from: 'therocksgamers@hotmail.com',
      to: 'gabriel.mdonno@hotmail.com',
      subject: 'Hello from Zen Stones',
      html: '<h1>This is a test email, disregard it.</h1>'
    })

    return NextResponse.json({ data })

  } catch (error) {
    return NextResponse.json({ error })
  }

}