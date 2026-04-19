"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import MainContent from "@/components/MainContent";
import ExploreContent from "@/components/ExploreContent";
import LibraryContent from "@/components/LibraryContent";
import FilesContent from "@/components/FilesContent";
import HistoryContent from "@/components/HistoryContent";
import WidgetsContent from "@/components/WidgetsContent";
import ThemeContent from "@/components/ThemeContent";
import ProfileContent from "@/components/ProfileContent";

export type ActiveView = "home" | "explore" | "library" | "files" | "history" | "widgets" | "theme" | "profile";

export default function Home() {
  const [chatKey, setChatKey] = useState(0);
  const [activeView, setActiveView] = useState<ActiveView>("home");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleNewChat = () => {
    setChatKey((k) => k + 1);
    setActiveView("home");
  };

  return (
    <div className="flex h-screen">
      <Sidebar
        activeView={activeView}
        onNewChat={handleNewChat}
        onNavigate={setActiveView}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      {activeView === "explore" ? (
        <ExploreContent />
      ) : activeView === "library" ? (
        <LibraryContent />
      ) : activeView === "files" ? (
        <FilesContent />
      ) : activeView === "history" ? (
        <HistoryContent />
      ) : activeView === "widgets" ? (
        <WidgetsContent />
      ) : activeView === "theme" ? (
        <ThemeContent />
      ) : activeView === "profile" ? (
        <ProfileContent />
      ) : (
        <MainContent key={chatKey} />
      )}
    </div>
  );
}
