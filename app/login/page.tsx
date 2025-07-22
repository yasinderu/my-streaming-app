import React from "react";
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

const LoginPage = () => {
  return (
    <div className="items-center justify-items-center min-h-screen gap-16">
      <main className="w-full flex flex-col gap-[32px] items-center">
        <Card className="xl:w-[434px] sm:w-sm rounded-sm mt-[10%]">
          <CardHeader>
            <CardTitle className="text-xl xl:text-3xl md:text-2xl">
              Sign In
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <input
                    type="email"
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
                    type="password"
                    placeholder="Your password"
                    className="flex-grow p-4 text-lg text-white rounded-l focus:outline-none focus:ring-2 focus:focus:ring-slate-500 border border-gray-700"
                  />
                </div>
                <Button
                  className="bg-red-600 text-white hover:bg-red-700 cursor-pointer rounded-none"
                  type="submit"
                >
                  Sing In
                </Button>
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
      </main>
    </div>
  );
};

export default LoginPage;
