import { gql } from '@apollo/client';

export const getLocationList = gql`
    query getLocationList($pageSize: Int!, $currentPage: Int!, $filter: LocationFilterInput, $sort: LocationSortInput, $search: String) {
        getLocationList(pageSize: $pageSize, currentPage: $currentPage, filter: $filter, sort: $sort, search: $search) {
            items {
                loc_id
                loc_code
                loc_name
                loc_city {
                    id
                    label
                }
                loc_street
                company {
                    company_name
                }
                company_id
                loc_country {
                    id
                    label
                }
                loc_postcode
                loc_region  {
                    id
                    label
                }
                loc_telephone
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

export const getStoreLocationList = gql`
    query getStoreLocationList($pageSize: Int!, $currentPage: Int!, $filter: LocationFilterInput, $sort: LocationSortInput, $search: String) {
        getStoreLocationList(pageSize: $pageSize, currentPage: $currentPage, filter: $filter, sort: $sort, search: $search) {
            items {
                loc_id
                loc_code
                loc_name
                loc_city {
                    id
                    label
                }
                loc_street
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

export const getLocationById = gql`
    query getLocationById($id: Int!) {
        getLocationById(id: $id) {
            loc_id
            company {
                company_code
                company_id
                company_name
            }
            company_id
            loc_code
            loc_name
            loc_street
            loc_country_id
            loc_region {
                id
                label
            }
            loc_city {
                id
                label
            }
            loc_telephone
            loc_postcode
            loc_long
            loc_lat
            loc_zone
            is_warehouse
            use_in_frontend
            is_virtual_location
            priority
            is_active
            qty_buffer
            is_manage_stock
            is_shipment_auto_complete
            shipper_id
            logistix_credentials_flag_wahana 
            lion_client_code
            loc_operational_time {
                close_at
                day
                open_at
                is_active
            }
        }
    }
`;

export const createLocation = gql`
    mutation createLocation(
        $company_id: Int!
        $loc_code: String!
        $loc_name: String
        $loc_street: String
        $loc_country_id: String
        $loc_region: String
        $loc_city: String
        $loc_telephone: String
        $loc_postcode: String
        $loc_long: String
        $loc_lat: String
        $loc_zone: String
        $use_in_frontend: Int
        $is_warehouse: Int
        $is_virtual_location: Int
        $priority: Int
        $is_active: Int
        $qty_buffer: Int
        $is_manage_stock: Int
        $is_shipment_auto_complete: Int
        $is_create_source_all_products: Boolean
        $shipper_id: String
        $logistix_credentials_flag_wahana: String 
        $lion_client_code: String
        $loc_operational_time: [LocOperationalTimeInput]
    ) {
        createLocation(
            input: {
                company_id: $company_id
                loc_code: $loc_code
                loc_name: $loc_name
                loc_street: $loc_street
                loc_country_id: $loc_country_id
                loc_region: $loc_region
                loc_city: $loc_city
                loc_telephone: $loc_telephone
                loc_postcode: $loc_postcode
                loc_long: $loc_long
                loc_lat: $loc_lat
                loc_zone: $loc_zone
                is_warehouse: $is_warehouse
                use_in_frontend: $use_in_frontend
                is_virtual_location: $is_virtual_location
                priority: $priority
                is_active: $is_active
                qty_buffer: $qty_buffer
                is_manage_stock: $is_manage_stock
                is_shipment_auto_complete: $is_shipment_auto_complete
                is_create_source_all_products: $is_create_source_all_products
                shipper_id: $shipper_id
                logistix_credentials_flag_wahana: $logistix_credentials_flag_wahana 
                lion_client_code: $lion_client_code
                loc_operational_time: $loc_operational_time
            }
        ) {
            loc_id
            company_id
            loc_code
            loc_name
            loc_street
            loc_country_id
            loc_region {
                id
                label
            }
            loc_city {
                id
                label
            }
            loc_telephone
            loc_postcode
            loc_long
            loc_lat
            loc_zone
            is_warehouse
            use_in_frontend
            is_virtual_location
            priority
            is_active
            qty_buffer
            is_manage_stock
            is_shipment_auto_complete
            shipper_id
            logistix_credentials_flag_wahana
            lion_client_code
            loc_operational_time {
                close_at
                day
                open_at
                is_active
            }
        }
    }
`;

export const updateLocation = gql`
    mutation updateLocation(
        $id: Int!
        $company_id: Int!
        $loc_code: String!
        $loc_name: String!
        $loc_street: String!
        $loc_country_id: String
        $loc_region: String!
        $loc_city: String!
        $loc_telephone: String!
        $loc_postcode: String!
        $loc_long: String!
        $loc_lat: String!
        $loc_zone: String!
        $is_warehouse: Int
        $use_in_frontend: Int
        $is_virtual_location: Int
        $priority: Int
        $is_active: Int
        $qty_buffer: Int
        $is_manage_stock: Int
        $is_shipment_auto_complete: Int
        $shipper_id: String
        $logistix_credentials_flag_wahana: String 
        $lion_client_code: String
        $loc_operational_time: [LocOperationalTimeInput]
    ) {
        updateLocation(
            id: $id
            input: {
                company_id: $company_id
                loc_code: $loc_code
                loc_name: $loc_name
                loc_country_id: $loc_country_id
                loc_street: $loc_street
                loc_region: $loc_region
                loc_city: $loc_city
                loc_telephone: $loc_telephone
                loc_postcode: $loc_postcode
                loc_long: $loc_long
                loc_lat: $loc_lat
                loc_zone: $loc_zone
                is_warehouse: $is_warehouse
                use_in_frontend: $use_in_frontend
                is_virtual_location: $is_virtual_location
                priority: $priority
                is_active: $is_active
                qty_buffer: $qty_buffer
                is_manage_stock: $is_manage_stock
                is_shipment_auto_complete: $is_shipment_auto_complete
                shipper_id: $shipper_id
                logistix_credentials_flag_wahana: $logistix_credentials_flag_wahana
                lion_client_code: $lion_client_code
                loc_operational_time: $loc_operational_time
            }
        ) {
            loc_id
            company_id
            loc_code
            loc_name
            loc_street
            loc_country_id
            loc_region {
                id
                label
            }
            loc_city {
                id
                label
            }
            loc_telephone
            loc_postcode
            loc_long
            loc_lat
            loc_zone
            is_warehouse
            use_in_frontend
            is_virtual_location
            priority
            is_active
            qty_buffer
            is_manage_stock
            is_shipment_auto_complete
            shipper_id
            logistix_credentials_flag_wahana
            lion_client_code
            loc_operational_time {
                close_at
                day
                open_at
                is_active
            }
        }
    }
`;

export const getCountries = gql`
    query {
        countries {
            full_name_english
            id
        }
    }
`;

export const getCountry = gql`
    query country($id: String!) {
        country(id: $id) {
            available_regions {
                code
                id
                name
            }
            id
        }
    }
`;

export const getCityListByRegionCode = gql`
    query getCityListByRegionCode($regionCode: String!) {
        getCityListByRegionCode(regionCode: $regionCode) {
            items {
                id
                value
            }
            total_count
        }
    }
`;

export const getCityList = gql`
    query getCityList($filter: CityFilterInput) {
        getCityList(filter: $filter, pageSize: 100, currentPage: 1) {
            items {
                city
                id
                value
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

export const multideleteLocation = gql`
    mutation multideleteLocation($id: [Int!]!) {
        multideleteLocation(id: $id)
    }
`;

export const getCityKecByRegionCode = gql`
    query getCityKecByRegionCode($region_code: String!) {
        getCityKecByRegionCode(region_code: $region_code) {
            label
            value
        }
    }
`;

export const getStoreConfig = gql`
    query getStoreConfig(
        $path: String!
    ){
        getStoreConfig(
            path: $path
        )
    }
`;

export const getZoneList = gql`
    query getZoneList($pageSize: Int!, $currentPage: Int!, $filter: ZoneFilterInput, $sort: ZoneSortInput, $search: String) {
        getZoneList(pageSize: $pageSize, currentPage: $currentPage, filter: $filter, sort: $sort, search: $search) {
            items {
                id
                zone
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

export default {
    getLocationList,
    getLocationById,
    createLocation,
    updateLocation,
    getCountries,
    getCountry,
    getCityListByRegionCode,
    getCityList,
    multideleteLocation,
    getCityKecByRegionCode,
    getStoreLocationList,
    getStoreConfig,
    getZoneList,
};
