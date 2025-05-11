import Swal from 'sweetalert2';
import { logout } from '../services/api/StudentAPI';
import { clearUser } from '../services/auth/authService';
const handleLogout = () => {
  Swal.fire({
    title: 'Bạn có chắc chắn?',
    text: 'Bạn sẽ bị đăng xuất khỏi hệ thống!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Đăng xuất',
    cancelButtonText: 'Hủy',
  }).then((result) => {
    if (result.isConfirmed) {
      logout();
      clearUser();
      window.location.href = '/login';
    }
  });
};

export { handleLogout }