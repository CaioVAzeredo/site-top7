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

export interface EscolasResponse {
    escolas: Escola[];
}

export interface MatriculasInfo {
    mensalidade: number;
    sigmaClub?: number;
    uniforme: number;
    patchJudo: number;
    camisaAvulso: number;
    shortAvulso: number;
    observacoes?: string[];
}

export interface Escola {
    id: string;
    nome: string;
    logo: string;
    matriculas?: MatriculasInfo; // ✅ novo
    unidades: any[];
}
