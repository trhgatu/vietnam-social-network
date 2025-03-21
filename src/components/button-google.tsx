import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { useAuthActions } from "@/shared/hooks/firebase/use-auth";

const ButtonGoogle = () => {
  const { loginWithGoogle } = useAuthActions();


  return (
    <Button
      variant="outline"
      className="flex items-center gap-2 cursor-pointer"
      onClick={loginWithGoogle}
    >
      <FcGoogle size={20} /> Login with Google
    </Button>
  );
};

export default ButtonGoogle;
