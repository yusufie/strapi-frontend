"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link"

const fetcher = async () => {
  const res = await axios.get("http://localhost:1337/api/products");
  return res.data || [];
};

const Products = () => {

  const { data: productsData, isError, isLoading,} = useQuery({
    queryKey: ["products"],
    queryFn: fetcher,
  });

  if (isError) {
    return <main>Error</main>;
  }

  if (isLoading) {
    return <main>Loading...</main>;
  }

//   console.log("productsData:",productsData)

  return (
    <main className="flex flex-col gap-4 p-4">
      <h1 className="font-bold"> Products: </h1>

      <section className="flex flex-wrap md:flex-nowrap gap-4 w-full">
        {productsData?.data?.map((product: any) => (
            <Link href={`/products/${product?.id}`} key={product?.id}>
                <article className="flex flex-col max-w-96 min-w-48 border rounded-md">
                    <h2>{product?.attributes?.name}</h2>
                    <span>{product?.attributes?.price}</span>
                    <button>Details</button>
                </article>
            </Link>
        ))}
      </section>

    </main>
  );
};

export default Products;
