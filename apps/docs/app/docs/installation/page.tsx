import Link from "next/link";
import { CodeBlock } from "@/components/CodeBlock";

const installCode = `npm install @igorao79/uivix`;
const importExample = `import { Button, Input, GradientText } from "@igorao79/uivix";`;

const componentCategories = [
  {
    name: "Button",
    description: "Versatile button with 9 variants, icons, loading state, and pill shape.",
    href: "/docs/components/button",
  },
  {
    name: "Input",
    description: "Text inputs, password fields, search bars, and OTP inputs.",
    href: "/docs/components/input",
  },
  {
    name: "Text Animations",
    description: "Typewriter, gradient, glitch, shimmer, wave, blur, and more.",
    href: "/docs/components/typewriter-text",
  },
  {
    name: "Card",
    description: "Flexible card component for content containers.",
    href: "/docs/components/card",
  },
  {
    name: "Backgrounds",
    description: "Particle, aurora, grid, starfield, waves, and many more animated backgrounds.",
    href: "/docs/components/particle-background",
  },
];

export default function InstallationPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Installation</h1>
      <p className="text-zinc-400 mb-8">
        Get started with UIVIX by installing the package in your project.
      </p>

      <h2 className="text-xl font-semibold mb-4">Install</h2>
      <CodeBlock code={installCode} language="bash" />
      <div className="mb-8" />

      <h2 className="text-xl font-semibold mb-4">Import Components</h2>
      <p className="text-zinc-400 mb-4">
        Import any component directly from the <code className="text-violet-400 bg-zinc-800 px-1.5 py-0.5 rounded text-sm">@igorao79/uivix</code> package.
      </p>
      <CodeBlock code={importExample} />
      <div className="mb-12" />

      <h2 className="text-xl font-semibold mb-4">Open Source</h2>
      <a
        href="https://github.com/igorao79/uivix"
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-4 rounded-lg border border-zinc-800 p-5 mb-12 transition-all hover:border-violet-500/50 hover:bg-zinc-900/50"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-zinc-400 group-hover:text-violet-400 transition-colors shrink-0">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
        </svg>
        <div>
          <h3 className="text-base font-semibold text-zinc-100 group-hover:text-violet-400 transition-colors">
            igorao79/uivix
          </h3>
          <p className="text-sm text-zinc-500">
            Public repository — view source, report issues, and contribute on GitHub.
          </p>
        </div>
        <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-zinc-600 group-hover:text-violet-400 transition-colors ml-auto shrink-0">
          <path fillRule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clipRule="evenodd" />
        </svg>
      </a>

      <h2 className="text-xl font-semibold mb-4">Support UIVIX</h2>
      <div className="rounded-lg border border-violet-500/20 bg-violet-500/5 p-5 mb-12">
        <p className="text-sm text-zinc-300 mb-3">
          Help us grow by adding the <code className="text-violet-400 bg-zinc-800 px-1.5 py-0.5 rounded text-xs">Watermark</code> component to your project. It&apos;s a subtle, semi-transparent badge that links back to UIVIX — helping other developers discover the library.
        </p>
        <CodeBlock code={`import { Watermark } from "@igorao79/uivix";

// Add to your root layout
<Watermark />`} />
        <p className="text-xs text-zinc-500 mt-3">
          Completely optional and non-intrusive. Customizable position, size, and text.
        </p>
      </div>

      <h2 className="text-xl font-semibold mb-4">UIVIX MCP Server</h2>
      <a
        href="https://github.com/igorao79/uivixmcp"
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-4 rounded-lg border border-violet-500/20 bg-violet-500/5 p-5 mb-12 transition-all hover:border-violet-500/40 hover:bg-violet-500/10"
      >
        <div className="w-10 h-10 rounded-lg bg-violet-500/15 flex items-center justify-center shrink-0">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5 text-violet-400">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
          </svg>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-semibold text-zinc-100 group-hover:text-violet-400 transition-colors">
              UIVIX MCP Server
            </h3>
            <span className="px-1.5 py-0.5 text-[10px] font-bold bg-violet-500 text-white rounded-full leading-none">NEW</span>
          </div>
          <p className="text-sm text-zinc-500 mt-0.5">
            We recommend installing our MCP server for Claude Code / Cursor — get AI-powered access to all UIVIX component docs.
          </p>
        </div>
        <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-zinc-600 group-hover:text-violet-400 transition-colors shrink-0">
          <path fillRule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clipRule="evenodd" />
        </svg>
      </a>

      <h2 className="text-xl font-semibold mb-6">Explore Components</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {componentCategories.map((category) => (
          <Link
            key={category.name}
            href={category.href}
            className="group block rounded-lg border border-zinc-800 p-5 transition-all hover:border-violet-500/50 hover:bg-zinc-900/50"
          >
            <h3 className="text-base font-semibold text-zinc-100 mb-1 group-hover:text-violet-400 transition-colors">
              {category.name}
            </h3>
            <p className="text-sm text-zinc-500 leading-relaxed">
              {category.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
