import test from 'node:test';
import assert from 'node:assert/strict';
import { allQuestions } from '../data/allQuestions';
import {
  validateQuestionBank,
  recordUserAnswer,
  computeExamStats,
  filterQuestions,
  getNextQuestionId
} from './examLogic';

test('75-question bank integrity and structure', () => {
  const result = validateQuestionBank(allQuestions);
  assert.equal(result.valid, true, `Validation errors: ${result.errors.join('; ')}`);
  assert.equal(allQuestions.length, 75);
});

test('balanced distribution of correctIndex across A, B, C, D', () => {
  const counts = [0, 0, 0, 0];
  for (const q of allQuestions) {
    counts[q.correctIndex] += 1;
  }
  for (let i = 0; i < 4; i++) {
    assert.ok(counts[i] >= 15, `Option ${i} only appeared ${counts[i]} times`);
  }
});

test('recording answers and computing exam statistics', () => {
  let answers = {};
  const q1 = allQuestions[0];
  const q2 = allQuestions[1];
  const wrongIdx = (q2.correctIndex + 1) % 4;

  answers = recordUserAnswer(answers, q1, q1.correctIndex, 1000);
  answers = recordUserAnswer(answers, q2, wrongIdx, 2000);

  const stats = computeExamStats(allQuestions, answers);
  assert.equal(stats.totalQuestions, 75);
  assert.equal(stats.answeredCount, 2);
  assert.equal(stats.correctCount, 1);
  assert.equal(stats.incorrectCount, 1);
  assert.equal(stats.accuracyPercent, 50);
});

test('filtering questions by category, status, and navigation', () => {
  const ch1 = filterQuestions(allQuestions, {}, [], {
    category: 'ch1_job_shop',
    status: 'all'
  });
  const ch2 = filterQuestions(allQuestions, {}, [], {
    category: 'ch2_project_scheduling',
    status: 'all'
  });
  const past = filterQuestions(allQuestions, {}, [], {
    category: 'past_midterms_productivity',
    status: 'all'
  });

  assert.equal(ch1.length, 28);
  assert.equal(ch2.length, 30);
  assert.equal(past.length, 17);
  assert.equal(ch1.length + ch2.length + past.length, 75);

  const nextId = getNextQuestionId(ch1, ch1[0].id, 'next');
  assert.equal(nextId, ch1[1].id);
  const prevId = getNextQuestionId(ch1, ch1[0].id, 'prev');
  assert.equal(prevId, ch1[0].id);
});
