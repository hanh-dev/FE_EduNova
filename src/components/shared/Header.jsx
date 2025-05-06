import { useNavigate } from "react-router-dom";
import { useAuth } from "../../services/providers/AuthContext";
const Header = () => {
  const {user} = useAuth();
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/profile")
  }
  return (
    <header className="header">
    <h1>Student Portal, Hello {user.username}</h1>
    <button onClick={() => handleClick()}>Profile</button>
  </header>
  );
}
  
  
export default Header;
  