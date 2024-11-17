import { useCallback } from "react";
import { dataURLtoFile } from "~/utils/file-types";
import { authenticatedFetch } from "~/shopify/fns.client";

export const PAGE_ACTIONS = {
  UPLOAD_MEDIA: "upload-media",
};

export function useUploadMedia() {
  const uploadBase64Medias = useCallback(
    async (files: { src: string; name: string }[]) => {
      try {
        const formData = new FormData();

        files.forEach((file) => {
          const fileData = dataURLtoFile(file.src, file.name);

          formData.append("files", fileData);
        });

        const result = await authenticatedFetch(
          `/api/files?action=${PAGE_ACTIONS.UPLOAD_MEDIA}`,
          {
            method: "POST",
            body: formData,
          },
        );

        return result;
      } catch (e) {
        console.error("Failed to upload images with error", e);
      }
    },
    [],
  );

  return {
    uploadBase64Medias,
  };
}
