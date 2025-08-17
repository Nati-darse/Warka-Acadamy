import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function TeacherAssignments() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["teacherAssignments"],
    queryFn: async () => {
      const res = await axios.get("/api/teacher/assignments");
      return array.isArray(res.data) ? res.data : res.class.array || [] ;
    },
  });

  if (isLoading) return <p>Loading assignments...</p>;
  if (error) return <p>Error fetching assignments.</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Assignments</h1>
      <button className="mb-4 bg-green-600 text-white px-4 py-2 rounded">
        + New Assignment
      </button>
      <ul className="space-y-4">
        {data?.map((a) => (
          <li key={a._id} className="p-4 bg-white rounded shadow">
            <h2 className="font-semibold">{a.title}</h2>
            <p>{a.description}</p>
            <p>Due: {new Date(a.dueDate).toLocaleDateString()}</p>
            <button className="mt-2 bg-blue-600 text-white px-3 py-1 rounded">
              View Submissions
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
