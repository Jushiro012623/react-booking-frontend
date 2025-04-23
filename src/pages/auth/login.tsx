import { Button } from "@heroui/button";
import { Divider } from "@heroui/divider";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { Link } from "@heroui/link";
import { Spacer } from "@heroui/spacer";
import React from "react";

import { showToast } from "@/helpers/showToast";
import { useAuthContext } from "@/context/authContextProvider";
import Typography from "@/components/ui/Typography";
import { Logo } from "@/components/icons";

const Login = () => {
  /*
   *
   * REACT USE STATES
   *
   */
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [errors, setErrors] = React.useState<any>(null);
  /*
   *
   * CUSTOM CONTEXT
   *
   */
  const { loginUser } = useAuthContext();

  /*
   *
   * HELPERS
   *
   */
  const attepmtToLogin = async (data: any) => {
    const response: any = await loginUser(data);

    showToast("Login Successfully", response.data.message, "success");

    return response;
  };
  const catchAttemptLoginError = (error: any): void => {
    if (error?.response?.data?.errors?.username) {
      showToast(
        "Login Failed",
        error?.response?.data?.errors?.username[0],
        "danger",
      );
      setErrors({ username: error?.response?.data?.errors?.username[0] });
    } else if (error?.response?.data?.errors?.password) {
      showToast(
        "Login Failed",
        error?.response?.data?.errors?.password[0],
        "danger",
      );
      setErrors({ password: error?.response?.data?.errors?.password[0] });
    } else {
      const errorMessage =
        error?.response?.data?.message || "An unexpected error occurred.";

      showToast("Login Failed", errorMessage, "danger");
    }
  };

  /*
   *
   * BUTTON HANDLERS
   *
   */
  const handleOnSubmit = async (event: any) => {
    event.preventDefault();
    const data: any = Object.fromEntries(new FormData(event.currentTarget));

    try {
      setIsLoading(true);
      await attepmtToLogin(data);
    } catch (error: any) {
      catchAttemptLoginError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex items-center justify-center dark text-foreground bg-background h-screen">
      <div>
        <Form
          className="w-72 sm:w-96 flex items-center"
          validationErrors={errors}
          onSubmit={handleOnSubmit}
        >
          <Logo size={150} />
          <Input
            fullWidth
            label="Email or username"
            name="username"
            type="text"
          />
          <Spacer y={2} />
          <Input fullWidth label="Password" name="password" type="password" />
          <Spacer y={2} />
          <Button fullWidth color="primary" isLoading={isLoading} type="submit">
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
