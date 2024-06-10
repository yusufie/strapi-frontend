"use client";
import React, { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

// import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { reviewSchema } from "@/lib/schemas/reviewSchema";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
// import Loader from "@/components/Loadings/Loader";
import { Pencil2Icon } from "@radix-ui/react-icons";

interface Props {
  reviewData: any;
  reviewId: any;
}

function ReviewsUpdate({ reviewData, reviewId }: Readonly<Props>) {

  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    // resolver: zodResolver(),
  });


  // send data to the "/api/reviews/${reviewId}" endpoint
  async function onSubmit(data: any) {
    try {
      setIsSubmitting(true);

      const updateData = {
        data: {
          userDisplayName: reviewData?.data?.attributes?.userDisplayName,
          body: data.body,
          // product: reviewId,
        },
      };

      const apiUrl = `http://localhost:1337/api/reviews/${reviewId}`;

      const response = await fetch(apiUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        throw new Error("Failed to update review");
      }

      form.reset({ body: "" }); // Reset the fields value
      setOpen(false);
      toast.success("Başarıyla güncellendi!");

      // Invalidate the profile query to refetch the data
      queryClient.invalidateQueries({ queryKey: ["review", reviewId] });
    } catch (error) {
      console.error("Error updating review:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Pencil2Icon className="h-4 w-4 cursor-pointer hover:text-accent" />
      </DialogTrigger>
      <DialogContent className="top-[30%] rounded-lg">
        <DialogHeader className="items-center">
          <DialogTitle>Update Review</DialogTitle>
          <DialogDescription>Update your review here.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className=" w-full space-y-6"
          >
            <FormField
              control={form.control}
              name="body"
              defaultValue={reviewData?.data?.attributes?.body ?? ""}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Review Body</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      {...field}
                      placeholder="Write your review..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Updating" : "Update"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default ReviewsUpdate;
