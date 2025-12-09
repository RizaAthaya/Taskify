import type { ILoginEmailPassword } from "@/api/auth/type";
import { useAlert } from "@/context/alert/useAlert";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useLogin } from "../hooks/useLogin";
import Input from "@/components/form/input";
import InputPassword from "@/components/form/input/password";
import Button from "@/components/ui/button";
import Spinner from "@/components/ui/spinner";
import { log } from "@/utils/log";

const LoginForm = () => {
  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginEmailPassword>();

  const handleLogin: SubmitHandler<ILoginEmailPassword> = (data) => {
    mutate(data);
  };

  const { showAlert } = useAlert();

  // tanstack mutate
  const { mutate, isPending } = useLogin(
    () => {
      showAlert({ variant: "success", message: "Login successfully!" });
    },
    (error) => {
      log.error("Login failed:", error);
      showAlert({ variant: "error", message: error.message });
    }
  );

  return (
    <form onSubmit={handleSubmit(handleLogin)} className="relative space-y-6 z-20">
      {/* Title  */}
      <h2 className="text-xl lg:text-2xl font-semibold text-center mb-4">Login</h2>

      <Input
        label="Email"
        type="email"
        placeholder="Enter your email"
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: "Invalid email address",
          },
        })}
        errorMessage={errors.email?.message}
      />

      <InputPassword
        label="Password"
        placeholder="Enter your password"
        {...register("password", {
          required: "Password is required",
        })}
        errorMessage={errors.password?.message}
      />

      <Button type="submit" variant="primary" size="large" className="w-full py-5">
        <div className="relative w-full h-full flex items-center justify-center">
          <span
            className={`absolute transition-opacity duration-300 ${isPending ? "opacity-0" : "opacity-100"}`}
          >
            Login
          </span>
          <span
            className={`absolute transition-opacity duration-300 ${isPending ? "opacity-100" : "opacity-0"}`}
          >
            <Spinner size="extraSmall" />
          </span>
        </div>
      </Button>
    </form>
  );
};

export default LoginForm;
