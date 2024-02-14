import { Button, Checkbox, Input, Link } from '@nextui-org/react';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { UserData } from '../../interfaces/user.interface';
import { useAppDispatch } from '../../hooks/state.hooks';
import {
  thunkSignInWithEmailAndPassword,
  thunkSignInWithGoogle,
  thunkSignUpWithEmailAndPassword,
} from '../../store/thunks/auth.thunk';
import { ToogleAuth } from '../../enums/auth.enum.ts';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '../../enums/paths.enum.ts';

interface AuthFormProps {
  type: ToogleAuth;
}

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const { control, handleSubmit } = useForm<UserData>({
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });

  const router = useNavigate();

  const dispatch = useAppDispatch();

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleClickSingUp = () => {
    if (type === ToogleAuth.LOGIN) {
      return router(PATHS.REGISTER);
    }
    handleSubmit(({ email, password, username }) => {
      dispatch(thunkSignUpWithEmailAndPassword({ email, password, username: username! }));
    })();
  };

  const handleClickSingIn = () => {
    if (type === ToogleAuth.REGISTER) {
      return router(PATHS.LOGIN);
    }
    handleSubmit((userData) => {
      dispatch(thunkSignInWithEmailAndPassword(userData));
    })();
  };

  const handleGoogleSign = async () => {
    dispatch(thunkSignInWithGoogle());
  };

  return (
    <>
      <section className=" h-[100vh] max-w-[1000px] max-h-[80vh] flex m-auto shadow-lg bg-white rounded-lg overflow-auto w-[90%] md:w-full">
        <aside className="flex-1 grid ">
          <form className=" flex flex-col gap-4 sm:gap-6 p-5 sm:w-[70%] md:w-[50%] lg:w-[70%] m-auto">
            <h2 className="text-center text-2xl sm:text-3xl md:text-5xl font-bold text-red-500">
              {type == ToogleAuth.REGISTER ? 'Create Account' : 'Login'}
            </h2>
            <span
              className=" w-[max-content]  fa-beat flex gap-2 items-center m-auto  rounded-full border p-2 cursor-pointer hover:bg-black hover:text-white transition-background"
              onClick={handleGoogleSign}
            >
              <i className="fa-brands fa-google"></i>
              <p>Sign with google</p>
            </span>
            <p className="text-center">
              or use your email for {type == ToogleAuth.REGISTER ? 'registration' : 'login'}
            </p>
            <span className="grid gap-2">
              {type == ToogleAuth.REGISTER && (
                <Controller
                  name="username"
                  rules={{
                    required: 'Username is required',
                    minLength: {
                      value: 3,
                      message: 'username must have 3 characters minimum',
                    },
                  }}
                  control={control}
                  render={({ field, fieldState }) => (
                    <Input
                      type="name"
                      label="Name"
                      variant="bordered"
                      labelPlacement="outside"
                      isInvalid={fieldState.invalid}
                      errorMessage={fieldState.error?.message}
                      onValueChange={(value) => field.onChange(value)}
                      value={field.value}
                      defaultValue={field.value}
                      classNames={{
                        inputWrapper: 'rounded-md border border-zinc-300 bg-zinc-100',
                        input: 'leading-loose block',
                        label: 'text-zinc-300',
                      }}
                    />
                  )}
                />
              )}
              <Controller
                name="email"
                control={control}
                rules={{ required: 'Email is required' }}
                render={({ field, fieldState }) => (
                  <Input
                    type="email"
                    label="Email"
                    variant="bordered"
                    labelPlacement="outside"
                    isInvalid={fieldState.invalid}
                    errorMessage={fieldState.error?.message}
                    onValueChange={(value) => field.onChange(value)}
                    value={field.value}
                    defaultValue={field.value}
                    classNames={{
                      inputWrapper: 'rounded-md border border-zinc-300 bg-zinc-100',
                      input: 'leading-loose block',
                      label: 'text-zinc-300',
                    }}
                  />
                )}
              />
              <Controller
                name="password"
                control={control}
                rules={{ required: 'Password is required' }}
                render={({ field, fieldState }) => (
                  <Input
                    label="Password"
                    variant="bordered"
                    labelPlacement="outside"
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
                    type={isVisible ? 'text' : 'password'}
                    isInvalid={fieldState.invalid}
                    errorMessage={fieldState.error?.message}
                    onValueChange={(value) => field.onChange(value)}
                    value={field.value}
                    defaultValue={field.value}
                    classNames={{
                      inputWrapper: 'rounded-md border border-zinc-300 bg-zinc-100',
                      input: 'leading-loose block',
                      label: 'text-zinc-300',
                    }}
                  />
                )}
              />
            </span>
            {type == ToogleAuth.REGISTER && (
              <span>
                <Checkbox size="lg" color="danger">
                  I agree <Link color="danger">Terms</Link> and{' '}
                  <Link color="danger">Privacy Policy</Link>.
                </Checkbox>
              </span>
            )}
            <span className="flex justify-evenly">
              <Button
                color="danger"
                variant={type == ToogleAuth.REGISTER ? 'solid' : 'bordered'}
                onClick={handleClickSingUp}
                className="w-32"
              >
                Sing Up
              </Button>
              <Button
                color="danger"
                variant={type == ToogleAuth.LOGIN ? 'solid' : 'bordered'}
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
    </>
  );
};

export default AuthForm;
