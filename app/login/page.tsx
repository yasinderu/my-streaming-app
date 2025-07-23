import Login from "@/components/login/Login";

const LoginPage = () => {
  return (
    <div className="items-center justify-items-center min-h-screen gap-16">
      <main className="w-full flex flex-col gap-[32px] items-center">
        <Login />
      </main>
    </div>
  );
};

export default LoginPage;
