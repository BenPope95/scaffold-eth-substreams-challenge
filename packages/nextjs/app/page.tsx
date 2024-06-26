"use client";

import Link from "next/link";
import { ApolloClient, ApolloProvider, InMemoryCache, gql } from "@apollo/client";
import type { NextPage } from "next";
import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const Home: NextPage = () => {
  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div>Welcome to Substreams Challenge 1</div>
      </div>
    </>
  );
};

export default Home;
