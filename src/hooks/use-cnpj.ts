
import { Tables, TablesInsert } from "@/utils/supabase/types";

export interface ReceitaWSCnpjResponse {
  abertura: string;
  situacao: string;
  tipo: string;
  nome: string;
  fantasia: string;
  porte: string;
  natureza_juridica: string;
  atividade_principal: Array<{
    code: string;
    text: string;
  }>;
  atividades_secundarias: Array<{
    code: string;
    text: string;
  }>;
  qsa: Array<{
    nome: string;
    qual: string;
  }>;
  logradouro: string;
  numero: string;
  complemento: string;
  municipio: string;
  bairro: string;
  uf: string;
  cep: string;
  email: string;
  telefone: string;
  data_situacao: string;
  cnpj: string;
  ultima_atualizacao: string;
  status: string;
  efr: string;
  motivo_situacao: string;
  situacao_especial: string;
  data_situacao_especial: string;
  capital_social: string;
  simples: {
    optante: boolean;
    data_opcao: string | null;
    data_exclusao: string | null;
    ultima_atualizacao: string;
  };
  simei: {
    optante: boolean;
    data_opcao: string | null;
    data_exclusao: string | null;
    ultima_atualizacao: string;
  };
  extra: Record<string, unknown>;
  billing: {
    free: boolean;
    database: boolean;
  };
}

export interface CNPJdata {
    cnpj: string;
    razao_social: string;
    nome_fantasia?: string;
    email_contato: string;
    telefone: string;
    cep: string;
    logradouro: string;
    numero: string;
    bairro: string;
    cidade: string;
    uf: string;
}

const sanitizeCNPJ = (cnpj: string): string => {
  return cnpj.replace(/\D/g, '');
}

const mapCnpjData = (company: ReceitaWSCnpjResponse): CNPJdata => {
    const mappedData: CNPJdata = {
        cnpj: company.cnpj,
        razao_social: company.nome,
        nome_fantasia: company.fantasia,
        email_contato: company.email,
        telefone: company.telefone,
        cep: company.cep,
        logradouro: company.logradouro,
        numero: company.numero,
        bairro: company.bairro,
        cidade: company.municipio,
        uf: company.uf
    }

    return mappedData;
}

export const useCNPJ = () => {
    const getCompanyByCNPJ = async (cnpj: string): Promise<CNPJdata> => {
        const sanitized = sanitizeCNPJ(cnpj);

        const res = await fetch(
            `/receita/v1/cnpj/${sanitized}`,
             {method: 'GET', headers: {Accept: 'application/json'}}
        );
        if (!res.ok) throw new Error(`Erro ${res.status}: ${res.statusText}\n${JSON.stringify(res)}`);
        const companyJson = await res.json() as unknown as ReceitaWSCnpjResponse;
        const cnpjData = mapCnpjData(companyJson);

        console.log(`companyJson : ${JSON.stringify(companyJson)}`);
        console.log(`cnpjData : ${JSON.stringify(cnpjData)}`);

        return cnpjData;
    };

    return { getCompanyByCNPJ };
};