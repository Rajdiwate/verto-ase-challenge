export const addCartSchema = {
  body: {
    type: 'object',
    properties: {
      productId: {
        type: 'number',
      },
      quantity: {
        type: 'number',
      },
    },
    required: ['productId', 'quantity'],
    additionalProperties: false,
    errorMessage: {
      required: {
        productId: 'Product ID is required',
        quantity: 'Quantity is required',
      },
    },
  },
};

export const removeCartSchema = {
  body: {
    type: 'object',
    properties: {
      productId: {
        type: 'number',
      },
      quantity: {
        type: 'number',
      },
    },
    required: ['productId', 'quantity'],
    additionalProperties: false,
    errorMessage: {
      required: {
        productId: 'Product ID is required',
        quantity: 'Quantity is required',
      },
    },
  },
};

export const updateQuantitySchema = {
  body: {
    type: 'object',
    properties: {
      cartItemId: {
        type: 'number',
      },
      quantity: {
        type: 'number',
      },
    },
    required: ['cartItemId', 'quantity'],
    additionalProperties: false,
    errorMessage: {
      required: {
        cartItemId: 'Cart Item ID is required',
        quantity: 'Quantity is required',
      },
    },
  },
};
