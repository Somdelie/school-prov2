import { getSchoolBySlug } from "@/actions/admin-actions";
import { getClasses } from "@/actions/school-actions";
import MainParent from "@/components/admin/school/MainParent";

const ClassesPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const school = await getSchoolBySlug(slug);
  const classesData = await getClasses(slug);

  return (
    <div>
      {classesData && school && (
        <MainParent classes={classesData} school={school} />
      )}
    </div>
  );
};

export default ClassesPage;
