import { Question } from '../types/exam';

export const questionsCh2: Question[] = [
  {
    id: 29,
    category: 'ch2_project_scheduling',
    topicTag: 'Project Networks — MPM vs. PERT Architecture',
    difficulty: 'Hard',
    sourceRef: 'Ch.2 Slide 4 — Two Ways of Modelling a Project Network',
    prompt:
      'Compare the Potential Method (MPM, developed in France in 1958 by B. Roy) and the PERT Method (developed in the United States in 1958), both shown in the diagrams below. What is the structural difference between how activities and precedence constraints are represented in MPM versus PERT?',
    visual: {
      type: 'mpm_network',
      title: 'Potential Network (MPM) Building Blocks — Activity on Node',
      height: 170,
      nodes: [
        { id: 'Start', label: 'Start', x: 90, y: 85, isStartOrEnd: true, earliest: 0, latest: 0 },
        { id: 'A', label: 'A', x: 340, y: 85, isCritical: true, earliest: 0, latest: 0 },
        { id: 'B', label: 'B', x: 620, y: 85, isCritical: true, earliest: 4, latest: 4 },
        { id: 'End', label: 'End', x: 890, y: 85, isStartOrEnd: true, earliest: 7, latest: 7 }
      ],
      arcs: [
        { from: 'Start', to: 'A', duration: 0, isCritical: true },
        { from: 'A', to: 'B', duration: 4, isCritical: true },
        { from: 'B', to: 'End', duration: 3, isCritical: true }
      ]
    },
    options: [
      'In MPM, each Activity is a NODE and each Precedence is an ARC carrying the duration of the activity it leaves (never needing dummy arcs); in PERT, each Activity is an ARC and Events are nodes (often requiring dummy arcs)',
      'In MPM, each Activity is an ARC and Precedence is a node; in PERT, each Activity is a NODE and never requires dummy arcs',
      'MPM and PERT both represent activities as nodes, but MPM places durations on the incoming arc whereas PERT places durations on the outgoing arc',
      'MPM yields different earliest and latest start dates than PERT because MPM includes Start and End nodes of duration 1'
    ],
    correctIndex: 0,
    explanation:
      'As shown on Ch.2 Slides 4–5:\n• Potential Method (MPM — B. Roy, 1958): Activity = NODE (circle). Precedence = ARC (arrow i → j carrying the duration d_i of the activity i that it LEAVES). Because each activity is a node and arrows simply represent precedence dependencies, MPM is drawn systematically from the data table and NEVER needs dummy arcs.\n• PERT Method (USA, 1958): Activity = ARC. Events = nodes. When two activities share some—but not all—predecessors, PERT requires dashed dummy arcs (duration 0) to preserve precedence logic.\n• Both methods give the exact same earliest and latest dates!',
    formulaUsed: 'MPM: Node = Activity, Arc (i → j) carries d_i;  PERT: Arc = Activity, Node = Event.'
  },
  {
    id: 30,
    category: 'ch2_project_scheduling',
    topicTag: 'Potential Network — Topological Levels',
    difficulty: 'Hard',
    sourceRef: 'Ch.2 Slides 7–9 — Successors and Levels (New Building Example)',
    prompt:
      'To draw a Potential (MPM) network cleanly from left to right without backward arrows, we assign each activity to a topological column ("Level"). Consider the 11-activity New Building project from Chapter 2 (table below). Which activities belong to Level 4 and Level 5 respectively?',
    visual: {
      type: 'table',
      title: 'Example 1 — A New Building (Activities & Predecessors)',
      headers: ['Act.', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'],
      rows: [
        ['Duration (d)', 5, 4, 2, 2, 3, 5, 3, 3, 4, 10, 5],
        ['Predecessors', '—', '1', '2', '3', '4', '3', '3', '3', '6,7,8', '5,9', '10']
      ]
    },
    options: [
      'Level 4: {4, 6, 7, 8} (all four diverge directly from Activity 3 at Level 3); Level 5: {5, 9}',
      'Level 4: {4, 5, 6}; Level 5: {7, 8, 9}',
      'Level 4: {4, 6, 7, 8, 9}; Level 5: {5, 10}',
      'Level 4: {3, 4}; Level 5: {5, 6, 7, 8}'
    ],
    correctIndex: 0,
    explanation:
      'By the Level assignment rule (Ch.2 Slides 7 & 9):\n• Level 1 (no predecessor): {1}\n• Level 2 (predecessors in L1): {2}\n• Level 3 (predecessors in L2): {3}\n• Level 4 (predecessors in L3): Activities 4, 6, 7, and 8 all have Activity 3 as their sole predecessor → {4, 6, 7, 8} form column L4 (a 4-way divergence from node 3).\n• Level 5 (all predecessors in L4 or lower): Activity 5 follows 4 (L4), and Activity 9 follows 6, 7, 8 (all in L4) → {5, 9} form column L5.\n• Level 6: {10} (waits for 5 and 9). Level 7: {11}.',
    formulaUsed: 'Level(j) = 1 + max_{i ∈ Pred(j)} Level(i)'
  },
  {
    id: 31,
    category: 'ch2_project_scheduling',
    topicTag: 'Potential Network — Arc Values & Divergence',
    difficulty: 'Hard',
    sourceRef: 'Ch.2 Slide 10 — Drawing the Potential Network',
    prompt:
      'Examine the potential network of the New Building project below (Ch.2 Slide 10). Activity 3 (Load-bearing columns, duration d_3 = 2 days) is followed by four activities: 4 (d_4 = 2), 6 (d_6 = 5), 7 (d_7 = 3), and 8 (d_8 = 3). What values are written on the four arrows leaving Node 3 and pointing to Nodes 4, 6, 7, and 8?',
    visual: {
      type: 'mpm_network',
      title: 'Example 1 — Potential Network with Dates and Critical Path',
      height: 380,
      nodes: [
        { id: 'Start', label: 'Start', x: 55, y: 185, isStartOrEnd: true, earliest: 0, latest: 0 },
        { id: '1', label: '1', x: 145, y: 185, isCritical: true, earliest: 0, latest: 0 },
        { id: '2', label: '2', x: 240, y: 185, isCritical: true, earliest: 5, latest: 5 },
        { id: '3', label: '3', x: 335, y: 185, isCritical: true, earliest: 9, latest: 9 },
        { id: '4', label: '4', x: 455, y: 50, earliest: 11, latest: 15 },
        { id: '6', label: '6', x: 455, y: 140, isCritical: true, earliest: 11, latest: 11 },
        { id: '7', label: '7', x: 455, y: 230, earliest: 11, latest: 13 },
        { id: '8', label: '8', x: 455, y: 320, earliest: 11, latest: 13 },
        { id: '5', label: '5', x: 590, y: 50, earliest: 13, latest: 17 },
        { id: '9', label: '9', x: 590, y: 185, isCritical: true, earliest: 16, latest: 16 },
        { id: '10', label: '10', x: 720, y: 185, isCritical: true, earliest: 20, latest: 20 },
        { id: '11', label: '11', x: 835, y: 185, isCritical: true, earliest: 30, latest: 30 },
        { id: 'End', label: 'End', x: 940, y: 185, isStartOrEnd: true, earliest: 35, latest: 35 }
      ],
      arcs: [
        { from: 'Start', to: '1', duration: 0, isCritical: true },
        { from: '1', to: '2', duration: 5, isCritical: true },
        { from: '2', to: '3', duration: 4, isCritical: true },
        { from: '3', to: '4', duration: 2 },
        { from: '3', to: '6', duration: 2, isCritical: true },
        { from: '3', to: '7', duration: 2 },
        { from: '3', to: '8', duration: 2 },
        { from: '4', to: '5', duration: 2 },
        { from: '6', to: '9', duration: 5, isCritical: true },
        { from: '7', to: '9', duration: 3 },
        { from: '8', to: '9', duration: 3 },
        { from: '5', to: '10', duration: 3 },
        { from: '9', to: '10', duration: 4, isCritical: true },
        { from: '10', to: '11', duration: 10, isCritical: true },
        { from: '11', to: 'End', duration: 5, isCritical: true }
      ]
    },
    options: [
      'All four arrows leaving Node 3 carry the exact same value d_3 = 2 (because in MPM, every arc carries the duration of the activity it leaves)',
      'The four arrows carry 2, 5, 3, and 3 respectively (the durations of the destination activities 4, 6, 7, and 8)',
      'The four arrows carry 0.5 each so that the sum of outgoing arcs equals d_3 = 2',
      'Only the critical arrow 3 → 6 carries d_3 = 2, while the non-critical arrows carry 0'
    ],
    correctIndex: 0,
    explanation:
      'As emphasized on Ch.2 Slide 5 and Slide 10 ("Each arc carries the duration of the activity it leaves: the 4 arcs leaving 3 all carry d_3 = 2"): An arc i → j means activity j cannot start until activity i has finished its duration d_i. Therefore, every outgoing arrow from node i carries d_i.',
    formulaUsed: 'Arc Value(i → j) = d_i  for all successors j of i.'
  },
  {
    id: 32,
    category: 'ch2_project_scheduling',
    topicTag: 'Forward Pass & Backward Pass — Convergence vs. Divergence',
    difficulty: 'Very Hard',
    sourceRef: 'Ch.2 Slides 11–17 — Forward Pass, Backward Pass & Floats (Example 1)',
    prompt:
      'In the New Building project network (shown in Question 31 above), why do we take the MAXIMUM at Node 9 during the forward pass (t_9 = max(t_6+d_6, t_7+d_7, t_8+d_8) = 16), whereas we take the MINIMUM at Node 3 during the backward pass (t*_3 = min(t*_4, t*_6, t*_7, t*_8) − d_3 = 9)?',
    options: [
      'At a convergence (Node 9), Activity 9 must wait for the LAST of its predecessors (6, 7, 8) to finish; at a divergence (Node 3), Activity 3 must finish early enough not to delay the EARLIEST latest-start among all its successors (4, 6, 7, 8)',
      'Because the forward pass maximizes total float while the backward pass minimizes total float',
      'At a convergence, we take the maximum to account for pessimistic PERT durations; at a divergence, we take the minimum for optimistic durations',
      'Because Node 9 is critical (requiring max) whereas Node 3 is non-critical (requiring min)'
    ],
    correctIndex: 0,
    explanation:
      'From Ch.2 Slides 11–14:\n• Forward Pass (Convergence at Node 9): Activity 9 requires 6, 7, AND 8 to be completed before it can start. Since 6 finishes at 11+5=16, 7 finishes at 11+3=14, and 8 finishes at 11+3=14, Activity 9 must wait for the slowest predecessor (Activity 6 at day 16): t_9 = max(16, 14, 14) = 16.\n• Backward Pass (Divergence at Node 3): Activity 3 precedes 4 (t*_4 = 15), 6 (t*_6 = 11), 7 (t*_7 = 13), and 8 (t*_8 = 13). For NONE of those four successors to miss their latest start date, Activity 3 must finish by min(15, 11, 13, 13) = 11, meaning it must start at latest by t*_3 = 11 − d_3 = 11 − 2 = 9.',
    formulaUsed: 'Forward: t_j = max_{i ∈ Pred(j)} (t_i + d_i);  Backward: t*_i = min_{j ∈ Succ(i)} (t*_j) - d_i'
  },
  {
    id: 33,
    category: 'ch2_project_scheduling',
    topicTag: 'Floats & Delay Impact Analysis',
    difficulty: 'Exam Trap',
    sourceRef: 'Ch.2 Slides 15–17 — Total Float in Example 1',
    prompt:
      'In the New Building project (duration 35 days, critical path 1–2–3–6–9–10–11), Activity 4 (Roof framework, d_4 = 2) has earliest start t_4 = 11 and latest start t*_4 = 15 (Total Float m_4 = 4 days), and Activity 5 (Roofing, d_5 = 3) has t_5 = 13 and t*_5 = 17 (Total Float m_5 = 4 days). Suppose Activity 4 is delayed by 3 days AND Activity 5’s duration increases by 3 days (from 3 to 6 days). What is the new minimum completion time of the building project?',
    options: [
      '37 days (Because Activities 4 and 5 are in series on the same non-critical branch 3 → 4 → 5 → 10, they SHARE the 4-day branch float; a combined delay of 3 + 3 = 6 days exceeds the 4-day float by 2 days, pushing t_10 from 20 to 22 and t_End from 35 to 37)',
      '35 days (Because Activity 4 has m_4 = 4 days ≥ 3 and Activity 5 independently has m_5 = 4 days ≥ 3, so neither exceeds its individual float)',
      '41 days (Because both delays add directly to the 35-day critical path: 35 + 3 + 3 = 41 days)',
      '38 days (Because only Activity 5’s duration increase affects the critical path)'
    ],
    correctIndex: 0,
    explanation:
      'CLASSIC EXAM TRAP on shared Total Float along a non-critical chain!\n• Normally, t_4 = 11, d_4 = 2 → t_5 = 13, d_5 = 3 → branch 4→5 finishes at 13 + 3 = 16, which is 4 days before Activity 10’s earliest start t_10 = 20. That 4-day slack is SHARED by the entire chain (4 → 5).\n• If Activity 4 is delayed by 3 days, it starts at 11 + 3 = 14 and finishes at 14 + 2 = 16.\n• Activity 5 now starts at day 16, and with its new duration of 3 + 3 = 6 days, Activity 5 finishes at 16 + 6 = 22!\n• Consequently, at convergence Node 10: t_10 = max(16 + 6, 16 + 4) = max(22, 20) = 22 (delayed by 2 days!).\n• Then t_11 = 22 + 10 = 32, and t_End = 32 + 5 = 37 days!',
    formulaUsed: 'Total float along a serial sub-path is shared, not independent!'
  },
  {
    id: 34,
    category: 'ch2_project_scheduling',
    topicTag: 'Potential Network — Multiple Critical Paths (Exercise 1)',
    difficulty: 'Very Hard',
    sourceRef: 'Ch.2 Slides 18–22 — Exercise 1 (Eight Activities)',
    prompt:
      'Consider the 8-activity project from Chapter 2 Exercise 1 (network and dates shown below). After performing the forward and backward passes, which activities are critical, how many critical paths exist, and what is the total float of Activity C?',
    visual: {
      type: 'mpm_network',
      title: 'Chapter 2 Exercise 1 — Potential Network with Dates',
      height: 295,
      nodes: [
        { id: 'Start', label: 'Start', x: 65, y: 155, isStartOrEnd: true, earliest: 0, latest: 0 },
        { id: 'A', label: 'A', x: 220, y: 50, earliest: 0, latest: 4 },
        { id: 'B', label: 'B', x: 220, y: 220, isCritical: true, earliest: 0, latest: 0 },
        { id: 'C', label: 'C', x: 390, y: 50, earliest: 4, latest: 8 },
        { id: 'D', label: 'D', x: 390, y: 145, isCritical: true, earliest: 6, latest: 6 },
        { id: 'E', label: 'E', x: 390, y: 240, isCritical: true, earliest: 6, latest: 6 },
        { id: 'F', label: 'F', x: 560, y: 145, isCritical: true, earliest: 11, latest: 11 },
        { id: 'G', label: 'G', x: 560, y: 240, isCritical: true, earliest: 10, latest: 10 },
        { id: 'H', label: 'H', x: 730, y: 145, isCritical: true, earliest: 13, latest: 13 },
        { id: 'End', label: 'End', x: 890, y: 145, isStartOrEnd: true, earliest: 17, latest: 17 }
      ],
      arcs: [
        { from: 'Start', to: 'A', duration: 0 },
        { from: 'Start', to: 'B', duration: 0, isCritical: true },
        { from: 'A', to: 'C', duration: 4 },
        { from: 'B', to: 'D', duration: 6, isCritical: true },
        { from: 'B', to: 'E', duration: 6, isCritical: true },
        { from: 'C', to: 'F', duration: 3 },
        { from: 'D', to: 'F', duration: 5, isCritical: true },
        { from: 'E', to: 'G', duration: 4, isCritical: true },
        { from: 'F', to: 'H', duration: 2, isCritical: true },
        { from: 'G', to: 'H', duration: 3, isCritical: true },
        { from: 'H', to: 'End', duration: 4, isCritical: true }
      ]
    },
    options: [
      'Six critical activities (B, D, E, F, G, H) forming TWO parallel critical paths (B–D–F–H = 17 weeks and B–E–G–H = 17 weeks); Total Float of C is m_C = 8 − 4 = 4 weeks',
      'Four critical activities (B, D, F, H) forming ONE critical path of 17 weeks; Total Float of C is m_C = 2 weeks',
      'Four critical activities (B, E, G, H) forming ONE critical path of 17 weeks; Total Float of C is m_C = 4 weeks',
      'All eight activities are critical with float 0 because every path reaches H'
    ],
    correctIndex: 0,
    explanation:
      'From Ch.2 Slides 19–22:\n• At Node H, the two incoming branches are F (t_F + d_F = 11 + 2 = 13) and G (t_G + d_G = 10 + 3 = 13). Both tie at 13 weeks!\n• Consequently, working backward from t*_H = 13 gives t*_F = 13 − 2 = 11 (so m_F = 0) and t*_G = 13 − 3 = 10 (so m_G = 0).\n• This creates TWO parallel critical paths of 17 weeks:\n  1) Start – B – D – F – H – End (6 + 5 + 2 + 4 = 17 weeks)\n  2) Start – B – E – G – H – End (6 + 4 + 3 + 4 = 17 weeks)\n• Only A and C are non-critical: t_C = 4, t*_C = t*_F − d_C = 11 − 3 = 8 → Total Float m_C = 8 − 4 = 4 weeks.',
    formulaUsed: 'm_i = t*_i - t_i;  Critical if and only if m_i = 0.'
  },
  {
    id: 35,
    category: 'ch2_project_scheduling',
    topicTag: 'PERT Network — Dummy Arcs Logic',
    difficulty: 'Very Hard',
    sourceRef: 'Ch.2 Slide 4 & TBS Fall 2022 Midterm Exam Q2 — PERT Dummy Arcs',
    prompt:
      'In a PERT (Activity-on-Arc) network, why is a dashed "dummy arc" (with duration 0 and cost 0) required when Activity F depends only on Activity A, whereas Activity G depends on BOTH Activity A and Activity B?',
    options: [
      'Because in Activity-on-Arc, if A and B both terminated directly into the same event node, then F would falsely depend on B as well; a dummy arc from A’s end-event to B’s end-event transfers A’s completion constraint to G without contaminating F',
      'Because PERT does not allow any node to have more than two incoming arrows',
      'Because dummy arcs represent buffer time (float) between critical and non-critical activities',
      'Because in PERT, activities cannot have different durations if they share the same start node'
    ],
    correctIndex: 0,
    explanation:
      'In PERT (Activity-on-Arc, Ch.2 Slide 4 & Fall 2022 Midterm Q2), nodes represent events (points in time when all incoming activities are completed). If Activity A ends at Event 2 (where F starts) and Activity B ends at Event 3 (where G starts), adding a directed dummy arc (2 → 3) of duration 0 means Event 3 waits for BOTH Activity B and Event 2 (Activity A), while Event 2 (and thus Activity F) only waits for Activity A!',
    formulaUsed: 'PERT Dummy Arc (duration = 0): enforces asymmetric precedence without false dependencies.'
  },
  {
    id: 36,
    category: 'ch2_project_scheduling',
    topicTag: 'Probabilistic Network — Three-Point Estimates (PERT Beta Distribution)',
    difficulty: 'Hard',
    sourceRef: 'Ch.2 Slide 23 — Estimated Mean Duration and Variance',
    prompt:
      'In a probabilistic project network, an activity has an optimistic duration a = 4 weeks, a most likely duration m = 7 weeks, and a pessimistic duration b = 16 weeks. What are its estimated mean duration t_i and estimated variance v_i?',
    options: [
      'Mean t_i = 8.0 weeks; Variance v_i = 4.0 weeks²',
      'Mean t_i = 9.0 weeks; Variance v_i = 2.0 weeks²',
      'Mean t_i = 8.0 weeks; Variance v_i = 2.0 weeks²',
      'Mean t_i = 7.5 weeks; Variance v_i = 4.0 weeks²'
    ],
    correctIndex: 0,
    explanation:
      'Using the standard 3-point Beta distribution formulas from Ch.2 Slide 23:\n• Estimated Mean Duration: t_i = (a_i + 4·m_i + b_i) / 6 = (4 + 4×7 + 16) / 6 = (4 + 28 + 16) / 6 = 48 / 6 = 8.0 weeks.\n• Estimated Variance: v_i = [(b_i − a_i) / 6]² = [(16 − 4) / 6]² = (12 / 6)² = 2² = 4.0 weeks².\n(Watch out for the common exam trap of forgetting to square (b − a)/6, which gives standard deviation 2.0 instead of variance 4.0!).',
    formulaUsed: 't_i = (a_i + 4m_i + b_i) / 6;   v_i = [(b_i - a_i) / 6]^2'
  },
  {
    id: 37,
    category: 'ch2_project_scheduling',
    topicTag: 'Probabilistic Network — Skewed Estimates & Variance Independence',
    difficulty: 'Very Hard',
    sourceRef: 'Ch.2 Slide 33 — Means and Variances (Campus Mobile App)',
    prompt:
      'In Example 3 of Chapter 2 (A Campus Mobile App, Slide 33), consider Activities B, C, and D with three-point estimates (a, m, b) given below. Which statement accurately describes their mean durations and variances?',
    visual: {
      type: 'table',
      title: 'Campus Mobile App — Activities B, C, and D (weeks)',
      headers: ['Activity', 'Optimistic (a)', 'Most Likely (m)', 'Pessimistic (b)'],
      rows: [
        ['B (UI Design)', 3, 5, 9],
        ['C (Back-end Dev)', 5, 8, 11],
        ['D (Front-end Dev)', 4, 6, 10]
      ]
    },
    options: [
      'They have different mean durations (t_B = 5.33, t_C = 8.00, t_D = 6.33), but all three have the exact same variance v_B = v_C = v_D = 1.000 because (b − a) = 6 weeks for all three',
      'They have the same mean duration (6.56 weeks), but different variances because their most likely values m differ',
      'Activity C has the largest variance because its pessimistic time b = 11 is the largest',
      'Activities B and D have variance 0.444 whereas C has variance 1.000'
    ],
    correctIndex: 0,
    explanation:
      'As highlighted on Ch.2 Slide 33:\n• Means: t_B = (3 + 20 + 9)/6 = 32/6 ≈ 5.33; t_C = (5 + 32 + 11)/6 = 48/6 = 8.00; t_D = (4 + 24 + 10)/6 = 38/6 ≈ 6.33.\n• Variances: Because v_i = [(b_i − a_i) / 6]² depends ONLY on the range (b_i − a_i) and NOT on m_i:\n  - v_B = [(9 − 3)/6]² = (6/6)² = 1.000\n  - v_C = [(11 − 5)/6]² = (6/6)² = 1.000\n  - v_D = [(10 − 4)/6]² = (6/6)² = 1.000.',
    formulaUsed: 'v_i = [(b_i - a_i) / 6]^2 depends strictly on the spread (b_i - a_i).'
  },
  {
    id: 38,
    category: 'ch2_project_scheduling',
    topicTag: 'Probabilistic Network — Keeping Fractions in Sixths (Example 2)',
    difficulty: 'Very Hard',
    sourceRef: 'Ch.2 Slides 25–30 — Probabilistic Network Example 2',
    prompt:
      'In Example 2 of Chapter 2 (8 activities A to H, network and table below), why does Dr. Marrakchi keep all mean durations in sixths of a week (46/6, 24/6, 43/6, etc.) during the forward and backward passes, and what are the resulting project mean µ and project standard deviation σ?',
    visual: {
      type: 'table',
      title: 'Example 2 — Probabilistic Network Data & Calculated Sixths',
      headers: ['Act.', 'Predecessors', 'a', 'm', 'b', 'Mean ti (/6)', 'Variance vi (/36)'],
      rows: [
        ['A', '—', 4, 8, 10, '46/6 (7.67)', '36/36 (1.000)'],
        ['B', '—', 2, 4, 6, '24/6 (4.00)', '16/36 (0.444)'],
        ['C', '—', 4, 7, 11, '43/6 (7.17)', '49/36 (1.361)'],
        ['D', 'A', 2, 3, 5, '19/6 (3.17)', '9/36 (0.250)'],
        ['E', 'B', 6, 8, 11, '49/6 (8.17)', '25/36 (0.694)'],
        ['F', 'C', 1, 2, 3, '12/6 (2.00)', '4/36 (0.111)'],
        ['G', 'D, E', 1, 3, 4, '17/6 (2.83)', '9/36 (0.250)'],
        ['H', 'F', 4, 5, 7, '31/6 (5.17)', '9/36 (0.250)']
      ]
    },
    options: [
      'Critical path is B – E – G with exact mean µ = (24 + 49 + 17)/6 = 90/6 = 15 weeks, project variance σ² = (16 + 25 + 9)/36 = 50/36 ≈ 1.389, and σ = √1.389 ≈ 1.18 weeks',
      'Critical path is A – D – G with mean µ = (46 + 19 + 17)/6 = 82/6 = 13.67 weeks and σ = 1.22 weeks',
      'Critical path is C – F – H with mean µ = (43 + 12 + 31)/6 = 86/6 = 14.33 weeks and σ = 1.31 weeks',
      'Critical path is B – E – G with mean µ = 15 weeks, and project variance sums ALL 8 activities: σ² = 157/36 = 4.361 → σ = 2.09 weeks'
    ],
    correctIndex: 0,
    explanation:
      'Let us check the three paths from Start to End in sixths (Ch.2 Slides 28–30):\n• Path 1 (A – D – G): (46 + 19 + 17)/6 = 82/6 ≈ 13.67 weeks\n• Path 2 (B – E – G): (24 + 49 + 17)/6 = 90/6 = 15.00 weeks (CRITICAL PATH!)\n• Path 3 (C – F – H): (43 + 12 + 31)/6 = 86/6 ≈ 14.33 weeks\nNotice how keeping sixths avoids rounding errors (since 4.00 + 8.17 + 2.83 = 15.00 exactly from 90/6).\nFor project variance σ², we sum the variances of the CRITICAL activities ONLY (B, E, and G):\nσ² = v_B + v_E + v_G = 16/36 + 25/36 + 9/36 = 50/36 ≈ 1.389 → σ = √1.389 ≈ 1.18 weeks.',
    formulaUsed: 'µ = ∑_{i ∈ CP} t_i = 90/6 = 15;   σ = √(∑_{i ∈ CP} v_i) = √(50/36) ≈ 1.18'
  },
  {
    id: 39,
    category: 'ch2_project_scheduling',
    topicTag: 'Probabilistic Network — Normal Law & Negative z-Score',
    difficulty: 'Very Hard',
    sourceRef: 'Ch.2 Slides 24 & 31 — Probability of Completion (Example 2)',
    prompt:
      'In Example 2 of Chapter 2, the project duration X follows a normal distribution N(µ = 15 weeks, σ = 1.18 weeks). Using the standard normal table values below, what is the probability P(X ≤ 12) that the project finishes within 12 weeks, and what duration x corresponds to a 90% probability of completion?',
    visual: {
      type: 'table',
      title: 'Standard Normal Distribution Table Φ(z) Extract (Ch.2 Slide 24)',
      headers: ['z', '0.61', '1.00', '1.22', '1.28', '1.645', '1.66', '1.70', '2.00', '2.55'],
      rows: [['Φ(z)', '0.7291', '0.8413', '0.8888', '0.8997', '0.9500', '0.9515', '0.9554', '0.9772', '0.9946']]
    },
    options: [
      'P(X ≤ 12) = 0.54% (≈ 0.5%, via z = −2.55 and Φ(−2.55) = 1 − 0.9946 = 0.0054); 90% confidence duration x = 15 + 1.28 × 1.18 = 16.51 ≈ 16.5 weeks',
      'P(X ≤ 12) = 99.46% (via z = +2.55); 90% confidence duration x = 15 + 1.645 × 1.18 = 16.94 weeks',
      'P(X ≤ 12) = 4.46% (via z = −1.70); 90% confidence duration x = 15 − 1.28 × 1.18 = 13.49 weeks',
      'P(X ≤ 12) = 0.54%; 90% confidence duration x = 15 + 0.8997 × 1.18 = 16.06 weeks'
    ],
    correctIndex: 0,
    explanation:
      'From Ch.2 Slide 31:\n1) Probability to finish within 12 weeks:\n   • z = (x − µ) / σ = (12 − 15) / 1.18 = −3 / 1.18 = −2.542 ≈ −2.55.\n   • Using the symmetry identity Φ(−z) = 1 − Φ(z): P(X ≤ 12) = Φ(−2.55) = 1 − Φ(2.55) = 1 − 0.9946 = 0.0054 = 0.54% (≈ 0.5%).\n2) Duration for 90% probability (P(X ≤ x) = 0.90):\n   • From the table, Φ(z) = 0.8997 ≈ 0.90 corresponds to z = 1.28 (do NOT plug 0.8997 in as z!).\n   • x = µ + z · σ = 15 + 1.28 × 1.18 = 15 + 1.5104 = 16.51 ≈ 16.5 weeks.',
    formulaUsed: 'Φ(-z) = 1 - Φ(z);   x_p = µ + z_p · σ'
  },
  {
    id: 40,
    category: 'ch2_project_scheduling',
    topicTag: 'Probabilistic Network — Campus Mobile App Launch Decision',
    difficulty: 'Very Hard',
    sourceRef: 'Ch.2 Slides 32–37 — Example 3 (Campus Mobile App)',
    prompt:
      'In the Campus Mobile App project (Ch.2 Slides 32–37, network below), the critical path A – B – D – E – F has mean duration µ = 20 weeks and variance σ² = (4 + 36 + 36 + 16 + 4)/36 = 96/36 = 2.667 (so σ = 1.633 weeks). The student start-up wants to announce a public launch deadline with 95% confidence. What is the probability of finishing within 19 weeks, why shouldn’t they announce week 20, and what deadline should they announce?',
    visual: {
      type: 'mpm_network',
      title: 'Example 3 — Campus Mobile App Network (Mean Durations in Weeks)',
      height: 220,
      nodes: [
        { id: 'Start', label: 'Start', x: 65, y: 115, isStartOrEnd: true, earliest: 0, latest: 0 },
        { id: 'A', label: 'A', x: 185, y: 115, isCritical: true, earliest: 0, latest: 0 },
        { id: 'B', label: 'B', x: 330, y: 55, isCritical: true, earliest: 3, latest: 3 },
        { id: 'C', label: 'C', x: 410, y: 175, earliest: 3, latest: 6.67 },
        { id: 'D', label: 'D', x: 495, y: 55, isCritical: true, earliest: 8.33, latest: 8.33 },
        { id: 'E', label: 'E', x: 650, y: 115, isCritical: true, earliest: 14.67, latest: 14.67 },
        { id: 'F', label: 'F', x: 785, y: 115, isCritical: true, earliest: 18, latest: 18 },
        { id: 'End', label: 'End', x: 915, y: 115, isStartOrEnd: true, earliest: 20, latest: 20 }
      ],
      arcs: [
        { from: 'Start', to: 'A', duration: 0, isCritical: true },
        { from: 'A', to: 'B', duration: 3, isCritical: true },
        { from: 'A', to: 'C', duration: 3 },
        { from: 'B', to: 'D', duration: 5.33, isCritical: true },
        { from: 'D', to: 'E', duration: 6.33, isCritical: true },
        { from: 'C', to: 'E', duration: 8 },
        { from: 'E', to: 'F', duration: 3.33, isCritical: true },
        { from: 'F', to: 'End', duration: 2, isCritical: true }
      ]
    },
    options: [
      'P(X ≤ 19) = 27.1% (z = −0.61); at week 20 the probability is only 50% (z = 0, one chance in two); for 95% confidence (z = 1.645), x = 20 + 1.645 × 1.633 = 22.69 ≈ 22.7 weeks (announce Week 23)',
      'P(X ≤ 19) = 72.91%; at week 20 the probability is 84.13%; for 95% confidence, announce Week 21',
      'P(X ≤ 19) = 27.1%; at week 20 the probability is 90%; for 95% confidence, announce Week 25',
      'P(X ≤ 19) = 11.1%; at week 20 the probability is 50%; for 95% confidence, x = 20 + 1.645 × 2.667 = 24.39 weeks'
    ],
    correctIndex: 0,
    explanation:
      'From Ch.2 Slide 37 ("Choosing a launch date"):\n• Within 19 weeks: z = (19 − 20) / 1.633 = −0.61 → Φ(−0.61) = 1 − Φ(0.61) = 1 − 0.7291 = 0.2709 = 27.1%.\n• Why not announce the mean duration µ = 20 weeks? Because for any symmetric normal distribution N(µ, σ), P(X ≤ µ) = Φ(0) = 0.50 (50% — only one chance in two of being ready on time!).\n• Deadline at 95% confidence: Φ(z) = 0.95 → z = 1.645. Thus x = µ + z · σ = 20 + 1.645 × 1.633 = 22.686 ≈ 22.7 weeks → Decision: announce Week 23.',
    formulaUsed: 'P(X ≤ µ) = Φ(0) = 50%;   x_{0.95} = µ + 1.645 σ = 22.7 weeks'
  },
  {
    id: 41,
    category: 'ch2_project_scheduling',
    topicTag: 'Probabilistic Network — Methodological Limits & Multiple Critical Paths',
    difficulty: 'Exam Trap',
    sourceRef: 'Ch.2 Slides 31 & 40 — Limits of the Probabilistic Network Method',
    prompt:
      'In Exercise 2 of Chapter 2 (Slides 38–40), we computed a 95.2% probability of finishing within 19 weeks along the critical path B–D–F–H (µ = 17 weeks, σ = 1.20 weeks). However, recall from Exercise 1 that this project has a SECOND parallel critical path B–E–G–H of the same 17-week mean duration. If E and G are also random variables, how does the true probability of completing the entire project within 19 weeks compare to 95.2%?',
    options: [
      'The true probability of finishing within 19 weeks is LOWER than 95.2% (i.e. the real risk of delay is higher), because the project finishes within 19 weeks only if BOTH critical paths finish within 19 weeks',
      'The true probability is HIGHER than 95.2%, because having two critical paths provides backup redundancy',
      'The true probability is exactly 95.2%, because parallel paths always have correlation +1',
      'We simply add the variances of both critical paths together (σ²_total = σ²_path1 + σ²_path2) and recompute z'
    ],
    correctIndex: 0,
    explanation:
      'As explicitly noted in the caution box on Ch.2 Slide 31 and Slide 40:\n• Slide 31: "Limits: the normal law needs enough activities (central limit theorem), and only ONE critical path is analysed — a near-critical path can also delay the project."\n• Slide 40: "Caution: Exercise 1 has a SECOND critical path (B–E–G–H). If E and G were also uncertain, the real risk would be higher than computed here."\nMathematically, since Project Duration = max(Path 1, Path 2), P(max(Path 1, Path 2) ≤ 19) ≤ P(Path 1 ≤ 19) = 95.2%, meaning the true completion probability is strictly smaller and the delay risk is higher!',
    formulaUsed: 'P(max(T_1, T_2) ≤ x) < P(T_1 ≤ x)  →  True delay risk is higher.'
  },
  {
    id: 42,
    category: 'ch2_project_scheduling',
    topicTag: 'Cost Minimisation — Direct vs. Indirect Costs & Crash Slope',
    difficulty: 'Hard',
    sourceRef: 'Ch.2 Slide 41 — The Economic Dimension of a Project',
    prompt:
      'In project cost minimisation (project crashing), how do direct costs and indirect costs behave when the project duration is shortened, and what is the formula for the daily reduction cost (crash slope k_i) of an activity?',
    options: [
      'Direct costs INCREASE as activities are shortened (extra staff, overtime, equipment), whereas indirect costs DECREASE as project duration shrinks (less supervision, site rent, overheads); k_i = (Crash Cost − Normal Cost) / (Normal Duration − Crash Duration)',
      'Both direct costs and indirect costs decrease as the project is shortened; k_i = (Normal Cost − Crash Cost) / (Normal Duration − Crash Duration)',
      'Direct costs decrease while indirect costs increase as the project is shortened; k_i = Crash Cost / Crash Duration',
      'Direct costs remain constant for all durations, while indirect costs increase linearly; k_i = (Crash Cost − Normal Cost) / Crash Duration'
    ],
    correctIndex: 0,
    explanation:
      'From Ch.2 Slide 41 ("The economic dimension of a project"):\n• Direct costs: Shortening an activity requires additional resources (extra staff, overtime, faster machines), so direct cost INCREASES as duration decreases.\n• Indirect costs: Supervision, site rent, administration, and overheads are proportional to total project duration, so indirect cost DECREASES as the project is shortened.\n• Reduction cost per day/week (slope): k_i = (Crash Cost − Normal Cost) / (Normal Duration − Crash Duration). Note that once an activity reaches its crash duration, it has reached its "crash point" and cannot be shortened any further.',
    formulaUsed: 'k_i = (C_{crash,i} - C_{normal,i}) / (d_{normal,i} - d_{crash,i})'
  },
  {
    id: 43,
    category: 'ch2_project_scheduling',
    topicTag: 'Cost Minimisation — Why Non-Critical Crashing Fails',
    difficulty: 'Exam Trap',
    sourceRef: 'Ch.2 Slides 43–45 — Crashing Example 4 (Initial Situation & Rules)',
    prompt:
      'Consider Example 4 from Chapter 2 (network and table below), where Indirect Cost = 1,000 TND/day. Initially, path C–D–E–F is critical (5 + 4 + 9 + 2 = 20 days, float 0) and path A–B–F is non-critical (6 + 10 + 2 = 18 days, float 2). What happens if a manager decides to spend 500 TND to shorten Activity B from 10 days to 9 days as the first step?',
    visual: {
      type: 'mpm_network',
      title: 'Example 4 — Initial Network (Normal Duration = 20 Days)',
      height: 220,
      nodes: [
        { id: 'Start', label: 'Start', x: 65, y: 115, isStartOrEnd: true, earliest: 0, latest: 0 },
        { id: 'A', label: 'A', x: 220, y: 55, earliest: 0, latest: 2 },
        { id: 'B', label: 'B', x: 430, y: 55, earliest: 6, latest: 8 },
        { id: 'C', label: 'C', x: 220, y: 175, isCritical: true, earliest: 0, latest: 0 },
        { id: 'D', label: 'D', x: 390, y: 175, isCritical: true, earliest: 5, latest: 5 },
        { id: 'E', label: 'E', x: 560, y: 175, isCritical: true, earliest: 9, latest: 9 },
        { id: 'F', label: 'F', x: 735, y: 115, isCritical: true, earliest: 18, latest: 18 },
        { id: 'End', label: 'End', x: 900, y: 115, isStartOrEnd: true, earliest: 20, latest: 20 }
      ],
      arcs: [
        { from: 'Start', to: 'A', duration: 0 },
        { from: 'Start', to: 'C', duration: 0, isCritical: true },
        { from: 'A', to: 'B', duration: 6 },
        { from: 'B', to: 'F', duration: 10 },
        { from: 'C', to: 'D', duration: 5, isCritical: true },
        { from: 'D', to: 'E', duration: 4, isCritical: true },
        { from: 'E', to: 'F', duration: 9, isCritical: true },
        { from: 'F', to: 'End', duration: 2, isCritical: true }
      ]
    },
    options: [
      '500 TND is wasted for 0 days gained on the project: path A–B–F shrinks from 18 to 17 days (increasing B’s float from 2 to 3 days), while critical path C–D–E–F still takes 20 days',
      'The project duration drops from 20 days to 19 days, saving 1,000 − 500 = 500 TND',
      'The average path duration drops from 19 days to 18.5 days, saving 500 TND in indirect costs',
      'Activity B becomes critical and forces Activity E to shrink automatically'
    ],
    correctIndex: 0,
    explanation:
      'As demonstrated on Ch.2 Slide 45 ("Wrong choice: reduce B (non-critical)"):\n• Shortening B (10 → 9 days) costs +500 TND in extra direct cost.\n• Path A–B–F drops from 18 to 17 days, so the float of A and B increases from 2 days to 3 days.\n• However, the critical path C–D–E–F still lasts 20 days, so the project still finishes at Day 20! Zero indirect cost is saved, and total project cost increases by +500 TND. Rule 1 of project crashing: NEVER reduce a non-critical activity!',
    formulaUsed: 'Reducing a non-critical activity only increases its float (ΔT_project = 0).'
  },
  {
    id: 44,
    category: 'ch2_project_scheduling',
    topicTag: 'Cost Minimisation — Step Size Limit & Parallel Critical Paths',
    difficulty: 'Very Hard',
    sourceRef: 'Ch.2 Slides 46–47 — Crashing Example 4 (Reductions 1 and 2)',
    prompt:
      'In Example 4 (table below, Indirect Cost = 1,000 TND/day), Reduction 1 crashes Activity C by 1 day (costing 300 TND), bringing C–D–E–F down to 19 days and reducing the float of non-critical path A–B–F (18 days) to 1 day. For Reduction 2, the cheapest remaining critical activity is E (cost 600 TND/day, max possible reduction = 2 days). Why do we reduce E by ONLY 1 day in Reduction 2 instead of all 2 days at once?',
    visual: {
      type: 'table',
      title: 'Example 4 — Crashing Data (Indirect Cost = 1,000 TND/day)',
      headers: ['Act.', 'Pred.', 'Normal (d)', 'Crash (d)', 'Max Reduction', 'Crash Cost (TND/day)'],
      rows: [
        ['A', '—', 6, 6, 0, '—'],
        ['B', 'A', 10, 8, 2, 500],
        ['C', '—', 5, 4, 1, 300],
        ['D', 'C', 4, 1, 3, 700],
        ['E', 'D', 9, 7, 2, 600],
        ['F', 'B, E', 2, 1, 1, 800]
      ]
    },
    options: [
      'Because the nearest non-critical path A–B–F has a float of only 1 day (19 − 18 = 1); after reducing E by 1 day (to 18 days), A–B–F also becomes critical, so reducing E a second day alone would not shorten the project',
      'Because reducing E by 2 days would cost 1,200 TND, which exceeds the 1,000 TND/day indirect cost rate',
      'Because Activity E reaches its technical crash point after a 1-day reduction',
      'Because Activity F must always be crashed before the second day of Activity E'
    ],
    correctIndex: 0,
    explanation:
      'By Rule 3 of Project Crashing (Ch.2 Slides 42, 45, 47): "Reduce it by as many days as possible, but NEVER more than the float of the nearest non-critical path." After Reduction 1 (C reduced by 1 day), C–D–E–F = 19 days and A–B–F = 18 days (float = 1 day). Even though E can technically be shortened by 2 days (from 9 to 7), after reducing E by 1 day (9 → 8), C–D–E–F = 18 days AND A–B–F = 18 days! Both paths are now critical (float = 0 everywhere). Reducing E a second day alone would leave A–B–F at 18 days!',
    formulaUsed: 'Step Reduction Δd ≤ min(MaxRemainingCrash_i, Float_{nearest non-critical path})'
  },
  {
    id: 45,
    category: 'ch2_project_scheduling',
    topicTag: 'Cost Minimisation — Economic & Technical Stop Rules',
    difficulty: 'Very Hard',
    sourceRef: 'Ch.2 Slides 48–50 — Crashing Example 4 (Reduction 3, Stop Rules & Optimum)',
    prompt:
      'In Example 4 (Indirect Cost = 1,000 TND/day), at T = 18 days both paths C–D–E–F (18d) and A–B–F (18d) are critical. Look at the Total Cost curve below. Why is T = 17 days (Total Cost = 18,700 TND) the economic optimum, and what would be the minimum possible technical duration if we ignored cost and crashed until a critical path hit its crash point?',
    visual: {
      type: 'cost_curve',
      title: 'Example 4 — Total Cost (TND) vs. Project Duration (Days)',
      points: [
        { duration: 20, directExtra: 0, indirect: 20000, total: 20000, label: 'Initial' },
        { duration: 19, directExtra: 300, indirect: 19000, total: 19300, label: 'C −1' },
        { duration: 18, directExtra: 900, indirect: 18000, total: 18900, label: 'E −1' },
        { duration: 17, directExtra: 1700, indirect: 17000, total: 18700, label: 'F −1 (Optimum)', isOptimal: true },
        { duration: 16, directExtra: 2800, indirect: 16000, total: 18800, label: 'B, E −1' },
        { duration: 15, directExtra: 4000, indirect: 15000, total: 19000, label: 'B, D −1' }
      ]
    },
    options: [
      'From 18 to 17 days, crashing common Activity F costs 800 TND < 1,000 TND (net saving 200 TND); from 17 to 16 days, F is at its crash point so we must crash B+E together for 500 + 600 = 1,100 TND > 1,000 TND (net loss +100 TND). The technical minimum duration is 15 days (where A–B–F = 6+8+1 = 15 cannot shrink further)',
      'At 17 days, all activities on both paths have reached their technical crash points, so 17 days is both the economic and technical minimum',
      'From 17 to 16 days, crashing B+D costs 1,200 TND, and the technical minimum duration is 12 days',
      'T = 15 days is the economic optimum because indirect cost is lowest (15,000 TND)'
    ],
    correctIndex: 0,
    explanation:
      'From Ch.2 Slides 48–50:\n• Reduction 3 (18 → 17 days): Since both paths are critical, we can either crash F (common to BOTH paths!) for 800 TND/day, or B+E (one per path) for 500+600 = 1,100 TND/day. We choose F (−1 day) for 800 TND < 1,000 TND indirect saving → Total Cost drops to 18,700 TND.\n• Economic Stop Rule at 17 days: Now F has reached its crash point (1 day). To gain 1 more day (17 → 16), the cheapest way to shorten both paths is B + E (500 + 600 = 1,100 TND/day). Since 1,100 > 1,000 TND saved, total cost rises to 18,800 TND! So we STOP economically at 17 days.\n• Technical Stop Rule: If we continued regardless of cost, B+E (−1 day → 16d) and then B+D (−1 day → 15d) would exhaust B’s 2-day reduction, leaving path A–B–F = 6 + 8 + 1 = 15 days completely crashed!',
    formulaUsed: 'Economic Stop: min Marginal Crash Cost ≥ Indirect Cost / day;  Technical Stop: A critical path is fully crashed.'
  },
  {
    id: 46,
    category: 'ch2_project_scheduling',
    topicTag: 'Potential Network — Forward & Backward Pass Calculation',
    difficulty: 'Hard',
    sourceRef: 'Ch.2 Slides 11–16 — Potential Network Mechanics',
    prompt:
      'In a Potential (MPM) network, Activity K has duration d_K = 6 days. Activity K is followed immediately by three successor activities: L (with latest start t*_L = 22), M (with latest start t*_M = 19), and N (with latest start t*_N = 25). If Activity K’s earliest start date is t_K = 10, what are its latest start date t*_K and its total float m_K?',
    options: [
      't*_K = 13 and Total Float m_K = 3 days',
      't*_K = 19 and Total Float m_K = 9 days',
      't*_K = 16 and Total Float m_K = 6 days',
      't*_K = 10 and Total Float m_K = 0 days'
    ],
    correctIndex: 0,
    explanation:
      'Using the backward pass formula at a divergence (Ch.2 Slide 13):\n• t*_K = min(t*_L, t*_M, t*_N) − d_K = min(22, 19, 25) − 6 = 19 − 6 = 13.\n• Total Float: m_K = t*_K − t_K = 13 − 10 = 3 days.',
    formulaUsed: 't*_K = min_{j ∈ Succ(K)} (t*_j) - d_K = 19 - 6 = 13;  m_K = t*_K - t_K = 3'
  },
  {
    id: 47,
    category: 'ch2_project_scheduling',
    topicTag: 'Potential Network — Sanity Check at Start Node',
    difficulty: 'Hard',
    sourceRef: 'Ch.2 Slide 13 — Backward Pass Verification Rule',
    prompt:
      'After completing the forward pass (finding t_End = 42 days) and running the backward pass all the way back to the Start node of a Potential (MPM) network, a student calculates t*_Start = 3 days. What does this result indicate?',
    options: [
      'A calculation error was made during the backward pass (or forward pass), because when t*_End = t_End, the backward pass must always yield t*_Start = 0 (since at least one critical path of zero float connects Start to End)',
      'The entire project has a 3-day safety buffer before it needs to begin',
      'There are no critical activities in the first 3 days of the project',
      'The Start node has a duration of 3 days'
    ],
    correctIndex: 0,
    explanation:
      'As explicitly stated on Ch.2 Slide 13 (Step 4 of The Backward Pass): "Check: we must find t*_Start = 0 — otherwise there is a mistake." Because t_End is the length of the longest path from Start (where t_Start = 0) to End, and we set t*_End = t_End, subtracting the durations along that longest (critical) path must return exactly 0 at the Start node.',
    formulaUsed: 'Verification Identity: t*_Start = min_{j ∈ Level 1} (t*_j) - 0 = 0'
  },
  {
    id: 48,
    category: 'ch2_project_scheduling',
    topicTag: 'Probabilistic Network — Exercise 2 (Uncertainty on B–D–F–H)',
    difficulty: 'Hard',
    sourceRef: 'Ch.2 Slides 38–40 — Exercise 2 (Probabilistic Network)',
    prompt:
      'In Exercise 2 of Chapter 2 (Slides 38–40), the four activities of critical path B – D – F – H are estimated with three values (a, m, b) in weeks as shown below. What are the exact project variance σ² (as a fraction /36 and decimal), standard deviation σ, and probability P(X ≤ 19)? (Note: Φ(1.66) = 0.9515).',
    visual: {
      type: 'table',
      title: 'Exercise 2 — Three-Point Estimates on Path B – D – F – H',
      headers: ['Activity', 'Optimistic (a)', 'Most Likely (m)', 'Pessimistic (b)', 'Mean ti', 'Variance vi'],
      rows: [
        ['B', 4, 6, 8, '36/6 = 6', '16/36 = 0.444'],
        ['D', 3, 5, 7, '30/6 = 5', '16/36 = 0.444'],
        ['F', 1, 2, 3, '12/6 = 2', '4/36 = 0.111'],
        ['H', 2, 4, 6, '24/6 = 4', '16/36 = 0.444']
      ]
    },
    options: [
      'σ² = 52/36 ≈ 1.444; σ = √1.444 = 1.20 weeks; z = (19 − 17)/1.20 = 1.66 → P(X ≤ 19) = 95.15% (≈ 95.2%)',
      'σ² = 52/36 ≈ 1.444; σ = 1.444 weeks; z = (19 − 17)/1.444 = 1.38 → P(X ≤ 19) = 91.6%',
      'σ² = 48/36 = 1.333; σ = 1.15 weeks; z = 1.74 → P(X ≤ 19) = 95.9%',
      'σ² = 14/6 = 2.333; σ = 1.53 weeks; P(X ≤ 19) = 90.0%'
    ],
    correctIndex: 0,
    explanation:
      'From Ch.2 Slides 39–40:\n• Sum of means on critical path: µ = 6 + 5 + 2 + 4 = 17 weeks.\n• Sum of variances: σ² = (16 + 16 + 4 + 16) / 36 = 52 / 36 ≈ 1.444 weeks².\n• Standard deviation: σ = √1.444 ≈ 1.20 weeks.\n• For x = 19 weeks: z = (19 − 17) / 1.20 = 2 / 1.20 = 1.667 ≈ 1.66 → Φ(1.66) = 0.9515 ≈ 95.2%.',
    formulaUsed: 'σ = √(52/36) = 1.20;  z = (19 - 17) / 1.20 = 1.66 → Φ(1.66) = 95.15%'
  },
  {
    id: 49,
    category: 'ch2_project_scheduling',
    topicTag: 'Probabilistic Network — Non-Critical Activity with Huge Variance',
    difficulty: 'Exam Trap',
    sourceRef: 'Ch.2 Slides 24, 30 & 31 — Project Variance Calculation Trap',
    prompt:
      'In Example 2 of Chapter 2 (Slide 26 & 30), Activity C has the largest variance of any activity in the entire project (v_C = 49/36 = 1.361), and Activity A has the second-largest variance (v_A = 36/36 = 1.000). Why are NEITHER v_C nor v_A included when computing the project variance σ² = 50/36 = 1.389?',
    options: [
      'Because standard PERT/MPM probabilistic analysis defines the project variance σ² strictly as the sum of the variances of the CRITICAL activities only (here B, E, and G); A and C are non-critical',
      'Because Activities A and C start at t = 0 and initial activities never contribute to variance',
      'Because v_A and v_C are greater than 1.0, and variances above 1.0 are truncated in normal approximations',
      'Because v_A and v_C cancel each other out at the convergence node'
    ],
    correctIndex: 0,
    explanation:
      'As stated in Step 02 of Ch.2 Slide 24 ("Variance of the project: σ² = sum of the variances of the CRITICAL activities only; σ = √σ²"): Even though Activity C (v_C = 49/36) and Activity A (v_A = 36/36) have larger individual variances than the critical activities B (16/36), E (25/36), and G (9/36), only the activities on the critical path B–E–G are summed in σ². (And as noted on Slide 31, if a near-critical path like C–F–H has high variance, this is a known theoretical limitation of the single-critical-path normal approximation!).',
    formulaUsed: 'σ²_project = ∑_{i ∈ Critical Path} v_i  (excludes non-critical activities)'
  },
  {
    id: 50,
    category: 'ch2_project_scheduling',
    topicTag: 'Probabilistic Network — Probability of Exceeding a Deadline',
    difficulty: 'Hard',
    sourceRef: 'Ch.2 Slide 24 — Normal Law Tail Probabilities',
    prompt:
      'A construction project has a critical path with mean duration µ = 30 weeks and standard deviation σ = 2.5 weeks. Using Φ(1.00) = 0.8413 and Φ(2.00) = 0.9772, what is the probability that the project takes MORE than 35 weeks (i.e. P(X > 35))?',
    options: [
      '2.28% (Because z = (35 − 30) / 2.5 = +2.00, so P(X > 35) = 1 − Φ(2.00) = 1 − 0.9772 = 0.0228)',
      '97.72% (Because z = +2.00 and Φ(2.00) = 0.9772)',
      '15.87% (Because z = +1.00 and 1 − Φ(1.00) = 0.1587)',
      '4.56% (Because we double the tail probability for a two-sided test)'
    ],
    correctIndex: 0,
    explanation:
      'First compute the z-score for x = 35 weeks:\nz = (x − µ) / σ = (35 − 30) / 2.5 = 5 / 2.5 = +2.00.\nSince Φ(2.00) = P(X ≤ 35) = 0.9772 is the probability of finishing WITHIN 35 weeks, the probability of EXCEEDING 35 weeks is the upper tail:\nP(X > 35) = 1 − P(X ≤ 35) = 1 − Φ(2.00) = 1 − 0.9772 = 0.0228 = 2.28%.',
    formulaUsed: 'P(X > x) = 1 - P(X ≤ x) = 1 - Φ((x - µ) / σ)'
  },
  {
    id: 51,
    category: 'ch2_project_scheduling',
    topicTag: 'Probabilistic Network — Interval Probability P(a ≤ X ≤ b)',
    difficulty: 'Very Hard',
    sourceRef: 'Ch.2 Slides 24 & 37 — Normal Distribution Calculations',
    prompt:
      'In the Campus Mobile App project (X ~ N(µ = 20 weeks, σ = 1.633 weeks)), what is the probability that the project finishes strictly between 19 weeks and 22 weeks — i.e., P(19 ≤ X ≤ 22)? (Given: Φ(0.61) = 0.7291 and Φ(1.22) = 0.8888).',
    options: [
      '61.79% (Because P(X ≤ 22) − P(X ≤ 19) = Φ(1.22) − Φ(−0.61) = 0.8888 − (1 − 0.7291) = 0.8888 − 0.2709 = 0.6179)',
      '15.97% (Because Φ(1.22) − Φ(0.61) = 0.8888 − 0.7291 = 0.1597)',
      '88.88% (Because P(X ≤ 22) dominates the interval)',
      '38.21% (Because 1 − 0.6179 = 0.3821)'
    ],
    correctIndex: 0,
    explanation:
      'Using the results from Ch.2 Slide 37:\n• For x_2 = 22 weeks: z_2 = (22 − 20) / 1.633 = +1.22 → P(X ≤ 22) = Φ(1.22) = 0.8888.\n• For x_1 = 19 weeks: z_1 = (19 − 20) / 1.633 = −0.61 → P(X ≤ 19) = Φ(−0.61) = 1 − Φ(0.61) = 1 − 0.7291 = 0.2709.\n• Therefore, P(19 ≤ X ≤ 22) = P(X ≤ 22) − P(X ≤ 19) = 0.8888 − 0.2709 = 0.6179 = 61.79%.\n(Distractor B is the classic sign-error trap where a student subtracts Φ(+0.61) instead of Φ(−0.61)!).',
    formulaUsed: 'P(x_1 ≤ X ≤ x_2) = Φ(z_2) - Φ(z_1)'
  },
  {
    id: 52,
    category: 'ch2_project_scheduling',
    topicTag: 'Cost Minimisation — Common Activity vs. Split Path Crashing',
    difficulty: 'Very Hard',
    sourceRef: 'Ch.2 Slide 48 — Crashing Parallel Critical Paths',
    prompt:
      'Suppose a project has two parallel critical paths: Path 1 (A – B – E) and Path 2 (C – D – E), where Activity E is common to both paths. The remaining crash capacities and daily crash costs are:\n• A: 400 TND/day (2 days left)\n• B: 550 TND/day (1 day left)\n• C: 350 TND/day (2 days left)\n• D: 600 TND/day (2 days left)\n• E: 800 TND/day (1 day left)\nWhat is the cheapest way to shorten the overall project by 1 day, and by 2 days?',
    options: [
      'To gain 1 day: crash A + C together for 400 + 350 = 750 TND (which is cheaper than crashing common activity E at 800 TND!); to gain a 2nd day: crash A + C again for another 750 TND (total 1,500 TND for 2 days)',
      'To gain 1 day: always crash the common activity E first (800 TND), then crash A + C (750 TND) for the 2nd day',
      'To gain 1 day: crash C alone for 350 TND, and to gain a 2nd day: crash A alone for 400 TND',
      'To gain 1 day: crash B + D for 1,150 TND'
    ],
    correctIndex: 0,
    explanation:
      'This tests deep understanding of Ch.2 Slide 42 & 48 ("If several paths are critical, reduce them TOGETHER: one activity per path, or a common activity"):\n• Option 1 (one activity per path): The cheapest on Path 1 is A (400 TND/day) and the cheapest on Path 2 is C (350 TND/day). Crashing A + C together costs 400 + 350 = 750 TND/day!\n• Option 2 (common activity E): Crashing E alone shortens both paths, but costs 800 TND/day.\nBecause 750 TND < 800 TND, crashing the pair (A + C) is strictly cheaper than crashing the common activity E! And since both A and C have 2 days of crash capacity available, we can crash (A + C) by 2 full days for 2 × 750 = 1,500 TND.',
    formulaUsed: 'Cost(1 day) = min( k_{common},  min_{i ∈ P1} k_i + min_{j ∈ P2} k_j )'
  },
  {
    id: 53,
    category: 'ch2_project_scheduling',
    topicTag: 'Cost Minimisation — Total Project Cost Formula',
    difficulty: 'Hard',
    sourceRef: 'Ch.2 Slide 50 — Total Cost Optimisation Chart',
    prompt:
      'A project has a normal duration of 24 weeks. The sum of normal direct costs of all activities in the project is 120,000 TND, and indirect costs are 2,500 TND per week. By crashing critical activities, the manager reduces the project duration from 24 weeks to 20 weeks at a cumulative extra direct crashing cost of 6,200 TND. What is the complete Total Project Cost (Normal Direct + Extra Direct + Indirect) at 20 weeks, and what is the net savings compared to the 24-week normal schedule?',
    options: [
      'Total Project Cost at 20 weeks = 176,200 TND (vs. 180,000 TND at 24 weeks), yielding a net savings of 3,800 TND',
      'Total Project Cost at 20 weeks = 56,200 TND (vs. 60,000 TND at 24 weeks), yielding a net savings of 6,200 TND',
      'Total Project Cost at 20 weeks = 186,200 TND (vs. 180,000 TND at 24 weeks), yielding a net loss of 6,200 TND',
      'Total Project Cost at 20 weeks = 170,000 TND, yielding a net savings of 10,000 TND'
    ],
    correctIndex: 0,
    explanation:
      'Let us compute both components carefully (Ch.2 Slide 50):\n• At Normal Duration (24 weeks):\n  - Normal Direct Cost = 120,000 TND\n  - Indirect Cost = 24 × 2,500 = 60,000 TND\n  - Total Cost (24w) = 120,000 + 60,000 = 180,000 TND.\n• At Crashed Duration (20 weeks):\n  - Direct Cost = 120,000 (normal) + 6,200 (extra crash cost) = 126,200 TND\n  - Indirect Cost = 20 × 2,500 = 50,000 TND (saving 4 × 2,500 = 10,000 TND)\n  - Total Cost (20w) = 126,200 + 50,000 = 176,200 TND.\n• Net Savings = 10,000 (indirect saved) − 6,200 (extra direct spent) = 3,800 TND.',
    formulaUsed: 'Total Cost(T) = C_{direct,normal} + ΔC_{crash}(T) + c_{indirect} × T'
  },
  {
    id: 54,
    category: 'ch2_project_scheduling',
    topicTag: 'Potential Network — Identifying Invalid Graphs',
    difficulty: 'Hard',
    sourceRef: 'Ch.2 Slide 7 — Five Rules for Drawing a Potential Network',
    prompt:
      'According to Step 05 ("Check") of drawing a Potential Network (Ch.2 Slide 7), which of the following conditions would immediately invalidate a potential network diagram?',
    options: [
      'A cycle (loop) of arrows such as A → B → C → A, or drawing the same activity node twice in different columns',
      'Having four arrows leave the same activity node (divergence) all carrying the same duration',
      'Having three arrows enter the End node from different columns (levels)',
      'Having an arc of duration 0 leaving the Start node to each Level-1 activity'
    ],
    correctIndex: 0,
    explanation:
      'From Ch.2 Slide 7 (Step 05 — Check): "Every activity appears once; every arrow goes left → right; no cycle; one Start, one End." A cycle (A → B → C → A) makes it impossible to start any activity in the loop, and duplicating an activity node violates the fundamental MPM rule that each activity is drawn ONCE.',
    formulaUsed: 'Valid MPM Graph: Directed Acyclic Graph (DAG) with unique nodes, 1 Start, 1 End.'
  },
  {
    id: 55,
    category: 'ch2_project_scheduling',
    topicTag: 'Potential Network — Earliest Finish & Latest Finish Dates',
    difficulty: 'Hard',
    sourceRef: 'Ch.2 Slides 11–16 — Dates on the Node',
    prompt:
      'In a Potential (MPM) network, Activity M has duration d_M = 8 days, earliest start date t_M = 14, and latest start date t*_M = 19. What are Activity M’s Earliest Finish date (EF_M), Latest Finish date (LF_M), and Total Float (m_M)?',
    options: [
      'Earliest Finish = 22, Latest Finish = 27, Total Float = 5 days',
      'Earliest Finish = 14, Latest Finish = 19, Total Float = 8 days',
      'Earliest Finish = 22, Latest Finish = 19, Total Float = 3 days',
      'Earliest Finish = 6, Latest Finish = 11, Total Float = 5 days'
    ],
    correctIndex: 0,
    explanation:
      'Since Activity M takes d_M = 8 days:\n• Earliest Finish EF_M = t_M + d_M = 14 + 8 = 22.\n• Latest Finish LF_M = t*_M + d_M = 19 + 8 = 27.\n• Total Float m_M = t*_M − t_M = LF_M − EF_M = 19 − 14 = 27 − 22 = 5 days.',
    formulaUsed: 'EF_i = t_i + d_i;   LF_i = t*_i + d_i;   m_i = t*_i - t_i = LF_i - EF_i'
  },
  {
    id: 56,
    category: 'ch2_project_scheduling',
    topicTag: 'Probabilistic Network — Reverse Finding of Activity Variance',
    difficulty: 'Very Hard',
    sourceRef: 'Ch.2 Slides 23–24 — Variance Additivity on Critical Path',
    prompt:
      'A project has a single critical path consisting of four activities: P – Q – R – S. The project mean duration is µ = 25 weeks, and the 95% confidence completion deadline is x = 28.29 weeks (using z = 1.645 for Φ(z) = 0.95). If the variances of P, Q, and R are v_P = 1.20, v_Q = 0.85, and v_R = 0.95, what is the pessimistic−optimistic spread (b_S − a_S) of Activity S?',
    options: [
      '6 weeks (Because σ = (28.29 − 25)/1.645 = 2.0 weeks → σ² = 4.00 → v_S = 4.00 − (1.20 + 0.85 + 0.95) = 1.00 → (b_S − a_S)/6 = 1 → b_S − a_S = 6)',
      '12 weeks (Because v_S = 2.00 → (b_S − a_S)/6 = √2)',
      '3 weeks (Because σ = 2.0 weeks → v_S = 2.0 − 3.0 is impossible, so v_S = 0.25)',
      '9 weeks (Because (b_S − a_S)/6 = 1.5)'
    ],
    correctIndex: 0,
    explanation:
      'Let us solve this backwards step by step:\n1) From x = µ + z · σ: 28.29 = 25 + 1.645 · σ → 1.645 · σ = 3.29 → σ = 3.29 / 1.645 = 2.0 weeks.\n2) Therefore, the project variance is σ² = (2.0)² = 4.00 weeks².\n3) Since σ² = v_P + v_Q + v_R + v_S:\n   4.00 = 1.20 + 0.85 + 0.95 + v_S = 3.00 + v_S → v_S = 1.00 week².\n4) Since v_S = [(b_S − a_S) / 6]² = 1.00:\n   (b_S − a_S) / 6 = 1.0 → b_S − a_S = 6 weeks.',
    formulaUsed: 'σ = (x_p - µ) / z_p;   v_S = σ² - (v_P + v_Q + v_R);   b_S - a_S = 6 √v_S'
  },
  {
    id: 57,
    category: 'ch2_project_scheduling',
    topicTag: 'Cost Minimisation — Linear Crash Slope Calculation',
    difficulty: 'Hard',
    sourceRef: 'Ch.2 Slide 41 — Reduction Cost per Day (Slope)',
    prompt:
      'An activity in a hospital construction project has a normal duration of 12 weeks at a normal direct cost of 18,000 TND. It can be crashed to a minimum duration of 8 weeks, at which point its crash direct cost is 25,200 TND. What is its crash cost slope k_i, and what is the direct cost of this activity if it is scheduled for 10 weeks?',
    options: [
      'Slope k_i = 1,800 TND/week; Direct cost at 10 weeks = 21,600 TND',
      'Slope k_i = 1,800 TND/week; Direct cost at 10 weeks = 19,800 TND',
      'Slope k_i = 2,100 TND/week; Direct cost at 10 weeks = 22,200 TND',
      'Slope k_i = 600 TND/week; Direct cost at 10 weeks = 19,200 TND'
    ],
    correctIndex: 0,
    explanation:
      'Using the linear crash cost slope formula from Ch.2 Slide 41:\n• k_i = (Crash Cost − Normal Cost) / (Normal Duration − Crash Duration)\n  k_i = (25,200 − 18,000) / (12 − 8) = 7,200 / 4 = 1,800 TND per week saved.\n• Reducing from 12 weeks to 10 weeks saves 2 weeks, which adds 2 × 1,800 = 3,600 TND to the normal cost:\n  Direct Cost (10 weeks) = 18,000 + 3,600 = 21,600 TND.',
    formulaUsed: 'k_i = (25,200 - 18,000) / (12 - 8) = 1,800 TND/wk;  C(10) = 18,000 + 2(1,800) = 21,600'
  },
  {
    id: 58,
    category: 'ch2_project_scheduling',
    topicTag: 'Chapter 2 Synthesis — Three-Path Crashing Table',
    difficulty: 'Very Hard',
    sourceRef: 'Ch.2 Slides 42–50 — Multi-Step Project Crashing',
    prompt:
      'A software deployment project has three paths from Start to End:\n• Path 1: A – D (Normal: 8 + 9 = 17 days)\n• Path 2: B – E (Normal: 7 + 8 = 15 days)\n• Path 3: C – F (Normal: 6 + 7 = 13 days)\nIndirect costs are 900 TND/day. Each activity can be reduced by up to 2 days at the daily crash costs shown below. What is the sequence of reductions and the minimum total cost duration?',
    visual: {
      type: 'table',
      title: 'Software Deployment — Daily Crash Costs (Max 2 days reduction each)',
      headers: ['Activity', 'A (Path 1)', 'D (Path 1)', 'B (Path 2)', 'E (Path 2)', 'C (Path 3)', 'F (Path 3)'],
      rows: [
        ['Normal Duration (d)', 8, 9, 7, 8, 6, 7],
        ['Max Reduction (d)', 2, 2, 2, 2, 2, 2],
        ['Crash Cost (TND/d)', 350, 600, 400, 550, 250, 300]
      ]
    },
    options: [
      'Step 1: Reduce A by 2 days (350 TND/d → T = 15d, now Path 1 and Path 2 are both 15d); Step 2: Reduce D + B together by 1 day (600 + 400 = 1,000 TND/d > 900 TND/d → STOP!). Optimal duration is T = 15 days',
      'Step 1: Reduce C by 2 days (250 TND/d); Step 2: Reduce F by 2 days (300 TND/d); Optimal duration is T = 13 days',
      'Step 1: Reduce A by 2 days (350 TND/d); Step 2: Reduce D by 2 days (600 TND/d); Optimal duration is T = 13 days',
      'Step 1: Reduce A by 2 days (350 TND/d); Step 2: Reduce B by 2 days (400 TND/d); Optimal duration is T = 13 days'
    ],
    correctIndex: 0,
    explanation:
      'Let us trace the crashing procedure step by step:\n1) Initial paths: Path 1 (A–D) = 17d (critical!), Path 2 (B–E) = 15d (float = 2d), Path 3 (C–F) = 13d (float = 4d).\n2) Step 1: On critical Path 1 (A–D), A is cheaper (350 TND/d < 600 TND/d for D) and has 2 days available, which equals the 2-day float of nearest non-critical Path 2! Reducing A by 2 days costs 2 × 350 = 700 TND and saves 2 × 900 = 1,800 TND (net saving 1,100 TND). Project duration drops to T = 15 days.\n3) At T = 15 days: Path 1 (A–D = 6+9 = 15d) and Path 2 (B–E = 7+8 = 15d) are BOTH critical! Since A is exhausted (reduced by its max 2 days), the only reducible activity on Path 1 is D (600 TND/d), and the cheapest on Path 2 is B (400 TND/d).\n4) Economic Stop Check: Shortening Path 1 and Path 2 together by 1 day requires D + B = 600 + 400 = 1,000 TND/day, which exceeds the 900 TND/day indirect cost saving! Therefore, we STOP at T = 15 days.',
    formulaUsed: 'At T = 15d: Cost(D + B) = 600 + 400 = 1,000 TND/d > 900 TND/d → Stop at 15 days.'
  }
];
