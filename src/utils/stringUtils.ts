/**
 * Capitaliza o primeiro caractere de uma string.
 *
 * @param text A string a ser capitalizada.
 * @returns A string com o primeiro caractere em maiúscula, ou uma string vazia se a entrada for nula ou vazia.
 */
const capitalize = (text: string): string => {
  if (!text) {
    return '';
  }
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export default capitalize;