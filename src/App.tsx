import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  CheckCircle2,
  XCircle,
  ArrowRight,
  ArrowLeft,
  Flag,
  RotateCcw,
  LayoutGrid,
  BookOpen
} from 'lucide-react';
import { allQuestions } from './data/allQuestions';
import { UserAnswerRecord } from './types/exam';
import {
  CategoryFilter,
  StatusFilter,
  filterQuestions,
  recordUserAnswer,
  computeExamStats,
  getNextQuestionId
} from './utils/examLogic';
import { DiagramRenderer, SingleDiagramRenderer } from './components/DiagramRenderer';
import { FormulaModal } from './components/FormulaModal';
import { QuestionNavigatorModal } from './components/QuestionNavigatorModal';

const STORAGE_ANSWERS_KEY = 'tbs_ba305_pom_exam_answers_v1';
const STORAGE_FLAGGED_KEY = 'tbs_ba305_pom_exam_flagged_v1';

const OPTION_LETTERS = ['A', 'B', 'C', 'D'] as const;

export default function App() {
  const [answers, setAnswers] = useState<Record<number, UserAnswerRecord>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_ANSWERS_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [flaggedIds, setFlaggedIds] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_FLAGGED_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [currentQuestionId, setCurrentQuestionId] = useState<number>(1);
  const [isFormulaOpen, setIsFormulaOpen] = useState<boolean>(false);
  const [isNavigatorOpen, setIsNavigatorOpen] = useState<boolean>(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_ANSWERS_KEY, JSON.stringify(answers));
    } catch {
      // ignore storage errors
    }
  }, [answers]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_FLAGGED_KEY, JSON.stringify(flaggedIds));
    } catch {
      // ignore storage errors
    }
  }, [flaggedIds]);

  const filteredQuestions = useMemo(
    () =>
      filterQuestions(allQuestions, answers, flaggedIds, {
        category: categoryFilter,
        status: statusFilter
      }),
    [answers, flaggedIds, categoryFilter, statusFilter]
  );

  const stats = useMemo(
    () => computeExamStats(allQuestions, answers),
    [answers]
  );

  // Keep currentQuestionId valid when filters change
  const activeQuestion = useMemo(() => {
    const found = filteredQuestions.find((q) => q.id === currentQuestionId);
    if (found) return found;
    if (filteredQuestions.length > 0) return filteredQuestions[0];
    return allQuestions.find((q) => q.id === currentQuestionId) || allQuestions[0];
  }, [filteredQuestions, currentQuestionId]);

  const activeIndexInFiltered = useMemo(() => {
    const idx = filteredQuestions.findIndex((q) => q.id === activeQuestion.id);
    return idx >= 0 ? idx : 0;
  }, [filteredQuestions, activeQuestion]);

  const currentAnswer = answers[activeQuestion.id];
  const isFlagged = flaggedIds.includes(activeQuestion.id);

  const handleSelectOption = useCallback(
    (optionIndex: number) => {
      if (currentAnswer !== undefined) return; // Lock choice until Retry is clicked
      setAnswers((prev) => recordUserAnswer(prev, activeQuestion, optionIndex));
    },
    [currentAnswer, activeQuestion]
  );

  const handleRetryCurrentQuestion = useCallback(() => {
    setAnswers((prev) => {
      const next = { ...prev };
      delete next[activeQuestion.id];
      return next;
    });
  }, [activeQuestion.id]);

  const handleToggleFlag = useCallback(() => {
    setFlaggedIds((prev) =>
      prev.includes(activeQuestion.id)
        ? prev.filter((id) => id !== activeQuestion.id)
        : [...prev, activeQuestion.id]
    );
  }, [activeQuestion.id]);

  const handleNavigate = useCallback(
    (direction: 'next' | 'prev') => {
      const nextId = getNextQuestionId(filteredQuestions, activeQuestion.id, direction);
      setCurrentQuestionId(nextId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [filteredQuestions, activeQuestion.id]
  );

  const handleCategoryChange = (cat: CategoryFilter) => {
    setCategoryFilter(cat);
    const matching = filterQuestions(allQuestions, answers, flaggedIds, {
      category: cat,
      status: statusFilter
    });
    if (matching.length > 0) {
      setCurrentQuestionId(matching[0].id);
    }
  };

  const handleResetAll = () => {
    setAnswers({});
    setFlaggedIds([]);
    setCategoryFilter('all');
    setStatusFilter('all');
    setCurrentQuestionId(1);
    setIsNavigatorOpen(false);
  };

  // Keyboard shortcuts: 1-4 / A-D to answer, ArrowRight / Enter for Next, ArrowLeft for Previous
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (isFormulaOpen || isNavigatorOpen) return;
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA'
      ) {
        return;
      }

      const key = e.key.toLowerCase();
      if (!currentAnswer) {
        if (key === '1' || key === 'a') handleSelectOption(0);
        else if (key === '2' || key === 'b') handleSelectOption(1);
        else if (key === '3' || key === 'c') handleSelectOption(2);
        else if (key === '4' || key === 'd') handleSelectOption(3);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        handleNavigate('next');
      }

      if (e.key === 'ArrowRight') {
        handleNavigate('next');
      } else if (e.key === 'ArrowLeft') {
        handleNavigate('prev');
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [
    currentAnswer,
    isFormulaOpen,
    isNavigatorOpen,
    handleSelectOption,
    handleNavigate
  ]);

  const hasNext =
    filteredQuestions.length > 0 &&
    activeIndexInFiltered < filteredQuestions.length - 1;
  const hasPrev = filteredQuestions.length > 0 && activeIndexInFiltered > 0;

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900">
      {/* Strict 3-Zone Top Bar Contract */}
      <header className="sticky top-0 z-30 flex items-center justify-between gap-3 sm:gap-8 border-b border-slate-200 bg-white/95 px-4 sm:px-6 py-3.5 backdrop-blur-xs">
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            handleCategoryChange('all');
          }}
          className="font-display text-base sm:text-lg font-bold tracking-tight text-[#0F3D3E] whitespace-nowrap shrink-0"
        >
          TBS BA 305 · POM Mastery
        </a>

        <nav
          aria-label="Exam Modules"
          className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600"
        >
          <button
            type="button"
            onClick={() => handleCategoryChange('all')}
            className={`transition-colors whitespace-nowrap shrink-0 pb-0.5 ${
              categoryFilter === 'all'
                ? 'text-[#0F3D3E] font-bold underline underline-offset-4 decoration-2'
                : 'hover:text-slate-900'
            }`}
          >
            All 75 Questions
          </button>
          <button
            type="button"
            onClick={() => handleCategoryChange('ch1_job_shop')}
            className={`transition-colors whitespace-nowrap shrink-0 pb-0.5 ${
              categoryFilter === 'ch1_job_shop'
                ? 'text-[#0F3D3E] font-bold underline underline-offset-4 decoration-2'
                : 'hover:text-slate-900'
            }`}
          >
            Ch.1 Job-Shop (28)
          </button>
          <button
            type="button"
            onClick={() => handleCategoryChange('ch2_project_scheduling')}
            className={`transition-colors whitespace-nowrap shrink-0 pb-0.5 ${
              categoryFilter === 'ch2_project_scheduling'
                ? 'text-[#0F3D3E] font-bold underline underline-offset-4 decoration-2'
                : 'hover:text-slate-900'
            }`}
          >
            Ch.2 Project Networks (30)
          </button>
          <button
            type="button"
            onClick={() => handleCategoryChange('past_midterms_productivity')}
            className={`transition-colors whitespace-nowrap shrink-0 pb-0.5 ${
              categoryFilter === 'past_midterms_productivity'
                ? 'text-[#0F3D3E] font-bold underline underline-offset-4 decoration-2'
                : 'hover:text-slate-900'
            }`}
          >
            Past Midterms & Productivity (17)
          </button>
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => setIsFormulaOpen(true)}
            className="rounded-lg bg-[#0F3D3E] px-3 sm:px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-teal-900 whitespace-nowrap shrink-0"
          >
            Formula & Φ(z) Sheet
          </button>
        </div>
      </header>

      {/* Main Interactive Workspace */}
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-4 py-6 sm:px-6">
        {/* Control & Live Score Bar */}
        <section
          aria-label="Exam Progress and Filters"
          className="mb-5 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white px-4 py-3"
        >
          {/* Live Score Metrics (Unboxed clean typography with separators) */}
          <div className="flex flex-wrap items-center gap-2.5 text-xs sm:text-sm tabular-nums">
            <span className="font-semibold text-slate-900">
              Progress: {stats.answeredCount} / {stats.totalQuestions}
            </span>
            <span aria-hidden="true" className="text-slate-300">
              ·
            </span>
            <span className="font-mono font-semibold text-emerald-700">
              ✓ {stats.correctCount} Correct
            </span>
            <span aria-hidden="true" className="text-slate-300">
              ·
            </span>
            <span className="font-mono font-semibold text-rose-700">
              ✗ {stats.incorrectCount} Wrong
            </span>
            <span aria-hidden="true" className="text-slate-300">
              ·
            </span>
            <span className="font-mono font-semibold text-slate-700">
              Accuracy: {stats.accuracyPercent}%
            </span>
          </div>

          {/* Interactive Filter Controls & Question Map Button */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Mobile category selector */}
            <select
              aria-label="Filter by Chapter Module"
              value={categoryFilter}
              onChange={(e) => handleCategoryChange(e.target.value as CategoryFilter)}
              className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-medium text-slate-800 md:hidden"
            >
              <option value="all">All 75 Questions</option>
              <option value="ch1_job_shop">Ch.1 Job-Shop (28)</option>
              <option value="ch2_project_scheduling">Ch.2 Networks (30)</option>
              <option value="past_midterms_productivity">Past Midterms (17)</option>
            </select>

            <div
              className="flex items-center gap-1 rounded-lg bg-slate-100 p-1"
              role="group"
              aria-label="Filter questions by status"
            >
              {(
                [
                  { id: 'all', label: 'All' },
                  { id: 'unanswered', label: 'Unanswered' },
                  { id: 'incorrect', label: 'Wrong' },
                  { id: 'flagged', label: 'Flagged' }
                ] as { id: StatusFilter; label: string }[]
              ).map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setStatusFilter(tab.id)}
                  className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                    statusFilter === tab.id
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setIsNavigatorOpen(true)}
              className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-800 transition-colors hover:bg-slate-50 whitespace-nowrap shrink-0"
            >
              <LayoutGrid className="h-3.5 w-3.5 text-[#0F3D3E]" />
              <span>Question Map (75)</span>
            </button>
          </div>
        </section>

        {/* Empty Filter State */}
        {filteredQuestions.length === 0 ? (
          <div className="my-8 rounded-2xl border border-slate-200 bg-white p-10 text-center">
            <h2 className="font-display text-xl font-bold text-slate-900">
              No questions match this status filter
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              You have no {statusFilter} questions in the selected module.
            </p>
            <button
              type="button"
              onClick={() => setStatusFilter('all')}
              className="mt-5 rounded-lg bg-[#0F3D3E] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-teal-900"
            >
              Show All Questions in Module
            </button>
          </div>
        ) : (
          /* Focused Single-Question Reactive Exam Window */
          <article
            aria-live="polite"
            className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-xs sm:p-8"
          >
            {/* Question Kicker & Quick Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                <span className="font-mono font-bold text-[#0F3D3E] text-sm">
                  Question {activeQuestion.id} of 75
                </span>
                <span aria-hidden="true">·</span>
                <span className="font-medium text-slate-700">
                  {activeQuestion.topicTag}
                </span>
                <span aria-hidden="true">·</span>
                <span>{activeQuestion.sourceRef}</span>
                <span aria-hidden="true">·</span>
                <span
                  className={
                    activeQuestion.difficulty === 'Exam Trap'
                      ? 'font-semibold text-rose-700'
                      : 'font-semibold text-amber-700'
                  }
                >
                  {activeQuestion.difficulty}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {currentAnswer !== undefined && (
                  <button
                    type="button"
                    onClick={handleRetryCurrentQuestion}
                    className="flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900 whitespace-nowrap shrink-0"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    <span>Retry Question</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleToggleFlag}
                  aria-pressed={isFlagged}
                  className={`flex items-center gap-1 rounded-lg border px-2.5 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                    isFlagged
                      ? 'border-amber-400 bg-amber-50 text-amber-900'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <Flag className="h-3.5 w-3.5" />
                  <span>{isFlagged ? 'Flagged' : 'Flag for Review'}</span>
                </button>
              </div>
            </div>

            {/* Question Prompt */}
            <h1 className="mt-5 font-sans text-base font-semibold leading-relaxed text-slate-900 sm:text-lg whitespace-pre-line">
              {activeQuestion.prompt}
            </h1>

            {/* Rendered Network / Gantt Chart / Data Table / Cost Curve */}
            {activeQuestion.visual && (
              <DiagramRenderer visual={activeQuestion.visual} />
            )}

            {/* 4 Interactive Multiple-Choice Options */}
            <div
              className="mt-5 space-y-3"
              role="radiogroup"
              aria-label={`Answer options for Question ${activeQuestion.id}`}
            >
              {activeQuestion.options.map((optionText, idx) => {
                const isSelected = currentAnswer?.selectedIndex === idx;
                const isTrueAnswer = activeQuestion.correctIndex === idx;
                const isEvaluated = currentAnswer !== undefined;

                let containerStyle =
                  'border-slate-200 bg-white text-slate-800 hover:border-teal-700 hover:bg-slate-50/70 cursor-pointer';
                let badgeStyle =
                  'bg-slate-100 text-slate-700 border border-slate-200';
                let statusBadge: React.ReactNode = null;

                if (isEvaluated) {
                  if (isTrueAnswer) {
                    // Always highlight the correct option in GREEN once answered
                    containerStyle =
                      'border-emerald-600 bg-emerald-50/90 text-emerald-950 ring-1 ring-emerald-600 cursor-default';
                    badgeStyle = 'bg-emerald-600 text-white border-emerald-600';
                    statusBadge = (
                      <span className="ml-auto flex items-center gap-1 font-mono text-xs font-bold text-emerald-800 whitespace-nowrap shrink-0">
                        <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                        <span>{isSelected ? 'Correct!' : 'Correct Answer'}</span>
                      </span>
                    );
                  } else if (isSelected && !isTrueAnswer) {
                    // Highlight wrong user selection in RED
                    containerStyle =
                      'border-rose-600 bg-rose-50/90 text-rose-950 ring-1 ring-rose-600 cursor-default';
                    badgeStyle = 'bg-rose-600 text-white border-rose-600';
                    statusBadge = (
                      <span className="ml-auto flex items-center gap-1 font-mono text-xs font-bold text-rose-800 whitespace-nowrap shrink-0">
                        <XCircle className="h-4 w-4 text-rose-600 shrink-0" />
                        <span>Your Choice (Wrong)</span>
                      </span>
                    );
                  } else {
                    containerStyle =
                      'border-slate-200 bg-slate-50/40 text-slate-500 opacity-75 cursor-default';
                    badgeStyle = 'bg-slate-100 text-slate-400 border-slate-200';
                  }
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    disabled={isEvaluated}
                    onClick={() => handleSelectOption(idx)}
                    className={`flex w-full items-start gap-3.5 rounded-xl border p-4 text-left transition-all ${containerStyle}`}
                  >
                    <span
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg font-mono text-xs font-bold ${badgeStyle}`}
                    >
                      {OPTION_LETTERS[idx]}
                    </span>
                    <span className="flex-1 text-sm leading-relaxed font-medium">
                      {optionText}
                    </span>
                    {statusBadge}
                  </button>
                );
              })}
            </div>

            {/* Instant Step-by-Step Explanation Panel (Revealed after choosing an option) */}
            {currentAnswer !== undefined && (
              <div
                data-testid="explanation-panel"
                className={`mt-6 rounded-xl border p-5 ${
                  currentAnswer.isCorrect
                    ? 'border-emerald-200 bg-emerald-50/40'
                    : 'border-rose-200 bg-rose-50/40'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/80 pb-3">
                  <div className="flex items-center gap-2">
                    {currentAnswer.isCorrect ? (
                      <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
                    ) : (
                      <XCircle className="h-5 w-5 text-rose-600 shrink-0" />
                    )}
                    <h2
                      className={`font-sans text-sm font-bold ${
                        currentAnswer.isCorrect
                          ? 'text-emerald-900'
                          : 'text-rose-900'
                      }`}
                    >
                      {currentAnswer.isCorrect
                        ? `Correct! Option ${OPTION_LETTERS[activeQuestion.correctIndex]} is the right answer.`
                        : `Incorrect — You selected Option ${OPTION_LETTERS[currentAnswer.selectedIndex]}, but the correct answer is Option ${OPTION_LETTERS[activeQuestion.correctIndex]}.`}
                    </h2>
                  </div>

                  <span className="flex items-center gap-1 text-xs font-medium text-slate-600">
                    <BookOpen className="h-3.5 w-3.5" />
                    <span>Step-by-Step Solution</span>
                  </span>
                </div>

                {activeQuestion.formulaUsed && (
                  <div className="mt-3 rounded-lg border border-slate-200 bg-white px-3.5 py-2 font-mono text-xs font-semibold text-[#0F3D3E]">
                    Formula / Rule: {activeQuestion.formulaUsed}
                  </div>
                )}

                <div className="mt-3.5 text-sm leading-relaxed text-slate-800 whitespace-pre-line">
                  {activeQuestion.explanation}
                </div>

                {activeQuestion.explanationVisual && (
                  <div className="mt-4">
                    <SingleDiagramRenderer
                      visual={activeQuestion.explanationVisual}
                    />
                  </div>
                )}

                {/* One-click Next Question button right at the bottom of the explanation */}
                <div className="mt-5 flex items-center justify-end">
                  <button
                    type="button"
                    disabled={!hasNext}
                    onClick={() => handleNavigate('next')}
                    className="flex items-center gap-2 rounded-xl bg-[#0F3D3E] px-5 py-2.5 text-sm font-semibold text-white shadow-xs transition-colors hover:bg-teal-900 disabled:opacity-40 whitespace-nowrap shrink-0"
                  >
                    <span>Next Question</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Bottom Navigation Bar (Always accessible for single-click Prev / Next) */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-5">
              <button
                type="button"
                disabled={!hasPrev}
                onClick={() => handleNavigate('prev')}
                className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50 disabled:opacity-40 whitespace-nowrap shrink-0"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Previous Question</span>
              </button>

              <div className="text-xs text-slate-500 tabular-nums">
                Showing {activeIndexInFiltered + 1} of {filteredQuestions.length} in current view
              </div>

              <button
                type="button"
                disabled={!hasNext}
                onClick={() => handleNavigate('next')}
                className="flex items-center gap-2 rounded-xl bg-[#0F3D3E] px-5 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-teal-900 disabled:opacity-40 whitespace-nowrap shrink-0"
              >
                <span>Next Question</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </article>
        )}
      </main>

      {/* Quiet Academic Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-4 px-6 text-center text-xs text-slate-500">
        Tunis Business School · BA 305 Production & Operations Management · Chapter 1 (Job-Shop Scheduling), Chapter 2 (Project Scheduling) & Past Midterm Exams
      </footer>

      {/* Modals */}
      <FormulaModal
        isOpen={isFormulaOpen}
        onClose={() => setIsFormulaOpen(false)}
      />
      <QuestionNavigatorModal
        isOpen={isNavigatorOpen}
        onClose={() => setIsNavigatorOpen(false)}
        questions={allQuestions}
        currentQuestionId={activeQuestion.id}
        answers={answers}
        flaggedIds={flaggedIds}
        stats={stats}
        onSelectQuestion={(id) => setCurrentQuestionId(id)}
        onResetExam={handleResetAll}
      />
    </div>
  );
}
