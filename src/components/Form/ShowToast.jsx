 
import Swal from 'sweetalert2';
 
const ShowToast = (icon, title) => {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    }
  });
 
  Toast.fire({
    icon,
    title
  });
};
 
export default ShowToast;
 
 