import { EMediaErrors } from "~/constants/errors";

const MAX_RESOLUTION = 25 * 1e6; // 25 MP in pixels
const MAX_SIZE = 20 * 1e6; // 20 MB

/**
 * @description Check media files are valid before uploading file
 * @param files
 * @returns
 */
export async function validateMediaFiles(files: File[]) {
  const acceptedFiles = [];
  const rejectedFiles = [];

  for (const file of files) {
    const isValid = await isValidRatio(file);

    if (isValid) {
      acceptedFiles.push(file);
    } else {
      rejectedFiles.push({
        ...file,
        error: EMediaErrors.FILE_RESOLUTION_ERROR,
      });
    }
  }

  return {
    acceptedFiles,
    rejectedFiles,
  };
}

const isValidRatio = (file: File) => {
  return new Promise((resolve, reject) => {
    if (file) {
      if (file.size > MAX_SIZE) {
        resolve(false);
      }

      const reader = new FileReader();

      reader.onload = function (e) {
        const image = new Image();

        image.onload = function () {
          const aspectRatio = image.width / image.height;
          const isWithinRange =
            aspectRatio >= 1 / 100 && aspectRatio <= 100 / 1;

          const isValidResolution = image.width * image.height < MAX_RESOLUTION;

          resolve(isWithinRange && isValidResolution);
        };

        image.src = (e.target as any).result;
      };

      reader.onerror = function (error) {
        reject(error);
      };

      reader.readAsDataURL(file);
    } else {
      reject(new Error("No file selected."));
    }
  });
};
