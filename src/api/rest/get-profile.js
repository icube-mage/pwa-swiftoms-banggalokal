const requestGraph = require('../../../core/api/graphql/request');

module.exports = async (req, res) => {
    const graphqlQuery = () => `       
        query {
            customer {
                email
                firstname
                lastname
                phone_number
            }
        }      
    `;

    const graphqlQueryGetId = (token) => `
        mutation {
            validateToken(token: "${token}") {
                data {
                    account_id
                }
            }
        }
    `;

    const runGraphql = await requestGraph(graphqlQuery(), {}, {
        session: { token: '' },
        headers: { authorization: req?.headers?.authorization },
    });

    const getUserId = await requestGraph(graphqlQueryGetId(req?.headers?.authorization?.replace('Bearer ', '')?.trim()));

    const result = runGraphql?.customer || false;

    if (result) {
        res.status(200).json({
            code: 200,
            response: true,
            message: 'Success get user profile',
            data: {
                account_id: getUserId?.validateToken?.data?.account_id,
                email: result.email,
                name: `${result.firstname}${result.lastname ? ` ${result.lastname}` : ''}`,
                telephone: result.phone_number,
            },
        });
    } else {
        res.status(400).json({
            code: 400,
            response: false,
            message: 'Failed when try to access user profile !',
            data: null,
        });
    }
};
