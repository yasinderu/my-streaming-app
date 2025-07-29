import Login from "@/components/login/Login";
import { Suspense } from "react";

const LoginPage = () => {
  return (
    <div className="items-center justify-items-center min-h-screen gap-16">
      <main className="w-full flex flex-col gap-[32px] items-center">
        <Suspense>
          <Login />
        </Suspense>
      </main>
    </div>
  );
};

export default LoginPage;
