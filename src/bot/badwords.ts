export const badWords: string[] = [
  // Русские маты
  'бля', 'блядь', 'хуй', 'пизда', 'ебать', 'ёбать', 'ебануть', 
  'нахуй', 'похуй', 'хуесос', 'мудак', 'гандон', 'пидор', 'сука',
  'залупа', 'шлюха', 'пердеть', 'жопа', 'срать', 'говно',
  
  // Английские маты
  'fuck', 'shit', 'bitch', 'asshole', 'damn', 'cunt', 'dick',
  'pussy', 'bastard', 'whore', 'slut'
];

export function containsBadWords(text: string): boolean {
  const lowerText = text.toLowerCase();
  return badWords.some(word => lowerText.includes(word));
}
