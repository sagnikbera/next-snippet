import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import React from "react";
import * as serverAction from "@/actions/server"

const snippetDetails = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const id = parseInt((await params).id);

  await new Promise((r) => setTimeout(r,1000));

  const snippet = await prisma.snippet.findUnique({
    where: {
      id,
    },
  });

  if (!snippet) return <h1>Snipet not found</h1>;

  const deleteSnippetAction = serverAction.deleteSnippet.bind(null , snippet.id)

  return (
    <div className="fleẋ flex-col">
    <div className="flex items-center justify-between border-[1px] border-zinc-400 p-4 rounded-md bg-sky-100">
      <h1 className="font-bold text-xl">{snippet?.title.toUpperCase()}</h1>
      <div className="flex items-center gap-2">
        <Link href={'/'}><Button>Home</Button></Link>
        <Link href={`/snippet/${snippet.id}/edit`}><Button>Edit</Button></Link>
        <form action={deleteSnippetAction}>
          <Button 
          type="submit"
          variant={"destructive"}>Delete</Button>
        </form>
      </div>
    </div>
    <pre className="p-3 bg-gray-300 rounded-md border-gray-300 font-mono font-semibold">
      <code>{snippet?.code}</code>
    </pre>
    </div>
  );
};

export default snippetDetails;


//! generate Static rount from dynamic rout

export async function generateStaticParams(){
  const snippets = await prisma.snippet.findMany();

  return snippets.map((singleSnippet) => {
    return {id : singleSnippet.id.toString()}
  })
}
