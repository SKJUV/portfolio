"use client";

import AnalyticsChart from "@/components/AnalyticsChart";

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Analytics</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Statistiques de fréquentation du site — 30 derniers jours
        </p>
      </div>

      <AnalyticsChart />
    </div>
  );
}
