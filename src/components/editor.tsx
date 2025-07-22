"use client";
import React, { useState } from "react";
import type { Snippet } from "@/generated/prisma";
import { Button } from "./ui/button";
import Editor from '@monaco-editor/react';
import { saveSnippet  } from '@/actions/server';


const CodeEditor = ({ snippet }: { snippet: Snippet }) => {
  const [code, setCode] = useState(snippet.code);

  const changeEventHandaler = (val : string = "") => {
    setCode(val);
  }

  const saveSnippetAction = saveSnippet.bind(null , snippet.id , code)

  return (
    <div className="flex flex-col gap-4">
      <form  action={saveSnippetAction}
      className="flex items-center justify-between">
        <h1 className="font-bold text-xl">Your Code Editor</h1>
        <Button type="submit">Save</Button>
      </form>
       <Editor
        height="60vh"
        theme="vs-dark"
        defaultLanguage="java"
        defaultValue={code}
        onChange={changeEventHandaler}
      />
    </div>
  );
};

export default CodeEditor;
