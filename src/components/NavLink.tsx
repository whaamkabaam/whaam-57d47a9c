// ============================================
// NavLink Component - Active route highlighting
// ============================================

import { NavLink as RouterNavLink, NavLinkProps as RouterNavLinkProps } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface NavLinkProps extends Omit<RouterNavLinkProps, 'className'> {
  className?: string;
  activeClassName?: string;
}

export function NavLink({ className, activeClassName, ...props }: NavLinkProps) {
  return (
    <RouterNavLink
      className={({ isActive }) =>
        cn(className, isActive && activeClassName)
      }
      {...props}
    />
  );
}
