import { Logo } from "@/components/icons";
import Typography from "@/components/ui/Typography";
import { useAuthContext } from "@/context/authContextProvider";
import { Button } from "@heroui/button";
import { Divider } from "@heroui/divider";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { Link } from "@heroui/link";
import { Spacer } from "@heroui/spacer";
import { addToast } from "@heroui/toast";
import React from "react";

const showToast = (
  title: string,
  description: string,
  color: "success" | "danger"
) => {
  addToast({
    shouldShowTimeoutProgress: true,
    timeout: 3000,
    title,
    description,
    variant: "flat",
    color,
  });
};
const Login = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [errors, setErrors] = React.useState<any>(null);
  const { login } = useAuthContext();
  const handleOnSubmit = async (event: any) => {
    event.preventDefault();
    const data: any = Object.fromEntries(new FormData(event.currentTarget));
    try {
      setIsLoading(true);

      const response: any = await login(data);
      //   const response = await result
      showToast("Login Successfully", response.data.message, "success");
    } catch (error: any) {
      if (error?.response?.data?.errors?.username) {
        showToast(
          "Login Failed",
          error?.response?.data?.errors?.username[0],
          "danger"
        );
        setErrors({ username: error?.response?.data?.errors?.username[0] });
      } else if (error?.response?.data?.errors?.password) {
        showToast(
          "Login Failed",
          error?.response?.data?.errors?.password[0],
          "danger"
        );
        setErrors({ password: error?.response?.data?.errors?.password[0] });
      } else {
        const errorMessage =
          error?.response?.data?.message || "An unexpected error occurred.";
        showToast("Login Failed", errorMessage, "danger");
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <main className="flex items-center justify-center dark text-foreground bg-background h-screen">
      <div>
        <Form
          className="w-96 flex items-center"
          onSubmit={handleOnSubmit}
          validationErrors={errors}>
          <Logo size={150} />
          <Input
            className="max-w-full"
            label="Email or username"
            type="text"
            name="username"
            // errorMessage={errors.username}
          />
          <Spacer y={2} />
          <Input
            className="max-w-full"
            label="Password"
            type="password"
            name="password"
            // errorMessage={errors.password}
          />
          <Spacer y={2} />
          <Button
            className="w-full"
            color="primary"
            type="submit"
            isLoading={isLoading}>
            Login
          </Button>
          <Spacer y={2} />
          <Divider />
          <Typography>
            Don't have an account?{" "}
            <Link className="cursor-pointer" href="/signup">
              Sign up
            </Link>
          </Typography>
        </Form>
      </div>
    </main>
  );
};

export default Login;
