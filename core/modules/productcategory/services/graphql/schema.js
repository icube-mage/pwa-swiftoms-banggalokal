import { gql } from '@apollo/client';

export const getProductCategoryList = gql`
    query getProductCategoryList(
        $pageSize: Int!,
        $currentPage: Int!,
        $filter: ProductCategoryFilterInput,
        $sort: ProductCategorySortInput,
    ){
        getProductCategoryList(
            pageSize: $pageSize,
            currentPage: $currentPage,
            filter: $filter,
            sort: $sort,
        ){
            items {
                entity_id
                marketplace_code
                marketplace_category_id
                marketplace_category_name
                is_active
            }
            page_info {
                current_page
                page_size
                total_pages
            }
            total_count
        }
    }
`;

export const uploadStatusProductCategory = gql`
    mutation uploadStatusProductCategory(
        $binary: String!,
    ){
        uploadStatusProductCategory(
            input: {
                binary: $binary,
            }
        )
    }
`;

export const downloadSampleCsv = gql`
    mutation downloadSampleCsv(
        $type: String!,
    ){
        downloadSampleCsv(
            type: $type,
        )
    }
`;

export const multidisableProductCategory = gql`
    mutation multidisableProductCategory(
        $id: [Int!]!
    ){
        multidisableProductCategory(
            id: $id
        )
    }
`;

export const pullProductCategory = gql`
    mutation{
        pullProductCategory
    }
`;

export default {
    getProductCategoryList,
    uploadStatusProductCategory,
    downloadSampleCsv,
    multidisableProductCategory,
    pullProductCategory,
};
