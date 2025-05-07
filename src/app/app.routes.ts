import { Routes } from '@angular/router';
import { PrincipalComponent } from './paginas/principal/principal.component';
import { ModalidadeComponent } from './paginas/modalidade/modalidade.component';

export const routes: Routes = [
    {
        path:'',
        component: PrincipalComponent
    },
    {
        path:'modalidade',
        component: ModalidadeComponent
    },
];
