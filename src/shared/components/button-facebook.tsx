import { Button } from "@/components/ui/button"
import { FaFacebook } from "react-icons/fa"

const ButtonFacebook = () => {
    return (
        <Button variant="outline" className="flex items-center gap-2">
            <FaFacebook size={20} className="text-blue-600" /> Facebook
        </Button>
    )
}

export default ButtonFacebook