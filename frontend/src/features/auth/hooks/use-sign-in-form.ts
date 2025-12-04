import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";

import { LOCAL_STORAGE_BETTER_AUTH_TOKEN_KEY } from "../constants/local-storage";
import { SignInFormSchema, signInFormSchema } from "../validations/sign-in";

export const useSignInForm = () => {
  const form = useForm<signInFormSchema>({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: signInFormSchema) => {
    try {
      const { error, data: authResponseData } = await authClient.signIn.email({
        email: data.email,
        password: data.password,
      });

      // handle auth errors
      if (error?.status) {
        toast.error("Sign in failed", {
          description: "The email or password you entered is incorrect.",
        });

        return;
      }

      if (authResponseData?.token) {
        localStorage.setItem(
          LOCAL_STORAGE_BETTER_AUTH_TOKEN_KEY,
          authResponseData.token,
        );

        toast.success(
          `Welcome back, ${authResponseData.user.name.split(" ")[0]}`,
          {
            description: "It's good to see you again.",
          },
        );
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Oops.. Something went wrong.", {
        description: "Please try again in a few moments",
      });
    }
  };

  return { form, onSubmit };
};
