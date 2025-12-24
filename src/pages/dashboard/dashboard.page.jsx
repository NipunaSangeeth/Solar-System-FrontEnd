import { Card } from "@/components/ui/card";
import React from "react";

const DashboardPage = () => {
  return (
    <main className="mt-4">
      <h1 className="text-4xl font-bold text-foreground">Alice's House</h1>
      <div className="mt-8">
        <Card className="rounded-md p-4">
          <h2 className="text-xl font-medium text-foreground">Last 7 Days Energy Production</h2>
        </Card>
      </div>
    </main>
  );
};

export default DashboardPage;
