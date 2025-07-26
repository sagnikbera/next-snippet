import CodeEditor from "@/components/editor";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import React from "react";

type Props = {
  params: {
    id: string;
  };
};

export default async function Page({ params }: Props) {
  const id = parseInt(params.id);

  if (isNaN(id)) return notFound(); 
  const snippet = await prisma.snippet.findUnique({
    where: { id },
  });

  if (!snippet) return notFound(); 

  return (
    <div>
      <CodeEditor snippet={snippet} />
    </div>
  );
}
