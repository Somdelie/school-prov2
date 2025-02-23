import { getSchoolBySlug } from "@/actions/admin-actions";
import AdminSidebar from "@/components/admin/AdminSidebar";
import SidebarHeader from "@/components/admin/SidebarHeader";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "School Management System | Admin Dashboard",
  description: "School Management System | Admin Dashboard",
};

const SchoolAdminLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    slug: string;
  };
}) => {
  const { slug } = await params;
  const school = await getSchoolBySlug(slug);
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[180px_1fr] lg:grid-cols-[200px_1fr]">
      <AdminSidebar />
      {/* <SchoolSidebar school={school} /> */}
      <div className="flex w-full overflow-x-hidden flex-col">
        {school ? <SidebarHeader school={school} /> : <div>Loading...</div>}
        <main className="flex flex-1 w-[full] min-h-screen flex-col px-4 py-2 bg-[#e8eaec] dark:bg-gray-900">
          {children}
        </main>
      </div>
    </div>
  );
};
export default SchoolAdminLayout;
