import { AppBar, Toolbar, Typography, Button, Box, Badge, IconButton, Avatar } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useAuth } from '../../hooks/useAuth';
import { useGetCartProductsQuery } from '../../store/api/cart/cart';
import { Link, useNavigate } from 'react-router-dom';

export const Header = () => {
  const { user } = useAuth();
  const { data: cartProducts } = useGetCartProductsQuery();
  const cartItemCount = cartProducts?.totalItems;
  const navigate = useNavigate();

  return (
    <AppBar position="sticky" color="default" elevation={2} sx={{ py: 2 }}>
      <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, md: 4 } }}>
        {/* Left side - Logo/Title */}
        <Link to="/">
          <Typography
            variant="h4"
            component="div"
            sx={{
              fontWeight: 'bold',
              background: 'linear-gradient(45deg, #1976d2 30%, #21CBF3 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Shopping Cart
          </Typography>
        </Link>
        {/* Right side - User info and Cart */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {user ? (
            <>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Avatar sx={{ bgcolor: 'primary.main', width: 36, height: 36 }}>
                  {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </Avatar>
                <Typography
                  variant="body1"
                  sx={{
                    display: { xs: 'none', sm: 'block', fontSize: '1.2rem', fontWeight: 'bold' },
                  }}
                >
                  {user.name}
                </Typography>
              </Box>
              <IconButton color="inherit" aria-label="cart">
                <Badge badgeContent={cartItemCount} color="primary">
                  <Link to="/cart">
                    <ShoppingCartIcon />
                  </Link>
                </Badge>
              </IconButton>
            </>
          ) : (
            <Button color="primary" variant="outlined" onClick={() => navigate('/login')}>
              Sign In
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
