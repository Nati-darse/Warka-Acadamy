
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Classes from "./TeacherClasses";
import Students from "./TeacherGrades";
import Assignments from "./TeacherAssignments";
import Announcements from "./TeacherAnnouncements";
import Schedule from "./TeacherSchedule";
import Profile from "./TeacherProfile";

const TeacherRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}>
        <Route path="classes" element={<Classes />} />
        <Route path="students" element={<Students />} />
        <Route path="assignments" element={<Assignments />} />
        <Route path="announcements" element={<Announcements />} />
        <Route path="schedule" element={<Schedule />} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
  );
};

export default TeacherRoutes;
