import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";

import { LOCAL_STORAGE_BETTER_AUTH_TOKEN_KEY } from "../constants/local-storage";
import { SignUpFormSchema, signUpFormSchema } from "../validations/sign-up";

export const useSignUpForm = () => {
  const form = useForm<signUpFormSchema>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: signUpFormSchema) => {
    try {
      const { error, data: authResponseData } = await authClient.signUp.email({
        name: data.email,
        email: data.email,
        password: data.password,
      });

      if (error?.status) {
        toast.error("Email already registered", {
          description: "It seems you already have an account. Please sign in.",
        });

        return;
      }

      if (authResponseData?.token) {
        localStorage.setItem(
          LOCAL_STORAGE_BETTER_AUTH_TOKEN_KEY,
          authResponseData.token,
        );

        toast.success(`Hello, ${authResponseData.user.name.split(" ")[0]}`, {
          description: "We're glad you're here.",
        });
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
