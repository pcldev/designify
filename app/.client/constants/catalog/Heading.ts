export const Heading = {
  type: "Elements",
  group: "Basic",
  element: "Heading",
  variants: [
    {
      name: "Heading",
      items: [
        {
          type: "Heading",
          children: [1],
          id: 0,
          data: {
            showIcon: false,
            editable: true,
            placeholder: "Enter text...",
            value: "This is your heading text.",
          },
          styleData: {
            all: {
              "&": "color: red",
            },
          },
        },
      ],
      icon: "https://cdn.shopify.com/s/files/1/0718/2798/0510/files/heading-icon.svg?v=1730389822",
      order: 1,
    },
  ],
};
