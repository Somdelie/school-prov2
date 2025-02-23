import { getProfile } from "@/actions/admin-actions";
import NavBar from "@/components/front/common/NavBar";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const profile = await getProfile();

  return (
    <div className="w-full">
      <NavBar profile={profile} />
      <main className="max-w-[90%] mx-auto pt-16 min-h-screen">{children}</main>
    </div>
  );
};
export default layout;
