export interface AnimalModel{
    key: any;
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
    similaridade: number;
    avaliacao: 0;
    foto: string;


    prop_porte: string;
    prop_sexo: string;
    prop_guarda : string;
    prop_amigavel_crianca : string;
    prop_brincadeira: string;
    prop_exercicio: string;
    prop_queda_pelo: string;
    prop_tendencia_latir: string;

}