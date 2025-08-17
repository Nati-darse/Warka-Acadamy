import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function TeacherClasses() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["teacherClasses"],
    queryFn: async () => {
      const res = await axios.get("/api/teacher/classes");
      // Ensure it always returns an array
      return Array.isArray(res.data) ? res.data : res.data.classes || [];
    },
  });

  if (isLoading) return <p>Loading classes...</p>;
  if (error) return <p>Error fetching classes.</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My Classes</h1>
      {data.length === 0 ? (
        <p>No classes found.</p>
      ) : (
        <ul className="space-y-4">
          {data.map((cls) => (
            <li key={cls._id} className="p-4 bg-white rounded shadow">
              <h2 className="text-lg font-semibold">{cls.subject}</h2>
              <p>Grade: {cls.gradeLevel}</p>
              <p>Students: {cls.students?.length || 0}</p>
              <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded">
                Manage Attendance
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
