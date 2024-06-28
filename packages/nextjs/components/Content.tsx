import Table from "./Table";
import { gql, useQuery } from "@apollo/client";

const Content = () => {
  const query = gql`
    {
      transferVolumes(orderBy: volume, orderDirection: desc) {
        name
        symbol
        address
        volume
      }
    }
  `;

  const { loading, error, data } = useQuery(query);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <>
      <div className="p-6 bg-primary rounded min-h-screen">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">Transfer Volume</h1>
          <div>
            <Table data={data} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Content;
