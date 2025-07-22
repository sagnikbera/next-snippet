"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation";
import React, { useActionState } from "react";
import * as actions from "@/actions/server"

const createSnippetPage = () => {

    // async function createSnippet(formData:FormData) {
    //     "use server"

    //     let title = formData.get("title") as string;
    //     let code = formData.get("code") as string;

    //     let snippet = await prisma.snippet.create({
    //        data : {
    //         title ,
    //         code
    //        }
    //     })

    //     console.log(snippet);
        
    //     redirect("/");
    // }

    const [formStateData , createSnippetAction] = useActionState(actions.createSnippet , {message:""} )


  return (
    <form action={createSnippetAction}>
      <div>
        <Label>Title</Label>
        <Input type="text" name="title" id="title" />
      </div>
      <div>
        <Label>Code</Label>
        <Textarea name="code" id="code" />
      </div>
      {formStateData.message && <div className="p-2 bg-red-400 border-2 border-red-600 mt-2">{formStateData.message}</div>}
      <Button type="submit" className="mt-4">
        Add Code Snippet
      </Button>
    </form>
  );
};

export default createSnippetPage;
