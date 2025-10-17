import { NextResponse } from 'next/server';
import { S3Client } from '@aws-sdk/client-s3';
import { uploadFileToS3 } from '@/app/lib/actions';
import { fileCopy } from '@/app/lib/types';

if (!process.env.AWS_S3_REGION || 
    !process.env.AWS_S3_ACCESS_KEY_ID || 
    !process.env.AWS_S3_SECRET_ACCESS_KEY) {
  throw new Error("Missing AWS S3 environment variables");
}

const s3ClientInstance = new S3Client({
  region: process.env.AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
  }
});

export async function POST(request: Request, { params }: { params: Promise<{ name: string }> }) {

  try {

    const { name } = await params;
    // give us access from the input form data
    const formData = await request.formData();
    // getting the input value with name === product-photo
    const files = formData.getAll(name) as File[];

    const uploadedFiles: fileCopy[] = [];

    // checking if file exists and also if it is a File type
    if (!files || files.length === 0) {
      return NextResponse.json({
        error: 'File is required',
        status: 400
      })
    }

    for (const file of files) {
      const buffer = Buffer.from(await file.arrayBuffer());

      // here I am specifying what folder to include the images in S3
      const folderName = name === 'productPhoto' ? 'products' : 'featuredSubcategories';

      // getting the filename back from the upload functino
      const fileName = await uploadFileToS3(buffer, file.name, folderName, s3ClientInstance);

      // joining url with env files and dynamic params
      const fileUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_S3_REGION}.amazonaws.com/${folderName}/${fileName}`;

      uploadedFiles.push({
        url: fileUrl,
        name: fileName,
        folder: folderName
      })
    }
    
    // uploadedFiles will be accessed in the backend to insert data into db
    return NextResponse.json({
      success: true,
      files: uploadedFiles
    })


  } catch (error) {
    return NextResponse.json({
      error_message: 'Error uploading file'
    })
  }

}