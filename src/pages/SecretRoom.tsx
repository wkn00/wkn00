import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const SecretRoom = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "You Got Me Ahaha.",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-700">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">You Found My Secret Room</h1>
        <p className="text-xl text-green-200 mb-4">Well Done!</p>
        <Button
              className="gap-2 bg-green-700 hover:bg-transparent border-2 border-green-700 hover:green-2 hover:border-green-700"
              size="lg"
            >       
        <a href="/" className="text-grey-500 hover:text-green-700">
          Return to Home
        </a>
        </Button>
      </div>
    </div>
  );
};

export default SecretRoom;
