import { Grade } from "../../paginas/pagina-modalidade/grade";

export interface Unidade {
    id?: number;
    imagem: string;
    titulo: string;
    numero: string;
    grade: Grade[];
}