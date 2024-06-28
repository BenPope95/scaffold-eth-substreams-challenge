"use client";

import Link from "next/link";
import { ApolloClient, ApolloProvider, InMemoryCache, gql, useQuery } from "@apollo/client";
import type { NextPage } from "next";
import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Content from "~~/components/Content";

const Home: NextPage = () => {
  const client = new ApolloClient({
    // uri: "https://api.studio.thegraph.com/query/55821/transfers/version/latest",
    uri: "https://api.studio.thegraph.com/query/55821/mints/version/latest",
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <div className="flex items-center flex-col flex-grow pt-10">
        <Content />
      </div>
    </ApolloProvider>
  );
};

export default Home;
