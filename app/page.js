"use client"
import Gutter from "@/components/Gutter";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import SearchForm from "@/components/SearchForm";

export default function Home() {
  return (
    <>
      <Hero />
      <Gutter>
        <SearchForm/>

      </Gutter>
    </>
  );
}
