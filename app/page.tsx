import RegisterForm from "@/components/register/RegisterForm";

export default function Home() {
  return (
    <div className="items-center justify-items-center min-h-screen gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 sm:items-start">
        <div className="w-2xl text-center mt-[10%] xl:mt-[30%]">
          <h1 className="text-6xl/normal font-bold tracking-tight">
            Lorem Ipsum, Dolor, sit Amet, Consectetur.
          </h1>
          <RegisterForm />
        </div>
      </main>
    </div>
  );
}
