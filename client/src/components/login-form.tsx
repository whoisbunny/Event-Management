import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { getUserProfile, loginAsync } from "@/store/authReducer";
import { useAppDispatch } from "@/store";
// import { useAppDispatch } from "@/store";
// import { getLoggedinUser, loginAsync } from "@/redux/reducers/authReducer";

const schema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

type FormData = z.infer<typeof schema>;

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
    dispatch(loginAsync({ email: data.email, password: data.password })).then(
      (action) => {
        if (loginAsync.fulfilled.match(action)) {
          dispatch(getUserProfile());
           navigate("/dashboard");
        }
      }
    );
    
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label htmlFor="email">Email</label>
          <Input id="email" type="email" {...register("email")} />
          {errors.email && <p>Email Error</p>}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <Input id="password" type="password" {...register("password")} />
          {errors.password && <p>Password Error</p>}
        </div>
        <Button type="submit">Login</Button>
      </form>
    </div>
  );
};

export default LoginForm;
