import { getAllDigits, fillString, getAllWords } from "./utils";
import { validate_inscricaoestadual } from "./inscricaoestadual";
import { validate_placa } from "./placa";
import {
  create_cnpj, create_cpf,
  create_renavam, create_ect, create_processo, create_titulo_atual, create_cnh, create_certidao, create_aih, create_pispasep
} from "./create";
import RG from "./rg";
import { validate_iptu } from "./iptu/iptu";


export function validate_aih(aih: string) {
  const aihClean = aih.replace(/[^\d]+/g, '');
  const dvOriginal = aihClean.substr(-1);
  const dv = create_aih(aihClean);
  return dvOriginal === dv;
}

export function validate_celular(cel: any) {
  let celClean = cel.replace(/[^\d]+/g, '');
  celClean = celClean.replace(/_/g, '');
  if (celClean.length !== 11) {
    return false;
  }
  if (celClean[0] == 0 || celClean[2] < 5) {
    return false;
  }
  return true;
}

export const CEPRange = {
  'SP': /^([1][0-9]{3}|[01][0-9]{4})[0-9]{3}$/g,
  'RJ': /^[2][0-8][0-9]{3}[0-9]{3}$/g,
  'MS': /^[7][9][0-9]{3}[0-9]{3}$/g,
  'MG': /^[3][0-9]{4}[0-9]{3}$/g,
  'MT': /^[7][8][8][0-9]{2}[0-9]{3}$/g,
  'AC': /^[6][9]{2}[0-9]{2}[0-9]{3}$/g,
  'AL': /^[5][7][0-9]{3}[0-9]{3}$/g,
  'AM': /^[6][9][0-8][0-9]{2}[0-9]{3}$/g,
  'AP': /^[6][89][9][0-9]{2}[0-9]{3}$/g,
  'BA': /^[4][0-8][0-9]{3}[0-9]{3}$/g,
  'CE': /^[6][0-3][0-9]{3}[0-9]{3}$/g,
  'DF': /^[7][0-3][0-6][0-9]{2}[0-9]{3}$/g,
  'ES': /^[2][9][0-9]{3}[0-9]{3}$/g,
  'GO': /^[7][3-6][7-9][0-9]{2}[0-9]{3}$/g,
  'MA': /^[6][5][0-9]{3}[0-9]{3}$/g,
  'PA': /^[6][6-8][0-8][0-9]{2}[0-9]{3}$/g,
  'PB': /^[5][8][0-9]{3}[0-9]{3}$/g,
  'PE': /^[5][0-6][0-9]{2}[0-9]{3}$/g,
  'PI': /^[6][4][0-9]{3}[0-9]{3}$/g,
  'PR': /^[8][0-7][0-9]{3}[0-9]{3}$/g,
  'RN': /^[5][9][0-9]{3}[0-9]{3}$/g,
  'RO': /^[7][8][9][0-9]{2}[0-9]{3}$/g,
  'RR': /^[6][9][3][0-9]{2}[0-9]{3}$/g,
  'RS': /^[9][0-9]{4}[0-9]{3}$/g,
  'SC': /^[8][89][0-9]{3}[0-9]{3}$/g,
  'SE': /^[4][9][0-9]{3}[0-9]{3}$/g,
  'TO': /^[7][7][0-9]{3}[0-9]{3}$/g,
}

export function validate_cep(cep: string) {
  const cepClean = cep.replace(/[^\d]+/g, '');
  const exp = /\d{2}\.\d{3}\-\d{3}/;
  if (!exp.test(cep) && cepClean.length !== 8) {
    return false;
  }
  return true;
}

export function cep_ranges(cep: string | number) {
  cep = (cep.toString()).replace(/[^\d]+/g, '');
  cep = parseInt(cep, 10);
  const cepString: string = cep.toString();
  const keys = Object.keys(CEPRange);
  let found: any;
  for (let i; i < keys.length; i++) {
    const estado = keys[i];
    const r = new RegExp(CEPRange[estado]).test(cepString);
    if (r) {
      found = r;
      i = keys.length
    }
  }
  if (!found) {
    return false;
  }
  return true;
}




export function validate_certidao(value) {
  let certidao = getAllDigits(value);

  const format = /[0-9]{32}/;
  if (!format.test(certidao)) {
    return false;
  }

  let dvOriginal = certidao.substr(-2);
  const dv = create_certidao(certidao);

  return dv === dvOriginal;
}


/**
 * 
 * @param chassi 
 */
