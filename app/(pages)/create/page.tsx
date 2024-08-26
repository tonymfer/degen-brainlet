"use client";

import Button from "@/components/Button";
import useCreate from "@hooks/useCreate";
import useProfile from "@hooks/useProfile";
import useWallet from "@hooks/useWallet";
import { uploadImage, uploadMetadata } from "@/server/ipfs";
import { useGlobalStore } from "@/stores/global";
import { abbreviateAddress } from "@/utils/strings";
import { useDebounce } from "@uidotdev/usehooks";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import Buddies from "@/components/Buddies";
import { comicSans } from "@/fonts";

export default function CreatePage() {
  const router = useRouter();
  const { account, isUserLoading, change } = useWallet();
  const uploadRef = useRef<HTMLInputElement>(null);
  const [username, setUsername] = useState("");
  const [file, setFile] = useState<Blob | null>(null);
  const [imgUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const debouncedUsername = useDebounce(username, 150);
  const usernameLoading = debouncedUsername !== username;
  const myPrice = useGlobalStore((state) => state.myPrice);
  const { createProfile, checkingUsername, exists } =
    useCreate(debouncedUsername);
  const { checkingProfile } = useProfile();

  if (!account) {
    redirect("/login");
  }

  if (isUserLoading || checkingProfile) {
    return (
      <div className="flex h-full w-full justify-center text-2xl">
        {/* <Loading /> */}
      </div>
    );
  }

  if (myPrice) {
    toast.error("Ya already got a profile, silly!", {
      id: "profile-exists",
    });

    redirect("/");
  }

  return (
    <div
      className={`flex h-screen ${comicSans.className} w-full items-center justify-center`}
    >
      <Buddies />
      <div className="flex flex-col items-center gap-4 w-full">
        <div className="flex flex-col items-center justify-center">
          <div className="text-2xl font-bold text-black">1. Upload image</div>
          <input
            ref={uploadRef}
            className="hidden"
            type="file"
            accept="image/png, image/jpeg, image/gif, image/webp, image/jpg"
            max={1}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setImageUrl(URL.createObjectURL(file));
                setFile(file);
              } else {
                setImageUrl(null);
                setFile(null);
              }
              e.currentTarget.value = "";
            }}
          />

          {imgUrl ? (
            <Image
              src={imgUrl}
              width={100}
              height={100}
              className="mt-4 flex h-[400px] w-[400px] cursor-pointer flex-col items-center justify-center"
              alt="pic"
              onClick={() => {
                uploadRef.current?.click();
              }}
            />
          ) : (
            <div
              className="mt-4 flex h-[400px] w-[400px] cursor-pointer flex-col items-center justify-center border-2 border-gray-500 text-4xl font-bold text-gray-500"
              onClick={() => {
                uploadRef.current?.click();
              }}
            >
              +
            </div>
          )}
        </div>
        <div className="flex flex-col mt-5 items-center justify-center">
          <div className="text-2xl font-bold text-black">
            2. Collection Name
          </div>
          <input
            className="border-b border-black bg-transparent p-2 text-center text-black outline-none"
            placeholder="dwr brainlet"
            value={username}
            maxLength={15}
            onChange={(e) => {
              let value = e.target.value;
              value = value.replace(/[^a-zA-Z0-9.-_]/g, "");
              value = value.replace(/(\.){2,}/g, ".").replace(/(_){2,}/g, "_");
              setUsername(value);
            }}
          />
          {!usernameLoading && username && !checkingUsername && (
            <div className="mt-2 text-xs">
              {exists ? (
                <div className="text-red-500">symbol already taken</div>
              ) : (
                <div className="text-green-500">Good to Go!</div>
              )}
            </div>
          )}
          {(checkingUsername || checkingUsername || usernameLoading) && (
            <div className="mt-2 text-xs text-gray-500">Checking...</div>
          )}
        </div>

        <Button
          className=" px-5 py-2 mt-4 bg-gradient-to-r max-w-full font-thin rounded-lg from-[#15f9ea] via-[#bba0ff] to-[#F2FD33]"
          disabled={checkingUsername || exists || usernameLoading || !username}
          loading={loading}
          onClick={async () => {
            if (!file || !imgUrl) {
              toast.error("Image not uPloadeD");
              return;
            }
            try {
              setLoading(true);

              const imageForm = new FormData();
              imageForm.append("file", file);
              toast("🖼️ Uploading yer meme...");
              const imageUrl = await uploadImage(imageForm);
              toast.success("🖼️ meme upload done!");

              const metadataForm = new FormData();
              metadataForm.append("image", imageUrl);
              metadataForm.append("name", username);
              toast("📁 Packin' up yer deets...");
              const metadataUrl = await uploadMetadata(metadataForm);
              toast.success("📁 metadata are all packed");

              await createProfile(
                metadataUrl,
                () => {
                  router.replace("/");
                },
                (err: any) => {
                  toast.error(err?.message);
                  setLoading(false);
                }
              );
            } catch (e: any) {
              console.error(e);
              toast.error(e);
              setLoading(false);
            }
          }}
        >
          CREATE
        </Button>
      </div>
    </div>
  );
}
