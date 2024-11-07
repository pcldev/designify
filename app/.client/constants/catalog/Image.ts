export const Image = {
  type: "Elements",
  group: "Media",
  element: "Image",
  variants: [
    {
      name: "Image",
      items: [
        {
          type: "Image",
          _id: 0,
          children: [],
          data: {
            fullWidth: {
              all: true,
              laptop: "unset",
              tablet: "unset",
              mobile: "unset",
            },
            ratio: {
              all: "original",
              laptop: "unset",
              tablet: "unset",
              mobile: "unset",
            },
          },
          styleData: {
            all: {
              "&": "width: 100%;",
            },
          },
        },
      ],
      icon: "https://cdn.shopify.com/s/files/1/0718/2798/0510/files/image-icon.svg?v=1730389821",
      order: 1,
    },
  ],
};
