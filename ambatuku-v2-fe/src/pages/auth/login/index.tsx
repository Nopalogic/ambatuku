import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { loginUser } from "@/services/auth";

import { useAuthStore } from "@/stores/auth";

import { toast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { loginSchema } from "@/validators/auth";

type FormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();
  const { login } = useAuthStore();

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await loginUser(data);

      if (response.success) {
        toast({
          title: "Login successfully!",
        });

        login(response.token, response.data);

        navigate({ to: "/" });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login failed. Email or password wrong.",
      });
    }
  };

  return (
    <div className='flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-8'>
      <div>
        <div className='flex flex-col gap-6'>
          <Card className='overflow-hidden'>
            <CardContent>
              <form className='p-6 md:p-8' onSubmit={handleSubmit(onSubmit)}>
                <div className='flex flex-col gap-6'>
                  <div className='flex flex-col items-center text-center'>
                    <h1 className='text-2xl font-bold'>Welcome back</h1>
                    <p className='text-balance text-muted-foreground'>
                      Login to your Ambatuku account
                    </p>
                  </div>
                  <div className='grid gap-2'>
                    <Label htmlFor='email'>Email</Label>
                    <Input
                      id='email'
                      type='email'
                      className={errors.email && "border-destructive"}
                      placeholder='m@example.com'
                      required
                      {...register("email")}
                    />
                    {errors.email?.message && (
                      <span className='text-xs text-destructive'>
                        {errors.email.message}
                      </span>
                    )}
                  </div>
                  <div className='grid gap-2'>
                    <Label htmlFor='password'>Password</Label>
                    <Input
                      id='password'
                      type='password'
                      className={errors.password && "border-destructive"}
                      required
                      {...register("password")}
                    />
                    {errors.password?.message && (
                      <span className='text-xs text-destructive'>
                        {errors.password.message}
                      </span>
                    )}
                  </div>
                  <Button type='submit' className='w-full'>
                    Login
                  </Button>
                  <div className='relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border'>
                    <span className='relative z-10 bg-background px-2 text-muted-foreground'>
                      Or continue with
                    </span>
                  </div>
                  <Button variant='outline' className='w-full'>
                    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
                      <path
                        d='M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z'
                        fill='currentColor'
                      />
                    </svg>
                    <span className='sr-only'>Login with Google</span>
                  </Button>
                  <div className='text-center text-sm'>
                    Don&apos;t have an account?{" "}
                    <a
                      href='/auth/register'
                      className='underline underline-offset-4'
                    >
                      Sign up
                    </a>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
          <div className='text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary'>
            By clicking continue, you agree to our{" "}
            <a href='#'>Terms of Service</a> and <a href='#'>Privacy Policy</a>.
          </div>
        </div>
      </div>
    </div>
  );
}
