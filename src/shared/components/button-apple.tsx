import { Button } from "@/components/ui/button"
import { FaApple } from "react-icons/fa"

const ButtonApple = () => {
    return (
        <Button variant="outline" className="flex items-center gap-2">
            <FaApple size={20} /> Apple
        </Button>
    )
}

export default ButtonApple