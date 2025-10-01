export const getProductSchema = {
  query: {
    type: 'object',
    properties: {
      limit: {
        type: 'number',
      },
      page: {
        type: 'number',
      },
    },
    additionalProperties: false,
  },
};

export const createProductSchema = {
  body: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
      },
      stock: {
        type: 'number',
      },
      price: {
        type: 'number',
      },
    },
    required: ['name', 'stock', 'price'],
    additionalProperties: false,
    errorMessage: {
      required: {
        name: 'Name is required',
        stock: 'Stock is required',
        price: 'Price is required',
      },
    },
  },
};
