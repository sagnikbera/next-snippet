import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import React from "react";

const snippetDetails = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {

    const id = parseInt((await params).id);
    const snippet = await prisma.snippet.findUnique({
        where: {
            id,
        },
    });

    if(!snippet) return <h1>Snipet not found</h1>

  return (
    <div>
      <h1 className="font-bold text-xl">{snippet?.title}</h1>
      <Button>Edit</Button>
      <Button variant={'destructive'}>Delete</Button>
    </div>
  );
};

export default snippetDetails;
