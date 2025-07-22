import { Button } from "@/components/ui/button";
import "./globals.css";

import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

//! export const dynamic = "force-dynamic";
//TODO: disabling the caching feature --> Dynamic rout
//! export const revalidate = 0;
//TODO: Disable caching
//? During on Demand caching we use - 
//TODO: revalidatePath('/)

const Home = async () => {

  const snippets = await prisma.snippet.findMany();

  return (
    <div>
      <div className="font-bold text-4xl">Home</div>
      <div className="flex items-center justify-between mt-10">
        <h1 className="font-bold text-2xl">Snippet</h1>
        <Link href={"/snippet/new"}><Button>New</Button></Link>
      </div>
    {
      snippets.map((val) => (
        <div key={val.id} 
        className="flex items-center justify-between border-[1px] border-zinc-800 my-2 p-2 px-4 rounded-md bg-gray-200">
        <h1 className="font-bold">{val.title}</h1>
        <Link href={`/snippet/${val.id}`}><Button>view</Button></Link>
        </div>
      ))
    }
    </div>
  );
};

export default Home;
