"use client";
import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/ui/icons";
import Logo from "@/components/front/Logo";
import Image from "next/image";
import { WelcomeIllustration } from "@/components/front/common/welcome-illustration";

export default function SignInPage() {
  return (
    <div className="min-h-screen w-full p-4 flex flex-col items-center justify-center bg-gradient-to-br from-yellow-50 via-white to-emerald-50">
      {/* Decorative Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -right-10 top-10 h-48 w-48 rounded-full bg-yellow-400/20" />
        <div className="absolute left-0 bottom-0 h-32 w-32 rounded-full bg-emerald-400/20" />
        <div className="absolute right-1/4 bottom-1/4 h-64 w-64 rounded-full bg-emerald-400/10" />
      </div>
      <SignIn.Root>
        <Clerk.Loading>
          {(isGlobalLoading) => (
            <>
              <SignIn.Step name="start">
                <Card className="relative w-full max-w-4xl shadow-lg">
                  <CardContent className="p-0">
                    <div className="grid lg:grid-cols-2">
                      {" "}
                      {/* Login Form */}
                      <div className="p-6 sm:p-8">
                        <div className="flex items-center gap-2 mb-6">
                          <Logo />
                        </div>
                        <div className="space-y-10">
                          {" "}
                          <div className="space-y-2">
                            <h1 className="text-3xl font-bold tracking-tight">
                              Welcome back
                            </h1>
                            <p className="text-muted-foreground">
                              Please Sign in with google to access your account
                            </p>
                          </div>
                          <Clerk.Connection name="google" asChild>
                            <Button
                              size="lg"
                              variant="outline"
                              type="button"
                              disabled={isGlobalLoading}
                              className="w-full text-lg bg-slate-950 text-white font-semibold"
                            >
                              <Clerk.Loading scope="provider:google">
                                {(isLoading) =>
                                  isLoading ? (
                                    <Icons.spinner className="size-4 animate-spin" />
                                  ) : (
                                    <>
                                      <Image
                                        src="/google.png"
                                        alt="Google"
                                        width={24}
                                        height={24}
                                        className="mr-2"
                                      />
                                      Google
                                    </>
                                  )
                                }
                              </Clerk.Loading>
                            </Button>
                          </Clerk.Connection>
                        </div>
                      </div>
                      {/* Decorative Right Side */}
                      <div className="hidden lg:block relative bg-gradient-to-br from-emerald-50 to-emerald-100 p-8">
                        <div className="relative h-full w-full border-2 border-emerald-200/50 rounded-lg p-6 backdrop-blur-sm">
                          <div className="absolute top-6 left-6">
                            <div className="flex gap-1.5">
                              <div className="h-3 w-3 rounded-full bg-emerald-400" />
                              <div className="h-3 w-3 rounded-full bg-yellow-400" />
                              <div className="h-3 w-3 rounded-full bg-red-400" />
                            </div>
                          </div>
                          <div className="h-full w-full flex items-center justify-center">
                            <div className="text-center relative space-y-4">
                              <Image
                                src="/login-bg.png"
                                width={200}
                                height={180}
                                alt="img"
                                className="absolute -top-12 -right-10"
                              />
                              <WelcomeIllustration />
                              <h2 className="text-2xl font-semibold text-emerald-900">
                                Welcome back
                              </h2>
                              <p className="text-emerald-700">
                                Sign in to access your account
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </SignIn.Step>

              <SignIn.Step name="choose-strategy">
                <Card className="w-full sm:w-96">
                  <CardHeader>
                    <CardTitle>Use another method</CardTitle>
                    <CardDescription>
                      Facing issues? You can use any of these methods to sign
                      in.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-y-4">
                    <SignIn.SupportedStrategy name="email_code" asChild>
                      <Button
                        type="button"
                        variant="link"
                        disabled={isGlobalLoading}
                      >
                        Email code
                      </Button>
                    </SignIn.SupportedStrategy>
                    <SignIn.SupportedStrategy name="password" asChild>
                      <Button
                        type="button"
                        variant="link"
                        disabled={isGlobalLoading}
                      >
                        Password
                      </Button>
                    </SignIn.SupportedStrategy>
                  </CardContent>
                  <CardFooter>
                    <div className="grid w-full gap-y-4">
                      <SignIn.Action navigate="previous" asChild>
                        <Button disabled={isGlobalLoading}>
                          <Clerk.Loading>
                            {(isLoading) => {
                              return isLoading ? (
                                <Icons.spinner className="size-4 animate-spin" />
                              ) : (
                                "Go back"
                              );
                            }}
                          </Clerk.Loading>
                        </Button>
                      </SignIn.Action>
                    </div>
                  </CardFooter>
                </Card>
              </SignIn.Step>

              <SignIn.Step name="verifications">
                <SignIn.Strategy name="password">
                  <Card className="w-full sm:w-96">
                    <CardHeader>
                      <CardTitle>Check your email</CardTitle>
                      <CardDescription>
                        Enter the verification code sent to your email
                      </CardDescription>
                      <p className="text-sm text-muted-foreground">
                        Welcome back <SignIn.SafeIdentifier />
                      </p>
                    </CardHeader>
                    <CardContent className="grid gap-y-4">
                      <Clerk.Field name="password" className="space-y-2">
                        <Clerk.Label asChild>
                          <Label>Password</Label>
                        </Clerk.Label>
                        <Clerk.Input type="password" asChild>
                          <Input />
                        </Clerk.Input>
                        <Clerk.FieldError className="block text-sm text-destructive" />
                      </Clerk.Field>
                    </CardContent>
                    <CardFooter>
                      <div className="grid w-full gap-y-4">
                        <SignIn.Action submit asChild>
                          <Button disabled={isGlobalLoading}>
                            <Clerk.Loading>
                              {(isLoading) => {
                                return isLoading ? (
                                  <Icons.spinner className="size-4 animate-spin" />
                                ) : (
                                  "Continue"
                                );
                              }}
                            </Clerk.Loading>
                          </Button>
                        </SignIn.Action>
                        <SignIn.Action navigate="choose-strategy" asChild>
                          <Button type="button" size="sm" variant="link">
                            Use another method
                          </Button>
                        </SignIn.Action>
                      </div>
                    </CardFooter>
                  </Card>
                </SignIn.Strategy>

                <SignIn.Strategy name="email_code">
                  <Card className="w-full sm:w-96">
                    <CardHeader>
                      <CardTitle>Check your email</CardTitle>
                      <CardDescription>
                        Enter the verification code sent to your email
                      </CardDescription>
                      <p className="text-sm text-muted-foreground">
                        Welcome back <SignIn.SafeIdentifier />
                      </p>
                    </CardHeader>
                    <CardContent className="grid gap-y-4">
                      <Clerk.Field name="code">
                        <Clerk.Label className="sr-only">
                          Email verification code
                        </Clerk.Label>
                        <div className="grid gap-y-2 items-center justify-center">
                          <div className="flex justify-center text-center">
                            <Clerk.Input
                              type="otp"
                              autoSubmit
                              className="flex justify-center has-[:disabled]:opacity-50"
                              render={({ value, status }) => {
                                return (
                                  <div
                                    data-status={status}
                                    className="relative flex h-9 w-9 items-center justify-center border-y border-r border-input text-sm shadow-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md data-[status=selected]:ring-1 data-[status=selected]:ring-ring data-[status=cursor]:ring-1 data-[status=cursor]:ring-ring"
                                  >
                                    {value}
                                  </div>
                                );
                              }}
                            />
                          </div>
                          <Clerk.FieldError className="block text-sm text-destructive text-center" />
                          <SignIn.Action
                            asChild
                            resend
                            className="text-muted-foreground"
                            fallback={({ resendableAfter }) => (
                              <Button variant="link" size="sm" disabled>
                                Didn&apos;t receive a code? Resend (
                                <span className="tabular-nums">
                                  {resendableAfter}
                                </span>
                                )
                              </Button>
                            )}
                          >
                            <Button variant="link" size="sm">
                              Didn&apos;t receive a code? Resend
                            </Button>
                          </SignIn.Action>
                        </div>
                      </Clerk.Field>
                    </CardContent>
                    <CardFooter>
                      <div className="grid w-full gap-y-4">
                        <SignIn.Action submit asChild>
                          <Button disabled={isGlobalLoading}>
                            <Clerk.Loading>
                              {(isLoading) => {
                                return isLoading ? (
                                  <Icons.spinner className="size-4 animate-spin" />
                                ) : (
                                  "Continue"
                                );
                              }}
                            </Clerk.Loading>
                          </Button>
                        </SignIn.Action>
                        <SignIn.Action navigate="choose-strategy" asChild>
                          <Button size="sm" variant="link">
                            Use another method
                          </Button>
                        </SignIn.Action>
                      </div>
                    </CardFooter>
                  </Card>
                </SignIn.Strategy>
              </SignIn.Step>
            </>
          )}
        </Clerk.Loading>
      </SignIn.Root>
    </div>
  );
}
