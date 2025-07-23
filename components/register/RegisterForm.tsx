"use client";

import { Card, CardContent } from "../ui/card";
import { Label } from "@radix-ui/react-label";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signup, getUser } from "@/app/actions/auth";
// import { getUser } from "@/app/actions/user";

const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

const RegisterForm = () => {
  const router = useRouter();
  const [userExists, setUserExists] = useState(false);
  const [state, action, pending] = useActionState(signup, undefined);
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(true);

  useEffect(() => {
    if (email !== "") {
      const emailIsValid = emailRegex.test(email);

      setEmailValid(emailIsValid);
    }
  }, [email]);

  const checkUserExists = async () => {
    if (email !== "") {
      const user = await getUser(email);

      if (user) {
        router.push("/login");
        console.log("User exists");
      } else {
        setUserExists(true);
      }
    }
  };

  return (
    <>
      {!userExists ? (
        <div className="text-start">
          <div className="flex flex-col items-center justify-center mt-[24px]">
            <div className="flex w-full">
              <input
                type="email"
                placeholder="Email address"
                value={email}
                className="flex-grow p-4 text-lg text-white rounded-l focus:outline-none focus:ring-2 focus:ring-slate-500 border border-gray-700"
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                onClick={() => checkUserExists()}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded flex items-center justify-center text-lg ml-2"
              >
                Get Started
                <ChevronRight />
              </button>
            </div>
          </div>
          {!emailValid && <p className="py-2">Please enter a valid email</p>}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center mt-[10%]">
          <div
            className="flex flex-row items-start mb-3 cursor-pointer hover:text-gray-300"
            onClick={() => setUserExists(false)}
          >
            <ChevronLeft />
            <span>Go back</span>
          </div>
          <Card className="xl:w-[434px] sm:w-sm rounded-sm">
            <CardContent>
              <form action={action}>
                <div className="flex flex-col gap-6">
                  <div className="hidden">
                    <div className="flex items-center">
                      <Label htmlFor="email">Email</Label>
                    </div>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex-grow p-4 text-lg text-white rounded-l focus:outline-none focus:ring-2 focus:ring-slate-500 border border-gray-700"
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="username">Username</Label>
                    </div>
                    <input
                      type="text"
                      placeholder="Your username"
                      name="username"
                      id="username"
                      className="flex-grow p-4 text-lg text-white rounded-l focus:outline-none focus:ring-2 focus:ring-slate-500 border border-gray-700"
                    />
                  </div>
                  {state?.errors?.username && <p>{state.errors.username}</p>}
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                    </div>
                    <input
                      type="password"
                      placeholder="Your password"
                      name="password"
                      id="password"
                      className="flex-grow p-4 text-lg text-white rounded-l focus:outline-none focus:ring-2 focus:focus:ring-slate-500 border border-gray-700"
                    />
                  </div>
                  {state?.errors?.password && <p>{state.errors.password}</p>}
                  <Button
                    className="bg-red-600 text-white hover:bg-red-700 cursor-pointer rounded-none"
                    type="submit"
                    disabled={pending}
                  >
                    Sing Up
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default RegisterForm;
