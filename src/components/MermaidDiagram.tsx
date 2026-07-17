"use client";

import { useEffect, useId, useState } from "react";
import { useTheme } from "next-themes";

type MermaidDiagramProps = {
  source: string;
};

export function MermaidDiagram({ source }: MermaidDiagramProps) {
  const id = useId().replace(/:/g, "");
  const { resolvedTheme } = useTheme();
  const [svg, setSvg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function render() {
      try {
        const mermaid = (await import("mermaid")).default;
        mermaid.initialize({
          startOnLoad: false,
          theme: resolvedTheme === "dark" ? "dark" : "default",
          themeVariables: {
            fontFamily: "ui-sans-serif, system-ui, sans-serif",
            fontSize: "14px",
          },
          securityLevel: "loose",
        });
        const { svg: rendered } = await mermaid.render(`mermaid-${id}`, source);
        if (!cancelled) {
          setSvg(rendered);
          setError(null);
        }
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "Failed to render diagram");
        }
      }
    }
    render();
    return () => {
      cancelled = true;
    };
  }, [source, resolvedTheme, id]);

  if (error) {
    return (
      <div className="border border-red-500/30 bg-red-500/5 p-4 text-xs text-red-600 dark:text-red-400">
        <p className="font-mono">Diagram failed to render: {error}</p>
      </div>
    );
  }

  if (!svg) {
    return <div className="h-64 animate-pulse bg-black/[0.02] dark:bg-white/[0.02]" />;
  }

  return (
    <div
      className="mermaid-container overflow-x-auto rounded border border-black/[0.06] bg-white p-4 dark:border-white/[0.06] dark:bg-black"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
