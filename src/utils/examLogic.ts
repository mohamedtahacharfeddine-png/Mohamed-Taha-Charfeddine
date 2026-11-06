import { Question, QuestionCategory, UserAnswerRecord } from '../types/exam';

export type CategoryFilter = 'all' | QuestionCategory;
export type StatusFilter = 'all' | 'unanswered' | 'correct' | 'incorrect' | 'flagged';

export interface FilterCriteria {
  category: CategoryFilter;
  status: StatusFilter;
  searchQuery?: string;
}

export interface ExamStats {
  totalQuestions: number;
  answeredCount: number;
  correctCount: number;
  incorrectCount: number;
  unansweredCount: number;
  accuracyPercent: number;
  byCategory: Record<
    QuestionCategory,
    {
      total: number;
      answered: number;
      correct: number;
      accuracyPercent: number;
    }
  >;
}

export function filterQuestions(
  questions: Question[],
  answers: Record<number, UserAnswerRecord>,
  flaggedIds: number[],
  criteria: FilterCriteria
): Question[] {
  const query = (criteria.searchQuery || '').trim().toLowerCase();
  const flaggedSet = new Set(flaggedIds);

  return questions.filter((q) => {
    if (criteria.category !== 'all' && q.category !== criteria.category) {
      return false;
    }

    const ans = answers[q.id];
    if (criteria.status === 'unanswered' && ans !== undefined) return false;
    if (criteria.status === 'correct' && (!ans || !ans.isCorrect)) return false;
    if (criteria.status === 'incorrect' && (!ans || ans.isCorrect)) return false;
    if (criteria.status === 'flagged' && !flaggedSet.has(q.id)) return false;

    if (query.length > 0) {
      const hay = `${q.id} ${q.topicTag} ${q.sourceRef} ${q.prompt}`.toLowerCase();
      if (!hay.includes(query)) return false;
    }

    return true;
  });
}

export function recordUserAnswer(
  currentAnswers: Record<number, UserAnswerRecord>,
  question: Question,
  selectedIndex: number,
  now: number = Date.now()
): Record<number, UserAnswerRecord> {
  const isCorrect = selectedIndex === question.correctIndex;
  return {
    ...currentAnswers,
    [question.id]: {
      questionId: question.id,
      selectedIndex,
      isCorrect,
      timestamp: now
    }
  };
}

export function computeExamStats(
  questions: Question[],
  answers: Record<number, UserAnswerRecord>
): ExamStats {
  const totalQuestions = questions.length;
  let answeredCount = 0;
  let correctCount = 0;
  let incorrectCount = 0;

  const byCategory: ExamStats['byCategory'] = {
    ch1_job_shop: { total: 0, answered: 0, correct: 0, accuracyPercent: 0 },
    ch2_project_scheduling: { total: 0, answered: 0, correct: 0, accuracyPercent: 0 },
    past_midterms_productivity: { total: 0, answered: 0, correct: 0, accuracyPercent: 0 }
  };

  for (const q of questions) {
    byCategory[q.category].total += 1;
    const ans = answers[q.id];
    if (ans) {
      answeredCount += 1;
      byCategory[q.category].answered += 1;
      if (ans.isCorrect) {
        correctCount += 1;
        byCategory[q.category].correct += 1;
      } else {
        incorrectCount += 1;
      }
    }
  }

  for (const cat of Object.keys(byCategory) as QuestionCategory[]) {
    const c = byCategory[cat];
    c.accuracyPercent = c.answered > 0 ? Math.round((c.correct / c.answered) * 100) : 0;
  }

  const unansweredCount = totalQuestions - answeredCount;
  const accuracyPercent =
    answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0;

  return {
    totalQuestions,
    answeredCount,
    correctCount,
    incorrectCount,
    unansweredCount,
    accuracyPercent,
    byCategory
  };
}

export function getNextQuestionId(
  filteredQuestions: Question[],
  currentQuestionId: number,
  direction: 'next' | 'prev'
): number {
  if (filteredQuestions.length === 0) return currentQuestionId;
  const idx = filteredQuestions.findIndex((q) => q.id === currentQuestionId);
  if (idx === -1) return filteredQuestions[0].id;
  if (direction === 'next') {
    return filteredQuestions[Math.min(idx + 1, filteredQuestions.length - 1)].id;
  } else {
    return filteredQuestions[Math.max(idx - 1, 0)].id;
  }
}

export function validateQuestionBank(questions: Question[]): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  if (questions.length !== 75) {
    errors.push(`Expected 75 questions, found ${questions.length}`);
  }

  const seenIds = new Set<number>();
  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    if (q.id !== i + 1) {
      errors.push(`Question at index ${i} has id ${q.id}, expected ${i + 1}`);
    }
    if (seenIds.has(q.id)) {
      errors.push(`Duplicate question id ${q.id}`);
    }
    seenIds.add(q.id);

    if (q.options.length !== 4) {
      errors.push(`Question ${q.id} does not have 4 options`);
    }
    const uniqueOpts = new Set(q.options);
    if (uniqueOpts.size !== 4) {
      errors.push(`Question ${q.id} has duplicate option strings`);
    }
    if (![0, 1, 2, 3].includes(q.correctIndex)) {
      errors.push(`Question ${q.id} has invalid correctIndex ${q.correctIndex}`);
    }
    if (!q.explanation || q.explanation.trim().length < 30) {
      errors.push(`Question ${q.id} has missing or too-short explanation`);
    }
  }

  return {
    valid: errors.length === 0,
    errors
  };
}
