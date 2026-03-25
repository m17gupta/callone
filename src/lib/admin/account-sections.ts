export type AccountSection = {
  slug: string;
  label: string;
  description: string;
  roleKeys: string[];
};

export const ACCOUNT_SECTIONS: AccountSection[] = [
  {
    slug: "all",
    label: "All Accounts",
    description: "Full list of workspace accounts across every role.",
    roleKeys: ["super_admin", "admin", "manager", "sales_rep", "retailer"],
  },
  {
    slug: "admins",
    label: "Admins",
    description: "Leadership and platform support accounts.",
    roleKeys: ["super_admin", "admin"],
  },
  {
    slug: "managers",
    label: "Managers",
    description: "Regional approval and team management accounts.",
    roleKeys: ["manager"],
  },
  {
    slug: "sales-representatives",
    label: "Sales Representatives",
    description: "Field sales users handling daily order work.",
    roleKeys: ["sales_rep"],
  },
  {
    slug: "retailers",
    label: "Retailers",
    description: "Retail partner accounts assigned into the workspace.",
    roleKeys: ["retailer"],
  },
];

export function getAccountSection(slug: string) {
  return ACCOUNT_SECTIONS.find((section) => section.slug === slug);
}
