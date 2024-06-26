import { Address } from "./scaffold-eth";

interface TableProps {
  data: any;
}

const Table: React.FC<TableProps> = ({ data }) => {
  return (
    <div className="space-y-4">
      <div className="p-4 bg-accent rounded shadow grid grid-cols-4 gap-8">
        <div className="font-bold text-xl">Name</div>
        <div className="font-bold text-xl">Symbol</div>
        <div className="font-bold text-xl">Address</div>
        <div className="font-bold text-xl">Volume</div>
      </div>
      {data.transferVolumes.map((transfer: any) => (
        <div key={transfer.id} className="p-4 bg-accent rounded shadow grid grid-cols-4 gap-8">
          <p>{transfer.name}</p>
          <p>{transfer.symbol}</p>
          <p>
            <Address address={`0x${transfer.address}`} />
          </p>
          <p>{transfer.volume}</p>
        </div>
      ))}
    </div>
  );
};

export default Table;
