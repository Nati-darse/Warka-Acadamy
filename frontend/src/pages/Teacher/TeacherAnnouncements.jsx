import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function TeacherAnnouncements() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["teacherAnnouncements"],
    queryFn: async () => {
      const res = await axios.get("/api/teacher/announcements");
      return Array.isArray(res.data)? res.data: res.class.array || [];
    },
  });

  if (isLoading) return <p>Loading announcements...</p>;
  if (error) return <p>Error fetching announcements.</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Announcements</h1>
      <button className="mb-4 bg-green-600 text-white px-4 py-2 rounded">
        + New Announcement
      </button>
      <ul className="space-y-3">
        {data?.map((ann) => (
          <li key={ann._id} className="p-4 bg-white rounded shadow">
            <h2 className="font-semibold">{ann.title}</h2>
            <p>{ann.message}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
