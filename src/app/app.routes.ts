import { Routes } from '@angular/router';
import { authGuard, publicGuard } from './core/guards';
import AnadirComponent from './pages/anadir/anadir.component';
import { EditarComponent } from './pages/editar/editar.component';
import { EliminarComponent } from './pages/eliminar/eliminar.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { EdiPerfilComponent } from './pages/edi-perfil/edi-perfil.component';
import PrincipalComponent from './pages/principal/principal.component';
import LogInComponent from './pages/auth/log-in/log-in.component';
import VistalComponent from './pages/vistal/vistal.component';
import SignUpComponent from './pages/auth/sign-up/sign-up.component';
export const routes: Routes = [

    {
        path: '',
        canActivate: [authGuard],
        loadComponent: () => import('./pages/principal/principal.component'),
      },

      {path : 'vistal', canActivate:[authGuard],
      loadComponent:() => import('./pages/vistal/vistal.component'),
    },
      {
        path: 'auth',
        canActivate: [publicGuard],
        children: [
          {
            path: 'sign-up',
            loadComponent: () => import('./pages/auth/sign-up/sign-up.component'),
          },
          {
            path: 'log-in',
            loadComponent: () => import('./pages/auth/log-in/log-in.component'),
          },
        ],
      },
     

      {path: 'anadir', title: 'anadir', component: AnadirComponent},
      {path: 'editar', title: 'editar', component: EditarComponent},
      {path: 'eliminar', title: 'eliminar', component: EliminarComponent},
      {path: 'perfil', title: 'editar', component: PerfilComponent},
      {path: 'edi-perfil', title: 'eliminar', component: EdiPerfilComponent},
      {path: 'principal', title: 'principal', component: PrincipalComponent},
      {path: 'vistal' , title: 'vistal', component:VistalComponent}
];
