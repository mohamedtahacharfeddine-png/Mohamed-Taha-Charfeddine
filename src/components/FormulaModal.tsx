import React from 'react';
import { X, Calculator } from 'lucide-react';
import { STANDARD_NORMAL_TABLE } from '../data/allQuestions';

interface FormulaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FormulaModal: React.FC<FormulaModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="formula-modal-title"
    >
      <div className="flex max-h-[88vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-200 bg-[#0F3D3E] px-6 py-4 text-white">
          <div className="flex items-center gap-2.5">
            <Calculator className="h-5 w-5 text-teal-300" />
            <h2 id="formula-modal-title" className="font-display text-lg font-bold">
              BA 305 Midterm Formula Sheet & Standard Normal Table Φ(z)
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close Formula Reference"
            className="rounded-lg p-1.5 text-slate-200 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-6 overflow-y-auto p-6 text-sm text-slate-700">
          {/* Standard Normal Table */}
          <div>
            <h3 className="mb-2 text-sm font-bold text-slate-900">
              1. Standard Normal Distribution Table Φ(z) = P(Z ≤ z)  [Ch.2 Slide 24]
            </h3>
            <p className="mb-3 text-xs text-slate-600">
              For negative z-scores, use the symmetry identity:{' '}
              <code className="font-mono font-semibold text-teal-800">
                Φ(−z) = 1 − Φ(z)
              </code>
              . Standardized variable:{' '}
              <code className="font-mono font-semibold text-teal-800">
                z = (x − µ) / σ
              </code>
              , and deadline for probability p:{' '}
              <code className="font-mono font-semibold text-teal-800">
                x = µ + z_p · σ
              </code>
              .
            </p>
            <div className="overflow-x-auto rounded-lg border border-slate-200">
              <table className="w-full border-collapse text-center font-mono text-xs tabular-nums">
                <thead>
                  <tr className="bg-slate-100 text-slate-900">
                    <th className="border-r border-slate-200 px-3 py-2 text-left font-sans font-semibold">
                      z
                    </th>
                    {STANDARD_NORMAL_TABLE.map((row) => (
                      <th key={row.z} className="px-2.5 py-2 font-bold">
                        {row.z}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-slate-200 bg-white">
                    <td className="border-r border-slate-200 bg-slate-50 px-3 py-2 text-left font-sans font-semibold text-slate-900">
                      Φ(z)
                    </td>
                    {STANDARD_NORMAL_TABLE.map((row) => (
                      <td key={row.z} className="px-2.5 py-2 text-emerald-800 font-semibold">
                        {row.phi}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Chapter 1 Formulas */}
            <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
              <h3 className="mb-2.5 text-sm font-bold text-slate-900">
                2. Chapter 1 — Job-Shop Scheduling
              </h3>
              <ul className="space-y-2 text-xs leading-relaxed">
                <li>
                  <strong className="text-slate-900">1 Machine (MOT / SPT):</strong>{' '}
                  Sort <code className="font-mono">T_1 ≤ T_2 ≤ ... ≤ T_n</code>. Completion time{' '}
                  <code className="font-mono">C_j = ∑_(k=1..j) T_k</code>. Minimizes Mean Completion Time{' '}
                  <code className="font-mono">C̄ = (1/n) ∑ C_j</code>.
                </li>
                <li>
                  <strong className="text-slate-900">Critical Ratio (CR):</strong>{' '}
                  <code className="font-mono">CR_i = (Due Date − Current Time) / T_i</code>.
                </li>
                <li>
                  <strong className="text-slate-900">2 Machines Same Routing (Johnson):</strong>{' '}
                  Find smallest remaining time; if on Machine A → place FIRST (front); if on Machine B → place LAST (back).
                </li>
                <li>
                  <strong className="text-slate-900">2 Machines Different Routings (Jackson):</strong>{' '}
                  Subsets <code className="font-mono">{'{AB}, {BA}, {A}, {B}'}</code>. Machine A runs{' '}
                  <code className="font-mono">AB → A → BA</code>; Machine B runs{' '}
                  <code className="font-mono">BA → B → AB</code>. (On BA, B is 1st machine!).
                </li>
                <li>
                  <strong className="text-slate-900">3 Machines (A → B → C):</strong>{' '}
                  Dominance holds if <code className="font-mono">min T_i(A) ≥ max T_i(B)</code> OR{' '}
                  <code className="font-mono">min T_i(C) ≥ max T_i(B)</code>. Build{' '}
                  <code className="font-mono">G = A + B</code> and{' '}
                  <code className="font-mono">H = B + C</code>.
                </li>
                <li>
                  <strong className="text-slate-900">m Machines (CDS Heuristic):</strong>{' '}
                  Build <code className="font-mono">m − 1</code> problems:{' '}
                  <code className="font-mono">P1 (A | D)</code>,{' '}
                  <code className="font-mono">P2 (A+B | C+D)</code>,{' '}
                  <code className="font-mono">P3 (A+B+C | B+C+D)</code>.
                </li>
              </ul>
            </div>

            {/* Chapter 2 & Past Exams Formulas */}
            <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4">
              <h3 className="mb-2.5 text-sm font-bold text-slate-900">
                3. Chapter 2 — Project Scheduling & Productivity
              </h3>
              <ul className="space-y-2 text-xs leading-relaxed">
                <li>
                  <strong className="text-slate-900">Forward Pass (Earliest t_j):</strong>{' '}
                  <code className="font-mono">t_Start = 0</code>;{' '}
                  <code className="font-mono">t_j = max_i (t_i + d_i)</code> over predecessors i.
                </li>
                <li>
                  <strong className="text-slate-900">Backward Pass (Latest t*_i):</strong>{' '}
                  <code className="font-mono">t*_End = t_End</code>;{' '}
                  <code className="font-mono">t*_i = min_j (t*_j) − d_i</code> over successors j.
                </li>
                <li>
                  <strong className="text-slate-900">Total Float & Criticality:</strong>{' '}
                  <code className="font-mono">m_i = t*_i − t_i</code>. Critical iff{' '}
                  <code className="font-mono">m_i = 0</code>.
                </li>
                <li>
                  <strong className="text-slate-900">Probabilistic 3-Point Estimates:</strong>{' '}
                  <code className="font-mono">t_i = (a_i + 4m_i + b_i) / 6</code>;{' '}
                  <code className="font-mono">v_i = [(b_i − a_i) / 6]²</code>;{' '}
                  <code className="font-mono">σ² = ∑_(i ∈ CP) v_i</code>.
                </li>
                <li>
                  <strong className="text-slate-900">Project Crashing Slope:</strong>{' '}
                  <code className="font-mono">
                    k_i = (Crash Cost − Normal Cost) / (Normal Duration − Crash Duration)
                  </code>
                  . Stop when marginal crash cost ≥ indirect cost saved/day.
                </li>
                <li>
                  <strong className="text-slate-900">Productivity & Forecasting:</strong>{' '}
                  <code className="font-mono">Productivity = Output / Input</code>;{' '}
                  <code className="font-mono">F_(t+1) = F_t + α(A_t − F_t)</code>;{' '}
                  <code className="font-mono">MAD = (1/n)∑|e_t|</code>;{' '}
                  <code className="font-mono">MSE = (1/n)∑e_t²</code>.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
