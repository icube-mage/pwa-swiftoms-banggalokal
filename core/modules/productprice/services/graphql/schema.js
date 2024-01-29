import { gql } from '@apollo/client';

export const getMarketplaceProductPriceList = gql`
    query getMarketplaceProductPriceList(
        $pageSize: Int!,
        $currentPage: Int!,
        $filter: MarketplaceProductPriceFilterInput,
        $sort: MarketplaceProductPriceSortInput,
    ){
        getMarketplaceProductPriceList(
            pageSize: $pageSize,
            currentPage: $currentPage,
            filter: $filter,
            sort: $sort,
        ){
            items{
                channel_code
                entity_id
                price
                sku
                special_from_date
                special_price
                special_to_date
                updated_at
            }
            page_info{
                current_page
                page_size
                total_pages
            }
            total_count
        }
    }
`;

export const downloadSampleCsv = gql`
    mutation downloadSampleCsv($type: String!) {
        downloadSampleCsv(type: $type)
    }
`;

export const importMarketplaceProductPrice = gql`
    mutation importMarketplaceProductPrice($binary: String!) {
        importMarketplaceProductPrice(input: { binary: $binary })
    }
`;

export const updateMarketplaceProductPriceToMp = gql`
    mutation updateMarketplaceProductPriceToMp($sku: [String!]) {
        updateMarketplaceProductPriceToMp(sku: $sku)
    }
`;

export const deleteProductPrice = gql`
    mutation deleteProductPrice($id: [Int!]!) {
        deleteProductPrice(id: $id)
    }
`;

export default {
    getMarketplaceProductPriceList,
    downloadSampleCsv,
    importMarketplaceProductPrice,
    updateMarketplaceProductPriceToMp,
    deleteProductPrice,
};
