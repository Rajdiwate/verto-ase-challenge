import { Box, Button, Card, CardContent, Divider, Grid, Stack, Typography } from '@mui/material';
import { useGetCartProductsQuery, useUpdateQuantityMutation } from '../../../store/api/cart';
import { useCreateOrderMutation } from '../../../store/api/order/';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useGetProductsQuery } from '../../../store/api/product';

export const Cart = () => {
  const { data: cartProducts } = useGetCartProductsQuery();
  const { refetch: getCartProducts } = useGetCartProductsQuery();
  const { refetch: getProducts } = useGetProductsQuery({ limit: 25, page: 1 });
  const [createOrder] = useCreateOrderMutation();
  const [updateQuantity] = useUpdateQuantityMutation();
  const navigate = useNavigate();

  const handleCheckout = async () => {
    const orderItems = cartProducts?.products.map((item) => item.cartItemId);
    if (!orderItems || orderItems.length === 0) return;
    await createOrder(orderItems).unwrap();
    await getCartProducts(); // can be prevented. but for now, it is not a big issue
    await getProducts(); // can be prevented. but for now, it is not a big issue
    toast.success('Order created successfully');
    navigate('/');
  };

  // we can use a debounce here. but for now, it is not a big issue
  const handleQuantityChange = async (cartItemId: number, quantity: number, stock: number) => {
    if (quantity < 1) {
      toast.error('Quantity must be at least 1');
      return;
    }
    if (quantity > stock) {
      toast.error('Quantity must be less than or equal to stock');
      return;
    }

    await updateQuantity({ cartItemId, quantity }).unwrap();
    await getCartProducts(); // can be prevented. but for now, it is not a big issue
  };

  return (
    <Box sx={{ maxWidth: 1200, margin: '0 auto', p: 3 }} className="relative flex flex-col gap-3">
      <Box className="flex justify-between items-center ">
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          Your Shopping Cart
        </Typography>
        <Box className="flex justify-end items-center mt-2">
          <Box className="text-right">
            <Typography variant="h5" component="div" fontWeight={600}>
              Total: ${cartProducts?.totalAmount?.toFixed(2)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {cartProducts?.products.length || 0} items
            </Typography>
          </Box>
        </Box>
      </Box>

      <Stack spacing={3}>
        {cartProducts?.products.map((product) => (
          <Card key={product.id} elevation={2}>
            <CardContent>
              <Grid container spacing={3} alignItems="center">
                <Box sx={{ width: '120px' }}>
                  <Box
                    component={'img'}
                    src={product.img}
                    className="w-full h-32 bg-gray-200 flex items-center justify-center rounded-xl"
                  />
                </Box>

                <Box
                  display="flex"
                  flexDirection="column"
                  height="100%"
                  justifyContent="space-between"
                >
                  <Box>
                    <Typography variant="h6" component="h2" fontWeight={600} gutterBottom>
                      {product.name}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" gutterBottom>
                      In Stock: {product.stock}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    <Typography variant="h6" color="primary" fontWeight={600} lineHeight={0}>
                      ${product?.price?.toFixed(2)}
                    </Typography>
                    <Stack direction="row" gap={2}>
                      <button
                        className="border border-black px-4 py-2 font-semibold text-xl"
                        onClick={() =>
                          handleQuantityChange(
                            product.cartItemId,
                            product.quantity - 1,
                            product.stock
                          )
                        }
                      >
                        -
                      </button>
                      <button className="px-4 py-2 text-xl">{product.quantity}</button>
                      <button
                        className="border border-black px-4 py-2 font-semibold text-xl"
                        onClick={() =>
                          handleQuantityChange(
                            product.cartItemId,
                            product.quantity + 1,
                            product.stock
                          )
                        }
                      >
                        +
                      </button>
                    </Stack>
                  </Box>
                </Box>
              </Grid>
            </CardContent>
          </Card>
        ))}

        <Divider sx={{ my: 2 }} />
      </Stack>
      <Button
        variant="contained"
        color="secondary"
        disabled={!cartProducts?.products.length}
        sx={{ px: 8, alignSelf: 'flex-end', fontSize: '1rem', textTransform: 'none' }}
        onClick={handleCheckout}
      >
        Checkout
      </Button>
    </Box>
  );
};
