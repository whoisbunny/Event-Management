import LoginForm from "@/components/login-form";
import ThemeSwitcher from "@/components/theme-switcher";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppSelector } from "@/store";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
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
        <div className="flex  justify-end p-4 gap-4 bg-white dark:bg-slate-900 shadow sticky top-0 left-0 w-full z-50">
          <ThemeSwitcher />
          
        </div>
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800">
          <Card className="w-full max-w-md p-6 bg-white rounded-lg shadow-md dark:bg-gray-900">
            <CardHeader>
              <CardTitle className="text-center">Login</CardTitle>
            </CardHeader>
            <CardContent>
              <LoginForm />

            </CardContent>
            <CardFooter>
              <div className="text-center w-full">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Don't have an account?{" "}
                  <Link to="/signup" className="text-blue-500 hover:underline">
                    Sign up
                  </Link>
                </p>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Login;
