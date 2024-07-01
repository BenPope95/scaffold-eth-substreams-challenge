mod abi;
mod pb;
mod rpc;
use crate::abi::contract::events::Transfer as TransferEvent;
use crate::rpc::TokenMeta;
use ethabi::token;
use hex_literal::hex;
use pb::contract::v1::{self as contract, Transfer, Transfers};
use substreams::store::{StoreAdd, StoreAddInt64, StoreGet, StoreGetInt64, StoreNew};
use substreams::Hex;
use substreams_database_change::pb::database::DatabaseChanges;
use substreams_database_change::tables::Tables as DatabaseChangeTables;
use substreams_entity_change::pb::entity::EntityChanges;
use substreams_entity_change::tables::Tables as EntityChangesTables;
use substreams_ethereum::pb::eth::v2 as eth;
use substreams_ethereum::pb::eth::v2::BigInt;
use substreams_ethereum::Event;

#[allow(unused_imports)]
use num_traits::cast::ToPrimitive;
use std::str::FromStr;
use substreams::scalar::BigDecimal;

substreams_ethereum::init!();

#[substreams::handlers::map]
fn map_events(blk: eth::Block) -> Result<Transfers, substreams::errors::Error> {
    let transfers = blk
        .logs()
        .filter_map(|log| {
            if let Some(transfer) = TransferEvent::match_and_decode(log) {
                let token_meta = TokenMeta::new(&log.log.address);
                Some(Transfer {
                    address: Hex::encode(&log.log.address),
                    name: token_meta.name,
                    symbol: token_meta.symbol,
                })
            } else {
                None
            }
        })
        .collect::<Vec<Transfer>>();

    Ok(Transfers { transfers })
}

#[substreams::handlers::store]
fn store_transfer_volume(transfers: Transfers, store: StoreAddInt64) {
    for transfer in transfers.transfers {
        store.add(0, transfer.address, 1);
    }
}

#[substreams::handlers::map]
fn graph_out(
    transfers: Transfers,
    // change token_meta arg to something else
    volume: StoreGetInt64,
) -> Result<EntityChanges, substreams::errors::Error> {
    // Initialize changes container
    let mut tables = EntityChangesTables::new();

    // Loop over all the abis events to create changes
    transfers.transfers.into_iter().for_each(|transfer| {
        if let Some(value) = volume.get_at(0, &transfer.address) {
            tables
                .create_row("transfer_volume", &transfer.address)
                .set("name", transfer.name)
                .set("symbol", transfer.symbol)
                .set("address", transfer.address)
                .set("volume", value);
        }
    });

    Ok(tables.to_entity_changes())
}
