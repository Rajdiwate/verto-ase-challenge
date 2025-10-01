import { useGetProductsQuery } from '../../../store/api/product';
import { ProductCard } from '../../ui/ProductCard';
import { useAddToCartMutation } from '../../../store/api/cart/cart';

export const Home = () => {
  const { data: products, isLoading } = useGetProductsQuery({ limit: 25, page: 1 });
  const [addToCart] = useAddToCartMutation();

  const handleAddToCart = (productId: number) => {
    try {
      addToCart({ productId }).unwrap();
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className=" px-10 py-8 w-full">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">All Products</h1>

      {products?.length === 0 ? (
        <p className="text-center text-gray-500">No products available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {products?.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              img={product.img}
              stock={product.stock}
              price={product.price} // Hardcoded price as requested
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      )}
    </div>
  );
};
