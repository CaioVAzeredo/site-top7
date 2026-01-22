export interface Horario {
    horario: string;
    seg: string;
    ter: string;
    qua: string;
    qui: string;
    sex: string;
}

export interface NivelGrade {
    nivel: string;
    horarios: Horario[];
}

export interface UnidadeDaEscola {
    id: string;            // use string para suportar 1,2,3 e "sigma-asa-sul"
    imagem: string;
    titulo: string;
    numero: string;
    grade: NivelGrade[];
}

export interface Escola {
    id: string;            // "ideal" | "sigma"
    nome: string;
    logo: string;
    unidades: UnidadeDaEscola[];
}

export interface EscolasResponse {
    escolas: Escola[];
}
