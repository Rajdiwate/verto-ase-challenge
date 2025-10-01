export const createUserSchema = {
  body: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        minLength: 3,
        maxLength: 50,
        errorMessage: 'Name must be a string with minimum length of 3 and maximum length of 50',
      },
      email: {
        type: 'string',
        format: 'email',
        errorMessage:
          'Email must be a valid email address',
      },
      password: {
        type: 'string',
        format: 'password',
      },
    },
    required: ['name', 'email', 'password'],
    additionalProperties: false,
    errorMessage: {
      required: {
        name: 'Name is required',
        email: 'Email is required',
        password: 'Password is required',
      },
    },
  },
};

export const loginSchema = {
  body: {
    type: 'object',
    properties: {
      email: {
        type: 'string',
        format: 'email',
      },
      password: {
        type: 'string',
        format: 'password',
      },
    },
    required: ['email', 'password'],
    additionalProperties: false,
    errorMessage: {
      required: {
        email: 'Email is required',
        password: 'Password is required',
      },
    },
  },
};
