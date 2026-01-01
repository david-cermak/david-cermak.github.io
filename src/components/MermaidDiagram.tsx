import { useEffect, useId, useMemo, useState } from 'react';
import mermaid from 'mermaid';

let mermaidInitialized = false;

function ensureMermaidInitialized() {
  if (mermaidInitialized) {
    return;
  }

  mermaid.initialize({
    startOnLoad: false,
    securityLevel: 'strict',
    theme: 'dark',
  });

  mermaidInitialized = true;
}

export function MermaidDiagram(props: { chart: string }) {
  const source = useMemo(() => props.chart.trimEnd(), [props.chart]);
  const reactId = useId();
  const renderId = useMemo(
    () => `mermaid-${reactId.replaceAll(':', '')}`,
    [reactId],
  );

  const [svg, setSvg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    ensureMermaidInitialized();

    let cancelled = false;
    setSvg(null);
    setError(null);

    async function run() {
      try {
        const result = await mermaid.render(renderId, source);
        if (!cancelled) {
          setSvg(result.svg);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : String(err));
        }
      }
    }

    if (source.length > 0) {
      void run();
    }

    return () => {
      cancelled = true;
    };
  }, [renderId, source]);

  if (error) {
    return (
      <div className="mermaid-diagram mermaid-diagram-error">
        <pre>
          <code className="language-mermaid">{source}</code>
        </pre>
        <p className="mermaid-diagram-error-message">Mermaid render error: {error}</p>
      </div>
    );
  }

  if (!svg) {
    return (
      <div className="mermaid-diagram mermaid-diagram-loading">
        <pre>
          <code className="language-mermaid">{source}</code>
        </pre>
      </div>
    );
  }

  return (
    <div className="mermaid-diagram" dangerouslySetInnerHTML={{ __html: svg }} />
  );
}


