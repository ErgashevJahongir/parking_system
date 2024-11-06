import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Loader } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/store/authStore";
import { loginRequest } from "@/services/request";
import { useToast } from "@/components/ui/use-toast";
import { ILoginForm } from "@/types";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [isInitialized, setIsInitialized] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { setToken: setAccessToken, setUser, token } = useAuthStore((state) => state);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (values: ILoginForm) => {
    setIsLoading(true);
    try {
      const data = await loginRequest(values);
      setAccessToken(data?.access);
      if (data) {
        navigate("/");
        reset();
        setUser(data);
      }
    } catch (error: unknown) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Saytga kirishda xatolik",
        description: "Hisob yoki parol noto'g'ri kiritildi!",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      !!token && navigate("/");
    }
  }, [isInitialized, navigate, token]);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full py-10 screenHeight">
      <div className="w-full px-5 m-auto md:max-w-2xl">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="px-3 sm:px-10 md:px-16">
            <div className="flex flex-col gap-6 mb-4 md:mb-8 md:gap-12">
              <h2 className="font-semibold leading-tight text-center text-loginTitle">
                Hisobingizga kiring
              </h2>
            </div>
            <div className="grid gap-4 md:gap-8">
              <div className="grid gap-2">
                <Label htmlFor="text" className="text-sm md:text-base">
                  Hisobingiz
                </Label>
                <Input
                  id="text"
                  type="text"
                  {...register("username", { required: true })}
                  placeholder="Foydalanuvchi hidobingizni kiriting..."
                />
                {errors?.username && (
                  <span className="inline-block mt-1 text-red-500">
                    Foydalanuvchi hidobingizni kiriting...
                  </span>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password" className="text-sm md:text-base">
                  Parol
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    {...register("password", { required: true })}
                    placeholder="Parolingizni kiriting..."
                  />
                  <Button
                    type="button"
                    variant="link"
                    onClick={toggleShowPassword}
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500"
                  >
                    {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                  </Button>
                </div>
                {errors?.password && (
                  <span className="inline-block mt-1 text-red-500">Parolingizni kiriting</span>
                )}
              </div>
            </div>
            <div className="flex flex-col mt-4 md:mt-8">
              <Button disabled={isLoading} type="submit" className="w-full !text-paragraphDefault">
                {isLoading ? <Loader className="mr-2 animate-spin" /> : null}
                <span>Kirish</span>
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
