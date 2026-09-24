import generatedDictionary from './dictionary.json';

export type EntryKind = 'word' | 'verb' | 'phrase';

export type DictionaryEntry = {
  id: string;
  geez: string;
  amharic: string;
  english: string;
  kind: EntryKind;
  pos?: string;
  source: string;
};

export const dictionaryEntries: DictionaryEntry[] = [
  {
    id: 'word-egziabher',
    geez: 'እግዚአብሔር',
    amharic: 'እግዚአብሔር',
    english: 'God; the Lord',
    kind: 'word',
    pos: 'ስም',
    source: 'starter',
  },
  {
    id: 'word-selam',
    geez: 'ሰላም',
    amharic: 'ሰላም፣ ደህንነት',
    english: 'peace; well-being',
    kind: 'word',
    pos: 'ስም',
    source: 'starter',
  },
  {
    id: 'word-seb',
    geez: 'ሰብእ',
    amharic: 'ሰው',
    english: 'person; human being',
    kind: 'word',
    pos: 'ስም',
    source: 'starter',
  },
  {
    id: 'word-bet',
    geez: 'ቤት',
    amharic: 'ቤት',
    english: 'house; home',
    kind: 'word',
    pos: 'ስም',
    source: 'starter',
  },
  {
    id: 'word-king',
    geez: 'ንጉሥ',
    amharic: 'ንጉሥ',
    english: 'king',
    kind: 'word',
    pos: 'ስም',
    source: 'starter',
  },
  {
    id: 'word-life',
    geez: 'ሕይወት',
    amharic: 'ሕይወት',
    english: 'life',
    kind: 'word',
    pos: 'ስም',
    source: 'starter',
  },
  {
    id: 'word-love',
    geez: 'ፍቅር',
    amharic: 'ፍቅር',
    english: 'love',
    kind: 'word',
    pos: 'ስም',
    source: 'starter',
  },
  {
    id: 'word-light',
    geez: 'ብርሃን',
    amharic: 'ብርሃን',
    english: 'light',
    kind: 'word',
    pos: 'ስም',
    source: 'starter',
  },
  {
    id: 'word-wisdom',
    geez: 'ጥበብ',
    amharic: 'ጥበብ',
    english: 'wisdom',
    kind: 'word',
    pos: 'ስም',
    source: 'starter',
  },
  {
    id: 'verb-heard',
    geez: 'ሰምዐ',
    amharic: 'ሰማ',
    english: 'heard',
    kind: 'verb',
    pos: 'ግስ',
    source: 'starter',
  },
  {
    id: 'verb-ate',
    geez: 'በለ',
    amharic: 'በላ',
    english: 'ate',
    kind: 'verb',
    pos: 'ግስ',
    source: 'starter',
  },
  {
    id: 'verb-brought',
    geez: 'አምጽአ',
    amharic: 'አመጣ',
    english: 'brought',
    kind: 'verb',
    pos: 'ግስ',
    source: 'starter',
  },
  {
    id: 'verb-spoke',
    geez: 'ነገረ',
    amharic: 'ነገረ፣ ተናገረ',
    english: 'told; spoke',
    kind: 'verb',
    pos: 'ግስ',
    source: 'starter',
  },
  {
    id: 'verb-wrote',
    geez: 'ጸሐፈ',
    amharic: 'ጻፈ',
    english: 'wrote',
    kind: 'verb',
    pos: 'ግስ',
    source: 'starter',
  },
  {
    id: 'verb-saw',
    geez: 'ርእየ',
    amharic: 'አየ',
    english: 'saw',
    kind: 'verb',
    pos: 'ግስ',
    source: 'starter',
  },
  {
    id: 'verb-went',
    geez: 'ሖረ',
    amharic: 'ሄደ',
    english: 'went',
    kind: 'verb',
    pos: 'ግስ',
    source: 'starter',
  },
  {
    id: 'verb-rose',
    geez: 'ተንሥአ',
    amharic: 'ተነሳ',
    english: 'rose; stood up',
    kind: 'verb',
    pos: 'ግስ',
    source: 'starter',
  },
  {
    id: 'verb-killed',
    geez: 'ቀተለ',
    amharic: 'ገደለ',
    english: 'killed',
    kind: 'verb',
    pos: 'ግስ',
    source: 'starter',
  },
  {
    id: 'verb-hid',
    geez: 'ከደነ',
    amharic: 'ደበቀ',
    english: 'hid',
    kind: 'verb',
    pos: 'ግስ',
    source: 'starter',
  },
  {
    id: 'verb-bless',
    geez: 'ይባርክ',
    amharic: 'ይባርክ',
    english: 'may bless / blesses',
    kind: 'verb',
    pos: 'ግስ',
    source: 'starter',
  },
  {
    id: 'phrase-bless-us',
    geez: 'እግዚአብሔር ይባርከነ።',
    amharic: 'እግዚአብሔር ይባርከን።',
    english: 'May God bless us.',
    kind: 'phrase',
    source: 'starter',
  },
  {
    id: 'phrase-peace',
    geez: 'ሰላም ለክሙ።',
    amharic: 'ሰላም ለእናንተ።',
    english: 'Peace be with you.',
    kind: 'phrase',
    source: 'starter',
  },
  {
    id: 'phrase-book',
    geez: 'ጸሐፈ መጽሐፈ።',
    amharic: 'መጽሐፍ ጻፈ።',
    english: 'He wrote a book.',
    kind: 'phrase',
    source: 'starter',
  },
  {
    id: 'phrase-word',
    geez: 'ሰምዐ ቃለ።',
    amharic: 'ቃልን ሰማ።',
    english: 'He heard a word.',
    kind: 'phrase',
    source: 'starter',
  },
];

type GeneratedDictionary = {
  words: Array<{
    geez: string;
    amharic?: string;
    english?: string;
    pos?: string;
    source?: string;
  }>;
  phrases: Array<{
    geez: string;
    amharic?: string;
    english?: string;
    source?: string;
  }>;
};

const generated = generatedDictionary as GeneratedDictionary;
const bundledEntries: DictionaryEntry[] = [
  ...generated.words.map((entry, index) => ({
    id: `dataset-word-${index}`,
    geez: entry.geez,
    amharic: entry.amharic ?? '',
    english: entry.english ?? '',
    kind: 'word' as const,
    pos: entry.pos,
    source: entry.source ?? 'licensed dataset',
  })),
  ...generated.phrases.map((entry, index) => ({
    id: `dataset-phrase-${index}`,
    geez: entry.geez,
    amharic: entry.amharic ?? '',
    english: entry.english ?? '',
    kind: 'phrase' as const,
    source: entry.source ?? 'licensed dataset',
  })),
];

const existingKeys = new Set(dictionaryEntries.map((entry) => `${entry.kind}:${entry.geez}`));
dictionaryEntries.push(
  ...bundledEntries.filter((entry) => !existingKeys.has(`${entry.kind}:${entry.geez}`)),
);

export const datasetMeta = {
  starterCount: 24,
  totalCount: dictionaryEntries.length,
  author: 'ዲ/ን ቃለአብ ተሾመ',
  note: `${dictionaryEntries.length.toLocaleString()} መዝገቦች በስልክዎ ውስጥ ተቀምጠዋል።`,
};