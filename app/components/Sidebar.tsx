"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import {
  CalendarDays, LayoutDashboard, ListChecks, BookOpen, Mail, ClipboardList,
  Library, Scale, GraduationCap, StickyNote, Compass, Monitor, Menu, X,
} from "lucide-react";

type Item = { href: string; label: string; icon: React.ComponentType<{ size?: number; className?: string }> };
type Group = { id: string; label: string; items: Item[] };

const GROUPS: Group[] = [
  {
    id: "daily",
    label: "Daily",
    items: [
      { href: "/",         label: "Dashboard", icon: LayoutDashboard },
      { href: "/calendar", label: "Calendar",  icon: CalendarDays },
      { href: "/periods",  label: "Periods",   icon: ListChecks },
    ],
  },
  {
    id: "do",
    label: "Do",
    items: [
      { href: "/templates",   label: "Templates",   icon: Mail },
      { href: "/testvision",  label: "TestVision",  icon: Monitor },
      { href: "/checklists",  label: "Checklists",  icon: ClipboardList },
      { href: "/notes",       label: "Notes",        icon: StickyNote },
    ],
  },
  {
    id: "know",
    label: "Know",
    items: [
      { href: "/overview",    label: "Overview",    icon: Compass },
      { href: "/procedures",  label: "Procedures",  icon: BookOpen },
      { href: "/regulations", label: "Regulations", icon: Scale },
      { href: "/glossary",    label: "Glossary",    icon: GraduationCap },
      { href: "/reference",   label: "Reference",   icon: Library },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  // Close sidebar on route change (mobile)
  useEffect(() => { setOpen(false); }, [pathname]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open]);

  // Lock body scroll when mobile sidebar is open
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const navContent = (
    <>
      {/* Brand stripe */}
      <div className="h-[3px] bg-gradient-to-r from-[var(--um-light-blue)] via-[var(--um-dark-blue)] to-[var(--um-orange)]" />

      {/* Wordmark */}
      <div className="px-6 pt-7 pb-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="rounded-lg bg-white p-1 shadow-[var(--shadow-sm)] ring-1 ring-[var(--border)] shrink-0">
            <Image src="/msp-logo.png" alt="MSP" width={36} height={36} className="h-9 w-9 object-contain" />
          </div>
          <div className="min-w-0">
            <div className="font-display text-base leading-none text-[var(--um-orange)]">MSP</div>
            <div className="font-display text-[22px] leading-none tracking-tight text-[var(--brand)] mt-1.5">
              Exams Office<span className="text-[var(--um-orange)]">.</span>
            </div>
          </div>
        </Link>
        {/* Close button — mobile only */}
        <button
          onClick={() => setOpen(false)}
          className="md:hidden text-[var(--muted)] hover:text-[var(--brand)] p-1"
          aria-label="Close menu"
        >
          <X size={20} />
        </button>
      </div>

      {/* Nav groups */}
      <div className="flex-1 overflow-y-auto px-3 pb-4">
        {GROUPS.map((g, gi) => (
          <div key={g.id} className={gi > 0 ? "mt-6" : ""}>
            <div className="px-3 mb-1.5 flex items-center gap-2">
              <span className="section-marker !text-[var(--um-gray-400)] !text-[10px]">{String(gi + 1).padStart(2, "0")}</span>
              <span className="label-caps !text-[10px] !tracking-[0.2em]">{g.label}</span>
              <span className="flex-1 h-px bg-[var(--border)]" />
            </div>
            <ul className="space-y-0.5">
              {g.items.map(({ href, label, icon: Icon }) => {
                const active = isActive(href);
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      className={`relative flex items-center gap-3 rounded-lg pl-4 pr-3 py-2 text-[13px] transition-all ${
                        active
                          ? "bg-[var(--brand-soft)] text-[var(--brand)] font-semibold"
                          : "text-[var(--um-gray-700)] hover:bg-[var(--um-gray-100)] hover:text-[var(--brand)]"
                      }`}
                    >
                      <span
                        className={`absolute left-0 top-1/2 -translate-y-1/2 h-5 w-[3px] rounded-r-full transition-all ${
                          active ? "bg-[var(--um-orange)]" : "bg-transparent"
                        }`}
                      />
                      <Icon
                        size={15}
                        className={`shrink-0 transition-colors ${active ? "text-[var(--brand)]" : "text-[var(--um-gray-400)]"}`}
                      />
                      <span>{label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-[var(--border)]">
        <Image src="/um-logo.png" alt="Maastricht University" width={150} height={36} className="h-6 w-auto object-contain opacity-70" />
        <div className="mt-3 label-caps !text-[9px] !tracking-[0.14em] leading-relaxed text-[var(--um-gray-400)]">
          Faculty of Science & Engineering<br />
          2025–2026
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-30 bg-[var(--card)] border-b border-[var(--border)] no-print">
        <div className="h-[3px] bg-gradient-to-r from-[var(--um-light-blue)] via-[var(--um-dark-blue)] to-[var(--um-orange)]" />
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="text-[var(--brand)] hover:text-[var(--um-orange)] transition-colors"
            >
              <Menu size={22} />
            </button>
            <Link href="/" className="flex items-center gap-2">
              <div className="rounded-md bg-white p-0.5 shadow-[var(--shadow-sm)] ring-1 ring-[var(--border)]">
                <Image src="/msp-logo.png" alt="MSP" width={28} height={28} className="h-7 w-7 object-contain" />
              </div>
              <span className="font-display text-lg text-[var(--brand)] leading-none tracking-tight">
                Exams Office<span className="text-[var(--um-orange)]">.</span>
              </span>
            </Link>
          </div>
          {/* Current page indicator */}
          <div className="label-caps !text-[9px]">
            {GROUPS.flatMap(g => g.items).find(i => isActive(i.href))?.label ?? ""}
          </div>
        </div>
      </div>

      {/* Mobile backdrop */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="md:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-sm no-print"
        />
      )}

      {/* Desktop: static sidebar. Mobile: slide-in drawer */}
      <nav
        className={`
          no-print bg-[var(--card)] border-r border-[var(--border)] flex flex-col
          fixed top-0 h-screen z-50 w-72
          transition-transform duration-300 ease-out
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:w-64 md:shrink-0 md:sticky
        `}
      >
        {navContent}
      </nav>
    </>
  );
}
