import { getSchoolBySlug } from "@/actions/admin-actions";

const SchoolAdmin = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  const school = await getSchoolBySlug(slug);
  return (
    <div>
      <h1>School Admin</h1>
      <h2>{school?.schoolName}</h2>
    </div>
  );
};

export default SchoolAdmin;
