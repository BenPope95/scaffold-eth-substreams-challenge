use substreams_ethereum::rpc::RpcBatch;
use crate::abi;
use crate::abi::contract::functions::Symbol;
use crate::abi::contract::functions::Name;

use crate::abi::contract::events::Transfer;

pub struct TokenMeta {
    pub name: String,
    pub symbol: String,
}

impl TokenMeta {
    pub fn new(address: &Vec<u8>) -> Self {
        let batch = RpcBatch::new();
        let response = batch
            .add(Name {}, address.clone())
            .add(Symbol {}, address.clone())
            .execute();
    
        if let Some(nft) = response.ok() {
            let nft = nft.responses;
            TokenMeta {
                name: RpcBatch::decode::<_, Name>(&nft[0]).unwrap_or(String::new()),
                symbol: RpcBatch::decode::<_, Symbol>(&nft[1]).unwrap_or(String::new()),
            }
        } else {
            TokenMeta {
                name: String::new(),
                symbol: String::new(),
            }
        }
        
    }

}
