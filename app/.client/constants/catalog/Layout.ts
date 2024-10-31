export const Layout = {
  type: "Elements",
  group: "Container",
  element: "Layout",
  variants: [
    {
      name: "Layout",
      items: [
        {
          type: "Row",
          id: 0,
          children: [1],
          data: {
            gutter: {
              all: "30px",
              laptop: "30px",
              tablet: "30px",
              mobile: "16px",
            },
          },
        },
        {
          type: "Column",
          id: 1,
          data: {
            size: 12,
            laptop: 12,
            tablet: 12,
            mobile: 12,
          },
        },
      ],
      icon: "https://cdn.shopify.com/s/files/1/0718/2798/0510/files/layout-1.svg?v=1730389822",
      order: 1,
    },
    {
      name: "Layout 2 Column",
      items: [
        {
          type: "Row",
          id: 0,
          children: [1, 2],
          data: {
            equals: false,
            gutter: {
              all: "30px",
              laptop: "30px",
              tablet: "30px",
              mobile: "16px",
            },
            doubling: true,
            stackable: false,
          },
        },
        {
          type: "Column",
          id: 1,
          data: {
            size: 6,
            laptop: 6,
            tablet: 6,
            mobile: 12,
          },
        },
        {
          type: "Column",
          id: 2,
          data: {
            size: 6,
            laptop: 6,
            tablet: 6,
            mobile: 12,
          },
        },
      ],
      icon: "https://cdn.shopify.com/s/files/1/0718/2798/0510/files/layout-2.svg?v=1730389822",
      order: 2,
    },
  ],
};
