export const routes = {
  home: '/',
  error: '',
  e404: '/_not_found',
  admin: {
    dashboard: '/admin/dashboard',
    products: '/admin/products',
  },
  auth: {
    login: '/auth/login',
    signup: '/auth/signup',
    validation: '/auth/confirm',
    validation_error: '/auth/confirm/error'
  },
  tienda: {
    home: '/tienda/',
    productos: '/tienda/p/',
    categorias: '/tienda/c/',
  },
  carrito: '/cart',
  checkout: '/checkout',
  configura: {
    upload: '/configura/upload'
  },
  politica: {
    terminos: 'politica/terminos',
    privacidad: 'politica/privacidad',
    cookies: 'politica/cookies',
  }
}