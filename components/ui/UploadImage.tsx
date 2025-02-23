"use client";

import * as React from "react";
import { useDropzone } from "react-dropzone";
import { Camera, Loader2 } from "lucide-react";

import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUploadThing } from "@/lib/uploadthing";

export function ProfileUpload({
  setImageUrl,
  heading,
}: {
  setImageUrl: (url: string) => void;
  heading: string;
}) {
  const [preview, setPreview] = React.useState<string | null>(null);
  const [isUploading, setIsUploading] = React.useState(false);
  const { startUpload } = useUploadThing("imageUploader");

  const onDrop = React.useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        // Create preview
        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);
        setIsUploading(true);

        try {
          const res = await startUpload([file]);
          if (res?.[0]?.url) {
            // Handle successful upload - you can save the URL to your backend
            setImageUrl(res[0].url);
          }
        } catch (error) {
          console.error("Upload failed:", error);
        } finally {
          setIsUploading(false);
        }
      }
    },
    [startUpload, setImageUrl]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif"],
    },
    maxFiles: 1,
    multiple: false,
  });

  //function to handle the file change so that we also delete the image from the vercel bob

  return (
    <Card className="p-4">
      <h1>{heading}</h1>
      <div className="flex flex-col items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="relative h-32 w-32 rounded"
              disabled={isUploading}
            >
              <Avatar className="h-32 w-32 rounded">
                <AvatarImage src={preview || ""} className="rounded" />
                <AvatarFallback className="bg-muted">
                  {isUploading ? (
                    <Loader2 className="h-8 w-8 animate-spin" />
                  ) : (
                    <Camera className="h-8 w-8" />
                  )}
                </AvatarFallback>
              </Avatar>
              {!isUploading && (
                <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity hover:opacity-100">
                  Change Photo
                </div>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center">
            <DropdownMenuItem
              {...getRootProps()}
              onSelect={(event) => event.preventDefault()}
            >
              <input {...getInputProps()} />
              Upload Photo
            </DropdownMenuItem>
            {preview && (
              <DropdownMenuItem
                onClick={() => setPreview(null)}
                className="text-red-600"
              >
                Remove Photo
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="text-sm text-muted-foreground">
          Click to upload or drag and drop
        </div>
        <div className="text-xs text-muted-foreground">
          PNG, JPG or GIF (max. 4MB)
        </div>
      </div>
    </Card>
  );
}
