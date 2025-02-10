import * as Minio from 'minio';

const minioClient = new Minio.Client({
  endPoint: process.env.NEXT_PUBLIC_MINIO_ENDPOINT!,
  port: parseInt(process.env.NEXT_PUBLIC_MINIO_PORT!),
  useSSL: process.env.NEXT_PUBLIC_MINIO_USE_SSL === 'true',
  accessKey: process.env.NEXT_PUBLIC_MINIO_ACCESS_KEY!,
  secretKey: process.env.NEXT_PUBLIC_MINIO_SECRET_KEY!,
});
