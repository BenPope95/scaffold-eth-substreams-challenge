import { gql, useQuery } from "@apollo/client";

const Content = () => {
  const query = gql`
    query testQuery {
      factories(first: 3) {
        id
        poolCount
        txCount
        totalVolumeUSD
      }
      bundles(first: 3) {
        id
        ethPriceUSD
      }
    }
  `;

  const { loading, error, data } = useQuery(query);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  return (
    <>
      <div className="p-6 bg-blue-400 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8">Factories and Bundles</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Factories</h2>
              <div className="space-y-4">
                {data.factories.map((factory: any) => (
                  <div key={factory.id} className="p-4 bg-black rounded shadow">
                    <h3 className="text-xl font-semibold">Factory ID: {factory.id}</h3>
                    <p>Pool Count: {factory.poolCount}</p>
                    <p>Transaction Count: {factory.txCount}</p>
                    <p>Total Volume USD: {factory.totalVolumeUSD}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Bundles</h2>
              <div className="space-y-4">
                {data.bundles.map((bundle: any) => (
                  <div key={bundle.id} className="p-4 bg-black rounded shadow">
                    <h3 className="text-xl font-semibold">Bundle ID: {bundle.id}</h3>
                    <p>ETH Price USD: {bundle.ethPriceUSD}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div>
        {data.factories.map((factory: any) => (
          <div key={factory.id}>
            <h3>Factory ID: {factory.id}</h3>
            <p>Pool Count: {factory.poolCount}</p>
            <p>Transaction Count: {factory.txCount}</p>
            <p>Total Volume USD: {factory.totalVolumeUSD}</p>
          </div>
        ))}
      </div>
      <div>
        {data.bundles.map((bundle: any) => (
          <div key={bundle.id}>
            <h3>Bundle ID: {bundle.id}</h3>
            <p>ETH Price USD: {bundle.ethPriceUSD}</p>
          </div>
        ))}
      </div> */}
    </>
  );
};

export default Content;
