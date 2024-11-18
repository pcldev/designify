import { sleep } from "~/utils/sleep";

// Define variable to hold URLs that are requesting
const requesting: { [key: string]: boolean } = {};

// Define variable to cache responses
const cachedResponses: { [key: string]: any } = {};

export async function authenticatedFetch(url: string, opts?: any) {
  try {
    // Do not request the same URL with the same method and the same payload more than one time
    const key = ["GET", undefined].includes(opts?.method) && url;

    if (key) {
      if (requesting[key]) {
        await sleep(100);
        return authenticatedFetch(url, opts);
      }

      requesting[key] = true;
    }

    const shopify = window.opener?.shopify ?? window.shopify;
    const idToken = await shopify.idToken();

    const headers = {
      ...opts?.headers,
      Authorization: `Bearer ${idToken}`,
    };

    const shouldCache = opts?.preferCache && cachedResponses[url];
    const result = shouldCache
      ? cachedResponses[url]
      : await fetch(url, { ...opts, headers })
          .then(async (res) => {
            if (!res.ok) {
              throw new Error(`HTTP error! Status: ${res.status}`);
            }
            // Attempt to parse JSON if content length is greater than zero
            const text = await res.text();
            return text ? JSON.parse(text) : null;
          })
          .catch((error) => {
            console.error("Error fetching or parsing JSON:", error);
            return null;
          });

    if (opts?.preferCache && !cachedResponses[url]) {
      cachedResponses[url] = result;
    }

    if (key) {
      // Clear requesting state
      delete requesting[key];
    }

    // Translate server message
    const message = result?.message;

    if (result && message) {
      result.message =
        typeof message === "string"
          ? message
          : message.text
            ? `${message.text} ${message.params}`
            : message;
    }

    return result;
  } catch (e: any) {
    if ((e.message || e).includes("aborted")) {
      return { success: false, message: "aborted" };
    }

    console.error(e);
  }
}
