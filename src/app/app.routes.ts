import { Routes } from '@angular/router';
import { PrincipalComponent } from './paginas/principal/principal.component';
import { PaginaEscolaComponent } from './paginas/pagina-escola/pagina-escola.component';
import { PaginaModalidadeComponent } from './paginas/pagina-modalidade/pagina-modalidade.component';

export const routes: Routes = [
    { path: '', component: PrincipalComponent },

    // página da escola (unidades filtradas)
    { path: 'escolas/:escolaId', component: PaginaEscolaComponent },

    // ✅ página que mostra a grade (seu nome antigo: pagina-modalidade)
    { path: 'modalidade/:escolaId/:unidadeId', component: PaginaModalidadeComponent },
];
