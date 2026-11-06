import { Question } from '../types/exam';
import { questionsCh1 } from './questionsCh1';
import { questionsCh2 } from './questionsCh2';
import { questionsPastExams } from './questionsPastExams';

function distributeCorrectOption(q: Question): Question {
  // Deterministic rotation based on question id so A, B, C, D are balanced across the 75 questions
  const shift = ((q.id * 7 + 3) % 4) as 0 | 1 | 2 | 3;
  if (shift === 0) return q;

  const newOptions: [string, string, string, string] = ['', '', '', ''];
  for (let i = 0; i < 4; i++) {
    newOptions[(i + shift) % 4] = q.options[i];
  }
  const newCorrectIndex = ((q.correctIndex + shift) % 4) as 0 | 1 | 2 | 3;

  return {
    ...q,
    options: newOptions,
    correctIndex: newCorrectIndex
  };
}

const rawQuestions: Question[] = [
  ...questionsCh1,
  ...questionsCh2,
  ...questionsPastExams
];

export const allQuestions: Question[] = rawQuestions.map(distributeCorrectOption);

export const STANDARD_NORMAL_TABLE = [
  { z: '0.00', phi: '0.5000' },
  { z: '0.50', phi: '0.6915' },
  { z: '0.61', phi: '0.7291' },
  { z: '0.84', phi: '0.7995' },
  { z: '1.00', phi: '0.8413' },
  { z: '1.22', phi: '0.8888' },
  { z: '1.28', phi: '0.8997' },
  { z: '1.50', phi: '0.9332' },
  { z: '1.645', phi: '0.9500' },
  { z: '1.66', phi: '0.9515' },
  { z: '1.70', phi: '0.9554' },
  { z: '1.96', phi: '0.9750' },
  { z: '2.00', phi: '0.9772' },
  { z: '2.33', phi: '0.9901' },
  { z: '2.55', phi: '0.9946' },
  { z: '3.00', phi: '0.9987' }
];
