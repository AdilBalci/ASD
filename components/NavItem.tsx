import { LucideIcon } from 'lucide-react';
import Link from 'next/link';

interface NavItemProps {
  href: string;
  icon: LucideIcon;
  label: string;
  active?: boolean;
}

export function NavItem({ href, icon: Icon, label, active }: NavItemProps) {
  return (
    <Link
      href={href}
      aria-current={active ? 'page' : undefined}
      className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 ${
        active
          ? 'bg-blue-600 text-white'
          : 'text-gray-300 hover:bg-gray-800 hover:text-white'
      }`}
    >
      <Icon size={20} aria-hidden="true" />
      <span>{label}</span>
    </Link>
  );
}
