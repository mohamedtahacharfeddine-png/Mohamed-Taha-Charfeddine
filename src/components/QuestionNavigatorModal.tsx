import React from 'react';
import { X, Flag, CheckCircle2, XCircle, RotateCcw } from 'lucide-react';
import { Question, UserAnswerRecord } from '../types/exam';
import { ExamStats } from '../utils/examLogic';

interface QuestionNavigatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  questions: Question[];
  currentQuestionId: number;
  answers: Record<number, UserAnswerRecord>;
  flaggedIds: number[];
  stats: ExamStats;
  onSelectQuestion: (id: number) => void;
  onResetExam: () => void;
}

export const QuestionNavigatorModal: React.FC<QuestionNavigatorModalProps> = ({
  isOpen,
  onClose,
  questions,
  currentQuestionId,
  answers,
  flaggedIds,
  stats,
  onSelectQuestion,
  onResetExam
}) => {
  if (!isOpen) return null;

  const flaggedSet = new Set(flaggedIds);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="navigator-modal-title"
    >
      <div className="flex max-h-[88vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-200 bg-[#0F3D3E] px-6 py-4 text-white">
          <div>
            <h2 id="navigator-modal-title" className="font-display text-lg font-bold">
              75-Question Exam Map & Mastery Analytics
            </h2>
            <p className="text-xs text-teal-100">
              Click any question number to jump directly to it.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onResetExam}
              className="flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-white/20"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset All Progress</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close Question Map"
              className="rounded-lg p-1.5 text-slate-200 transition-colors hover:bg-white/10 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="space-y-6 overflow-y-auto p-6">
          {/* Category Breakdown */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
              <div className="text-xs font-medium text-slate-500">
                Ch.1 Job-Shop Scheduling (Q1–Q28)
              </div>
              <div className="mt-1 flex items-baseline justify-between font-mono">
                <span className="text-lg font-bold text-slate-900">
                  {stats.byCategory.ch1_job_shop.correct} /{' '}
                  {stats.byCategory.ch1_job_shop.answered} correct
                </span>
                <span className="text-xs text-teal-700 font-semibold">
                  {stats.byCategory.ch1_job_shop.answered} of 28 answered
                </span>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
              <div className="text-xs font-medium text-slate-500">
                Ch.2 Project Scheduling (Q29–Q58)
              </div>
              <div className="mt-1 flex items-baseline justify-between font-mono">
                <span className="text-lg font-bold text-slate-900">
                  {stats.byCategory.ch2_project_scheduling.correct} /{' '}
                  {stats.byCategory.ch2_project_scheduling.answered} correct
                </span>
                <span className="text-xs text-teal-700 font-semibold">
                  {stats.byCategory.ch2_project_scheduling.answered} of 30 answered
                </span>
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
              <div className="text-xs font-medium text-slate-500">
                Past Midterms & Productivity (Q59–Q75)
              </div>
              <div className="mt-1 flex items-baseline justify-between font-mono">
                <span className="text-lg font-bold text-slate-900">
                  {stats.byCategory.past_midterms_productivity.correct} /{' '}
                  {stats.byCategory.past_midterms_productivity.answered} correct
                </span>
                <span className="text-xs text-teal-700 font-semibold">
                  {stats.byCategory.past_midterms_productivity.answered} of 17 answered
                </span>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              <span>Correct ({stats.correctCount})</span>
            </span>
            <span className="flex items-center gap-1.5">
              <XCircle className="h-4 w-4 text-rose-600" />
              <span>Incorrect ({stats.incorrectCount})</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Flag className="h-4 w-4 text-amber-600" />
              <span>Flagged ({flaggedIds.length})</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block h-3.5 w-3.5 rounded border border-slate-300 bg-white" />
              <span>Unanswered ({stats.unansweredCount})</span>
            </span>
          </div>

          {/* 75 Question Grid */}
          <div className="grid grid-cols-5 gap-2 sm:grid-cols-10 md:grid-cols-15">
            {questions.map((q) => {
              const ans = answers[q.id];
              const isCurrent = q.id === currentQuestionId;
              const isFlagged = flaggedSet.has(q.id);

              let btnClass =
                'border-slate-200 bg-white text-slate-700 hover:border-slate-400 hover:bg-slate-50';
              if (ans?.isCorrect) {
                btnClass =
                  'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold hover:bg-emerald-100';
              } else if (ans && !ans.isCorrect) {
                btnClass =
                  'border-rose-600 bg-rose-50 text-rose-900 font-bold hover:bg-rose-100';
              }

              if (isCurrent) {
                btnClass += ' ring-2 ring-teal-700 ring-offset-1';
              }

              return (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => {
                    onSelectQuestion(q.id);
                    onClose();
                  }}
                  aria-label={`Jump to Question ${q.id}`}
                  className={`relative flex h-10 items-center justify-center rounded-lg border font-mono text-xs transition-all tabular-nums ${btnClass}`}
                >
                  <span>{q.id}</span>
                  {isFlagged && (
                    <span
                      className="absolute -top-1 -right-1 rounded-full bg-amber-500 p-0.5 text-white"
                      aria-hidden="true"
                    >
                      <Flag className="h-2.5 w-2.5" />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
