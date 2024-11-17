function objectToQueryString(obj: any) {
  const keyValuePairs = [];

  for (const key in obj) {
    const value = obj[key];
    if (Array.isArray(value)) {
      value.forEach((element) => {
        keyValuePairs.push(
          `${encodeURIComponent(key)}[]=${encodeURIComponent(element)}`,
        );
      });
    } else {
      keyValuePairs.push(
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
      );
    }
  }

  return keyValuePairs.join("&");
}

export default objectToQueryString;
