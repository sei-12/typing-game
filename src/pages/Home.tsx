import { Home } from "../components/Home";
import { useHome } from "../hooks/Home";

export function HomePage() {
    const hook = useHome();
    return <Home {...hook}></Home>;
}
