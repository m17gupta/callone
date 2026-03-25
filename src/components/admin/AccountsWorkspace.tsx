import Link from "next/link";
import {DataTable} from "@/components/admin/DataTable";
import {SectionCard} from "@/components/admin/SectionCard";
import {deleteUser, saveUser} from "@/lib/actions/users";

type LookupOption = {
  id: string;
  label: string;
  description?: string;
  roleKey?: string;
};

type AccountRecord = {
  id: string;
  name: string;
  email: string;
  roleId: string;
  roleKey: string;
  roleName: string;
  designation: string;
  managerId: string;
  managerName: string;
  status: string;
  assignedBrandIds: string[];
  assignedWarehouseIds: string[];
  assignedBrandLabels: string[];
  assignedWarehouseLabels: string[];
};

export function AccountsWorkspace({
  title,
  description,
  users,
  roles,
  brands,
  warehouses,
  managers,
  roleFilter,
  returnTo,
}: {
  title: string;
  description: string;
  users: AccountRecord[];
  roles: LookupOption[];
  brands: LookupOption[];
  warehouses: LookupOption[];
  managers: LookupOption[];
  roleFilter?: string[];
  returnTo?: string;
}) {
  const availableRoles = roleFilter?.length
    ? roles.filter((role) => roleFilter.includes(role.roleKey ?? ""))
    : roles;

  const defaultRoleId = availableRoles[0]?.id ?? "";

  return (
    <div className="space-y-4">
      <section className="premium-card overflow-hidden rounded-[28px]">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border/60 px-4 py-4">
          <div className="space-y-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-foreground/42">
              Accounts
            </p>
            <h2 className="text-[1.85rem] font-semibold tracking-tight text-foreground">
              {title}
            </h2>
            <p className="max-w-3xl text-sm text-foreground/62">{description}</p>
          </div>

          <Link
            href="/api/admin/export/users"
            className="rounded-2xl border border-border/70 bg-background px-4 py-3 text-sm font-semibold text-foreground/76"
          >
            Export accounts
          </Link>
        </div>

        <div className="grid gap-4 px-4 py-4 md:grid-cols-3">
          <AccountSummary label="Visible accounts" value={String(users.length)} />
          <AccountSummary
            label="Active"
            value={String(users.filter((user) => user.status === "active").length)}
          />
          <AccountSummary
            label="Roles covered"
            value={String(new Set(users.map((user) => user.roleKey)).size)}
          />
        </div>
      </section>

      <SectionCard title="Create account" description="Add a new account directly into the selected role group.">
        <form action={saveUser} className="grid gap-4 lg:grid-cols-2">
          <input type="hidden" name="redirectTo" value={returnTo ?? "/admin/accounts/all"} />
          <input type="hidden" name="status" value="active" />
          <label className="block">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-foreground/45">Name</span>
            <input name="name" className="w-full rounded-2xl border border-border/70 bg-background px-4 py-3 text-sm outline-none" required />
          </label>
          <label className="block">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-foreground/45">Email</span>
            <input name="email" type="email" className="w-full rounded-2xl border border-border/70 bg-background px-4 py-3 text-sm outline-none" required />
          </label>
          <label className="block">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-foreground/45">Password</span>
            <input name="password" type="password" className="w-full rounded-2xl border border-border/70 bg-background px-4 py-3 text-sm outline-none" required />
          </label>
          <label className="block">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-foreground/45">Role</span>
            <select
              name="roleId"
              defaultValue={defaultRoleId}
              className="w-full rounded-2xl border border-border/70 bg-background px-4 py-3 text-sm outline-none"
              required
            >
              {availableRoles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.label}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-foreground/45">Designation</span>
            <input name="designation" className="w-full rounded-2xl border border-border/70 bg-background px-4 py-3 text-sm outline-none" />
          </label>
          <label className="block">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-foreground/45">Manager</span>
            <select name="managerId" className="w-full rounded-2xl border border-border/70 bg-background px-4 py-3 text-sm outline-none">
              <option value="">No manager</option>
              {managers.map((manager) => (
                <option key={manager.id} value={manager.id}>{manager.label}</option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-foreground/45">Phone</span>
            <input name="phone" className="w-full rounded-2xl border border-border/70 bg-background px-4 py-3 text-sm outline-none" />
          </label>
          <label className="block">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-foreground/45">Code</span>
            <input name="code" className="w-full rounded-2xl border border-border/70 bg-background px-4 py-3 text-sm outline-none" />
          </label>
          <label className="block lg:col-span-2">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-foreground/45">Address</span>
            <textarea name="address" rows={3} className="w-full rounded-2xl border border-border/70 bg-background px-4 py-3 text-sm outline-none" />
          </label>
          <label className="block">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-foreground/45">Assigned brands</span>
            <select name="assignedBrandIds" multiple size={4} className="w-full rounded-2xl border border-border/70 bg-background px-4 py-3 text-sm outline-none">
              {brands.map((brand) => (
                <option key={brand.id} value={brand.id}>{brand.label}</option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-foreground/45">Assigned warehouses</span>
            <select name="assignedWarehouseIds" multiple size={4} className="w-full rounded-2xl border border-border/70 bg-background px-4 py-3 text-sm outline-none">
              {warehouses.map((warehouse) => (
                <option key={warehouse.id} value={warehouse.id}>{warehouse.label}</option>
              ))}
            </select>
          </label>
          <div className="lg:col-span-2 flex justify-end">
            <button type="submit" className="rounded-2xl bg-primary px-5 py-3 text-sm font-semibold text-white">Save account</button>
          </div>
        </form>
      </SectionCard>

      <SectionCard title="Account list">
        <DataTable headers={["Account", "Role", "Manager", "Brands", "Warehouses", "Status", "Actions"]}>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="px-4 py-4">
                <div className="font-semibold text-foreground">{user.name}</div>
                <p className="text-xs text-foreground/55">{user.email}</p>
              </td>
              <td className="px-4 py-4 text-sm text-foreground/70">
                <div className="font-medium text-foreground">{user.roleName}</div>
                <p className="text-xs text-foreground/55">{user.designation || "No designation"}</p>
              </td>
              <td className="px-4 py-4 text-sm text-foreground/70">{user.managerName || "None"}</td>
              <td className="px-4 py-4 text-sm text-foreground/70">
                {user.assignedBrandLabels.length ? user.assignedBrandLabels.join(", ") : "None"}
              </td>
              <td className="px-4 py-4 text-sm text-foreground/70">
                {user.assignedWarehouseLabels.length
                  ? user.assignedWarehouseLabels.join(", ")
                  : "None"}
              </td>
              <td className="px-4 py-4 text-sm text-foreground/70">{user.status}</td>
              <td className="px-4 py-4">
                <div className="flex items-center gap-3">
                  {user.roleKey === "retailer" ? (
                    <Link
                      href={`/admin/cart?retailerId=${user.id}&managerId=${user.managerId}&brandId=${user.assignedBrandIds[0] ?? ""}`}
                      className="text-sm font-semibold text-emerald-600"
                    >
                      Order
                    </Link>
                  ) : null}
                  <Link href={`/admin/users/${user.id}/edit`} className="text-sm font-semibold text-primary">Edit</Link>
                  <form action={deleteUser}>
                    <input type="hidden" name="id" value={user.id} />
                    <input type="hidden" name="redirectTo" value={returnTo ?? "/admin/accounts/all"} />
                    <button type="submit" className="text-sm font-semibold text-danger">Delete</button>
                  </form>
                </div>
              </td>
            </tr>
          ))}
        </DataTable>
      </SectionCard>
    </div>
  );
}

function AccountSummary({label, value}: {label: string; value: string}) {
  return (
    <div className="premium-card rounded-[22px] p-4 transition duration-200 hover:-translate-y-1">
      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-foreground/45">
        {label}
      </p>
      <p className="mt-3 text-[2rem] font-semibold tracking-tight text-foreground">{value}</p>
    </div>
  );
}
