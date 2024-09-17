import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const ForgetPassword = () => {
  return (
    <section className="h-screen w-screen flex items-center justify-center">
      <Card className="w-fit p-6">
        <CardHeader>
          <CardTitle className="text-2xl">Forget Password</CardTitle>
          <CardDescription>
            Select your role to reset your password
          </CardDescription>
        </CardHeader>

        <CardContent className="flex space-x-4 justify-center">
          <Link href="/forget-password/user">
            <Button>I am a User</Button>
          </Link>
          <Link href="/forget-password/mechanic">
            <Button variant={"outline"}>I am a Mechanic</Button>
          </Link>
        </CardContent>

        <CardFooter className="text-center mt-4">
          <p>
            Choose the appropriate role to proceed with resetting your password.
          </p>
        </CardFooter>
      </Card>
    </section>
  );
};

export default ForgetPassword;
