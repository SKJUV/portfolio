"use client";

import { useEffect, useState, useRef } from "react";
import {
  BarChart3,
  Eye,
  Users,
  TrendingUp,
  Calendar,
  Globe,
} from "lucide-react";

interface DailyData {
  date: string;
  views: number;
  visitors: number;
}

interface TopPage {
  path: string;
  count: number;
}

interface AnalyticsData {
  daily: DailyData[];
  topPages: TopPage[];
  totalViews: number;
  uniqueVisitors: number;
  todayViews: number;
}

type ChartMode = "views" | "visitors";

export default function AnalyticsChart() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState<ChartMode>("views");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const chartRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    fetch("/api/admin/analytics")
      .then((res) => res.json())
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="admin-card p-6 space-y-4">
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 rounded skeleton" />
          <div className="h-5 w-40 rounded skeleton" />
        </div>
        <div className="h-64 rounded-xl skeleton" />
      </div>
    );
  }

  if (!data || data.daily.length === 0) {
    return (
      <div className="admin-card p-6">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">Statistiques de visites</h2>
        </div>
        <div className="flex flex-col items-center justify-center h-48 text-muted-foreground">
          <Globe className="h-10 w-10 mb-3 opacity-50" />
          <p className="text-sm">Aucune donnée disponible</p>
          <p className="text-xs mt-1">
            Les statistiques apparaîtront après les premières visites.
          </p>
          <p className="text-xs mt-3 text-muted-foreground/60 max-w-sm text-center">
            N&apos;oubliez pas de créer la table <code className="bg-muted px-1 rounded">page_views</code> dans Supabase.
          </p>
        </div>
      </div>
    );
  }

  const daily = data.daily;
  const values = daily.map((d) => (mode === "views" ? d.views : d.visitors));
  const maxValue = Math.max(...values, 1);

  // Dimensions du graphe SVG
  const width = 800;
  const height = 250;
  const padding = { top: 20, right: 20, bottom: 40, left: 45 };
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;
  const barGap = 2;
  const barWidth = Math.max(4, (chartW - barGap * (daily.length - 1)) / daily.length);

  // Lignes de grille Y
  const yTicks = getYTicks(maxValue);

  return (
    <div className="space-y-4">
      {/* Stats cards */}
      <div className="grid grid-cols-3 gap-3">
        <StatCard
          icon={Eye}
          label="Vues totales"
          value={data.totalViews}
          color="text-blue-500"
          bg="bg-blue-500/10"
        />
        <StatCard
          icon={Users}
          label="Visiteurs uniques"
          value={data.uniqueVisitors}
          color="text-emerald-500"
          bg="bg-emerald-500/10"
        />
        <StatCard
          icon={TrendingUp}
          label="Vues aujourd'hui"
          value={data.todayViews}
          color="text-purple-500"
          bg="bg-purple-500/10"
        />
      </div>

      {/* Chart */}
      <div className="admin-card p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            <h2 className="text-base sm:text-lg font-semibold">
              Fréquence de visites
            </h2>
            <span className="text-xs text-muted-foreground ml-1">
              (30 derniers jours)
            </span>
          </div>

          {/* Toggle views/visitors */}
          <div className="flex items-center gap-1 bg-muted/50 rounded-lg p-0.5">
            <button
              onClick={() => setMode("views")}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                mode === "views"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Eye className="h-3 w-3 inline mr-1" />
              Vues
            </button>
            <button
              onClick={() => setMode("visitors")}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                mode === "visitors"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Users className="h-3 w-3 inline mr-1" />
              Visiteurs
            </button>
          </div>
        </div>

        {/* SVG Chart */}
        <div className="overflow-x-auto">
          <svg
            ref={chartRef}
            viewBox={`0 0 ${width} ${height}`}
            className="w-full min-w-[500px]"
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Lignes de grille */}
            {yTicks.map((tick) => {
              const y = padding.top + chartH - (tick / maxValue) * chartH;
              return (
                <g key={tick}>
                  <line
                    x1={padding.left}
                    y1={y}
                    x2={width - padding.right}
                    y2={y}
                    stroke="currentColor"
                    strokeOpacity={0.08}
                    strokeDasharray="4 4"
                  />
                  <text
                    x={padding.left - 8}
                    y={y + 4}
                    textAnchor="end"
                    className="fill-muted-foreground"
                    fontSize={10}
                  >
                    {tick}
                  </text>
                </g>
              );
            })}

            {/* Ligne de base */}
            <line
              x1={padding.left}
              y1={padding.top + chartH}
              x2={width - padding.right}
              y2={padding.top + chartH}
              stroke="currentColor"
              strokeOpacity={0.15}
            />

            {/* Barres */}
            {daily.map((d, i) => {
              const value = mode === "views" ? d.views : d.visitors;
              const barH = (value / maxValue) * chartH;
              const x = padding.left + i * (barWidth + barGap);
              const y = padding.top + chartH - barH;
              const isHovered = hoveredIndex === i;
              const isToday = i === daily.length - 1;

              return (
                <g
                  key={d.date}
                  onMouseEnter={() => setHoveredIndex(i)}
                  className="cursor-pointer"
                >
                  {/* Zone de hover invisible (plus large) */}
                  <rect
                    x={x - barGap / 2}
                    y={padding.top}
                    width={barWidth + barGap}
                    height={chartH}
                    fill="transparent"
                  />

                  {/* Barre */}
                  <rect
                    x={x}
                    y={value > 0 ? y : padding.top + chartH - 1}
                    width={barWidth}
                    height={value > 0 ? barH : 1}
                    rx={Math.min(barWidth / 2, 3)}
                    className={`transition-opacity duration-150 ${
                      isHovered
                        ? "opacity-100"
                        : isToday
                        ? "opacity-90"
                        : "opacity-60"
                    }`}
                    fill={
                      isToday
                        ? "hsl(var(--primary))"
                        : mode === "views"
                        ? "hsl(var(--primary) / 0.7)"
                        : "hsl(142 76% 46%)"
                    }
                  />

                  {/* Label date (tous les 5 jours + dernier) */}
                  {(i % 5 === 0 || i === daily.length - 1) && (
                    <text
                      x={x + barWidth / 2}
                      y={height - 8}
                      textAnchor="middle"
                      className="fill-muted-foreground"
                      fontSize={9}
                    >
                      {formatDateShort(d.date)}
                    </text>
                  )}

                  {/* Tooltip au survol */}
                  {isHovered && (
                    <g>
                      <rect
                        x={Math.min(x - 30, width - padding.right - 80)}
                        y={Math.max(y - 38, 2)}
                        width={80}
                        height={30}
                        rx={6}
                        className="fill-foreground"
                        fillOpacity={0.9}
                      />
                      <text
                        x={Math.min(x - 30, width - padding.right - 80) + 40}
                        y={Math.max(y - 38, 2) + 13}
                        textAnchor="middle"
                        className="fill-background"
                        fontSize={9}
                        fontWeight={500}
                      >
                        {formatDateFull(d.date)}
                      </text>
                      <text
                        x={Math.min(x - 30, width - padding.right - 80) + 40}
                        y={Math.max(y - 38, 2) + 25}
                        textAnchor="middle"
                        className="fill-background"
                        fontSize={10}
                        fontWeight={700}
                      >
                        {value} {mode === "views" ? "vue" : "visiteur"}
                        {value > 1 ? "s" : ""}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Top pages */}
      {data.topPages.length > 0 && (
        <div className="admin-card p-4 sm:p-6">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="h-5 w-5 text-primary" />
            <h2 className="text-base font-semibold">Pages les plus visitées</h2>
          </div>
          <div className="space-y-2">
            {data.topPages.map((page, i) => {
              const percent =
                data.totalViews > 0
                  ? Math.round((page.count / data.totalViews) * 100)
                  : 0;
              return (
                <div key={page.path} className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground w-5 text-right font-mono">
                    {i + 1}.
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium truncate">
                        {page.path}
                      </span>
                      <span className="text-xs text-muted-foreground ml-2 shrink-0">
                        {page.count} ({percent}%)
                      </span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all duration-500"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  color,
  bg,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number;
  color: string;
  bg: string;
}) {
  return (
    <div className="admin-card p-4">
      <div className="flex items-center gap-2 mb-2">
        <div className={`p-2 rounded-lg ${bg}`}>
          <Icon className={`h-4 w-4 ${color}`} />
        </div>
      </div>
      <p className="text-xl sm:text-2xl font-bold">{value.toLocaleString("fr-FR")}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}

function getYTicks(max: number): number[] {
  if (max <= 5) return Array.from({ length: max + 1 }, (_, i) => i);
  const step = Math.ceil(max / 5);
  const ticks: number[] = [];
  for (let i = 0; i <= max; i += step) ticks.push(i);
  if (ticks[ticks.length - 1] < max) ticks.push(Math.ceil(max));
  return ticks;
}

function formatDateShort(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return `${d.getDate()}/${d.getMonth() + 1}`;
}

function formatDateFull(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  const months = [
    "jan", "fév", "mar", "avr", "mai", "juin",
    "juil", "août", "sep", "oct", "nov", "déc",
  ];
  return `${d.getDate()} ${months[d.getMonth()]}`;
}
