import React from 'react';
import {
  QuestionVisual,
  SingleVisual,
  TableVisual,
  MPMNetworkVisual,
  PERTNetworkVisual,
  GanttChartVisual,
  CostCurveVisual
} from '../types/exam';

function RenderTable({ visual }: { visual: TableVisual }) {
  return (
    <div className="my-4 overflow-hidden rounded-xl border border-slate-200 bg-white">
      {visual.title && (
        <div className="border-b border-slate-200 bg-slate-50/80 px-4 py-2.5 text-xs font-semibold text-slate-700">
          {visual.title}
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm tabular-nums">
          <thead>
            <tr className="border-b border-slate-200 bg-[#0F3D3E] text-white">
              {visual.headers.map((header, idx) => (
                <th
                  key={idx}
                  className={`px-3.5 py-2.5 font-semibold whitespace-nowrap ${
                    idx === 0 ? 'text-left' : 'text-center'
                  }`}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {visual.rows.map((row, rIdx) => (
              <tr
                key={rIdx}
                className={rIdx % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'}
              >
                {row.map((cell, cIdx) => (
                  <td
                    key={cIdx}
                    className={`px-3.5 py-2 font-mono text-xs sm:text-sm whitespace-nowrap ${
                      cIdx === 0
                        ? 'font-sans font-semibold text-slate-900 text-left bg-slate-50/90 border-r border-slate-200'
                        : 'text-center text-slate-800'
                    }`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {visual.caption && (
        <div className="border-t border-slate-100 bg-slate-50 px-4 py-2 text-xs text-slate-500">
          {visual.caption}
        </div>
      )}
    </div>
  );
}

function RenderMPMNetwork({ visual }: { visual: MPMNetworkVisual }) {
  const height = visual.height || 240;
  const nodeMap = new Map(visual.nodes.map((n) => [n.id, n]));

  return (
    <div
      className="my-4 overflow-hidden rounded-xl border border-slate-200 bg-white"
      data-testid="mpm-network-diagram"
    >
      {visual.title && (
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 bg-slate-50/80 px-4 py-2.5">
          <span className="text-xs font-semibold text-slate-700">{visual.title}</span>
          <div className="flex items-center gap-3 text-xs text-slate-600">
            <span className="font-mono font-semibold text-emerald-700">
              Top: Earliest Start t_i
            </span>
            <span aria-hidden="true">·</span>
            <span className="font-mono font-semibold text-amber-700">
              Bottom: Latest Start t*_i
            </span>
            <span aria-hidden="true">·</span>
            <span className="font-semibold text-rose-700">Red: Critical Path</span>
          </div>
        </div>
      )}
      <div className="w-full overflow-x-auto p-3">
        <svg
          viewBox={`0 0 1000 ${height}`}
          className="mx-auto w-full min-w-[640px] max-w-[960px] select-none"
          role="img"
          aria-label={visual.title || 'MPM Potential Network Diagram'}
        >
          <defs>
            <marker
              id="mpm-arrow-normal"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 8 5 L 0 9 z" fill="#64748B" />
            </marker>
            <marker
              id="mpm-arrow-critical"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 8 5 L 0 9 z" fill="#E11D48" />
            </marker>
          </defs>

          {/* Arcs */}
          {visual.arcs.map((arc, idx) => {
            const fromNode = nodeMap.get(arc.from);
            const toNode = nodeMap.get(arc.to);
            if (!fromNode || !toNode) return null;

            const dx = toNode.x - fromNode.x;
            const dy = toNode.y - fromNode.y;
            const dist = Math.hypot(dx, dy) || 1;
            const ux = dx / dist;
            const uy = dy / dist;

            const startOffset = fromNode.isStartOrEnd ? 34 : 24;
            const endOffset = toNode.isStartOrEnd ? 36 : 26;

            const x1 = fromNode.x + ux * startOffset;
            const y1 = fromNode.y + uy * startOffset;
            const x2 = toNode.x - ux * endOffset;
            const y2 = toNode.y - uy * endOffset;

            const midX = (x1 + x2) / 2;
            const midY = (y1 + y2) / 2;

            return (
              <g key={idx}>
                <line
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={arc.isCritical ? '#E11D48' : '#64748B'}
                  strokeWidth={arc.isCritical ? 2.5 : 1.75}
                  strokeDasharray={arc.isDummy ? '5 4' : undefined}
                  markerEnd={
                    arc.isCritical
                      ? 'url(#mpm-arrow-critical)'
                      : 'url(#mpm-arrow-normal)'
                  }
                />
                {arc.duration !== undefined && (
                  <g transform={`translate(${midX}, ${midY})`}>
                    <rect
                      x="-14"
                      y="-10"
                      width="28"
                      height="20"
                      rx="4"
                      fill="#FFFFFF"
                      stroke={arc.isCritical ? '#FECDD3' : '#E2E8F0'}
                      strokeWidth="1"
                    />
                    <text
                      x="0"
                      y="4"
                      textAnchor="middle"
                      className="font-mono text-[11px] font-semibold"
                      fill={arc.isCritical ? '#BE123C' : '#334155'}
                    >
                      {arc.duration}
                    </text>
                  </g>
                )}
              </g>
            );
          })}

          {/* Nodes */}
          {visual.nodes.map((node) => {
            const isSE = node.isStartOrEnd;
            return (
              <g key={node.id} transform={`translate(${node.x}, ${node.y})`}>
                {/* Earliest date above node */}
                {node.earliest !== undefined && (
                  <text
                    x="0"
                    y={isSE ? -22 : -26}
                    textAnchor="middle"
                    className="font-mono text-[12px] font-bold"
                    fill="#047857"
                  >
                    {node.earliest}
                  </text>
                )}

                {/* Node shape */}
                {isSE ? (
                  <rect
                    x="-32"
                    y="-16"
                    width="64"
                    height="32"
                    rx="7"
                    fill="#0F3D3E"
                    stroke="#0F172A"
                    strokeWidth="1.5"
                  />
                ) : (
                  <circle
                    cx="0"
                    cy="0"
                    r="21"
                    fill={node.isCritical ? '#E11D48' : '#FFFFFF'}
                    stroke={node.isCritical ? '#BE123C' : '#0F3D3E'}
                    strokeWidth="2.2"
                  />
                )}

                {/* Node label */}
                <text
                  x="0"
                  y="4"
                  textAnchor="middle"
                  className="font-sans text-[13px] font-bold"
                  fill={isSE || node.isCritical ? '#FFFFFF' : '#0F172A'}
                >
                  {node.label}
                </text>

                {/* Latest date below node */}
                {node.latest !== undefined && (
                  <text
                    x="0"
                    y={isSE ? 30 : 34}
                    textAnchor="middle"
                    className="font-mono text-[12px] font-bold"
                    fill="#B45309"
                  >
                    {node.latest}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}

function RenderPERTNetwork({ visual }: { visual: PERTNetworkVisual }) {
  const height = visual.height || 240;
  const nodeMap = new Map(visual.nodes.map((n) => [n.id, n]));

  return (
    <div
      className="my-4 overflow-hidden rounded-xl border border-slate-200 bg-white"
      data-testid="pert-network-diagram"
    >
      {visual.title && (
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 bg-slate-50/80 px-4 py-2.5">
          <span className="text-xs font-semibold text-slate-700">{visual.title}</span>
          <div className="flex items-center gap-3 text-xs text-slate-600">
            <span>Solid Arrow: Activity (Duration)</span>
            <span aria-hidden="true">·</span>
            <span>Dashed Arrow: Dummy Activity (0 wks)</span>
          </div>
        </div>
      )}
      <div className="w-full overflow-x-auto p-3">
        <svg
          viewBox={`0 0 1000 ${height}`}
          className="mx-auto w-full min-w-[640px] max-w-[960px] select-none"
          role="img"
          aria-label={visual.title || 'PERT Network Diagram'}
        >
          <defs>
            <marker
              id="pert-arrow-normal"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 8 5 L 0 9 z" fill="#475569" />
            </marker>
            <marker
              id="pert-arrow-critical"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 8 5 L 0 9 z" fill="#E11D48" />
            </marker>
          </defs>

          {visual.arcs.map((arc, idx) => {
            const fromNode = nodeMap.get(arc.from);
            const toNode = nodeMap.get(arc.to);
            if (!fromNode || !toNode) return null;

            const dx = toNode.x - fromNode.x;
            const dy = toNode.y - fromNode.y;
            const dist = Math.hypot(dx, dy) || 1;
            const ux = dx / dist;
            const uy = dy / dist;

            const x1 = fromNode.x + ux * 22;
            const y1 = fromNode.y + uy * 22;
            const x2 = toNode.x - ux * 24;
            const y2 = toNode.y - uy * 24;

            const midX = (x1 + x2) / 2;
            const midY = (y1 + y2) / 2;

            return (
              <g key={idx}>
                <line
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={arc.isCritical ? '#E11D48' : '#475569'}
                  strokeWidth={arc.isCritical ? 2.4 : 1.75}
                  strokeDasharray={arc.isDummy ? '6 4' : undefined}
                  markerEnd={
                    arc.isCritical
                      ? 'url(#pert-arrow-critical)'
                      : 'url(#pert-arrow-normal)'
                  }
                />
                <g transform={`translate(${midX}, ${midY})`}>
                  <rect
                    x="-28"
                    y="-10"
                    width="56"
                    height="19"
                    rx="4"
                    fill="#FFFFFF"
                    stroke={arc.isCritical ? '#FECDD3' : '#CBD5E1'}
                    strokeWidth="1"
                  />
                  <text
                    x="0"
                    y="3.5"
                    textAnchor="middle"
                    className="font-mono text-[10.5px] font-semibold"
                    fill={arc.isCritical ? '#BE123C' : '#1E293B'}
                  >
                    {arc.label}
                  </text>
                </g>
              </g>
            );
          })}

          {visual.nodes.map((node) => (
            <g key={node.id} transform={`translate(${node.x}, ${node.y})`}>
              <circle
                cx="0"
                cy="0"
                r="20"
                fill="#1E293B"
                stroke="#0F172A"
                strokeWidth="2"
              />
              <text
                x="0"
                y="4.5"
                textAnchor="middle"
                className="font-mono text-[13px] font-bold"
                fill="#FFFFFF"
              >
                {node.label}
              </text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}

function RenderGanttChart({ visual }: { visual: GanttChartVisual }) {
  const rowHeight = 46;
  const topPad = 28;
  const bottomPad = 44;
  const leftPad = 68;
  const rightPad = 36;
  const chartWidth = 820;
  const svgWidth = leftPad + chartWidth + rightPad;
  const svgHeight = topPad + visual.rows.length * rowHeight + bottomPad;

  const scaleX = (t: number) => leftPad + (t / visual.maxTime) * chartWidth;

  const ticks: number[] = [];
  for (let t = 0; t <= visual.maxTime; t += visual.step) {
    ticks.push(t);
  }

  return (
    <div
      className="my-4 overflow-hidden rounded-xl border border-slate-200 bg-white"
      data-testid="gantt-chart-diagram"
    >
      {visual.title && (
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 bg-slate-50/80 px-4 py-2.5">
          <span className="text-xs font-semibold text-slate-700">{visual.title}</span>
          <div className="flex items-center gap-3 text-xs text-slate-600">
            <span>Z = Machine Idle Time</span>
            {visual.makespan !== undefined && (
              <>
                <span aria-hidden="true">·</span>
                <span className="font-mono font-bold text-rose-700">
                  T = {visual.makespan}
                </span>
              </>
            )}
          </div>
        </div>
      )}
      <div className="w-full overflow-x-auto p-3">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="mx-auto w-full min-w-[620px] max-w-[940px] select-none"
          role="img"
          aria-label={visual.title || 'Gantt Chart Schedule'}
        >
          {/* Vertical grid lines */}
          {ticks.map((t) => {
            const x = scaleX(t);
            return (
              <line
                key={t}
                x1={x}
                y1={topPad - 8}
                x2={x}
                y2={topPad + visual.rows.length * rowHeight}
                stroke="#F1F5F9"
                strokeWidth="1"
              />
            );
          })}

          {/* Machine rows */}
          {visual.rows.map((row, rIdx) => {
            const y = topPad + rIdx * rowHeight;
            return (
              <g key={row.machine}>
                {/* Machine label box */}
                <rect
                  x="12"
                  y={y + 4}
                  width="44"
                  height="28"
                  rx="4"
                  fill="#0F3D3E"
                />
                <text
                  x="34"
                  y={y + 22}
                  textAnchor="middle"
                  className="font-sans text-[12px] font-bold"
                  fill="#FFFFFF"
                >
                  {row.machine}
                </text>

                {/* Blocks */}
                {row.blocks.map((b, bIdx) => {
                  const x1 = scaleX(b.start);
                  const x2 = scaleX(b.end);
                  const w = Math.max(x2 - x1, 2);
                  const duration = b.end - b.start;

                  return (
                    <g key={bIdx}>
                      <rect
                        x={x1}
                        y={y + 4}
                        width={w}
                        height="28"
                        fill={b.isIdle ? '#F1F5F9' : b.color || '#0284C7'}
                        stroke={b.isIdle ? '#94A3B8' : '#FFFFFF'}
                        strokeWidth="1"
                        strokeDasharray={b.isIdle ? '4 3' : undefined}
                      />
                      {/* Job number above bar (if not idle) */}
                      {!b.isIdle && (
                        <text
                          x={x1 + w / 2}
                          y={y}
                          textAnchor="middle"
                          className="font-sans text-[10.5px] font-bold"
                          fill="#0F172A"
                        >
                          {b.job}
                        </text>
                      )}
                      {/* Duration or Z inside bar */}
                      {w >= 14 && (
                        <text
                          x={x1 + w / 2}
                          y={y + 22}
                          textAnchor="middle"
                          className="font-mono text-[10.5px] font-semibold"
                          fill={b.isIdle ? '#64748B' : '#FFFFFF'}
                        >
                          {b.isIdle ? 'Z' : duration}
                        </text>
                      )}
                    </g>
                  );
                })}
              </g>
            );
          })}

          {/* Time axis */}
          <line
            x1={leftPad}
            y1={topPad + visual.rows.length * rowHeight + 4}
            x2={leftPad + chartWidth}
            y2={topPad + visual.rows.length * rowHeight + 4}
            stroke="#334155"
            strokeWidth="1.5"
          />

          {ticks.map((t) => {
            const x = scaleX(t);
            const axisY = topPad + visual.rows.length * rowHeight + 4;
            return (
              <g key={t}>
                <line
                  x1={x}
                  y1={axisY}
                  x2={x}
                  y2={axisY + 5}
                  stroke="#334155"
                  strokeWidth="1.5"
                />
                <text
                  x={x}
                  y={axisY + 18}
                  textAnchor="middle"
                  className="font-mono text-[11px]"
                  fill="#475569"
                >
                  {t}
                </text>
              </g>
            );
          })}

          {/* Makespan red dashed line */}
          {visual.makespan !== undefined && (
            <g>
              <line
                x1={scaleX(visual.makespan)}
                y1={topPad - 12}
                x2={scaleX(visual.makespan)}
                y2={topPad + visual.rows.length * rowHeight + 6}
                stroke="#E11D48"
                strokeWidth="2"
                strokeDasharray="5 3"
              />
              <rect
                x={scaleX(visual.makespan) - 34}
                y={topPad + visual.rows.length * rowHeight + 23}
                width="68"
                height="18"
                rx="3"
                fill="#E11D48"
              />
              <text
                x={scaleX(visual.makespan)}
                y={topPad + visual.rows.length * rowHeight + 35}
                textAnchor="middle"
                className="font-mono text-[10.5px] font-bold"
                fill="#FFFFFF"
              >
                T = {visual.makespan}
              </text>
            </g>
          )}
        </svg>
      </div>
    </div>
  );
}

function RenderCostCurve({ visual }: { visual: CostCurveVisual }) {
  const pts = [...visual.points].sort((a, b) => a.duration - b.duration);
  const minDur = Math.min(...pts.map((p) => p.duration));
  const maxDur = Math.max(...pts.map((p) => p.duration));
  const minCost = Math.min(...pts.map((p) => p.total)) - 300;
  const maxCost = Math.max(...pts.map((p) => p.total)) + 300;

  const leftPad = 65;
  const rightPad = 35;
  const topPad = 30;
  const bottomPad = 40;
  const w = 440;
  const h = 170;

  const scaleX = (d: number) =>
    leftPad + ((d - minDur) / Math.max(maxDur - minDur, 1)) * w;
  const scaleY = (c: number) =>
    topPad + h - ((c - minCost) / Math.max(maxCost - minCost, 1)) * h;

  const polylinePoints = pts
    .map((p) => `${scaleX(p.duration)},${scaleY(p.total)}`)
    .join(' ');

  return (
    <div
      className="my-4 overflow-hidden rounded-xl border border-slate-200 bg-white"
      data-testid="cost-curve-diagram"
    >
      {visual.title && (
        <div className="border-b border-slate-200 bg-slate-50/80 px-4 py-2.5 text-xs font-semibold text-slate-700">
          {visual.title}
        </div>
      )}
      <div className="grid grid-cols-1 items-center gap-4 p-4 lg:grid-cols-12">
        <div className="overflow-x-auto lg:col-span-7">
          <table className="w-full border-collapse text-center text-xs tabular-nums">
            <thead>
              <tr className="bg-[#0F3D3E] text-white">
                <th className="px-2.5 py-2 font-semibold">Duration</th>
                <th className="px-2.5 py-2 font-semibold">Step</th>
                <th className="px-2.5 py-2 font-semibold">Extra Direct</th>
                <th className="px-2.5 py-2 font-semibold">Indirect</th>
                <th className="px-2.5 py-2 font-semibold">Total Cost</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 font-mono">
              {visual.points.map((p) => (
                <tr
                  key={p.duration}
                  className={
                    p.isOptimal
                      ? 'bg-emerald-50 font-bold text-emerald-950'
                      : 'bg-white text-slate-700'
                  }
                >
                  <td className="px-2.5 py-1.5">{p.duration} d</td>
                  <td className="px-2.5 py-1.5 font-sans">{p.label || '—'}</td>
                  <td className="px-2.5 py-1.5">{p.directExtra.toLocaleString()}</td>
                  <td className="px-2.5 py-1.5">{p.indirect.toLocaleString()}</td>
                  <td className="px-2.5 py-1.5 font-semibold">
                    {p.total.toLocaleString()} TND
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="lg:col-span-5">
          <svg
            viewBox={`0 0 ${leftPad + w + rightPad} ${topPad + h + bottomPad}`}
            className="w-full select-none"
            role="img"
            aria-label="Project Total Cost vs Duration Chart"
          >
            <line
              x1={leftPad}
              y1={topPad}
              x2={leftPad}
              y2={topPad + h}
              stroke="#94A3B8"
              strokeWidth="1.5"
            />
            <line
              x1={leftPad}
              y1={topPad + h}
              x2={leftPad + w}
              y2={topPad + h}
              stroke="#94A3B8"
              strokeWidth="1.5"
            />
            <polyline
              fill="none"
              stroke="#0D9488"
              strokeWidth="3"
              points={polylinePoints}
            />
            {pts.map((p) => {
              const cx = scaleX(p.duration);
              const cy = scaleY(p.total);
              return (
                <g key={p.duration}>
                  <circle
                    cx={cx}
                    cy={cy}
                    r={p.isOptimal ? 6 : 4.5}
                    fill={p.isOptimal ? '#059669' : '#0F3D3E'}
                    stroke="#FFFFFF"
                    strokeWidth="1.5"
                  />
                  <text
                    x={cx}
                    y={cy - 10}
                    textAnchor="middle"
                    className="font-mono text-[10.5px] font-bold"
                    fill={p.isOptimal ? '#047857' : '#334155'}
                  >
                    {p.total.toLocaleString()}
                  </text>
                  <text
                    x={cx}
                    y={topPad + h + 18}
                    textAnchor="middle"
                    className="font-mono text-[11px]"
                    fill="#475569"
                  >
                    {p.duration}d
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </div>
  );
}

export function SingleDiagramRenderer({ visual }: { visual: SingleVisual }) {
  switch (visual.type) {
    case 'table':
      return <RenderTable visual={visual} />;
    case 'mpm_network':
      return <RenderMPMNetwork visual={visual} />;
    case 'pert_network':
      return <RenderPERTNetwork visual={visual} />;
    case 'gantt_chart':
      return <RenderGanttChart visual={visual} />;
    case 'cost_curve':
      return <RenderCostCurve visual={visual} />;
  }
}

export const DiagramRenderer: React.FC<{ visual: QuestionVisual }> = ({ visual }) => {
  if (visual.type === 'composite') {
    return (
      <div className="space-y-3">
        {visual.items.map((item, idx) => (
          <SingleDiagramRenderer key={idx} visual={item} />
        ))}
      </div>
    );
  }
  return <SingleDiagramRenderer visual={visual} />;
};
