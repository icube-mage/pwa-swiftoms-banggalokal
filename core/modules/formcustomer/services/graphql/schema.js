import { gql } from '@apollo/client';

export const getFormDataCurbPickup = gql`
    query getFormDataCurbPickup(
        $id: String!,
    ){
        getFormDataCurbPickup(
            id: $id
        ){
            name
            phone
            pickup_id
            pickup_name
            location{
                value
                label
            }
            is_location_enable
        }
    }
`;

export const getLocation = gql`
    query getFormDataCurbPickup(
        $id: String!,
    ){
        getFormDataCurbPickup(
            id: $id
        ){
            name
            location{
                value
                label
            }
        }
    }
`;

export const addCurbPickupInfo = gql`
    mutation addCurbPickupInfo(
        $id: String!,
        $name: String!,
        $phone: String!,
        $loc_details: String!,
        $vehicle_number: String!,
        $vehicle_desc: String!,
        $notes: String!,
    ){
        addCurbPickupInfo(
            id: $id,
            input: {
                name: $name,
                phone: $phone,
                loc_details: $loc_details,
                vehicle_number: $vehicle_number,
                vehicle_desc: $vehicle_desc,
                notes: $notes,
            }
        )
    }
`;

export default {
    getFormDataCurbPickup,
    getLocation,
    addCurbPickupInfo,
};
