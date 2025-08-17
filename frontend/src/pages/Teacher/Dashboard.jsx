
import { NavLink, Outlet } from "react-router-dom";

const TeacherDashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-4">
        <h2 className="text-xl font-bold mb-6">Teacher Dashboard</h2>
        <nav className="flex flex-col gap-3">
          <NavLink
            to="classes"
            className={({ isActive }) =>
              `p-2 rounded ${isActive ? "bg-blue-500 text-white" : "hover:bg-gray-200"}`
            }
          >
            Classes
          </NavLink>
          <NavLink
            to="students"
            className={({ isActive }) =>
              `p-2 rounded ${isActive ? "bg-blue-500 text-white" : "hover:bg-gray-200"}`
            }
          >
            Students
          </NavLink>
          <NavLink
            to="assignments"
            className={({ isActive }) =>
              `p-2 rounded ${isActive ? "bg-blue-500 text-white" : "hover:bg-gray-200"}`
            }
          >
            Assignments
          </NavLink>
          <NavLink
            to="announcements"
            className={({ isActive }) =>
              `p-2 rounded ${isActive ? "bg-blue-500 text-white" : "hover:bg-gray-200"}`
            }
          >
            Announcements
          </NavLink>
          <NavLink
            to="schedule"
            className={({ isActive }) =>
              `p-2 rounded ${isActive ? "bg-blue-500 text-white" : "hover:bg-gray-200"}`
            }
          >
            Schedule
          </NavLink>
          <NavLink
            to="profile"
            className={({ isActive }) =>
              `p-2 rounded ${isActive ? "bg-blue-500 text-white" : "hover:bg-gray-200"}`
            }
          >
            Profile
          </NavLink>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet /> {/* This is where child routes will render */}
      </main>
    </div>
  );
};

export default TeacherDashboard;
