import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function TeacherGrades() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["teacherGrades"],
    queryFn: async () => {
      const res = await axios.get("/api/teacher/grades");
       return Array.isArray(res.data) ? res.data : res.data.classes || [];
    },
  });

  if (isLoading) return <p>Loading grades...</p>;
  if (error) return <p>Error fetching grades.</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Grades</h1>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Student</th>
            <th className="p-2">Subject</th>
            <th className="p-2">Grade</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((g) => (
            <tr key={g._id} className="border-b">
              <td className="p-2">{g.studentName}</td>
              <td className="p-2">{g.subject}</td>
              <td className="p-2">{g.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
