import {
  Body,
  Head,
  Html,
  pixelBasedPreset,
  Heading,
  Tailwind,
  Link,
  Img,
  Container,
  Text,
  Hr,
} from '@react-email/components';
import * as React from 'react';
import { ProductWithImages } from '../lib/types';

type InquiryProps = {
  name: string;
  title: string;
  inquiry: string;
  email: string;
  product: ProductWithImages | null;
};

export default async function InquiryEmail({
  name,
  title,
  inquiry,
  email,
  product,
}: InquiryProps) {
  return (
    <Html style={fonts}>
      <Head />
      <Tailwind config={{ presets: [pixelBasedPreset] }}>
        <Body style={{ textAlign: 'center', width: '100%' }}>
          <Container style={{
            width: '100%',
            textAlign: 'center'
          }}>
            <Container
              style={{
                width: '150px',
                height: '150px',
                textAlign: 'center',
              }}
            >
              <Img
                src={`https://www.zenstonesridgewood.com/store-logo-nobg.png`}
                width={150}
                height={100}
                alt='store-logo'
              />
            </Container>
            
          </Container>

          <Heading className='text-[20px] p-2 mb-10 font-normal w-full bg-black text-white text-center'>
            Hello Dora, this is an inquiry email
          </Heading>

          <Container>
            <Container>
              <Text style={inLiner}>From:</Text>
              <Text style={{ display: 'inline' }}>
                {name} | {email}
              </Text>
            </Container>

            <Text style={{ fontStyle: 'italic' }}>- {title} -</Text>
            <Text style={{ textAlign: 'left', paddingTop: '16px' }}>{inquiry}</Text>
          </Container>

          {product && (
            <Container style={{
              border: '1px solid #000',
              borderRadius: '6px',
              width: 'auto',
              padding: '5px',
              textAlign: 'left',
            }}>
              <Text style={inLiner}>Inquiried product:</Text>
              <Link
                href={`https://www.zenstonesridgewood.com/product/${product.id}`}
                target='_blank'
                style={{ display: 'inline' }}
              >
                {product.name}
              </Link>
            </Container>
          )}

          <Hr className='mt-8' />
          <Container>
            <Text className='text-center text-neutral-500'>
              This email was sent from the inquiry form in the{' '}
              <Link href='https://www.zenstonesridgewood.com/' target='_blank'>
                Zen Stones website
              </Link>
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

const fonts = {
  margin: '0',
  padding: '0',
  fontFamily:
    "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
};

const inLiner = { 
  display: 'inline',
  fontWeight: 'bold',
  marginRight: '4px' 
};