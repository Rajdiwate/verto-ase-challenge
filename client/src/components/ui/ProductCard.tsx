import { Box, Button } from '@mui/material';

type ProductCardProps = {
  id: number;
  name: string;
  stock: number;
  price: number;
  img: string;
  onAddToCart: (id: number) => void;
};

export const ProductCard = ({ id, name, stock, price, img, onAddToCart }: ProductCardProps) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
    <div className="p-4">
      <Box
        component={'img'}
        src={img}
        alt={name}
        sx={{ width: '100%', height: '200px', borderRadius: '8px' }}
        loading="lazy"
        decoding="async"
      />
      <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
      <div className="mt-2 flex justify-between items-center">
        <span className="text-gray-600">Stock: {stock}</span>
        <span className="text-lg font-bold text-blue-600">${price.toFixed(2)}</span>
      </div>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => onAddToCart(id)}
        disabled={stock === 0}
        className={`mt-4 w-full py-2 px-4 rounded-md font-medium text-white ${
          stock > 0 ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
        }`}
      >
        {stock > 0 ? 'Add to Cart' : 'Out of Stock'}
      </Button>
    </div>
  </div>
);
