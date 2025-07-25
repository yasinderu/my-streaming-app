"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useActionState } from "react";
import { authenticate } from "@/app/actions/auth";

const Login = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "browse";
  const [error, action, pending] = useActionState(authenticate, undefined);
  return (
    <Card className="xl:w-[434px] sm:w-sm rounded-sm mt-[10%]">
      <CardHeader>
        <CardTitle className="text-xl xl:text-3xl md:text-2xl">
          Sign In
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form action={action}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Your email address"
                className="flex-grow p-4 text-lg text-white rounded-l focus:outline-none focus:ring-2 focus:ring-slate-500 border border-gray-700"
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                {/* <a
                      href="#"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a> */}
              </div>
              <input
                id="password"
                type="password"
                placeholder="Your password"
                name="password"
                className="flex-grow p-4 text-lg text-white rounded-l focus:outline-none focus:ring-2 focus:focus:ring-slate-500 border border-gray-700"
              />
            </div>
            {/* <input type="hidden" name="redirectTo" value={callbackUrl} /> */}
            <Button
              className="bg-red-600 text-white hover:bg-red-700 cursor-pointer rounded-none"
              type="submit"
              aria-disabled={pending}
            >
              Sing In
            </Button>
            <div
              className="flex h-8 items-end space-x-1"
              aria-live="polite"
              aria-atomic="true"
            >
              {error && (
                <>
                  {/* <ExclamationCircleIcon className="h-5 w-5 text-red-500" /> */}
                  <p className="text-sm text-red-500">{error}</p>
                </>
              )}
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="text-sm">
        <span className="mr-1">Don&apos;t have an account? </span>
        <Link href="/" className="hover:text-gray-300 underline">
          Sign Up now
        </Link>
      </CardFooter>
    </Card>
  );
};

export default Login;
