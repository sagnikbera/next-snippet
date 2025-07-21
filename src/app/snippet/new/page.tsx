import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation";
import React from "react";

const createSnippetPage = () => {

    async function createSnippet(formData:FormData) {
        "use server"

        let title = formData.get("title") as string;
        let code = formData.get("code") as string;

        let snippet = await prisma.snippet.create({
           data : {
            title ,
            code
           }
        })

        console.log(snippet);
        
        redirect("/");
    }


  return (
    <form action={createSnippet}>
      <div>
        <Label>Title</Label>
        <Input type="text" name="title" id="title" />
      </div>
      <div>
        <Label>Code</Label>
        <Textarea name="code" id="code" />
      </div>
      <Button type="submit" className="mt-4">
        Add Code Snippet
      </Button>
    </form>
  );
};

export default createSnippetPage;
