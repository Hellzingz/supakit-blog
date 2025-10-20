import UserProfileForm from "@/components/user/UserProfileForm";
import { useAuth } from "@/context/authContext";

function UserProfilePage() {
  const { state } = useAuth();
  
  return (
    <div className="w-full rounded-xl p-4">
      <UserProfileForm user={state?.user} />
    </div>
  );
}
export default UserProfilePage;
