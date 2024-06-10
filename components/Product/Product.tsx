"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "next/navigation";

import Review from "@/components/Review/Review";

const fetcher = async (id: string) => {
  const res = await axios.get(`http://localhost:1337/api/products/${id}`);
  return res.data || [];
};

const Product = () => {
  const { id } = useParams();

  const {
    data: productData,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetcher(id as any),
  });

  if (isError) {
    return <main>Error</main>;
  }

  if (isLoading) {
    return <main>Loading...</main>;
  }

  return (
    <main className="flex flex-col gap-4 p-4">
      <h1 className="font-bold">Product:</h1>
      <article className="flex flex-col max-w-96 min-w-48 border rounded-md">
        <h2>{productData?.data?.attributes?.name}</h2>
        <span>{productData?.data?.attributes?.price}</span>
        <p>{productData?.data?.attributes?.details}</p>
      </article>

      <Review productId={id} />

    </main>
  );
};

export default Product;