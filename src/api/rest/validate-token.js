const requestGraph = require('../../../core/api/graphql/request');

module.exports = async (req, res) => {
    const graphqlQuery = (token) => `
            mutation {
                validateToken(token: "${token}") {
                    response
                    message
                    data {
                    account_id
                    brand_id
                    brand_name
                    owner      
                    integration {
                        gate_id
                        shop_name
                        marketplace {
                        code
                        name
                        }        
                        is_connected
                    } 
                    token
                    expired_at
                    }    
                }
            }
        `;

    const validateToken = await requestGraph(graphqlQuery(req?.body?.token));

    if (validateToken?.validateToken?.data?.account_id) {
        const result = {
            code: 200,
            ...validateToken?.validateToken,
        };

        res.status(200).json(result);
    } else {
        res.status(400).json({
            code: 400,
            response: false,
            message: 'Token is not valid',
            data: null,
        });
    }
};