export function validate_chassi(chassi) {

  // 1 - Possuir o número "0" (ZERO) como 1º dígito.
  const zeroNoPrimeiroDigito = /^0/;
  if (zeroNoPrimeiroDigito.test(chassi)) {
    return false;
  }

  // 2 - Possuir espaço no chassi
  chassi = getAllWords(chassi); // espacoNoChassi

  // 3 - Se, a partir do 4º dígito, houver uma repetição consecutiva, por mais de seis vezes, do mesmo dígito 
  // (alfabético ou numérico). Exemplos: 9BW11111119452687 e 9BWZZZ5268AAAAAAA.
  const repeticaoMaisDe6Vezes = /^.{4,}([0-9A-Z])\1{5,}/
  if (repeticaoMaisDe6Vezes.test(chassi)) {
    return false;
  }

  // 4 - Apresente os caracteres "i", "I", "o", "O", "q", "Q".
  const caracteresiIoOqQ = /[iIoOqQ]/;
  if (caracteresiIoOqQ.test(chassi)) {
    return false;
  }

  // 5 - Os quatro últimos caracteres devem ser obrigatoriamente numéricos
  const ultimos4Numericos = /[0-9]{4}$/;
  if (!ultimos4Numericos.test(chassi)) {
    return false;
  }

  // 6 - Se possuir número de dígitos diferente de 17 (alfanuméricos). 
  if (chassi.length > 17) {
    return false;
  }

  return true;
}

function validate_cnae(number) {
  return true;
}

export function validate_cnh(value) {
  value = getAllDigits(value);
  var char1 = value.charAt(0);
  if (value.replace(/[^\d]/g, '').length !== 11 || char1.repeat(11) === value) {
    return false;
  }
  const check = create_cnh(value);

  return value.substr(-2) == check;
}

export function validate_cnpj(cnpj: any) {
  cnpj = cnpj.replace(/[^\d]+/g, '');
  let tamanho = cnpj.length - 2
  const digitos = cnpj.substring(tamanho);
  const resultados = create_cnpj(cnpj);
  if (resultados[0] !== parseInt(digitos.charAt(0), 10)) {
    return false;
  }

  if (resultados[1] !== parseInt(digitos.charAt(1), 10)) {
    return false;
  }
  return true;
}

function validate_contabanco(number) {
  return true;
}

// http://www.receita.fazenda.gov.br/aplicacoes/atcta/cpf/funcoes.js
export function validate_cpf(strCPF: any) {
  strCPF = strCPF.replace(/[^\d]+/g, '');
  if (strCPF.length !== 11) {
    return false;
  }
  const restos = create_cpf(strCPF);

  if (restos[0] !== parseInt(strCPF.substring(9, 10), 10)) {
    return false;
  }

  if (restos[1] !== parseInt(strCPF.substring(10, 11), 10)) {
    return false;
  }
  return true;
}


function validate_cpfcnpj(number) {
  return true;
}

export function validate_cns(value) {
  const cns = getAllDigits(value);
  const definitivo = /[1-2][0-9]{10}00[0-1][0-9]/; // começam com 1 ou 2
  const provisorio = /[7-9][0-9]{14}/;              // começam com 7,8 ou 9
  if (!definitivo.test(cns) && !provisorio.test(cns)) {
    return false;
  }

  let soma = 0;
  for (let i = 0; i < cns.length; i++) {
    soma += parseInt(cns[i]) * (15 - i);
  }

  return soma % 11 == 0;
}


export function validate_cartaocredito(value) {

}

export function validate_currency(currency: string | number) {
  if (typeof currency === 'number') {
    return true;
  }
  const regex = /^(R\$|R\$ )?((\d{1,3})(?:.[0-9]{3}){0,1}|(\d{1})(?:.[0-9]{3}){0,2}|(\d{1,7}))(\,\d{1,2})?$/g;
  return regex.test(currency);
}


function validate_data(value) {
  const values = value.split('/');
  if (values[0] > 31 || values[1] > 12 || values[2] < 1000) {
    return false;
  }
  return true;
}

export function validate_ect(number) {
  number = getAllDigits(number);
  if (number.length > 9) {
    return false
  }

  const nodigit = number.substr(0, number.length - 1);
  const dg = create_ect(nodigit);

  if (parseInt(number[number.length - 1]) === dg) {
    return true;
  }
  return false;
}

