import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link, useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { useAuth } from "@/context/authContext";

function NavDropdown() {

  const navigate =useNavigate()
  const { logout,state } = useAuth();
  const role = state?.user?.role;
  
  const handleLogout = () => {
    logout();
    navigate("/");
  };
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger><img src={state?.user?.profilePic || <CgProfile/>} alt="profile-pic" width={35}/></DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {role === "user" && <DropdownMenuItem><Link to="/user">Profile</Link></DropdownMenuItem>}
          {role === "admin" && <DropdownMenuItem><Link to="/admin">Manage</Link></DropdownMenuItem>}        
          <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
export default NavDropdown;
