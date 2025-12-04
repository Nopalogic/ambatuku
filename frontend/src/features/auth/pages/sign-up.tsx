"use client";

import { authClient } from "@/lib/auth-client";
import { SignUpForm } from "../components/sign-up-form";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SignUpPage() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && session) {
      router.replace("/");
    }
  }, [router, session, isPending]);

  return <SignUpForm />;
}