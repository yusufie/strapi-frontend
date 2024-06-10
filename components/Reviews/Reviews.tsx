"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link"
import { Button } from "@/components/ui/button";

const fetcher = async () => {
  const res = await axios.get("http://localhost:1337/api/reviews");
  return res.data || [];
};

const Reviews = () => {

  const { data: reviewsData, isError, isLoading,} = useQuery({
    queryKey: ["reviews"],
    queryFn: fetcher,
  });

  if (isError) {
    return <main>Error</main>;
  }

  if (isLoading) {
    return <main>Loading...</main>;
  }

//   console.log("reviewsData:",reviewsData)

  return (
    <main className="flex flex-col gap-4 p-4">
      <h1 className="font-bold"> Reviews: </h1>

      <section className="flex flex-wrap md:flex-nowrap gap-4 w-full">
        {reviewsData?.data?.map((review: any) => (
            <Link href={`/reviews/${review?.id}`} key={review?.id}>
                <article className="flex flex-col max-w-96 min-w-48 border rounded-md">
                    <h2>{review?.attributes?.userDisplayName}</h2>
                    <span>{review?.attributes?.body}</span>
                    <Button>Details</Button>
                </article>
            </Link>
        ))}
      </section>

    </main>
  );
};

export default Reviews;
