"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardContent, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { FaGithub } from "react-icons/fa"

export const SignUpCard = () => {
  const onProviderSignUp = (provider: "github" | "google") => {
    signIn(provider, { callbackUrl: "/" });
  }

  return (
    <Card className="w-full h-full p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle>
          Create an account
        </CardTitle>
        <CardDescription>
          Use your email or another service to continue
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5 px-0 pb-0">
        <div className="flex flex-col gap-y-2.5">
          <Button variant="outline" size="lg" className="w-full relative" onClick={() => onProviderSignUp("github")}>
            <FaGithub className="mr-2 size-5 top-2.5 left-2.5 absolute" />
            Continue with Github
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Already have an account? <Link href="/sign-in"><span className="text-sky-700 hover:underline">Sign in</span></Link>
        </p>
      </CardContent>
    </Card>
  )
}