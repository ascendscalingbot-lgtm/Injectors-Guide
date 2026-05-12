"use client";

import { useEffect } from "react";

type StaticDashboardPageProps = {
  css: string;
  html: string;
  script: string;
};

export function StaticDashboardPage({ css, html, script }: StaticDashboardPageProps) {
  useEffect(() => {
    if (!script.trim()) return;

    const runDashboardScript = new Function(script);
    runDashboardScript();
  }, [script, html]);

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Newsreader:ital,opsz,wght@0,6..72,400..800;1,6..72,400..800&display=swap"
        rel="stylesheet"
      />
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </>
  );
}
