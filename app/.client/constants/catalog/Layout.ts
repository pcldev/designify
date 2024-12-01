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
          _id: 0,
          children: [1],
          styleData: {
            all: {
              "&": "display: flex; flex-wrap: wrap",
            },
          },
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
          _id: 1,
          children: [],
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
          _id: 0,
          children: [1, 2],
          styleData: {
            all: {
              "&": "display: flex; flex-wrap: wrap",
            },
          },
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
          _id: 1,
          children: [],
          data: {
            size: 6,
            laptop: 6,
            tablet: 6,
            mobile: 12,
          },
        },
        {
          type: "Column",
          _id: 2,
          children: [],
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
    {
      name: "Layout 3 Column",
      items: [
        {
          type: "Row",
          _id: 0,
          children: [1, 2, 3],
          styleData: {
            all: {
              "&": "display: flex; flex-wrap: wrap",
            },
          },
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
          _id: 1,
          children: [],
          data: {
            size: 4,
            laptop: 6,
            tablet: 6,
            mobile: 12,
          },
        },
        {
          type: "Column",
          _id: 2,
          children: [],
          data: {
            size: 4,
            laptop: 6,
            tablet: 6,
            mobile: 12,
          },
        },
        {
          type: "Column",
          _id: 3,
          children: [],
          data: {
            size: 4,
            laptop: 6,
            tablet: 6,
            mobile: 12,
          },
        },
      ],
      icon: "https://cdn.shopify.com/s/files/1/0718/2798/0510/files/layout-3_ea3fd6e8-5666-4f32-a364-9d024233513b.svg?v=1733017108",
      order: 3,
    },
    {
      name: "Layout 4 Column",
      items: [
        {
          type: "Row",
          _id: 0,
          children: [1, 2, 3, 4],
          styleData: {
            all: {
              "&": "display: flex; flex-wrap: wrap",
            },
          },
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
          _id: 1,
          children: [],
          data: {
            size: 3,
            laptop: 6,
            tablet: 6,
            mobile: 12,
          },
        },
        {
          type: "Column",
          _id: 2,
          children: [],
          data: {
            size: 3,
            laptop: 6,
            tablet: 6,
            mobile: 12,
          },
        },
        {
          type: "Column",
          _id: 3,
          children: [],
          data: {
            size: 3,
            laptop: 6,
            tablet: 6,
            mobile: 12,
          },
        },
        {
          type: "Column",
          _id: 4,
          children: [],
          data: {
            size: 3,
            laptop: 6,
            tablet: 6,
            mobile: 12,
          },
        },
      ],
      icon: "https://cdn.shopify.com/s/files/1/0718/2798/0510/files/layout-4.svg?v=1733017141",
      order: 4,
    },
  ],
};
