import { Button } from "@/components/ui/button"
import { FcGoogle } from "react-icons/fc"

const ButtonGoogle = () => {
    return (
        <Button variant="outline" className="flex items-center gap-2">
            <FcGoogle size={20} /> Google
        </Button>
    )
}

export default ButtonGoogle