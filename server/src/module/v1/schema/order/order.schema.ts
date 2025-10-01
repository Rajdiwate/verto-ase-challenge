export const createOrderSchema = {
  body: {
    type: 'object',
    properties: {
      items: {
        type: 'array',
        items: { type: 'number' },
      },
    },
    required: ['items'],
    additionalProperties: false,
    errorMessage: {
      required: {
        items: 'Items are required',
      },
    },
  },
};
