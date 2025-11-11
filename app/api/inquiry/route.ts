'use server'

import InquiryEmail from '@/app/emails/inquiry';
import { fetchSingleItem } from '@/app/lib/data';
import { ProductWithImages } from '@/app/lib/types';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// resend api key from env
const apiKey = process.env.RESEND_API_KEY;

// instance of resend email sender
const resend = new Resend(apiKey);

export async function POST(req: Request) {

  // getting the form data passed through the server actions
  const { name, title, inquiry, email, product_id } = await req.json();

  // checking if product_id is existent and fetching the it from db
  let product: ProductWithImages | null = null;
  if (product_id) {
    product = await fetchSingleItem(product_id);
  }

  const { data, error } = await resend.emails.send({
    from: 'noreply@zenstonesridgewood.com',
    to: 'zenstones@yahoo.com',
    subject: 'Customer Inquiry',
    replyTo: email,
    react: InquiryEmail({name, title, inquiry, email, product}),
  });
  
  if (error) {
    console.log('error:', JSON.stringify(error))
    return NextResponse.json({error})
  }

  console.log('data:', JSON.stringify(data))
  return NextResponse.json({data})
}
