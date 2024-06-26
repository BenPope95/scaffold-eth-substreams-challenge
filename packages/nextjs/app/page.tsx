"use client";

import Link from "next/link";
import { ApolloClient, ApolloProvider, InMemoryCache, gql, useQuery } from "@apollo/client";
import type { NextPage } from "next";
import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const Home: NextPage = () => {
  const client = new ApolloClient({
    uri: "https://gateway-arbitrum.network.thegraph.com/api/b435458dbec2e8b4b536e995ab79a86a/subgraphs/id/5zvR82QoaXYFyDEKLZ9t6v9adgnptxYpKpSbxtgVENFV",
    cache: new InMemoryCache(),
  });

  const query = gql`
    query testQuery {
      factories(first: 5) {
        id
        poolCount
        txCount
        totalVolumeUSD
      }
      bundles(first: 5) {
        id
        ethPriceUSD
      }
    }
  `;

  const { loading, error, data } = useQuery(query);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <ApolloProvider client={client}>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div>Welcome to Substreams Challenge 1</div>
        <div>{data}</div>
      </div>
    </ApolloProvider>
  );
};

export default Home;
