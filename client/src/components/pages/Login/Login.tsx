import { Box, Typography, IconButton, InputAdornment, CircularProgress } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { loginSchema, type LoginSchema } from './schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextField, Button, Paper } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useLoginMutation } from '../../../store/api/user';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [login, { isLoading }] = useLoginMutation();

  const navigate = useNavigate();

  const { handleSubmit, control } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginSchema) => {
    try {
      await login(data).unwrap();
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      className="flex justify-center items-center min-h-screen"
      sx={{
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        padding: 2,
      }}
    >
      <Paper
        elevation={3}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          width: '100%',
          maxWidth: 600,
          padding: 4,
          borderRadius: 10,
          backgroundColor: 'background.paper',
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          align="center"
          color="primary"
          fontWeight="bold"
          gutterBottom
        >
          Welcome Back
        </Typography>

        <Typography variant="body2" color="text.secondary" align="center" mb={2}>
          Please sign in to continue
        </Typography>

        <Controller
          name="email"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label="Email Address"
              variant="outlined"
              fullWidth
              type="email"
              error={!!error}
              helperText={error?.message}
              disabled={isLoading}
              InputProps={{
                sx: { borderRadius: 1 },
              }}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              label="Password"
              variant="outlined"
              fullWidth
              type={showPassword ? 'text' : 'password'}
              error={!!error}
              helperText={error?.message}
              disabled={isLoading}
              InputProps={{
                sx: { borderRadius: 1 },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={togglePasswordVisibility}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          )}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          fullWidth
          disabled={isLoading}
          sx={{
            py: 1.5,
            borderRadius: 1,
            textTransform: 'none',
            fontSize: '1rem',
            fontWeight: 'medium',
            mt: 2,
            '&:hover': {
              transform: 'translateY(-1px)',
              boxShadow: 3,
            },
            transition: 'all 0.2s',
          }}
        >
          {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
        </Button>

        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <Typography variant="body2" color="text.secondary">
            Don't have an account?{' '}
            <Link to="/signup">
              <Typography
                component="span"
                color="primary"
                sx={{
                  cursor: 'pointer',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                Sign up
              </Typography>
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};
