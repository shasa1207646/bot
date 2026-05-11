export const BAD_WORDS: string[] = [
  // Russian
  'блять', 'блядь', 'ёбаный', 'еблан', 'ёблан', 'залупа', 'пизда', 'пиздец',
  'пиздёж', 'пиздить', 'пиздатый', 'хуй', 'хуйня', 'хуета', 'хуесос',
  'ёб', 'еб', 'ёбать', 'ебать', 'ебло', 'ебаный', 'мудак', 'мудила',
  'сука', 'сучка', 'пидор', 'пидорас', 'гандон', 'долбоёб', 'долбоеб',
  'шлюха', 'шлюшка', 'бля', 'нахуй', 'нахуй', 'похуй', 'охуеть',
  'охуел', 'охуенно', 'ублюдок', 'выблядок', 'шалава', 'манда',
  // English
  'fuck', 'fucker', 'fucking', 'shit', 'bitch', 'asshole', 'bastard',
  'cunt', 'dick', 'cock', 'pussy', 'nigger', 'nigga', 'whore', 'slut',
  'faggot', 'retard', 'motherfucker', 'bullshit', 'jackass', 'prick',
];

export function containsBadWord(text: string): boolean {
  const lower = text.toLowerCase();
  return BAD_WORDS.some((word) => lower.includes(word));
}
