import CodeEditor from "@/components/editor";
import { prisma } from "@/lib/prisma";
import React from "react";


const editSnippet = async ({params} : {params : {id : string} }) => {
    let {id} = params;
    let _id = parseInt(id);
    let snippet = await prisma.snippet.findUnique({
        where: {
            id : _id
        }
    })

    if(!snippet) return <h1>Snippet not found!</h1>
  return (
    <div>
        <CodeEditor snippet={snippet}/>
    </div>
  );
};

export default editSnippet;
