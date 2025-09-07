import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard - GTO Poker AI Assistant",
  description: "Admin portal for managing the GTO Poker AI Assistant platform",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {children}
    </div>
  );
}