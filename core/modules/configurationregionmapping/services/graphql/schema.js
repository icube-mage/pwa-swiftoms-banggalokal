import { gql } from '@apollo/client';

export const getChannelRegionList = gql`
    query getChannelRegionList(
        $pageSize: Int!,
        $currentPage: Int!,
        $filter: ChannelRegionFilterInput,
        $sort: ChannelRegionSortInput
    ){
        getChannelRegionList(
            pageSize: $pageSize,
            currentPage: $currentPage
            filter: $filter
            sort: $sort
        ){
            items {
                id
                code
                created_at
                region_raw
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

export const deleteChannelRegions = gql`
    mutation deleteChannelRegions($id: [Int!]!){
        deleteChannelRegions(id: $id)
    }
`;

export const saveChannelRegion = gql`
mutation saveChannelRegion($input: ChannelRegionInput!){
    saveChannelRegion(input: $input)
  }
`;

export const getChannelRegionById = gql`
query getChannelRegionById($id: Int!) {
    getChannelRegionById(id: $id) {
      code
      created_at
      id
      region_raw
    }
  }
`;

export const getCountries = gql`
    query {
        countries {
            full_name_english
            id
            available_regions {
                code
                id
                name
            }
        }
    }
`;

export default {
    getChannelRegionList,
    deleteChannelRegions,
    saveChannelRegion,
    getChannelRegionById,
    getCountries,
};
