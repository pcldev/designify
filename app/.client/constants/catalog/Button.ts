export const Button = {
  type: "Elements",
  group: "Basic",
  element: "Button",
  variants: [
    {
      name: "Button",
      items: [
        {
          type: "Button",
          _id: 0,
          children: [],
          data: {
            btnStyle: "plain",
            buttonType: "text",
            showIcon: false,
            content: "Button Text",
            placeholder: "Enter text here...",
          },
          styleData: {
            all: {
              "&": "background-color: black; color: white;",
            },
          },
        },
      ],
      icon: "https://cdn.shopify.com/s/files/1/0718/2798/0510/files/button-icon.svg?v=1730389821",
      order: 1,
    },
  ],
};
