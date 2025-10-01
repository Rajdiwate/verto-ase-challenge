import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import { app } from '../app';
import { PrismaClient } from '@prisma/client';

// Mock PrismaClient
vi.mock('@prisma/client', () => {
  const mockPrisma = {
    product: {
      findMany: vi.fn(),
      createMany: vi.fn(),
      deleteMany: vi.fn(),
    },
    $disconnect: vi.fn(),
  };
  return {
    PrismaClient: vi.fn(() => mockPrisma),
  };
});

const prisma = new PrismaClient();

const testProducts = [
  {
    id: 1,
    name: 'Test Product 1',
    price: 100,
    stock: 10,
    img: 'image1.jpg',
  },
  {
    id: 2,
    name: 'Test Product 2',
    price: 200,
    stock: 20,
    img: 'image2.jpg',
  },
];

describe('GET /v1/product', () => {
  beforeAll(() => {
    // Mock the findMany implementation
    vi.mocked(prisma.product.findMany).mockImplementation(({ take, skip } = {}) => {
      if (take && skip !== undefined) {
        return Promise.resolve([testProducts[0]]);
      }
      return Promise.resolve(testProducts) as any;
    });
  });

  afterAll(() => {
    vi.clearAllMocks();
  });

  it('should return a list of products with pagination', async () => {
    const limit = 1;
    const page = 1;

    const response = await request(app)
      .get('/v1/product')
      .query({ limit, page })
      .expect('Content-Type', /json/)
      .expect(200);

    // Verify the response
    expect(response.body).toHaveProperty('success', true);
    expect(response.body).toHaveProperty('message', 'Products fetched successfully');
    expect(Array.isArray(response.body.products)).toBe(true);
    expect(response.body.products).toHaveLength(1);

    // Verify product structure
    const product = response.body.products[0];
    expect(product).toHaveProperty('id');
    expect(product).toHaveProperty('name');
    expect(product).toHaveProperty('price');
    expect(product).toHaveProperty('stock');
    expect(product).toHaveProperty('img');

    // Verify Prisma was called with correct arguments
    expect(prisma.product.findMany).toHaveBeenCalledWith({
      take: limit,
      skip: (page - 1) * limit,
    });
  });

  it('should return all products if no pagination params are provided', async () => {
    const response = await request(app)
      .get('/v1/product')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).toHaveProperty('success', true);
    expect(Array.isArray(response.body.products)).toBe(true);
    expect(response.body.products).toHaveLength(2);

    // Verify Prisma was called without pagination
    expect(prisma.product.findMany).toHaveBeenCalledWith();
  });
});
