import type {RoleKey} from "@/lib/auth/permissions";

export const VIEW_ROLE_LABELS: Record<RoleKey, string> = {
  super_admin: "Super Admin",
  admin: "Admin",
  manager: "Manager",
  sales_rep: "Sales Representative",
  retailer: "Retailer",
};

const VIEW_ROLE_ACCESS: Record<RoleKey, RoleKey[]> = {
  super_admin: ["super_admin", "admin", "manager", "sales_rep", "retailer"],
  admin: ["admin", "manager", "sales_rep", "retailer"],
  manager: ["manager", "sales_rep", "retailer"],
  sales_rep: ["sales_rep", "retailer"],
  retailer: ["retailer"],
};

export function getAvailableViewRoles(role: string): RoleKey[] {
  return VIEW_ROLE_ACCESS[role as RoleKey] ?? ["admin"];
}

export function resolveViewRole(role: string, requestedRole?: string | null): RoleKey {
  const availableRoles = getAvailableViewRoles(role);
  if (requestedRole && availableRoles.includes(requestedRole as RoleKey)) {
    return requestedRole as RoleKey;
  }

  return availableRoles[0];
}
