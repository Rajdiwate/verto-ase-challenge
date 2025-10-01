import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  console.log(' Seeding database...');

  // Clear existing products
  await prisma.product.deleteMany({});
  console.log(' Cleared existing products');

  // Generate 100 dummy products
  const products = Array.from({ length: 100 }, () => ({
    name: `${faker.commerce.productName()} ${faker.commerce.productAdjective()}`,
    stock: faker.number.int({ min: 0, max: 1000 }),
    price: faker.number.int({ min: 100, max: 10000 }),
    img: faker.image.url(),
  }));

  // Insert products in batches of 10 to avoid connection timeouts
  const batchSize = 10;
  for (let i = 0; i < products.length; i += batchSize) {
    const batch = products.slice(i, i + batchSize);
    await prisma.product.createMany({
      data: batch,
      skipDuplicates: true,
    });
    console.log(` Seeded batch ${i / batchSize + 1}/${Math.ceil(products.length / batchSize)}`);
  }

  console.log(' Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
