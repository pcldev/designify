export const pageCSS: { [k: string]: { url: string; frontend?: boolean } } = {
  editorStyle: {
    url: `/static/css/editor-iframe.css`,
  },
};

export const sandboxHeaders = Object.keys(pageCSS)
  .map(
    (k: string) =>
      `<link rel="stylesheet" media="all" href="${pageCSS[k].url}" />`,
  )
  .join("");
