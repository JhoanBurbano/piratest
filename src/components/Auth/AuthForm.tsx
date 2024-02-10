import { Button, Checkbox, Input, Link } from "@nextui-org/react";
import React from "react";

interface AuthFormProps {
  onSubmit?: (userData: UserData) => void;
  isRegisterForm?: boolean;
}

interface UserData {
  email: string;
  password: string;
  username?: string;
}

const AuthForm: React.FC<AuthFormProps> = () => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [isRegister, setIsRegister] = React.useState(true);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleClickSingUp = () => {
    if (!isRegister) {
      return setIsRegister(true);
    }
  };

  const handleClickSingIn = () => {
    if (isRegister) {
      return setIsRegister(false);
    }
  };

  return (
    <section className="w-full h-[100vh] max-w-[1000px] max-h-[80vh] flex m-auto shadow-lg bg-white rounded-lg overflow-auto">
      <aside className="flex-1 grid ">
        <form
          onSubmit={() => {}}
          className=" flex flex-col gap-4 sm:gap-6 p-5 sm:w-[70%] m-auto"
        >
          <h2 className="text-center text-2xl sm:text-3xl md:text-5xl font-bold text-red-500">
            {isRegister ? "Create Account" : "Login"}
          </h2>
          <span className=" w-[max-content]  fa-beat flex gap-2 items-center m-auto  rounded-full border p-2 cursor-pointer hover:bg-black hover:text-white transition-background">
            <i className="fa-brands fa-google"></i>
            <p>Sign with google</p>
          </span>
          <p className="text-center">
            or use your email for {isRegister ? "registration" : "login"}
          </p>
          <span>
            {isRegister && (
              <Input
                type="name"
                label="Name"
                variant="bordered"
                isInvalid={false}
                errorMessage=""
                classNames={{
                  inputWrapper: "rounded-md border border-zinc-300 bg-zinc-100",
                  input: "leading-loose block",
                  label: "text-zinc-300",
                }}
                labelPlacement="outside"
              />
            )}
            <Input
              type="email"
              label="Email"
              variant="bordered"
              isInvalid={false}
              errorMessage=""
              classNames={{
                inputWrapper: "rounded-md border border-zinc-300 bg-zinc-100",
                input: "leading-loose block",
                label: "text-zinc-300",
              }}
              labelPlacement="outside"
            />
            <Input
              label="Password"
              variant="bordered"
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                >
                  {isVisible ? (
                    <i className="fa-solid fa-eye fa-fade"></i>
                  ) : (
                    <i className="fa-solid fa-eye-slash fa-fade"></i>
                  )}
                </button>
              }
              type={isVisible ? "text" : "password"}
              classNames={{
                inputWrapper: "rounded-md border border-zinc-300 bg-zinc-100",
                input: "leading-loose block",
                label: "text-zinc-300",
              }}
              labelPlacement="outside"
            />
          </span>
          <span>
            <Checkbox size="lg" color="danger">
              I agree <Link color="danger">Terms</Link> and{" "}
              <Link color="danger">Privacy Policy</Link>.
            </Checkbox>
          </span>
          <span className="flex justify-evenly">
            <Button
              color="danger"
              variant={isRegister ? "solid" : "bordered"}
              onClick={handleClickSingUp}
              className="w-32"
            >
              Sing Up
            </Button>
            <Button
              color="danger"
              variant={!isRegister ? "solid" : "bordered"}
              onClick={handleClickSingIn}
              className="w-32"
            >
              Sing In
            </Button>
          </span>
        </form>
      </aside>
      <aside className="w-[40%] h-full bg-[url('assets/woman-pattern.jpg')] rounded-2xl hidden lg:block"></aside>
    </section>
  );
};

export default AuthForm;
