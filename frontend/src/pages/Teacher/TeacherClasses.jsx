import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function TeacherClasses() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["teacherClasses"],
    queryFn: async () => {
      const res = await axios.get("/api/teacher/classes");
      return res.data;
    },
  });

  if (isLoading) return <p>Loading classes...</p>;
  if (error) return <p>Error fetching classes.</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My Classes</h1>
      <ul className="space-y-3">
        {data.map((cls) => (
          <li key={cls._id} className="p-4 bg-white rounded shadow">
            <h2 className="text-lg font-semibold">{cls.subject}</h2>
            <p>Grade: {cls.gradeLevel}</p>
            <p>Students: {cls.students.length}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
