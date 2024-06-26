"use client";

import Link from "next/link";
import { ApolloClient, ApolloProvider, InMemoryCache, gql, useQuery } from "@apollo/client";
import type { NextPage } from "next";
import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Content from "~~/components/Content";

const Home: NextPage = () => {
  const client = new ApolloClient({
    uri: "https://gateway-arbitrum.network.thegraph.com/api/b435458dbec2e8b4b536e995ab79a86a/subgraphs/id/5zvR82QoaXYFyDEKLZ9t6v9adgnptxYpKpSbxtgVENFV",
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div>Welcome to Substreams Challenge 1</div>
        <Content />
      </div>
    </ApolloProvider>
  );
};

export default Home;
