"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "next/navigation";

import ReviewsDelete from "@/components/Forms/ReviewsDelete";
import ReviewsUpdate from "@/components/Forms/ReviewsUpdate"

const fetcher = async (id: string) => {
  const res = await axios.get(`http://localhost:1337/api/reviews/${id}`);
  return res.data || [];
};

const Review = () => {
  const { id } = useParams();

  const {
    data: reviewData,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["review", id],
    queryFn: () => fetcher(id as any),
  });

  if (isError) {
    return <main>Error</main>;
  }

  if (isLoading) {
    return <main>Loading...</main>;
  }

  // console.log("reviewData:", reviewData)

  return (
    <main className="flex flex-col gap-4 p-4">
      <h1 className="font-bold">Review:</h1>
      <article className="flex flex-col max-w-96 min-w-48 border rounded-md">
        <h2>{reviewData?.data?.attributes?.userDisplayName}</h2>

        <div className="flex flex-row">
          <span>{reviewData?.data?.attributes?.body}</span>
          <ReviewsUpdate reviewData={reviewData} reviewId={id}/>
        </div>
        
        <p>{reviewData?.data?.attributes?.createdAt}</p>
      </article>

      <ReviewsDelete reviewId={id} />

    </main>
  );
};

export default Review;