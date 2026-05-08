// Gera um número inteiro aleatório entre min e max (inclusive)
export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Retorna um item aleatório de um array
export function randomChoice(array) {
  return array[randomInt(0, array.length - 1)];
}

// Retorna true ou false baseado em uma probabilidade (%)
export function chance(percent) {
  return Math.random() < percent / 100;
}

// Cria um delay (pausa) assíncrono
export function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Limita um valor entre mínimo e máximo (útil para saldo, dificuldade, etc.)
export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

// Formata número como dinheiro (opcional, mas útil pra UI)
export function formatCurrency(value) {
  return `R$ ${value.toFixed(2)}`;
}
