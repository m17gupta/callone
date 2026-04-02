import {cookies} from "next/headers";
import {AdminShell} from "@/components/layout/AdminShell";
import {requireAdminSession} from "@/lib/auth/session";
import {resolveViewRole} from "@/lib/auth/view-role";

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireAdminSession();
  const viewRole = resolveViewRole(
    session.user.role,
    cookies().get("callone-view-role")?.value
  );

  return (
    <AdminShell
      user={{
        name: session.user.name,
        email: session.user.email,
        role: session.user.role,
        viewRole,
      }}
    >
      {children}
    </AdminShell>
  );
}