function validate_email(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

function validate_endereco(number) {
  return true;
}

export function validate_number(number: string) {
  if (number.split(',').length > 2) {
    return false;
  }
  const regexDecimal = /^\d+(?:\.\d{0,2})$/;
  const regex = /^[0-9]{0,10}[,]{1,1}[0-9]{0,4}/;
  const regexNumero = /^[0-9]{0,10}/;
  return regexDecimal.test(number) || regex.test(number) || regexNumero.test(number);
}


export function validate_porcentagem(porcentagem: string) {
  porcentagem = porcentagem.split('%')[0];
  return validate_number(porcentagem);
}


export function validate_processo(processo: any) {
  let processoClean = processo.replace(/\./g, '');
  processoClean = processoClean.replace(/\-/g, '');
  // const exp = /\d{7}\-\d{2}\.\d{4}\.\w{3}\.\d{4}/;
  // const expClean = /\d{13}\w{3}\d{4}/;
  // if (!exp.test(processo) && !expClean.test(processoClean)) {
  //   return false;
  // }
  let processoValidado = create_processo(processo);
  if (parseInt(processoClean) !== parseInt(getAllDigits(processoValidado))) {
    return false;
  }
  return true;
}


export function validate_pispasep(number: string) {
  number = getAllDigits(number);
  let nis = fillString(number, 11, '0');
  const regex = /\d{11}/; // /^\d{3}\.\d{5}\.\d{2}\-\d{1}$/;
  if (!regex.test(nis)) {
    return false;
  }

  const digit = create_pispasep(number);
  return nis[10].toString() == digit.toString();
}


export function validate_renavam(renavam: any) {
  let renavamClean = renavam.replace(/\./g, '');
  renavamClean = renavamClean.replace(/\-/g, '');
  const dv = create_renavam(renavam);
  const tam = renavam.length;
  const digitos = renavam.substr(tam - 1, 1);
  if (digitos.charCodeAt(0) - 48 === dv) {
    return true;
  } else {
    return false;
  }
}



export function validate_rg(rg: string) {
  let rgClean = rg.replace(/\./g, '');
  rgClean = rgClean.replace(/-/g, '');
  const exp = /[a-z]{2}\-\d{2}\.\d{3}\.\d{3}/;
  const expClean = /[a-z]{2}\d{8}/;
  const state = rg.substr(0, 2).toUpperCase();

  if (!exp.test(rg) && !expClean.test(rgClean) && !(state in CEPRange)) {
    return false;
  }
  if (RG[state]) {
    const validateState = RG[state];
    return validateState(rg);
  }
  return true;
}

function validate_senha(value, options: any = {}) {
  let finalregex = '^';
  //   ^	The password string will start this way
  // (?=.*[a-z])	The string must contain at least 1 lowercase alphabetical character
  if (options.lowercase !== false) {
    finalregex = finalregex + '(?=.*[a-z])';
  }
  // (?=.*[A-Z])	The string must contain at least 1 uppercase alphabetical character
  if (options.uppercase !== false) {
    finalregex = finalregex + '(?=.*[A-Z])';
  }
  // (?=.*[0-9])	The string must contain at least 1 numeric character
  if (options.numeric !== false) {
    finalregex = finalregex + '(?=.*[0-9])';
  }
  // (?=.*[!@#\$%\^&\*])	The string must contain at least one special character, but we are escaping reserved RegEx characters to avoid conflict
  if (options.numeric !== false) {
    finalregex = finalregex + '(?=.*[!@#\\$%\\^&\\*])';
  }
  // (?=.{8,})	The string must be eight characters or longer
  if (!options.size) {
    options.size = 8;
  }

  finalregex = finalregex + `(?=.{${options.size},})`;

  const regex = new RegExp(finalregex);
  return regex.test(value);
}


function validate_site(value) {
  var re = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&=]*)/g;
  return re.test(String(value).toLowerCase());
}

export function validate_sped(sped: string) {

}

export function validate_telefone(tel: any) {
  const telClean = tel.replace(/[^\d]+/g, '');
  tel = tel.replace(/_/g, '');
  if (!(telClean.length === 10 || telClean.length === 11)) {
    return false;
  }
  if (telClean[0] == 0 || telClean[2] == 0) {
    return false;
  }
  return true;
}

export function validate_time(time: string | number, options: any = {}) {
  const value = time.toString();
  if (options.diario) {
    const expression = /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/;
    return expression.test(value);
  } else {
    const expression = /^([0-9]?[0-9]):([0-5][0-9])(:[0-5][0-9])?$/;
    return expression.test(value);
  }

}

export function validate_titulo(titulo: any) {
  const tituloClean = titulo.replace(/\./g, '');
  const exp = /\d{4}\.\d{4}\.\d{4}/;
  const expClean = /\d{4}\d{4}\d{4}/;
  if (!exp.test(tituloClean) && !expClean.test(tituloClean)) {
    return false;
  }

  const tam = tituloClean.length;

  let dig;
  try {
    dig = create_titulo_atual(tituloClean);
    // const noDv = tituloClean.substr(0, tam - 2);
    // dig = create_titulo(noDv);
  } catch (e) {
    return false;
  }

  const digitos = tituloClean.substr(tam - 2, 2);
  if (digitos === dig) {
    return true;
  } else {
    return false;
  }
}

function validate_username(value) {
  var re = /^[a-z0-9_-]{3,16}$/igm;
  return re.test(String(value).toLowerCase());
}

export const validateBr = {
  aih: validate_aih,
  cartaocredito: validate_cartaocredito,
  celular: validate_celular,
  cep: validate_cep,
  certidao: validate_certidao,
  chassi: validate_chassi,
  cnae: validate_cnae,
  cnh: validate_cnh,
  cnpj: validate_cnpj,
  cns: validate_cns,
  contabanco: validate_contabanco,
  cpf: validate_cpf,
  cpfcnpj: validate_cpfcnpj,
  currency: validate_currency,
  data: validate_data,
  ect: validate_ect,
  email: validate_email,
  endereco: validate_endereco,
  inscricaoestadual: validate_inscricaoestadual,
  iptu: validate_iptu,
  number: validate_number,
  porcentagem: validate_porcentagem,
  pispasep: validate_pispasep,
  placa: validate_placa,
  processo: validate_processo,
  renavam: validate_renavam,
  rg: validate_rg,
  senha: validate_senha,
  site: validate_site,
  sped: validate_sped,
  telefone: validate_telefone,
  time: validate_time,
  titulo: validate_titulo,
  username: validate_username
};