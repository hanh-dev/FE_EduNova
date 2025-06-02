import {
  Home,
  BookOpen,
  Bell,
  User,
  Settings,
  LogOut,
  Trophy,
  Target,
  CalendarCheck,
  Building2,
  Users,
  GraduationCap,
  Presentation,
} from 'lucide-react';

const sidebarItems = [
  { label: 'Dashboard', icon: <Home size={20} />, href: '/' },
  { label: 'Semester goals', icon: <Target size={20} />, href: '/semester-goals' },
  { label: 'Study Plans', icon: <BookOpen size={20} />, href: '/study-plans' },
  { label: 'Notifications', icon: <Bell size={20} />, total: 3, href: '/notification' },
  { label: 'Academic achievement', icon: <Trophy size={20} />, href: '/achievement' },
  { label: 'Logout', icon: <LogOut size={20} />, isLogout: true, href: '/login' },
];

const sidebarItemsAdmin = [
  { label: 'Dashboard', icon: <Home size={20} />, href: '/' },
  { label: 'Class Management', icon: <Building2 size={20} />, href: '/class-management' },
  { label: 'Teacher Management', icon: <Presentation size={20} />, href: '/teacher-management' },
  { label: 'Student Management', icon: <Users size={20} />, href: '/student-management' },
];

export { sidebarItems, sidebarItemsAdmin };