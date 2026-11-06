import { Question } from '../types/exam';

export const questionsCh1: Question[] = [
  {
    id: 1,
    category: 'ch1_job_shop',
    topicTag: 'Job-Shop Fundamentals & Models',
    difficulty: 'Hard',
    sourceRef: 'Ch.1 Slide 4 — Static vs. Dynamic Models',
    prompt:
      'A precision aerospace machine shop groups all milling machines in Bay A, all lathes in Bay B, and all grinding units in Bay C. Batches of custom parts travel from one bay to another according to their technical routing. At Monday 08:00, the production manager locks the weekly schedule for the 14 jobs currently waiting on the shop floor; any new customer orders arriving during the week are held for next week. How is this production system classified in scheduling theory?',
    options: [
      'A functionally organized job-shop operating under a static scheduling model',
      'A flow-line cellular system operating under a dynamic stochastic scheduling model',
      'A functionally organized job-shop operating under a dynamic arrival model',
      'A continuous transfer line governed by earliest-due-date dispatching'
    ],
    correctIndex: 0,
    explanation:
      'By definition (Ch.1 Slide 4), a job-shop is organized by technical function (equipment performing the same technical operation is grouped in the same area, and jobs travel between areas). Because all 14 jobs are known in advance at the start of the period and no new job enters the current schedule during the period considered, it is a STATIC scheduling model (as opposed to a dynamic model where jobs arrive successively over time).',
    formulaUsed: 'Static Model: All n jobs known at t = 0; no arrivals during scheduling horizon.'
  },
  {
    id: 2,
    category: 'ch1_job_shop',
    topicTag: 'Single Machine — MOT / SPT Rule',
    difficulty: 'Hard',
    sourceRef: 'Ch.1 Slides 5–9 — Five Jobs on Machine A',
    prompt:
      'Five jobs must be processed sequentially on a single machine A. Their operating times Ti (in minutes) are given in the table below. If the shop manager applies the Minimum Operating Time (MOT / SPT) rule instead of processing them in their order of arrival (FIFO: 1–2–3–4–5), by how many minutes does the mean completion time C̄ decrease?',
    visual: {
      type: 'table',
      title: 'Single Machine A — Operating Times',
      headers: ['Job i', 'Job 1', 'Job 2', 'Job 3', 'Job 4', 'Job 5', 'Total'],
      rows: [['Ti (min)', 50, 150, 80, 200, 30, 510]]
    },
    options: [
      '86 minutes (from 304 min under FIFO down to 218 min under MOT)',
      '176 minutes (from 394 min under FIFO down to 218 min under MOT)',
      '90 minutes (from 308 min under FIFO down to 218 min under MOT)',
      '0 minutes, because the total workload on Machine A is fixed at 510 minutes'
    ],
    correctIndex: 0,
    explanation:
      'While the total machine work time (makespan on 1 machine) is always 510 minutes regardless of order, the mean completion time C̄ = (1/n) ∑ Cj depends heavily on the sequence.\n• Under MOT (5–1–3–2–4): Operating times are 30, 50, 80, 150, 200. Completion times Cj are: C(5)=30, C(1)=80, C(3)=160, C(2)=310, C(4)=510. Sum ∑Cj = 1,090 min → C̄_MOT = 1,090 / 5 = 218 min.\n• Under FIFO (1–2–3–4–5): Operating times are 50, 150, 80, 200, 30. Completion times Cj are: C(1)=50, C(2)=200, C(3)=280, C(4)=480, C(5)=510. Sum ∑Cj = 1,520 min → C̄_FIFO = 1,520 / 5 = 304 min.\n• Reduction = 304 − 218 = 86 minutes (note: 394 min is the LPT mean completion time).',
    formulaUsed: 'C̄ = (1/n) ∑_{j=1..n} C_j  where  C_j = T_1 + T_2 + ... + T_j',
    explanationVisual: {
      type: 'gantt_chart',
      title: 'MOT Optimal Sequence (5 – 1 – 3 – 2 – 4) on Machine A',
      maxTime: 550,
      step: 50,
      makespan: 510,
      rows: [
        {
          machine: 'A',
          blocks: [
            { job: '5', start: 0, end: 30, color: '#D97706' },
            { job: '1', start: 30, end: 80, color: '#0F172A' },
            { job: '3', start: 80, end: 160, color: '#EA580C' },
            { job: '2', start: 160, end: 310, color: '#059669' },
            { job: '4', start: 310, end: 510, color: '#2563EB' }
          ]
        }
      ]
    }
  },
  {
    id: 3,
    category: 'ch1_job_shop',
    topicTag: 'Single Machine — Midterm Exam Trap',
    difficulty: 'Exam Trap',
    sourceRef: 'TBS Fall 2023 Midterm Exam — Question 3',
    prompt:
      'We want to sequence the following five jobs (A, B, C, D, E) on a single machine. Both Processing Times and Due Dates are provided in the table below. What is the optimal sequence to MINIMIZE THE TOTAL (AND MEAN) COMPLETION TIME, and what is the resulting minimum mean completion time C̄?',
    visual: {
      type: 'table',
      title: 'Fall 2023 Midterm Q3 — Five Jobs on One Machine',
      headers: ['Job', 'Processing Time (hours)', 'Due Date (hours)'],
      rows: [
        ['A', 39, 65],
        ['B', 2, 3],
        ['C', 52, 52],
        ['D', 23, 44],
        ['E', 49, 49]
      ]
    },
    options: [
      'Sequence B – D – A – E – C with ∑Cj = 369 hours and C̄ = 73.8 hours (Due dates are a distractor when minimizing completion time)',
      'Sequence B – D – E – C – A with ∑Cj = 395 hours and C̄ = 79.0 hours (Ordered by Earliest Due Date EDD)',
      'Sequence A – B – C – D – E with ∑Cj = 492 hours and C̄ = 98.4 hours (Alphabetical / FIFO order)',
      'Sequence C – E – A – D – B with ∑Cj = 641 hours and C̄ = 128.2 hours (Ordered by Longest Processing Time LPT)'
    ],
    correctIndex: 0,
    explanation:
      'EXAM TRAP ALERT (from Fall 2023 Midterm Q3): The table gives Due Dates to tempt students into using EDD (B–D–E–C–A, which gives Cj = 2, 25, 74, 126, 165 → ∑Cj = 392h). However, the question explicitly asks to "minimize the total completion time". As proven in Ch.1 Slide 7, the MOT (Shortest Processing Time) rule strictly minimizes total and mean completion time and ignores due dates!\n• Sort by increasing Processing Time: B (2) < D (23) < A (39) < E (49) < C (52) → Sequence: B – D – A – E – C.\n• Completion times Cj:\n  - C(B) = 2\n  - C(D) = 2 + 23 = 25\n  - C(A) = 25 + 39 = 64\n  - C(E) = 64 + 49 = 113\n  - C(C) = 113 + 52 = 165\n• Minimum Total Completion Time ∑Cj = 2 + 25 + 64 + 113 + 165 = 369 hours, and Minimum Mean Completion Time C̄ = 369 / 5 = 73.8 hours.',
    formulaUsed: 'MOT Rule: T_(1) ≤ T_(2) ≤ ... ≤ T_(n) minimizes ∑ C_j and C̄.'
  },
  {
    id: 4,
    category: 'ch1_job_shop',
    topicTag: 'Single Machine — Priority Rules Comparison',
    difficulty: 'Very Hard',
    sourceRef: 'Ch.1 Slide 6 — Priority Rules (FIFO, SPT, LPT, EDD, CR)',
    prompt:
      'At day t = 0, four urgent jobs are waiting at a single CNC workstation. Their processing times and due dates are shown below. If the shop supervisor sequences the jobs using the Critical Ratio (CR) priority rule (scheduling the job with the smallest CR first), what is the resulting job sequence and the maximum lateness L_max?',
    visual: {
      type: 'table',
      title: 'CNC Workstation — Job Queue at t = 0',
      headers: ['Job', 'Processing Time Ti (days)', 'Due Date Di (day)'],
      rows: [
        ['J1', 6, 12],
        ['J2', 4, 6],
        ['J3', 5, 15],
        ['J4', 8, 10]
      ]
    },
    options: [
      'Sequence J4 – J2 – J1 – J3 with Maximum Lateness L_max = 8 days',
      'Sequence J2 – J4 – J1 – J3 with Maximum Lateness L_max = 6 days',
      'Sequence J2 – J3 – J1 – J4 with Maximum Lateness L_max = 13 days',
      'Sequence J3 – J1 – J2 – J4 with Maximum Lateness L_max = 13 days'
    ],
    correctIndex: 0,
    explanation:
      'From Ch.1 Slide 6, the Critical Ratio is defined as CR = (Time remaining until due date) / Processing time = Di / Ti at t = 0:\n• CR(J1) = 12 / 6 = 2.00\n• CR(J2) = 6 / 4 = 1.50\n• CR(J3) = 15 / 5 = 3.00\n• CR(J4) = 10 / 8 = 1.25\nOrdering from smallest (most urgent) CR to largest gives: J4 (1.25) → J2 (1.50) → J1 (2.00) → J3 (3.00).\nLet us compute Completion Times (Cj) and Lateness (Lj = Cj − Dj):\n• J4: C = 8, Due = 10 → L = −2 (early)\n• J2: C = 8 + 4 = 12, Due = 6 → L = 12 − 6 = +6 days late\n• J1: C = 12 + 6 = 18, Due = 12 → L = 18 − 12 = +6 days late\n• J3: C = 18 + 5 = 23, Due = 15 → L = 23 − 15 = +8 days late\nThus, Maximum Lateness L_max = 8 days (whereas EDD J2–J4–J1–J3 achieves the minimum possible L_max = 8 days as well: C(J2)=4 [L=-2], C(J4)=12 [L=2], C(J1)=18 [L=6], C(J3)=23 [L=8]).',
    formulaUsed: 'CR_i = (Due Date - Current Time) / Processing Time;  L_i = C_i - D_i'
  },
  {
    id: 5,
    category: 'ch1_job_shop',
    topicTag: 'Single Machine — 3D Printer Fab Lab',
    difficulty: 'Hard',
    sourceRef: 'Ch.1 Slides 12–14 — Exercise 1 (Fab Lab 3D Printer)',
    prompt:
      'In the university Fab Lab (Exercise 1), six 3D print jobs are submitted at 08:00 in the order 1 to 6 with printing times (in minutes) shown below. What is the exact difference in total waiting time (sum of waiting times of all 6 jobs before their printing starts) between the arrival order (FIFO) and the optimal MOT schedule?',
    visual: {
      type: 'table',
      title: 'Fab Lab 3D Printer — Six Print Jobs',
      headers: ['Print Job', '1', '2', '3', '4', '5', '6', 'Total'],
      rows: [['Ti (min)', 45, 120, 30, 90, 60, 15, 360]]
    },
    options: [
      '495 minutes of total waiting time saved by using MOT instead of FIFO',
      '82.5 minutes of total waiting time saved by using MOT instead of FIFO',
      '360 minutes of total waiting time saved by using MOT instead of FIFO',
      '540 minutes of total waiting time saved by using MOT instead of FIFO'
    ],
    correctIndex: 0,
    explanation:
      'Recall that for each job j, Completion Time Cj = Waiting Time Wj + Operating Time Tj. Since the sum of operating times ∑Tj = 360 min is identical for any sequence, the difference in total waiting time ∑Wj is equal to the difference in total completion time ∑Cj!\n• Under MOT (6–3–1–5–4–2): Cj = 15, 45, 90, 150, 240, 360 → ∑Cj = 900 min (Mean C̄ = 150 min). Total waiting time ∑Wj = 900 − 360 = 540 min.\n• Under FIFO (1–2–3–4–5–6): Cj = 45, 165, 195, 285, 345, 360 → ∑Cj = 1,395 min (Mean C̄ = 232.5 min). Total waiting time ∑Wj = 1,395 − 360 = 1,035 min.\n• Total waiting time saved = 1,395 − 900 = 495 minutes (which is 82.5 min per job × 6 jobs).',
    formulaUsed: '∑ W_j = ∑ C_j - ∑ T_j;  Δ(∑ W_j) = ∑ C_j(FIFO) - ∑ C_j(MOT)'
  },
  {
    id: 6,
    category: 'ch1_job_shop',
    topicTag: 'Single Machine — Algebraic Weighting Proof',
    difficulty: 'Very Hard',
    sourceRef: 'Ch.1 Slides 7–8 — Mathematical Optimality of MOT',
    prompt:
      'Suppose n = 6 jobs are scheduled on a single machine in positional order j = 1, 2, 3, 4, 5, 6 with positional operating times T_[1], T_[2], ..., T_[6]. When expressing the mean completion time C̄ as a linear combination of the positional operating times, what coefficient multiplies T_[2] (the operating time of the job placed second in the sequence)?',
    options: [
      '5 / 6 (because T_[2] is included in the completion time of 5 jobs: positions 2, 3, 4, 5, and 6)',
      '2 / 6 (because it is in position j = 2 out of n = 6)',
      '1 / 6 (because each job contributes equally to the mean completion time)',
      '4 / 6 (because 4 jobs follow position 2 in the queue)'
    ],
    correctIndex: 0,
    explanation:
      'Since C_[j] = T_[1] + T_[2] + ... + T_[j], summing over all j = 1..n gives:\n∑ C_[j] = n·T_[1] + (n − 1)·T_[2] + (n − 2)·T_[3] + ... + 1·T_[n].\nDividing by n = 6 yields:\nC̄ = (6/6)T_[1] + (5/6)T_[2] + (4/6)T_[3] + (3/6)T_[4] + (2/6)T_[5] + (1/6)T_[6].\nBecause the weights (n − j + 1)/n strictly decrease with position j, minimizing C̄ requires assigning the smallest operating times to the largest weights—which is the exact mathematical proof of the MOT rule!',
    formulaUsed: 'C̄ = (1/n) ∑_{j=1..n} (n - j + 1) T_[j]'
  },
  {
    id: 7,
    category: 'ch1_job_shop',
    topicTag: 'Two Machines — Johnson’s Algorithm Intuition',
    difficulty: 'Hard',
    sourceRef: 'Ch.1 Slides 17–18 — Johnson’s Algorithm (1954)',
    prompt:
      'When all n jobs follow the exact same routing (Machine A first, then Machine B), Johnson’s algorithm (1954) finds the sequence that minimizes the total execution time (makespan T). What is the core operational intuition behind Step 2 of Johnson’s rule?',
    options: [
      'Place jobs with tiny times on A at the very start to minimize B’s initial starvation (idle time Z), and place jobs with tiny times on B at the very end to minimize A’s final tail wait',
      'Place jobs with the largest times on A first so Machine A finishes its heavy work early, and place longest B jobs last',
      'Alternate short and long jobs on Machine A so the work-in-process buffer between A and B never exceeds one job',
      'Sort jobs in increasing order of (TiA + TiB) so the average completion time across both machines is minimized'
    ],
    correctIndex: 0,
    explanation:
      'As shown on Ch.1 Slide 17 ("The intuition behind the rule"):\n• Observation 1 (at the start): While the very first job is being processed on Machine A, Machine B is completely idle (Z). Therefore, we want to put FIRST the job with the shortest time on A so Machine B starts working as early as possible.\n• Observation 2 (at the end): While the very last job finishes on Machine B, Machine A has already finished all work and sits idle (Z). Therefore, we put LAST the job with the shortest time on B.',
    formulaUsed: 'min T_i(A) → place at FIRST free position;  min T_i(B) → place at LAST free position.'
  },
  {
    id: 8,
    category: 'ch1_job_shop',
    topicTag: 'Two Machines — Johnson’s Rule & Idle Time',
    difficulty: 'Very Hard',
    sourceRef: 'Ch.1 Slides 16–21 — Five Jobs on Two Machines',
    prompt:
      'Consider the five jobs processed on Machine A then Machine B from Chapter 1 (times in minutes below). In the optimal Johnson sequence (5 – 1 – 3 – 4 – 2), what is the total makespan T, and how much total idle time Z does Machine B experience between t = 0 and t = T?',
    visual: {
      type: 'table',
      title: 'Two-Machine Flow Shop (A → B)',
      headers: ['Job i', 'Job 1', 'Job 2', 'Job 3', 'Job 4', 'Job 5', 'Total'],
      rows: [
        ['Ti (A) min', 50, 150, 80, 200, 30, 510],
        ['Ti (B) min', 60, 50, 150, 70, 200, 530]
      ]
    },
    options: [
      'Makespan T = 560 min; Machine B is idle for exactly 30 min (only at the start from t = 0 to t = 30)',
      'Makespan T = 560 min; Machine B is idle for 50 min (30 min at the start and 20 min before Job 4)',
      'Makespan T = 540 min; Machine B is idle for 10 min (only at the start)',
      'Makespan T = 580 min; Machine B is idle for 50 min across the schedule'
    ],
    correctIndex: 0,
    explanation:
      'Let us trace the Johnson sequence 5 – 1 – 3 – 4 – 2 (Ch.1 Slide 20–21):\n• Job 5: A [0..30], B [30..230]\n• Job 1: A [30..80], B starts at max(80, 230) = 230 → B [230..290]\n• Job 3: A [80..160], B starts at max(160, 290) = 290 → B [290..440]\n• Job 4: A [160..360], B starts at max(360, 440) = 440 → B [440..510]\n• Job 2: A [360..510], B starts at max(510, 510) = 510 → B [510..560]\nTotal makespan T = 560 min. Since Machine B’s total workload is 530 min and T = 560 min, Machine B’s total idle time is Z_B = 560 − 530 = 30 min, which occurs exclusively at the start [0..30] while Job 5 is on A!',
    formulaUsed: 'Start_B(k) = max(End_A(k), End_B(k-1));  Z_B = T - ∑ T_i(B)',
    explanationVisual: {
      type: 'gantt_chart',
      title: 'Gantt Chart — Johnson Sequence 5 – 1 – 3 – 4 – 2 (T = 560 min)',
      maxTime: 600,
      step: 50,
      makespan: 560,
      rows: [
        {
          machine: 'A',
          blocks: [
            { job: '5', start: 0, end: 30, color: '#D97706' },
            { job: '1', start: 30, end: 80, color: '#0F172A' },
            { job: '3', start: 80, end: 160, color: '#EA580C' },
            { job: '4', start: 160, end: 360, color: '#2563EB' },
            { job: '2', start: 360, end: 510, color: '#059669' },
            { job: 'Z', start: 510, end: 560, isIdle: true }
          ]
        },
        {
          machine: 'B',
          blocks: [
            { job: 'Z', start: 0, end: 30, isIdle: true },
            { job: '5', start: 30, end: 230, color: '#D97706' },
            { job: '1', start: 230, end: 290, color: '#0F172A' },
            { job: '3', start: 290, end: 440, color: '#EA580C' },
            { job: '4', start: 440, end: 510, color: '#2563EB' },
            { job: '2', start: 510, end: 560, color: '#059669' }
          ]
        }
      ]
    }
  },
  {
    id: 9,
    category: 'ch1_job_shop',
    topicTag: 'Two Machines — Smartphone Repair Shop',
    difficulty: 'Hard',
    sourceRef: 'Ch.1 Slides 22–24 — Exercise 2 (Smartphone Repair Shop)',
    prompt:
      'In the Smartphone Repair Shop (Exercise 2), six phones go through Diagnosis (A) then Repair (B). How many minutes of total execution time (makespan) are saved by using Johnson’s optimal sequence (2 – 6 – 1 – 5 – 3 – 4) compared to processing the phones in their arrival order (1 – 2 – 3 – 4 – 5 – 6)?',
    visual: {
      type: 'table',
      title: 'Smartphone Repair Shop — Station Times (min)',
      headers: ['Phone', '1', '2', '3', '4', '5', '6', 'Total'],
      rows: [
        ['Diagnosis (A)', 25, 10, 40, 15, 35, 20, 145],
        ['Repair (B)', 30, 45, 20, 10, 50, 25, 180]
      ]
    },
    options: [
      '15 minutes saved (Optimal T = 190 min vs. Arrival Order T = 205 min)',
      '25 minutes saved (Optimal T = 180 min vs. Arrival Order T = 205 min)',
      '10 minutes saved (Optimal T = 190 min vs. Arrival Order T = 200 min)',
      '20 minutes saved (Optimal T = 190 min vs. Arrival Order T = 210 min)'
    ],
    correctIndex: 0,
    explanation:
      'Let us compare both schedules (Ch.1 Slides 23–24):\n1) Optimal Johnson Sequence (2–6–1–5–3–4):\n   • End on A: 10, 30, 55, 90, 130, 145\n   • End on B: 55, 80, 110, 160, 180, 190 → T_opt = 190 min (B only waits 10 min at the start while Phone 2 is diagnosed).\n2) Arrival Order (1–2–3–4–5–6):\n   • Phone 1: A[0..25], B[25..55]\n   • Phone 2: A[25..35], B[55..100]\n   • Phone 3: A[35..75], B[100..120]\n   • Phone 4: A[75..90], B[120..130]\n   • Phone 5: A[90..125], B[130..180]\n   • Phone 6: A[125..145], B[180..205] → T_FIFO = 205 min.\nSavings = 205 − 190 = 15 minutes.',
    formulaUsed: 'ΔT = T(FIFO) - T(Johnson) = 205 - 190 = 15 min'
  },
  {
    id: 10,
    category: 'ch1_job_shop',
    topicTag: 'Two Machines — Fall 2023 Midterm Q4 (Part 1–3)',
    difficulty: 'Very Hard',
    sourceRef: 'TBS Fall 2023 Midterm Exam — Question 4 (Parts 1–3)',
    prompt:
      'Consider the four tasks (A, B, C, D) from the Fall 2023 Midterm Exam (Question 4), with execution times (in hours) in Center 1 and Center 2 given below. When scheduled optimally using Johnson’s algorithm, what is the minimal time T required to complete all tasks, and what is the total idle time Z for Center 2 over the horizon [0, T]?',
    visual: {
      type: 'table',
      title: 'Fall 2023 Midterm Q4 — Tasks in Center 1 & Center 2',
      headers: ['Task', 'Center 1 (hours)', 'Center 2 (hours)'],
      rows: [
        ['A', 4, 6],
        ['B', 6, 2],
        ['C', 2, 6],
        ['D', 10, 6]
      ]
    },
    options: [
      'Sequence C – A – D – B; Minimal time T = 24 hours; Idle time on Center 2 = 4 hours',
      'Sequence C – D – A – B; Minimal time T = 22 hours; Idle time on Center 2 = 2 hours',
      'Sequence C – A – B – D; Minimal time T = 26 hours; Idle time on Center 2 = 6 hours',
      'Sequence A – C – D – B; Minimal time T = 24 hours; Idle time on Center 2 = 2 hours'
    ],
    correctIndex: 0,
    explanation:
      'Let us apply Johnson’s algorithm step by step to the Fall 2023 Midterm Q4 table:\n• Iteration 1: Smallest time is 2 hours, appearing for Task C on Center 1 (place FIRST → pos 1) and Task B on Center 2 (place LAST → pos 4). Sequence: [C, _, _, B].\n• Iteration 2: Remaining tasks are A (4, 6) and D (10, 6). Smallest time is 4 hours for Task A on Center 1 → place in first free position (pos 2). Task D takes pos 3.\n• Optimal Johnson Sequence: C – A – D – B.\nNow trace the timetable:\n• Task C: C1 [0..2], C2 [2..8] (Center 2 is idle from 0 to 2 → 2 hours)\n• Task A: C1 [2..6], C2 [8..14]\n• Task D: C1 [6..16], C2 waits from 14 to 16 (2 hours idle!), then runs [16..22]\n• Task B: C1 [16..22], C2 runs [22..24]\nThus, minimal completion time T = 24 hours. Total workload on Center 2 is 6 + 6 + 6 + 2 = 20 hours, so total idle time on Center 2 is 24 − 20 = 4 hours (specifically [0..2] and [14..16]).',
    formulaUsed: 'Z_{Center 2} = T - ∑ T_i(Center 2) = 24 - 20 = 4 hours',
    explanationVisual: {
      type: 'gantt_chart',
      title: 'Fall 2023 Midterm Q4 — Standard Gantt Chart (Sequence C – A – D – B)',
      maxTime: 26,
      step: 2,
      makespan: 24,
      rows: [
        {
          machine: 'C1',
          blocks: [
            { job: 'C', start: 0, end: 2, color: '#059669' },
            { job: 'A', start: 2, end: 6, color: '#2563EB' },
            { job: 'D', start: 6, end: 16, color: '#D97706' },
            { job: 'B', start: 16, end: 22, color: '#7C3AED' },
            { job: 'Z', start: 22, end: 24, isIdle: true }
          ]
        },
        {
          machine: 'C2',
          blocks: [
            { job: 'Z', start: 0, end: 2, isIdle: true },
            { job: 'C', start: 2, end: 8, color: '#059669' },
            { job: 'A', start: 8, end: 14, color: '#2563EB' },
            { job: 'Z', start: 14, end: 16, isIdle: true },
            { job: 'D', start: 16, end: 22, color: '#D97706' },
            { job: 'B', start: 22, end: 24, color: '#7C3AED' }
          ]
        }
      ]
    }
  },
  {
    id: 11,
    category: 'ch1_job_shop',
    topicTag: 'Two Machines — Lot Splitting (Fall 2023 Midterm Q4.4)',
    difficulty: 'Exam Trap',
    sourceRef: 'TBS Fall 2023 Midterm Exam — Question 4 (Part 4: Subtask Splitting)',
    prompt:
      'Continuing Question 4 from the Fall 2023 Midterm Exam (Tasks A:[4,6], B:[6,2], C:[2,6], D:[10,6] in sequence C – A – D – B): Suppose each of tasks C and D is split into two subtasks of equal duration — C1(1,3), C2(1,3) and D1(5,3), D2(5,3) — so the first half can transfer to Center 2 immediately. What is the exact effect of this splitting on Center 1, on the completion of C, A, D on Center 2, and on the overall schedule?',
    options: [
      'Center 1 is unchanged (finishes at 22h); on Center 2, initial idle time drops from 2h to 1h and the [14..16] idle gap before D vanishes so D finishes at 19h instead of 22h, though unsplit B still finishes on C1 at 22h (leaving T = 24h and total Z_2 = 4h: [0..1] and [19..22])',
      'Center 1 finishes 3 hours earlier (at 19h); Center 2 has zero idle time; total makespan T drops from 24h to 20h',
      'Splitting C and D increases the total makespan T from 24h to 26h due to extra setup times between subtasks',
      'Center 1 is unchanged (22h), and because D is split, Task B starts on Center 2 at t = 19h so total makespan T drops to 21h'
    ],
    correctIndex: 0,
    explanation:
      'This is the classic Exam Trap from Fall 2023 Midterm Q4 Part 4! Let us trace the Gantt chart with C split into C1(1,3), C2(1,3) and D split into D1(5,3), D2(5,3):\n1) Effect on Center 1: None — Center 1 still processes C1(1) + C2(1) + A(4) + D1(5) + D2(5) + B(6) = 22 hours continuously without idle time.\n2) Effect on Center 2 during C, A, D:\n   • C1 finishes on C1 at t = 1, so Center 2 starts at t = 1 (initial idle time cut from 2h down to 1h!). C1 runs [1..4], C2 runs [4..7], A runs [7..13].\n   • D1 finishes on C1 at t = 11, so when A finishes on C2 at t = 13, D1 starts IMMEDIATELY [13..16], and D2 (ready at t = 16) runs [16..19]. The 2-hour mid-schedule idle gap [14..16] is completely eliminated, and tasks C, A, D finish 3 hours earlier (at t = 19h instead of 22h)!\n3) Effect on Task B and overall T: Because Task B is NOT split, B only finishes on Center 1 at t = 22h. Thus Center 2 must now wait 3 hours [19..22] for B to arrive, then runs B [22..24]. Total idle time on C2 remains 1 + 3 = 4h and T = 24h (unless B were also split!).',
    formulaUsed: 'End_C2(D2) = 19h (3h earlier), but Start_C2(B) = max(End_C1(B)=22, End_C2(D2)=19) = 22h.',
    explanationVisual: {
      type: 'gantt_chart',
      title: 'Fall 2023 Midterm Q4.4 — Gantt Chart with Split Tasks C1, C2 and D1, D2',
      maxTime: 26,
      step: 2,
      makespan: 24,
      rows: [
        {
          machine: 'C1',
          blocks: [
            { job: 'C1', start: 0, end: 1, color: '#059669' },
            { job: 'C2', start: 1, end: 2, color: '#10B981' },
            { job: 'A', start: 2, end: 6, color: '#2563EB' },
            { job: 'D1', start: 6, end: 11, color: '#D97706' },
            { job: 'D2', start: 11, end: 16, color: '#EA580C' },
            { job: 'B', start: 16, end: 22, color: '#7C3AED' },
            { job: 'Z', start: 22, end: 24, isIdle: true }
          ]
        },
        {
          machine: 'C2',
          blocks: [
            { job: 'Z', start: 0, end: 1, isIdle: true },
            { job: 'C1', start: 1, end: 4, color: '#059669' },
            { job: 'C2', start: 4, end: 7, color: '#10B981' },
            { job: 'A', start: 7, end: 13, color: '#2563EB' },
            { job: 'D1', start: 13, end: 16, color: '#D97706' },
            { job: 'D2', start: 16, end: 19, color: '#EA580C' },
            { job: 'Z', start: 19, end: 22, isIdle: true },
            { job: 'B', start: 22, end: 24, color: '#7C3AED' }
          ]
        }
      ]
    }
  },
  {
    id: 12,
    category: 'ch1_job_shop',
    topicTag: 'Two Machines — Tie-Breaking Rules in Johnson’s Algorithm',
    difficulty: 'Very Hard',
    sourceRef: 'Ch.1 Slides 23 & 52 — Ties in Johnson’s Algorithm',
    prompt:
      'While executing Johnson’s algorithm on a two-machine flow shop (A → B), suppose the minimum remaining operating time is 10 minutes, and it occurs simultaneously for Job 2 on Machine A (T_2A = 10) and Job 4 on Machine B (T_4B = 10). How should this tie be resolved?',
    options: [
      'Place Job 2 in the first available front position and Job 4 in the last available back position simultaneously',
      'Place both Job 2 and Job 4 at the front of the sequence, ordered by their secondary machine times',
      'Place both Job 2 and Job 4 at the back of the sequence to protect Machine B',
      'Break the tie arbitrarily and place both jobs adjacent to each other in the middle of the sequence'
    ],
    correctIndex: 0,
    explanation:
      'As demonstrated in Ch.1 Slide 23 (Phone 2 on A = 10 and Phone 4 on B = 10) and Slide 52 ("Ties: in P1, value 3 appears on A (batch 2 → front) and on D (batch 1 → back)"), when a tie occurs between a minimum time on Machine A for one job and Machine B for another job, there is no conflict at all: the job with the minimum on A goes to the first free position at the front, and the job with the minimum on B goes to the last free position at the back!',
    formulaUsed: 'Tie (Job i on A == Job k on B): Job i → Front, Job k → Back.'
  },
  {
    id: 13,
    category: 'ch1_job_shop',
    topicTag: 'Two Machines — Same-Job Tie in Johnson’s Rule',
    difficulty: 'Very Hard',
    sourceRef: 'Ch.1 Slide 18 — Johnson’s Rule Edge Cases',
    prompt:
      'Suppose five jobs are to be scheduled on Machine A then Machine B. At iteration 1, the smallest value in the entire table is 15 minutes, which belongs to Job 3 on BOTH Machine A and Machine B (T_3A = 15, T_3B = 15). Which statement is true regarding the placement of Job 3?',
    options: [
      'Job 3 can be placed either in the first free position (front) or the last free position (back); both choices yield valid Johnson sequences',
      'Job 3 must strictly be placed in the middle position (position 3) because its times on A and B are balanced',
      'Job 3 must strictly be placed last on Machine B to avoid starving Machine A',
      'Johnson’s algorithm fails when T_iA = T_iB and requires switching to Jackson’s algorithm'
    ],
    correctIndex: 0,
    explanation:
      'When the minimum remaining time belongs to the same job i on both Machine A and Machine B (T_iA = T_iB), Johnson’s optimality proof allows placing job i either in the first available position (treating the minimum as occurring on A) or in the last available position (treating it as occurring on B). Conventionally, placing it at the front or back produces alternative optimal schedules.',
    formulaUsed: 'If min = T_i(A) = T_i(B), Job i may be placed at either the first or last free position.'
  },
  {
    id: 14,
    category: 'ch1_job_shop',
    topicTag: 'Two Machines — Jackson’s Algorithm Theory',
    difficulty: 'Hard',
    sourceRef: 'Ch.1 Slides 25–28 & Fall 2023 Midterm Q1.2 — Jackson’s Rule (1957)',
    prompt:
      'In a two-machine job-shop (Machines A and B) where jobs have different routings (some go A → B, some go B → A, some use A only, and some use B only), Jackson’s algorithm (1957) partitions the jobs into four subsets {AB}, {BA}, {A}, and {B}. How are these subsets combined on Machine A and Machine B, and why?',
    options: [
      'Machine A runs {AB} → {A} → {BA} and Machine B runs {BA} → {B} → {AB}, so each machine immediately feeds the other machine early and finishes with jobs arriving from the other machine',
      'Machine A runs {A} → {AB} → {BA} and Machine B runs {B} → {BA} → {AB}, so single-machine jobs are cleared before two-machine jobs',
      'Machine A runs {AB} → {BA} → {A} and Machine B runs {BA} → {AB} → {B}, leaving single-machine jobs to fill end-of-day slack',
      'Both Machine A and Machine B run {AB} → {A} → {B} → {BA} in identical order to prevent deadlocks'
    ],
    correctIndex: 0,
    explanation:
      'As explained in Ch.1 Slide 28 ("Combining the subsets on each machine"):\n• Machine A executes: {AB} → {A} → {BA}\n• Machine B executes: {BA} → {B} → {AB}\nWhy? Each machine STARTS with the jobs it must send to the other machine ({AB} on A, {BA} on B) so the other machine is supplied with work as quickly as possible. While waiting for the last cross-routed jobs to finish on the opposite machine, each machine processes its single-machine jobs ({A} on A, {B} on B) in the middle, and ENDS with the jobs it receives from the other machine ({BA} on A, {AB} on B).',
    formulaUsed: 'Machine A: {AB} → {A} → {BA};   Machine B: {BA} → {B} → {AB}'
  },
  {
    id: 15,
    category: 'ch1_job_shop',
    topicTag: 'Two Machines — Jackson’s Rule Subset Ordering Trap',
    difficulty: 'Exam Trap',
    sourceRef: 'Ch.1 Slide 27 — Best Order Inside Subset {BA}',
    prompt:
      'In Jackson’s algorithm, consider the subset {BA} consisting of jobs 7, 8, and 9 that must be processed FIRST on Machine B and THEN on Machine A, with operating times given in the table below. What is the optimal sequence inside subset {BA}, and what common mistake must be avoided?',
    visual: {
      type: 'table',
      title: 'Jackson Subset {BA} — Routing B first, then A',
      headers: ['Job i', 'Job 7', 'Job 8', 'Job 9'],
      rows: [
        ['Ti (B) — 1st machine', 9, 20, 10],
        ['Ti (A) — 2nd machine', 7, 30, 100]
      ]
    },
    options: [
      '9 – 8 – 7 (Because B is the 1st machine and A is the 2nd machine for {BA}, min time 7 on A puts Job 7 at the BACK, and min time 10 on B puts Job 9 at the FRONT)',
      '7 – 9 – 8 (Because 7 is on Machine A, placing Job 7 at the front of the sequence)',
      '7 – 8 – 9 (Sorting in increasing order of total processing time on both machines)',
      '8 – 9 – 7 (Placing the longest job on Machine B first)'
    ],
    correctIndex: 0,
    explanation:
      'CRITICAL TRAP (Ch.1 Slide 27): For subset {BA}, the routing is B → A, which means Machine B is the FIRST machine and Machine A is the SECOND machine!\n• Iteration 1: The smallest time in the table is 7 (Job 7 on Machine A). Since Machine A is the SECOND machine for {BA}, Job 7 must be placed at the BACK (last position): [_ , _ , 7].\n• Iteration 2: Remaining jobs are Job 8 (B:20, A:30) and Job 9 (B:10, A:100). The smallest time is 10 (Job 9 on Machine B). Since Machine B is the FIRST machine for {BA}, Job 9 is placed at the FRONT (first position): [9, 8, 7].\nStudents who blindly associate "Machine A = front" get 7–9–8, which is wrong for {BA}!',
    formulaUsed: 'For subset {BA}: min on B (1st machine) → Front;  min on A (2nd machine) → Back.'
  },
  {
    id: 16,
    category: 'ch1_job_shop',
    topicTag: 'Two Machines — Jackson’s Algorithm 11-Job Complete Schedule',
    difficulty: 'Very Hard',
    sourceRef: 'Ch.1 Slides 25–30 — Jackson’s Algorithm 11-Job Example',
    prompt:
      'In the 11-job Jackson’s algorithm example from Chapter 1 (Slides 25–30), Machine A has total workload 427 min and Machine B has total workload 209 min. The optimal sequences on each machine are:\n• Machine A: AB(3, 2, 1) → A(5, 4, 6) → BA(9, 8, 7)\n• Machine B: BA(9, 8, 7) → B(11, 10) → AB(3, 2, 1)\nLook at the Gantt chart and completion times below. Why are we 100% certain that the resulting makespan T = 427 minutes cannot be improved by any other schedule?',
    visual: {
      type: 'gantt_chart',
      title: 'Jackson 11-Job Schedule — Machine A and Machine B',
      maxTime: 450,
      step: 50,
      makespan: 427,
      rows: [
        {
          machine: 'A',
          blocks: [
            { job: '3', start: 0, end: 10, color: '#EA580C' },
            { job: '2', start: 10, end: 90, color: '#059669' },
            { job: '1', start: 90, end: 140, color: '#0F172A' },
            { job: '5', start: 140, end: 170, color: '#D97706' },
            { job: '4', start: 170, end: 220, color: '#2563EB' },
            { job: '6', start: 220, end: 290, color: '#0284C7' },
            { job: '9', start: 290, end: 390, color: '#CA8A04' },
            { job: '8', start: 390, end: 420, color: '#10B981' },
            { job: '7', start: 420, end: 427, color: '#64748B' }
          ]
        },
        {
          machine: 'B',
          blocks: [
            { job: '9', start: 0, end: 10, color: '#CA8A04' },
            { job: '8', start: 10, end: 30, color: '#10B981' },
            { job: '7', start: 30, end: 39, color: '#64748B' },
            { job: '11', start: 39, end: 49, color: '#7C3AED' },
            { job: '10', start: 49, end: 89, color: '#475569' },
            { job: '3', start: 89, end: 119, color: '#EA580C' },
            { job: '2', start: 119, end: 179, color: '#059669' },
            { job: '1', start: 179, end: 209, color: '#0F172A' },
            { job: 'Z', start: 209, end: 427, isIdle: true }
          ]
        }
      ]
    },
    options: [
      'Because Machine A never stops (0 minutes of idle time Z on A), so the makespan T = 427 min equals the irreducible total workload of Machine A',
      'Because Machine B finishes at t = 209 min, which is less than half of Machine A’s workload',
      'Because jobs 4, 5, 6 and 10, 11 were ordered using the MOT rule',
      'Because the sum of workloads on A and B is 636 minutes'
    ],
    correctIndex: 0,
    explanation:
      'As highlighted on Ch.1 Slide 30: "T_min = 427 min = total workload of machine A, which never stops → this schedule is optimal." A schedule’s makespan T can never be smaller than the total processing workload required on its busiest machine (∑ Ti(A) = 427 min). Since jobs 9, 8, 7 finish on B at t = 10, 30, 39—long before Machine A needs them at t = 290, 390, 420—Machine A experiences zero idle time (Z_A = 0) and finishes at t = 427 min.',
    formulaUsed: 'Lower Bound: T ≥ max( ∑ T_i(A), ∑ T_i(B) ). Here T = 427 = ∑ T_i(A).'
  },
  {
    id: 17,
    category: 'ch1_job_shop',
    topicTag: 'Two Machines — Car Service Garage (Jackson Exercise 3)',
    difficulty: 'Very Hard',
    sourceRef: 'Ch.1 Slides 31–33 — Exercise 3 (Car Service Garage)',
    prompt:
      'A car service garage has two bays: Bay A (mechanics) and Bay B (electronic diagnosis). Eight cars arrive with the routings and times (in minutes) shown below. Using Jackson’s algorithm, what are the exact processing sequences on Bay A and Bay B, and when does Bay B finish all its work?',
    visual: {
      type: 'table',
      title: 'Car Service Garage — Eight Cars (times in min)',
      headers: ['Car', '1', '2', '3', '4', '5', '6', '7', '8', 'Total'],
      rows: [
        ['Routing', 'A→B', 'A→B', 'A→B', 'B→A', 'B→A', 'A only', 'A only', 'B only', '—'],
        ['Ti (A)', 40, 25, 55, 35, 20, 30, 45, '—', 250],
        ['Ti (B)', 20, 35, 15, 15, 30, '—', '—', 25, 140]
      ]
    },
    options: [
      'Bay A: 2–1–3–6–7–4–5 (finishes at 250 min); Bay B: 4–5–8–2–1–3 (finishes at 140 min with 0 internal idle time)',
      'Bay A: 3–1–2–6–7–5–4 (finishes at 250 min); Bay B: 5–4–8–3–1–2 (finishes at 165 min)',
      'Bay A: 2–1–3–4–5–6–7 (finishes at 250 min); Bay B: 4–5–2–1–3–8 (finishes at 150 min)',
      'Bay A: 1–2–3–6–7–4–5 (finishes at 265 min); Bay B: 4–5–8–1–2–3 (finishes at 155 min)'
    ],
    correctIndex: 0,
    explanation:
      'Let us solve Exercise 3 (Ch.1 Slides 31–33) step by step:\n1) Partition into 4 subsets:\n   • {AB} = {1, 2, 3}: Johnson on (A, B) → min is 15 (Car 3 on B → back), next is 20 (Car 1 on B → back), Car 2 at front → Order: 2 – 1 – 3.\n   • {BA} = {4, 5}: Johnson on (B, A) where B is 1st machine → min is 15 (Car 4 on B → front) → Order: 4 – 5.\n   • {A} = {6, 7}: MOT rule (30 < 45) → Order: 6 – 7.\n   • {B} = {8}: Single car → Order: 8.\n2) Combine subsets:\n   • Bay A ({AB} → {A} → {BA}): 2 – 1 – 3 – 6 – 7 – 4 – 5. End times on A: 25, 65, 120, 150, 195, 230, 250.\n   • Bay B ({BA} → {B} → {AB}): 4 – 5 – 8 – 2 – 1 – 3. Notice when Car 2, 1, 3 are needed on B: after Car 4(15) + Car 5(30) + Car 8(25) = 70 min! At t = 70 min, Car 2 (finished on A at t=25) and Car 1 (finished on A at t=65) are already waiting! Then Car 2 runs on B [70..105], Car 1 runs [105..125], and Car 3 (finished on A at t=120) runs [125..140]. Thus Bay B finishes at t = 140 min with ZERO internal idle time, and overall makespan is T = 250 min!',
    formulaUsed: 'Bay A: AB(2,1,3) → A(6,7) → BA(4,5);  Bay B: BA(4,5) → B(8) → AB(2,1,3)'
  },
  {
    id: 18,
    category: 'ch1_job_shop',
    topicTag: 'Two Machines — Jackson’s Rule When Idle Gap Occurs',
    difficulty: 'Very Hard',
    sourceRef: 'Ch.1 Slides 28–30 — Cross-Machine Starvation in Jackson’s Rule',
    prompt:
      'In a two-machine job-shop using Jackson’s algorithm, suppose Machine A finishes subset {AB} and subset {A} at t = 80 minutes, and is ready to start the first job of subset {BA} (say Job 9). However, Job 9 only finishes on Machine B at t = 95 minutes. What happens on the Gantt chart of Machine A between t = 80 and t = 95?',
    options: [
      'Machine A must remain idle (Z = 15 minutes from t = 80 to t = 95) because a job in {BA} cannot start on A until it has completely finished its operation on B',
      'Machine A starts Job 9 at t = 80 in parallel with Machine B to avoid idle time',
      'Jackson’s algorithm automatically swaps {BA} ahead of {A} so Machine A is never idle',
      'Job 9 is moved to subset {A} so it can start at t = 80'
    ],
    correctIndex: 0,
    explanation:
      'By the fundamental Gantt chart rule (Ch.1 Slide 10): "A job starts on a machine only when it has left the previous machine AND the machine is free." For a job in subset {BA}, Machine B is its first machine and Machine A is its second machine. Therefore, if Machine A finishes {AB} and {A} at t = 80, but the next job in {BA} does not leave Machine B until t = 95, Machine A experiences an idle period Z of 15 minutes from t = 80 to t = 95.',
    formulaUsed: 'Start_A(j ∈ BA) = max(End_B(j), End_A(prev))'
  },
  {
    id: 19,
    category: 'ch1_job_shop',
    topicTag: 'Three Machines — Dominance Condition',
    difficulty: 'Hard',
    sourceRef: 'Ch.1 Slide 34 — Reducing Three Machines to Two',
    prompt:
      'When n jobs must be processed sequentially on three machines (A → B → C), Johnson’s algorithm cannot be applied directly unless the middle machine B is "dominated" by either Machine A or Machine C. What is the exact mathematical statement of this dominance condition?',
    options: [
      'min_i Ti(A) ≥ max_i Ti(B)   OR   min_i Ti(C) ≥ max_i Ti(B)',
      'min_i Ti(A) ≥ min_i Ti(B)   AND   min_i Ti(C) ≥ min_i Ti(B)',
      'max_i Ti(A) ≥ max_i Ti(B)   OR   max_i Ti(C) ≥ max_i Ti(B)',
      '∑ Ti(A) ≥ ∑ Ti(B)   AND   ∑ Ti(C) ≥ ∑ Ti(B)'
    ],
    correctIndex: 0,
    explanation:
      'As stated on Ch.1 Slide 34 ("Reducing three machines to two"), the three-machine flow shop (A → B → C) can be reduced to two fictitious machines G = A + B and H = B + C with a guarantee of optimality if and only if at least ONE of the two dominance conditions holds:\n• Dominance by A: min Ti(A) ≥ max Ti(B)\n• OR Dominance by C: min Ti(C) ≥ max Ti(B)\nIn other words, the shortest operating time on either outer machine (A or C) must be greater than or equal to the longest operating time on the middle machine B.',
    formulaUsed: 'min T_i(A) ≥ max T_i(B)  OR  min T_i(C) ≥ max T_i(B)'
  },
  {
    id: 20,
    category: 'ch1_job_shop',
    topicTag: 'Three Machines — Seven Jobs Example',
    difficulty: 'Very Hard',
    sourceRef: 'Ch.1 Slides 35–38 — Seven Jobs on Three Machines',
    prompt:
      'Seven jobs must pass through Machine A, then B, then C (times in minutes below). First check the dominance conditions, then determine the fictitious machine times G = A + B and H = B + C, the optimal Johnson sequence, and the minimum makespan T on the real machines A, B, C.',
    visual: {
      type: 'table',
      title: 'Three-Machine Flow Shop (A → B → C) — Seven Jobs',
      headers: ['Job i', '1', '2', '3', '4', '5', '6', '7', 'Total'],
      rows: [
        ['Ti (A)', 20, 12, 19, 16, 14, 12, 17, 110],
        ['Ti (B)', 4, 1, 9, 12, 5, 7, 8, 46],
        ['Ti (C)', 7, 11, 4, 18, 18, 3, 6, 67]
      ]
    },
    options: [
      'Dominance by A holds (12 ≥ 12); Sequence: 5 – 4 – 7 – 3 – 2 – 1 – 6; Minimum makespan T = 120 min',
      'Dominance by C holds (3 ≥ 12); Sequence: 6 – 1 – 2 – 3 – 7 – 4 – 5; Minimum makespan T = 113 min',
      'Dominance by A holds (12 ≥ 12); Sequence: 2 – 5 – 6 – 1 – 7 – 3 – 4; Minimum makespan T = 125 min',
      'Neither dominance condition holds; Heuristic sequence: 5 – 4 – 7 – 3 – 2 – 1 – 6; T = 156 min'
    ],
    correctIndex: 0,
    explanation:
      'From Ch.1 Slides 36–38:\n1) Check dominance:\n   • min Ti(A) = 12 (Jobs 2 and 6), max Ti(B) = 12 (Job 4). Since 12 ≥ 12, Dominance by A is TRUE!\n   • (Note: min Ti(C) = 3 < 12, so dominance by C is false, which is fine since only ONE condition is needed).\n2) Build fictitious machines G = A + B and H = B + C:\n   • Job 1: G=24, H=11\n   • Job 2: G=13, H=12\n   • Job 3: G=28, H=13\n   • Job 4: G=28, H=30\n   • Job 5: G=19, H=23\n   • Job 6: G=19, H=10\n   • Job 7: G=25, H=14\n3) Apply Johnson on (G, H):\n   • 10 (Job 6 on H → pos 7)\n   • 11 (Job 1 on H → pos 6)\n   • 12 (Job 2 on H → pos 5)\n   • 13 (Job 3 on H → pos 4)\n   • 14 (Job 7 on H → pos 3)\n   • 19 (Job 5 on G → pos 1)\n   • Remaining: Job 4 → pos 2.\n   • Optimal Sequence: 5 – 4 – 7 – 3 – 2 – 1 – 6.\n4) Evaluate on real machines A, B, C ( NOT on G and H!): End on C for Job 6 is T = 120 minutes.',
    formulaUsed: 'G_i = T_i(A) + T_i(B),  H_i = T_i(B) + T_i(C);  Evaluate makespan on real A, B, C.'
  },
  {
    id: 21,
    category: 'ch1_job_shop',
    topicTag: 'Three Machines — E-Commerce Warehouse (Exercise 4)',
    difficulty: 'Very Hard',
    sourceRef: 'Ch.1 Slides 40–42 — Exercise 4 (E-Commerce Warehouse)',
    prompt:
      'In an e-commerce warehouse (Exercise 4), six online orders go through Picking (A), Quality Check (B), and Packing (C). Times in minutes are given below. When applying the 3-machine reduction G = A + B and H = B + C, a tie of 13 minutes occurs between Order 5 on G (G_5 = 13) and Order 1 on H (H_1 = 13). What is the optimal sequence, the minimum total time T, and the time saved compared to arrival order 1–2–3–4–5–6?',
    visual: {
      type: 'table',
      title: 'E-Commerce Warehouse — Six Orders on A → B → C',
      headers: ['Order', '1', '2', '3', '4', '5', '6', 'Total'],
      rows: [
        ['Picking (A)', 12, 8, 15, 10, 9, 14, 68],
        ['Check (B)', 3, 5, 2, 6, 4, 3, 23],
        ['Packing (C)', 10, 7, 6, 12, 11, 8, 54],
        ['G = A + B', 15, 13, 17, 16, 13, 17, 91],
        ['H = B + C', 13, 12, 8, 18, 15, 11, 77]
      ]
    },
    options: [
      'Sequence 5 – 4 – 1 – 2 – 6 – 3; Minimum time T = 76 min (saving 6 min vs. 82 min for arrival order)',
      'Sequence 2 – 5 – 4 – 1 – 6 – 3; Minimum time T = 74 min (saving 8 min vs. 82 min for arrival order)',
      'Sequence 5 – 4 – 2 – 1 – 6 – 3; Minimum time T = 78 min (saving 4 min vs. 82 min for arrival order)',
      'Sequence 3 – 6 – 2 – 1 – 4 – 5; Minimum time T = 82 min (no savings over arrival order)'
    ],
    correctIndex: 0,
    explanation:
      'Let us verify Exercise 4 (Ch.1 Slides 40–42):\n1) Dominance by A: min Ti(A) = 8 ≥ max Ti(B) = 6 → TRUE.\n2) Apply Johnson on G and H:\n   • Smallest is 8 (Order 3 on H → pos 6): [_ _ _ _ _ 3]\n   • Next is 11 (Order 6 on H → pos 5): [_ _ _ _ 6 3]\n   • Next is 12 (Order 2 on H → pos 4): [_ _ _ 2 6 3]\n   • Next is 13: appears for Order 5 on G (→ pos 1, front) AND Order 1 on H (→ pos 3, back): [5 _ 1 2 6 3]\n   • Remaining is Order 4 → pos 2: [5 – 4 – 1 – 2 – 6 – 3].\n3) Real machine completion times for 5–4–1–2–6–3:\n   • End on A: 9, 19, 31, 39, 53, 68\n   • End on B: 13, 25, 34, 44, 56, 70\n   • End on C: 24, 37, 47, 54, 64, 76 → T_opt = 76 min (vs. 82 min for 1–2–3–4–5–6, saving 6 minutes).',
    formulaUsed: 'min T_i(A) = 8 ≥ max T_i(B) = 6;  T_opt = 76 min',
    explanationVisual: {
      type: 'gantt_chart',
      title: 'E-Commerce Warehouse Gantt Chart — Sequence 5 – 4 – 1 – 2 – 6 – 3 (T = 76 min)',
      maxTime: 80,
      step: 5,
      makespan: 76,
      rows: [
        {
          machine: 'A',
          blocks: [
            { job: '5', start: 0, end: 9, color: '#D97706' },
            { job: '4', start: 9, end: 19, color: '#2563EB' },
            { job: '1', start: 19, end: 31, color: '#0F172A' },
            { job: '2', start: 31, end: 39, color: '#059669' },
            { job: '6', start: 39, end: 53, color: '#0284C7' },
            { job: '3', start: 53, end: 68, color: '#EA580C' },
            { job: 'Z', start: 68, end: 76, isIdle: true }
          ]
        },
        {
          machine: 'B',
          blocks: [
            { job: 'Z', start: 0, end: 9, isIdle: true },
            { job: '5', start: 9, end: 13, color: '#D97706' },
            { job: 'Z', start: 13, end: 19, isIdle: true },
            { job: '4', start: 19, end: 25, color: '#2563EB' },
            { job: 'Z', start: 25, end: 31, isIdle: true },
            { job: '1', start: 31, end: 34, color: '#0F172A' },
            { job: 'Z', start: 34, end: 39, isIdle: true },
            { job: '2', start: 39, end: 44, color: '#059669' },
            { job: 'Z', start: 44, end: 53, isIdle: true },
            { job: '6', start: 53, end: 56, color: '#0284C7' },
            { job: 'Z', start: 56, end: 68, isIdle: true },
            { job: '3', start: 68, end: 70, color: '#EA580C' },
            { job: 'Z', start: 70, end: 76, isIdle: true }
          ]
        },
        {
          machine: 'C',
          blocks: [
            { job: 'Z', start: 0, end: 13, isIdle: true },
            { job: '5', start: 13, end: 24, color: '#D97706' },
            { job: 'Z', start: 24, end: 25, isIdle: true },
            { job: '4', start: 25, end: 37, color: '#2563EB' },
            { job: '1', start: 37, end: 47, color: '#0F172A' },
            { job: '2', start: 47, end: 54, color: '#059669' },
            { job: 'Z', start: 54, end: 56, isIdle: true },
            { job: '6', start: 56, end: 64, color: '#0284C7' },
            { job: 'Z', start: 64, end: 70, isIdle: true },
            { job: '3', start: 70, end: 76, color: '#EA580C' }
          ]
        }
      ]
    }
  },
  {
    id: 22,
    category: 'ch1_job_shop',
    topicTag: 'Three Machines — When Dominance Fails',
    difficulty: 'Hard',
    sourceRef: 'Ch.1 Slide 39 — Limits of the Three-Machine Method',
    prompt:
      'Suppose five jobs must be processed on three machines A → B → C, and we find that min Ti(A) = 4, max Ti(B) = 9, and min Ti(C) = 5. Neither dominance condition holds. According to Chapter 1, what can we do with the fictitious machines G = A + B and H = B + C in this case?',
    options: [
      'The reduction to G = A + B and H = B + C can still be used, but only as a heuristic (it yields a good sequence without a mathematical guarantee of optimality; exact optimality requires Integer Linear Programming and Branch & Bound)',
      'The reduction G = A + B and H = B + C is strictly forbidden and produces an infeasible schedule that violates precedence constraints',
      'We must redefine the fictitious machines as G = A + C and H = B + C to restore guaranteed optimality',
      'We must switch to Jackson’s algorithm and split the three machines into subsets {AB}, {BC}, and {AC}'
    ],
    correctIndex: 0,
    explanation:
      'As explicitly stated on Ch.1 Slide 39 ("When the dominance condition fails"): When the dominance condition is FALSE, "The reduction can still be used, but only as a heuristic: good order, no guarantee of optimality. Exact solution: model the problem as an integer linear programme and solve it by branch and bound (e.g. Excel Solver, Python OR-Tools)."',
    formulaUsed: 'Dominance False → G = A+B, H = B+C acts as a heuristic (no optimality guarantee).'
  },
  {
    id: 23,
    category: 'ch1_job_shop',
    topicTag: 'm Machines — Combinatorial Complexity',
    difficulty: 'Hard',
    sourceRef: 'Ch.1 Slide 43 — Scheduling n Jobs on m Machines',
    prompt:
      'In a general job-shop with n jobs and m machines where job sequences can potentially vary across machines, how many total schedules exist in the search space, and what is this value for n = 5 jobs on m = 3 machines?',
    options: [
      '(n!)^m schedules, which equals (120)^3 = 1,728,000 possible schedules',
      'n! × m! schedules, which equals 120 × 6 = 720 possible schedules',
      'n^m schedules, which equals 5^3 = 125 possible schedules',
      '(n × m)! schedules, which equals 15! ≈ 1.3 × 10^12 possible schedules'
    ],
    correctIndex: 0,
    explanation:
      'From Ch.1 Slide 43 ("Number of possible schedules"): On each of the m machines there are n! possible permutations of the n jobs, yielding (n!)^m possible schedules in total. For n = 5 jobs and m = 3 machines, 5! = 120, so (5!)^3 = (120)^3 = 1,728,000 schedules (and for 6 jobs on 4 machines, (720)^4 ≈ 2.7 × 10^11). This combinatorial explosion is why heuristics like CDS are essential.',
    formulaUsed: 'Total Schedules = (n!)^m'
  },
  {
    id: 24,
    category: 'ch1_job_shop',
    topicTag: 'm Machines — CDS Heuristic Formulation',
    difficulty: 'Hard',
    sourceRef: 'Ch.1 Slides 43, 45–46 — CDS Heuristic (Campbell, Dudek & Smith)',
    prompt:
      'When scheduling n jobs that all follow the same routing across m = 5 machines (A → B → C → D → E), how many fictitious two-machine problems does the CDS (Campbell, Dudek & Smith) heuristic construct, and what are the fictitious machines (G_k, H_k) for Problem k = 3?',
    options: [
      'm − 1 = 4 fictitious problems; for Problem 3, G_3 = A + B + C and H_3 = C + D + E',
      'm = 5 fictitious problems; for Problem 3, G_3 = A + B and H_3 = D + E',
      'm − 2 = 3 fictitious problems; for Problem 3, G_3 = A + B + C and H_3 = D + E',
      'm − 1 = 4 fictitious problems; for Problem 3, G_3 = C and H_3 = D'
    ],
    correctIndex: 0,
    explanation:
      'In the CDS heuristic (Campbell, Dudek & Smith, Ch.1 Slide 43 & 46), for m machines in series (M_1, M_2, ..., M_m), we group the machines into m − 1 fictitious two-machine problems P_k (for k = 1, ..., m − 1):\n• G_k sums the first k machines: M_1 + M_2 + ... + M_k\n• H_k sums the last k machines: M_{m−k+1} + ... + M_m\nFor m = 5 machines (A, B, C, D, E), there are 5 − 1 = 4 problems:\n• P1 (k=1): G_1 = A | H_1 = E\n• P2 (k=2): G_2 = A + B | H_2 = D + E\n• P3 (k=3): G_3 = A + B + C | H_3 = C + D + E\n• P4 (k=4): G_4 = A + B + C + D | H_4 = B + C + D + E.',
    formulaUsed: 'P_k (k = 1..m-1): G_k = ∑_{r=1..k} T_i(M_r),  H_k = ∑_{r=m-k+1..m} T_i(M_r)'
  },
  {
    id: 25,
    category: 'ch1_job_shop',
    topicTag: 'Four Machines — CDS Heuristic & Machine Utilization',
    difficulty: 'Very Hard',
    sourceRef: 'Ch.1 Slides 45–50 — Six Jobs on Four Machines',
    prompt:
      'In the Chapter 1 four-machine example (6 jobs on A → B → C → D, Slides 45–50), the three CDS candidate sequences yield makespans of T(P1) = 54 min (sequence 6–3–4–2–1–5), T(P2) = 60 min (sequence 5–6–3–2–4–1), and T(P3) = 55 min (sequence 3–6–4–2–1–5). Given the machine workloads below, what is the utilization rate of Machine C and Machine D in the retained optimal schedule?',
    visual: {
      type: 'table',
      title: 'Four-Machine Workloads (Retained Schedule T = 54 min)',
      headers: ['Machine', 'Machine A', 'Machine B', 'Machine C', 'Machine D'],
      rows: [['Total Workload (min)', 35, 32, 25, 37]]
    },
    options: [
      'Machine C utilization = 46.3% (≈ 46%); Machine D utilization = 68.5% (≈ 69%)',
      'Machine C utilization = 41.7% (≈ 42%); Machine D utilization = 61.7% (≈ 62%)',
      'Machine C utilization = 53.7% (≈ 54%); Machine D utilization = 31.5% (≈ 31%)',
      'Machine C utilization = 67.6% (≈ 68%); Machine D utilization = 100.0%'
    ],
    correctIndex: 0,
    explanation:
      'From Ch.1 Slide 50 ("Comparing the candidates"):\n• The retained schedule is Problem 1 (6–3–4–2–1–5) because it gives the lowest makespan T = 54 minutes (compared to 60 min and 55 min).\n• The utilization rate of a machine over the total execution horizon T = 54 min is:\n  Utilization(M) = Workload(M) / T\n  - Machine A: 35 / 54 = 64.8% ≈ 65%\n  - Machine B: 32 / 54 = 59.3% ≈ 59%\n  - Machine C: 25 / 54 = 46.3% ≈ 46%\n  - Machine D: 37 / 54 = 68.5% ≈ 69%\n(Note: 41.7% and 61.7% are the utilizations if one mistakenly divides by P2’s makespan T = 60 min).',
    formulaUsed: 'Utilization(M) = (∑ T_i(M)) / T_min'
  },
  {
    id: 26,
    category: 'ch1_job_shop',
    topicTag: 'Four Machines — Generic Medicine Line (Exercise 5)',
    difficulty: 'Very Hard',
    sourceRef: 'Ch.1 Slides 51–53 — Exercise 5 (Generic-Medicine Production Line)',
    prompt:
      'Five batches of generic medicine go through Weighing (A), Mixing (B), Tableting (C), and Packaging (D) with times in minutes shown below. When applying the CDS heuristic, what are the fictitious times (G, H) for Problem 2 (A+B | C+D), what Johnson sequence does P2 produce, and what is the resulting makespan T?',
    visual: {
      type: 'table',
      title: 'Generic-Medicine Line — Five Batches on Four Machines (min)',
      headers: ['Batch', '1', '2', '3', '4', '5', 'Total'],
      rows: [
        ['Weighing (A)', 6, 3, 8, 5, 4, 26],
        ['Mixing (B)', 4, 6, 3, 7, 5, 25],
        ['Tableting (C)', 5, 4, 6, 3, 7, 25],
        ['Packaging (D)', 3, 8, 5, 6, 9, 31]
      ]
    },
    options: [
      'G = [10, 9, 11, 12, 9], H = [8, 12, 11, 9, 16]; Sequence: 2 – 5 – 3 – 4 – 1; Makespan T = 44 min',
      'G = [15, 13, 17, 15, 16], H = [12, 18, 14, 16, 21]; Sequence: 2 – 4 – 5 – 3 – 1; Makespan T = 45 min',
      'G = [6, 3, 8, 5, 4], H = [3, 8, 5, 6, 9]; Sequence: 2 – 5 – 4 – 3 – 1; Makespan T = 50 min',
      'G = [10, 9, 11, 12, 9], H = [8, 12, 11, 9, 16]; Sequence: 1 – 4 – 3 – 5 – 2; Makespan T = 48 min'
    ],
    correctIndex: 0,
    explanation:
      'From Ch.1 Slide 52 (Exercise 5 Solution):\n• For Problem 2, G = A + B and H = C + D:\n  - Batch 1: G = 6+4 = 10, H = 5+3 = 8\n  - Batch 2: G = 3+6 = 9, H = 4+8 = 12\n  - Batch 3: G = 8+3 = 11, H = 6+5 = 11\n  - Batch 4: G = 5+7 = 12, H = 3+6 = 9\n  - Batch 5: G = 4+5 = 9, H = 7+9 = 16\n• Applying Johnson on P2:\n  - Min is 8 (Batch 1 on H → pos 5): [_ _ _ _ 1]\n  - Next is 9: Batch 2 on G (→ pos 1), Batch 5 on G (→ pos 2), and Batch 4 on H (→ pos 4): [2, 5, _, 4, 1]\n  - Remaining: Batch 3 → pos 3: Sequence 2 – 5 – 3 – 4 – 1.\n• Evaluating on the 4 real machines gives T = 44 minutes (tying with P1’s 2–5–4–3–1 at 44 min, and saving 6 min over arrival order 50 min).',
    formulaUsed: 'P2: G_i = A_i + B_i,  H_i = C_i + D_i'
  },
  {
    id: 27,
    category: 'ch1_job_shop',
    topicTag: 'Large Scheduling Problems — Methods & Approaches',
    difficulty: 'Hard',
    sourceRef: 'Ch.1 Slide 44 — What to Do with a Large Number of Machines?',
    prompt:
      'In industrial practice, when scheduling a large flow-shop or job-shop with many machines, several families of methods exist (Ch.1 Slide 44). Which of the following pairings accurately matches the scheduling approach with its core principle?',
    options: [
      'Bottleneck approach (Theory of Constraints): Schedule the bottleneck machine first to focus where capacity is lost; NEH & Palmer slope index: Specialized quick heuristics for flow shops',
      'Metaheuristics (Genetic Algorithms, Tabu Search): Guaranteed exact optimal solutions via Branch & Bound',
      'Dispatching rules (SPT, EDD, CR): Global exact optimization methods solved once a year in ERP systems',
      'Exact methods (Gurobi, CPLEX): Approximate rules of thumb that cannot handle even medium-size problems'
    ],
    correctIndex: 0,
    explanation:
      'According to the classification table on Ch.1 Slide 44:\n• Other heuristics: NEH (Nawaz–Enscore–Ham) and Palmer slope index provide very good, quick solutions for flow shops.\n• Priority (dispatching) rules: SPT, EDD, CR applied machine-by-machine daily in real job-shops.\n• Bottleneck approach: Schedule the bottleneck first (Theory of Constraints) to focus where capacity is lost.\n• Metaheuristics: Genetic algorithms, simulated annealing, tabu search give near-optimal solutions for large problems.\n• Exact methods: Integer programming + branch & bound (Gurobi, CPLEX, OR-Tools) give exact optimal solutions for medium-size problems.',
    formulaUsed: 'TOC = Schedule Bottleneck First;  NEH / Palmer = Flow-Shop Heuristics'
  },
  {
    id: 28,
    category: 'ch1_job_shop',
    topicTag: 'Chapter 1 Synthesis — Final Practice Exercise B',
    difficulty: 'Hard',
    sourceRef: 'Ch.1 Slides 55–56 — Final Practice Exercise B',
    prompt:
      'Five jobs must be processed on Machine A then Machine B (times in minutes in the table below, from Chapter 1 Final Practice Exercise B). Using Johnson’s algorithm, determine the optimal sequence, the makespan T, and the exact time intervals during which Machine B is idle (Z).',
    visual: {
      type: 'table',
      title: 'Final Practice Exercise B — Two Machines (A → B)',
      headers: ['Job', '1', '2', '3', '4', '5', 'Total'],
      rows: [
        ['Ti (A) min', 5, 1, 9, 3, 10, 28],
        ['Ti (B) min', 2, 6, 7, 8, 4, 27]
      ]
    },
    options: [
      'Sequence 2 – 4 – 3 – 5 – 1; Makespan T = 30 min; Machine B is idle during [0, 1], [22, 23], and [27, 28] (total Z_B = 3 min)',
      'Sequence 2 – 4 – 3 – 5 – 1; Makespan T = 28 min; Machine B is idle only during [0, 1] (total Z_B = 1 min)',
      'Sequence 2 – 4 – 5 – 3 – 1; Makespan T = 30 min; Machine B is idle during [0, 3] (total Z_B = 3 min)',
      'Sequence 1 – 5 – 3 – 4 – 2; Makespan T = 32 min; Machine B is idle for 5 min'
    ],
    correctIndex: 0,
    explanation:
      'Let us trace Final Practice Exercise B (Ch.1 Slides 55–56):\n1) Johnson’s rule:\n   • Min is 1 (Job 2 on A → pos 1): [2, _, _, _, _]\n   • Next is 2 (Job 1 on B → pos 5): [2, _, _, _, 1]\n   • Next is 3 (Job 4 on A → pos 2): [2, 4, _, _, 1]\n   • Next is 4 (Job 5 on B → pos 4): [2, 4, _, 5, 1]\n   • Remaining: Job 3 → pos 3: Sequence 2 – 4 – 3 – 5 – 1.\n2) Timetable & Idle Times on B:\n   • Job 2: A [0..1], B [1..7] → B is idle [0..1] (1 min)\n   • Job 4: A [1..4], B [7..15]\n   • Job 3: A [4..13], B [15..22]\n   • Job 5: A [13..23], so B must wait from 22 to 23! → B is idle [22..23] (1 min), then runs Job 5 [23..27]\n   • Job 1: A [23..28], so B must wait from 27 to 28! → B is idle [27..28] (1 min), then runs Job 1 [28..30].\nTotal makespan T = 30 min, and total idle time on B is 30 − 27 = 3 min split across three 1-minute gaps!',
    formulaUsed: 'Z_B = T - ∑ T_i(B) = 30 - 27 = 3 min',
    explanationVisual: {
      type: 'gantt_chart',
      title: 'Final Practice B — Gantt Chart for 2 – 4 – 3 – 5 – 1 (T = 30 min)',
      maxTime: 32,
      step: 2,
      makespan: 30,
      rows: [
        {
          machine: 'A',
          blocks: [
            { job: '2', start: 0, end: 1, color: '#059669' },
            { job: '4', start: 1, end: 4, color: '#2563EB' },
            { job: '3', start: 4, end: 13, color: '#EA580C' },
            { job: '5', start: 13, end: 23, color: '#D97706' },
            { job: '1', start: 23, end: 28, color: '#0F172A' },
            { job: 'Z', start: 28, end: 30, isIdle: true }
          ]
        },
        {
          machine: 'B',
          blocks: [
            { job: 'Z', start: 0, end: 1, isIdle: true },
            { job: '2', start: 1, end: 7, color: '#059669' },
            { job: '4', start: 7, end: 15, color: '#2563EB' },
            { job: '3', start: 15, end: 22, color: '#EA580C' },
            { job: 'Z', start: 22, end: 23, isIdle: true },
            { job: '5', start: 23, end: 27, color: '#D97706' },
            { job: 'Z', start: 27, end: 28, isIdle: true },
            { job: '1', start: 28, end: 30, color: '#0F172A' }
          ]
        }
      ]
    }
  }
];
