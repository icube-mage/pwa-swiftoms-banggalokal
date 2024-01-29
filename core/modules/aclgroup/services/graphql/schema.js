import { gql } from '@apollo/client';

export const getCustomerGroupOptions = gql`
    query getCustomerGroupOptions {
        getCustomerGroupOptions {
            label
            value
        }
    }
`;

export const getCustomerGroupList = gql`
    query getCustomerGroupList($pageSize: Int!, $currentPage: Int!, $filter: CustomerGroupFilterInput, $sort: CustomerGroupSortInput) {
        getCustomerGroupList(pageSize: $pageSize, currentPage: $currentPage, filter: $filter, sort: $sort) {
            items{
                customer_group_code
                customer_group_id
            }
            total_count
            page_info {
                page_size
                current_page
                total_pages
            }
        }
    }
`;

export const getAclTree = gql`
    query {
        getAclTree {
            children {
                label
                value
                children {
                    label
                    value
                }
            }
            label
            value
        }
    }
`;

export const getAclByGroupId = gql`
    query getAclByGroupId($group_id: Int!) {
        getAclByGroupId(group_id: $group_id) {
            acl_code
            is_all_acl
        }
    }
`;

export const createUserGroup = gql`
    mutation createUserGroup($input: UserGroupInput!) {
        createUserGroup(input: $input) {
            group_id
        }
    }
`;
export const updateUserGroup = gql`
    mutation updateUserGroup($group_id: Int!, $input: UserGroupInput!) {
        updateUserGroup(group_id: $group_id, input: $input) {
            group_id
        }
    }
`;

export const deleteUserGroup = gql`
    mutation deleteUserGroup($id: [Int]!) {
        deleteUserGroup(group_id: $id)
    }
`;

export default {
    getCustomerGroupOptions,
    getCustomerGroupList,
    getAclTree,
    getAclByGroupId,
    createUserGroup,
    updateUserGroup,
    deleteUserGroup,
};
