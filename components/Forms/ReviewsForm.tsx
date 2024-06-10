"use client";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { reviewSchema } from "@/lib/schemas/reviewSchema";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface Props {
  productId: any;
}

const ReviewsForm: React.FC<Props> = ({ productId }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof reviewSchema>>({
    resolver: zodResolver(reviewSchema),
  });

  // send data to the "/api/profile" endpoint
  async function onSubmit(data: z.infer<typeof reviewSchema>) {
    try {
      setIsSubmitting(true);

      const reviewData = {
        data: {
          userDisplayName: data.userDisplayName,
          body: data.body,
          product: productId,
        },
      };

      const apiUrl = `http://localhost:1337/api/reviews`;

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewData),
      });

      // console.log("reviewData:", reviewData);

      if (!response.ok) {
        toast.error("Bir hata oluştu. Lütfen tekrar deneyin!");
      }

      form.reset({ userDisplayName: "", body: "" }); // Reset the fields value

      toast.success("Başarıyla yorumunuz eklendi!");
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section>
      <h1>Reviews Form:</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" w-full space-y-6"
        >
          <FormField
            control={form.control}
            name="userDisplayName"
            // defaultValue={user?.name ?? ""}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ad</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    {...field}
                    placeholder="Adınızı yazınız..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="body"
            // defaultValue={user?.name ?? ""}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Review</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    {...field}
                    placeholder="Yorumunuzu yazınız..."
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Loading..." : "Submit"}
          </Button>
        </form>
      </Form>
    </section>
  );
};

export default ReviewsForm;
