"use server";

import { mintclub } from "mint.club-v2-sdk";

export async function uploadImage(formData: FormData) {
  const body = Object.fromEntries(formData.entries());
  const { file } = body;
  if (!file) {
    throw new Error("image is required");
  }
  const hash = await mintclub.ipfs.upload({
    filebaseApiKey: process.env.FILEBASE_API_KEY as string,
    media: file as Blob,
  });
  return hash;
}

export async function uploadMetadata(formData: FormData) {
  const body = Object.fromEntries(formData.entries());
  const { image, name } = body;
  if (!image || !name) {
    throw new Error("image and name are required");
  }
  const hash = await mintclub.ipfs.uploadMetadata({
    filebaseApiKey: process.env.FILEBASE_API_KEY as string,
    image: image as `ipfs://${string}`,
    name: name as string,
  });
  return hash;
}
