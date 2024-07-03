"use client";

import { ApolloClient, ApolloProvider, InMemoryCache, gql, useQuery } from "@apollo/client";
import type { NextPage } from "next";
import Content from "~~/components/Content";

const Home: NextPage = () => {
  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <Content />
      </div>
    </>
  );
};

export default Home;
