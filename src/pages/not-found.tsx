import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";

export function NotFound() {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="space-y-4 text-center">
                <h1 className="text-2xl font-medium">Page not found</h1>
                <Button asChild>
                    <Link to="/">Back to home</Link>
                </Button>
            </div>
        </div>
    );
}
