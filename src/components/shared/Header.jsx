import { useAuth } from "../../services/providers/AuthContext";
import { profile } from "../../services/api/StudentAPI";
const Header = () => {
  const {user, logout} = useAuth();
  const handleClick = async() => {
    const data = await profile();
    console.log("Test data: ", data.data);
  }
  return (
    <header className="header">
    <h1>Student Portal, Hello {user.username}</h1>
    <button onClick={() => handleClick()}>Profile</button>
    <button onClick={() => logout()}>Logout</button>
  </header>
  );
}
  
  
export default Header;
