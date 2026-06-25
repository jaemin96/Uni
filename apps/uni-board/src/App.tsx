import { useState } from "react";
import { CleanTab } from "./components/CleanTab";
import { Sidebar } from "./components/Sidebar";

type TabId = "clean";

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>("clean");

  return (
    <div className="flex min-h-screen">
      <Sidebar activeTab={activeTab} onTabChange={(t) => setActiveTab(t as TabId)} />
      <main className="flex flex-1">{activeTab === "clean" && <CleanTab />}</main>
    </div>
  );
}
