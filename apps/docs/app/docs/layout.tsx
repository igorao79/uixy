import { Sidebar } from "@/components/Sidebar";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 px-4 py-6 pt-14 md:pt-8 md:px-8 max-w-4xl overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
