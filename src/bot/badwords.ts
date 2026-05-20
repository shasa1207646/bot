export const BAD_WORDS = [
  // Русские
  'блять', 'бля', 'сука', 'пиздец', 'пизда', 'пиздить', 'хуй', 'хуйня',
  'ебать', 'ебаный', 'ёбаный', 'еблан', 'залупа', 'мудак', 'мудила',
  'долбоёб', 'долбоеб', 'шлюха', 'проститутка', 'ублюдок', 'уёбок',
  'уебок', 'пиздабол', 'пиздун', 'пиздёж', 'ёб', 'ёбт', 'нахуй',
  'похуй', 'похер', 'ёпта', 'блядь', 'блядина', 'сучка', 'ёбаная',
  // English
  'fuck', 'shit', 'bitch', 'asshole', 'bastard', 'cunt', 'dick',
  'pussy', 'cock', 'nigger', 'faggot', 'whore', 'slut', 'motherfucker',
  'retard', 'idiot', 'moron',
];

export function containsBadWord(text: string): boolean {
  const lower = text.toLowerCase();
  return BAD_WORDS.some(word => lower.includes(word));
}
