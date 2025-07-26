import CodeEditor from "@/components/editor";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import React from "react";

type Props = {
  params: {
    id: string;
  };
};

export default async function EditSnippet({ params }: Props) {
  const id = parseInt(params.id);

  if (isNaN(id)) notFound();

  const snippet = await prisma.snippet.findUnique({
    where: { id },
  });

  if (!snippet) notFound();

  return (
    <div>
      <CodeEditor snippet={snippet} />
    </div>
  );
}
