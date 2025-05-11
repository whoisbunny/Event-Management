import SignupForm from "@/components/signup-form";
import ThemeSwitcher from "@/components/theme-switcher";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppSelector } from "@/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/event");
    }
  }, [isAuthenticated, navigate]);
  return (
    <>
      <div className="flex flex-col w-full">
        <div className="flex  justify-end p-4 gap-4 bg-white dark:bg-gray-800 shadow sticky top-0 left-0 w-full z-50">
          <ThemeSwitcher />
        </div>
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800">
          <Card className="w-full max-w-md p-6 bg-white rounded-lg shadow-md dark:bg-gray-900">
            <CardHeader>
              <CardTitle className="text-center">Sign Up</CardTitle>
            </CardHeader>
            <CardContent>
              <SignupForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Signup;
