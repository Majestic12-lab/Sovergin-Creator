import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const R2 = new S3Client({
  region: "auto",
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
  },
});

export async function uploadAudioToR2(jobId: string, audioBuffer: Buffer): Promise<void> {
  await R2.send(new PutObjectCommand({
    Key: `audio/${jobId}.mp3`,
    Body: audioBuffer,
    ContentType: "audio/mpeg",
  }));
}

export async function getAudioSignedUrl(jobId: string): Promise<string> {
  const command = new GetObjectCommand({
    Key: `audio/${jobId}.mp3`,
  });
  return getSignedUrl(R2, command, { expiresIn: 3600 });
}
