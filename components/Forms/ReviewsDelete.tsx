"use client";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { Button } from "@/components/ui/button";

interface Props {
  reviewId: any;
}

const ReviewsDelete: React.FC<Props> = ({ reviewId }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // delete review with DELETE request "/api/reviews/:id"
  const deleteReview = async (reviewId: any) => {
    try {
      setIsSubmitting(true);

      const response = await fetch(
        `http://localhost:1337/api/reviews/${reviewId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ reviewId }),
        }
      );

      if (!response.ok) {
        toast.error("response is not okey");
      }

      const responseData = await response.json();
      toast.success("response is successful");
    } catch (error) {
      console.log("error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section>
      <Button
        onClick={() => deleteReview(reviewId)}
        variant="outline"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Deleting" : "Delete"}
      </Button>
    </section>
  );
};

export default ReviewsDelete;
