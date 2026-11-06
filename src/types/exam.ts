export type QuestionCategory =
  | 'ch1_job_shop'
  | 'ch2_project_scheduling'
  | 'past_midterms_productivity';

export type QuestionDifficulty = 'Hard' | 'Very Hard' | 'Exam Trap';

export interface TableVisual {
  type: 'table';
  title?: string;
  caption?: string;
  headers: string[];
  rows: (string | number)[][];
  highlightColIndices?: number[];
  highlightRowIndices?: number[];
}

export interface MPMNode {
  id: string;
  label: string;
  x: number; // 0 to 1000 coordinate space
  y: number; // 0 to 360 coordinate space
  isStartOrEnd?: boolean;
   isCritical?: boolean;
  earliest?: string | number;
  latest?: string | number;
}

export interface MPMArc {
  from: string;
  to: string;
  duration?: string | number;
  isCritical?: boolean;
  isDummy?: boolean;
}

export interface MPMNetworkVisual {
  type: 'mpm_network';
  title?: string;
  caption?: string;
  nodes: MPMNode[];
  arcs: MPMArc[];
  height?: number;
}

export interface PERTNode {
  id: string;
  label: string;
  x: number;
  y: number;
  earliest?: string | number;
  latest?: string | number;
}

export interface PERTArc {
  from: string;
  to: string;
  label: string; // e.g., "A (6)" or "Dummy (0)"
  isDummy?: boolean;
  isCritical?: boolean;
}

export interface PERTNetworkVisual {
  type: 'pert_network';
  title?: string;
  caption?: string;
  nodes: PERTNode[];
  arcs: PERTArc[];
  height?: number;
}

export interface GanttBlock {
  job: string;
  start: number;
  end: number;
  isIdle?: boolean;
  color?: string;
}

export interface GanttRow {
  machine: string;
  blocks: GanttBlock[];
}

export interface GanttChartVisual {
  type: 'gantt_chart';
  title?: string;
  caption?: string;
  maxTime: number;
  step: number;
  makespan?: number;
  rows: GanttRow[];
}

export interface CostPoint {
  duration: number;
  directExtra: number;
  indirect: number;
  total: number;
  label?: string;
  isOptimal?: boolean;
}

export interface CostCurveVisual {
  type: 'cost_curve';
  title?: string;
  caption?: string;
  points: CostPoint[];
}

export type SingleVisual =
  | TableVisual
  | MPMNetworkVisual
  | PERTNetworkVisual
  | GanttChartVisual
  | CostCurveVisual;

export interface CompositeVisual {
  type: 'composite';
  items: SingleVisual[];
}

export type QuestionVisual = SingleVisual | CompositeVisual;

export interface Question {
  id: number;
  category: QuestionCategory;
  topicTag: string;
  difficulty: QuestionDifficulty;
  sourceRef: string;
  prompt: string;
  visual?: QuestionVisual;
  options: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
  explanation: string;
  formulaUsed?: string;
  explanationVisual?: SingleVisual;
}

export interface UserAnswerRecord {
  questionId: number;
  selectedIndex: number;
  isCorrect: boolean;
  timestamp: number;
}
