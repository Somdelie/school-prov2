interface SchoolProps {
  id: string;
  slug: string;
  schoolName: string;
}

const SchoolHeader = ({ school }: { school: SchoolProps }) => {
  return (
    <div>
      <h1>{school?.schoolName}</h1>
    </div>
  );
};
export default SchoolHeader;
