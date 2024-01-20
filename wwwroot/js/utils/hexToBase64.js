export function hexToBase64(hex) {
  let out = "";
  const arr = hex.split("");
  while (arr.length)
    out += String.fromCharCode(parseInt(arr.shift() + arr.shift(), 16));
  return btoa(out).replace(/[=]+/g, "").replace(/\//g, "_").replace(/\+/g, "-");
}
