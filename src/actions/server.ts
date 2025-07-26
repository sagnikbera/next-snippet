"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
//! Caching - on demand
import { revalidatePath } from "next/cache";

export const saveSnippet = async (id: number, code: string) => {
  await prisma.snippet.update({
    where: {
      id,
    },

    data: {
      code,
    },
  });

  redirect(`/snippet/${id}`);
};

export const deleteSnippet = async (id: number) => {
  await prisma.snippet.delete({
    where: {
      id,
    },
  });
  revalidatePath("/");
  redirect("/");
};

export async function createSnippet(
  prevState: { message: string },
  formData: FormData
) {
  try {
    let title = formData.get("title");
    let code = formData.get("code");

    if (typeof title !== "string" || title.trim() === "") {
      return { message: "Title is required!" };
    }

    if (typeof code !== "string" || code.trim() === "") {
      return { message: "Code is required!" };
    }
    let snippet = await prisma.snippet.create({
      data: {
        title,
        code,
      },
    });

    revalidatePath("/");

    console.log(snippet);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { message: error.message };
    }
  }

  redirect("/");
}
