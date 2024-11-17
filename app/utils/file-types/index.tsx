export async function imageFileToBase64(file: File): Promise<string | null> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result as string | null); // Base64 string without the data URI prefix
    };

    reader.onerror = (error) => reject(error);

    reader.readAsDataURL(file);
  });
}

export function dataURLtoFile(dataUrl: string, filename: string) {
  const arr = dataUrl.split(","),
    mime = arr[0].match(/:(.*?);/)?.[1],
    bstr = atob(arr[arr.length - 1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}
