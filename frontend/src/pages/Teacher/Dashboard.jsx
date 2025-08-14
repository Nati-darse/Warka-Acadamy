import { Outlet, NavLink } from "react-router-dom";

export default function TeacherDashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-800 text-white flex flex-col p-4">
        <h2 className="text-2xl font-bold mb-6">Teacher Panel</h2>
        <nav className="flex flex-col space-y-2">
          <NavLink to="classes" className="hover:bg-blue-700 p-2 rounded">Classes</NavLink>
          <NavLink to="grades" className="hover:bg-blue-700 p-2 rounded">Grades</NavLink>
          <NavLink to="assignments" className="hover:bg-blue-700 p-2 rounded">Assignments</NavLink>
          <NavLink to="announcements" className="hover:bg-blue-700 p-2 rounded">Announcements</NavLink>
          <NavLink to="schedule" className="hover:bg-blue-700 p-2 rounded">Schedule</NavLink>
          <NavLink to="profile" className="hover:bg-blue-700 p-2 rounded">Profile</NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
