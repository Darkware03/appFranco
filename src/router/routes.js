
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/login', component: () => import('pages/login.vue') },
      { path: '/registro', component: () => import('pages/registro.vue') },
      { path: '/perfil', component: () => import('pages/perfil.vue') },
      { path: '/cierre', component: () => import('pages/cierre.vue') },
      { path: '/porCobrar', component: () => import('pages/porCobrar.vue') },
      { path: '/etrenencia', component: () => import('pages/etrenencia.vue') },
      { path: '/agregarVenta', component: () => import('pages/addVenta.vue') },
      { path: '/ventas', component: () => import('pages/ventas.vue') },
      { path: '/ventaList', component: () => import('pages/ventaList.vue') },
      { path: '/prospectoList', component: () => import('pages/prospectoList.vue') },
      { path: '/volumenVenta', component: () => import('pages/volumenVenta.vue') },
      { path: '/nuevoProspecto', component: () => import('pages/nuevoProspecto.vue') },
      { path: '/prospectos', component: () => import('pages/prospecto.vue') },
      { path: '/configuracion', component: () => import('pages/configuracion.vue') },
      { path: '/allRoutes', component: () => import('pages/allRoutes.vue') },
      { path: '/empresaIndex', component: () => import('pages/empresaIndex.vue') },
      { path: '/home', component: () => import('pages/home.vue') },
      { path: '/splash', component: () => import('pages/spaslScreen.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
