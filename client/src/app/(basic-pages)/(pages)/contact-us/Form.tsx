"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { ContactSchema, IContactSchema } from "@/zod/contact.zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContact } from "@/services/contact";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  ContactContent,
  contactForm,
  contactInfo,
} from "@/constants/contactUs";

export default function ContactUS() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IContactSchema>({
    resolver: zodResolver(ContactSchema),
  });

  const { isPending, mutate } = useContact();

  const onSubmit = async (data: IContactSchema) => {
    mutate(data);
  };

  return (
    <main className="container mx-auto px-4 py-16">
      <section className="space-y-16">
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-transparent">
            {ContactContent[0].title}
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            {ContactContent[0].description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mx-auto max-w-4xl">
          {contactInfo.map(({ icon: Icon, title, value }, index) => (
            <Card key={index} className="h-full">
              <CardHeader className="flex flex-col items-center space-y-2 pb-2">
                <div className="p-3 rounded-full bg-primary/10">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">{title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center">{value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="max-w-3xl mx-auto shadow-lg">
          <CardHeader className="text-center space-y-2">
            <CardTitle className="text-3xl font-bold">
              {contactForm.title}
            </CardTitle>
            <p className="text-muted-foreground">{contactForm.description}</p>
          </CardHeader>
          <Separator className="my-4" />
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {contactForm.fields.map((field, index) => (
                  <div className="space-y-2" key={index}>
                    <Label htmlFor={field.name} className="font-medium">
                      {field.label}
                    </Label>
                    {field.type === "textarea" ? (
                      <Textarea
                        id={field.name}
                        placeholder={field.placeholder}
                        className="min-h-[120px] resize-none"
                        {...register(field.name as keyof IContactSchema)}
                      />
                    ) : (
                      <Input
                        id={field.name}
                        type={field.type}
                        placeholder={field.placeholder}
                        {...register(field.name as keyof IContactSchema)}
                      />
                    )}
                    {errors[field.name as keyof IContactSchema] && (
                      <p className="text-sm text-destructive">
                        {errors[field.name as keyof IContactSchema]?.message}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              <Button
                type="submit"
                className="w-full text-lg py-6"
                disabled={isPending}
              >
                {isPending ? "Sending..." : contactForm.submit.label}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
          <iframe
            title="Our Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3152.154320165223!2d144.9619503152587!3d-37.79910597975403!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad643d6e1e6a1f7%3A0x9e4b1c6d2c1b4f4c!2sUniversity%20of%20Melbourne!5e0!3m2!1sen!2sau!4v1631862946487!5m2!1sen!2sau"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
          />
        </div>
      </section>
    </main>
  );
}
