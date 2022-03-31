export interface Adotante{
    nome : string;
    moradia: string; // 1-Casa / 2-Apartamento
    porte: string; // 1-pequeno / 2-médio / 3-grande
    pelagem: string; // 1-curta / 2-longa
    sexo: string; // 1- Fêmea / 2- Macho
    amigavel_crianca: string; // 1-Sim / 2-Não
    guarda: string; // 1-Sim / 2-Não
    brincadeira: string; // 1- Sim / 2- Não
    exercicio: string; // 1- Pouco / 2-Médio / 3-Muito
    queda_pelo: string; // 1- Pouco / 2-Médio / 3-Muito
    tendencia_latir: string;  // 1- Pouco / 2-Médio / 3-Muito
    sugestao: string;
    relevancia_moradia: number;
    relevancia_porte: number;
    relevancia_pelagem: number;
    relevancia_sexo: number;
    relevancia_amigavel_crianca: number;
    relevancia_guarda: number;
    relevancia_brincadeira: number;
    relevancia_exercicio: number;
    relevancia_queda_pelo: number;
    relevancia_tendencia_latir: number;
}