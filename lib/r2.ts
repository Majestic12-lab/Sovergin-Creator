import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const R2 = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

export async function uploadAudioToR2(jobId: string, audioBuffer: Buffer): Promise<void> {
  await R2.send(new PutObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME!,
    Key: `audio/${jobId}.mp3`,
    Body: audioBuffer,
    ContentType: "audio/mpeg",
  }));
}

export function getPublicAudioUrl(jobId: string): string {
  return `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com/${process.env.R2_BUCKET_NAME}/audio/${jobId}.mp3`
}

export async function getAudioSignedUrl(jobId: string): Promise<string> {
  const command = new GetObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME!,
    Key: `audio/${jobId}.mp3`,
  });
  return getSignedUrl(R2, command, { expiresIn: 3600 });
}
