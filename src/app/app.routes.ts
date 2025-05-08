import { Routes } from '@angular/router';
import { PrincipalComponent } from './paginas/principal/principal.component';
import { PaginaModalidadeComponent } from './paginas/pagina-modalidade/pagina-modalidade.component';

export const routes: Routes = [
    {
        path:'',
        component: PrincipalComponent
    },
    {
        path:'modalidade/:id',
        component: PaginaModalidadeComponent
    },
];
