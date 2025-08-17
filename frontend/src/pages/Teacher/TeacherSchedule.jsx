import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function TeacherSchedule() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["teacherSchedule"],
    queryFn: async () => {
      const res = await axios.get("/api/teacher/schedule");
      return Array.isArray (res.data)? res.data : res.class.array || [];
    },
  });

  if (isLoading) return <p>Loading schedule...</p>;
  if (error) return <p>Error fetching schedule.</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My Schedule</h1>
      <ul className="space-y-3">
        {data?.map((s) => (
          <li key={s._id} className="p-4 bg-white rounded shadow">
            <p>
              {s.day} — {s.time} | {s.subject} (Grade {s.gradeLevel})
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
