import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex flex-row items-center gap-8 p-24">

    <Link href={"/products"}>
      <Button>Products</Button>
    </Link>

    <Link href={"/reviews"}>
      <Button>Reviews</Button>
    </Link>

    {/* <Button>3</Button> */}
    {/* <Button>4</Button> */}
    </main>
  );
}
