mod abi;
mod pb;
mod rpc;
use crate::abi::contract::events::Transfer as TransferEvent;
use crate::rpc::TokenMeta;
use pb::contract::v1::{Transfer, Transfers};
use substreams::store::{StoreAdd, StoreAddInt64, StoreNew}; // TODO! 1. (Checkpoint 3.3) import the correct store type and trait
use substreams::Hex;
use substreams_entity_change::pb::entity::EntityChanges;
use substreams_entity_change::tables::Tables as EntityChangesTables;
use substreams_ethereum::pb::eth::v2 as eth;
use substreams_ethereum::Event;

#[allow(unused_imports)]
use num_traits::cast::ToPrimitive;

substreams_ethereum::init!();

#[substreams::handlers::map]
fn map_apes(blk: eth::Block) -> Result<Transfers, substreams::errors::Error> {
    todo!("1. find event address from the block");

    // Making rpc calls for token metadata
    let token_meta = TokenMeta::new(todo!("2. event address goes here"));

    todo!("3. filter by name");

    Transfer {
        address: Hex::encode(String::new()), // TODO! 4. replace `String::new()` with event address")
        name: token_meta.name,
        symbol: token_meta.symbol,
    };

    Ok(Transfers {
        transfers: todo!("5. vector of Transfer protobufs"),
    })
}

#[substreams::handlers::store]
fn store_transfer_volume(transfers: Transfers) {
    todo!("1. add the correct store as the second function argument");

    todo!("2. iterate over the transfers");

    todo!("3. use the `.add()` method on your store to increment the value by 1");
}

#[substreams::handlers::map]
fn graph_out() -> Result<EntityChanges, substreams::errors::Error> {
    // Initializing EntityChanges container
    let mut tables = EntityChangesTables::new();

    todo!("1. scroll to top of file to add the imports");

    todo!("2. pass in the store as the first function argument");

    todo!("3. pass in the second function argument");

    todo!("4. iterate over the transfers");

    todo!("5. get the volume from the store");

    todo!("6. create EntityChanges");

    // returning EntityChanges
    Ok(tables.to_entity_changes())
}
