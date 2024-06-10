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
/* 
interface Props {
  reviewData: any;
  reviewId: any;
}
 */
function ProductCreate() {

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

      const createData = {
        data: {
          name: data.name,
          price: data.price,
          details: data.details,
        },
      };

      const apiUrl = `http://localhost:1337/api/products`;

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(createData),
      });

      if (!response.ok) {
        throw new Error("Failed to update review");
      }

      form.reset({ name: "" , price: "", details: ""}); // Reset the fields value
      setOpen(false);
      toast.success("Başarıyla oluşturuldu!");

      // Invalidate the products query to refetch the data
      queryClient.invalidateQueries({ queryKey: ["products"] });
    } catch (error) {
      console.error("Error updating review:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>

      <DialogTrigger asChild>
        <Button>
            Create Product
            <Pencil2Icon className="h-4 w-4 cursor-pointer hover:text-accent" />
        </Button>
      </DialogTrigger>

      <DialogContent className="top-[30%] rounded-lg">
        <DialogHeader className="items-center">
          <DialogTitle>Create Product</DialogTitle>
          <DialogDescription>Create your product here.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className=" w-full space-y-6"
          >
            <FormField
              control={form.control}
              name="name"
              defaultValue={""}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name:</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      {...field}
                      placeholder="Write device name..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              defaultValue={""}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price:</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      placeholder="Write device price..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="details"
              defaultValue={""}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Details:</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      {...field}
                      placeholder="Write device details..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Creating" : "Create"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default ProductCreate;
