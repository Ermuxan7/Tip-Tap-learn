"use client";
// import TipTap from "./components/TipTap";
import dynamic from "next/dynamic";

export default function Home() {
  const Editor = dynamic(() => import("./components/TipTap"), { ssr: false });

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Editor />
    </div>
  );
}
