import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function TeacherProfile() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["teacherProfile"],
    queryFn: async () => {
      const res = await axios.get("/api/teacher/profile");
      return Array.isArray(res.data) ? res.data : res.class.array || [] ;
    },
  });

  if (isLoading) return <p>Loading profile...</p>;
  if (error) return <p>Error loading profile.</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>
      <form className="space-y-4">
        <input
          type="text"
          defaultValue={data.name}
          className="border p-2 w-full"
        />
        <input
          type="email"
          defaultValue={data.email}
          className="border p-2 w-full"
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Save Changes
        </button>
      </form>
    </div>
  );
}
