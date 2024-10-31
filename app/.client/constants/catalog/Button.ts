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
          id: 0,
          children: [1],
          data: {
            btnStyle: "plain",
            buttonType: "text",
            showIcon: false,
            value: "Button Text",
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
