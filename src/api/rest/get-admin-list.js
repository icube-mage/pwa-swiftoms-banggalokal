const requestGraph = require('../../../core/api/graphql/request');

module.exports = async (req, res) => {
    const graphqlQuery = () => `       
        query {
            getSellerUsers(
            pageSize: 1000
            currentPage: 1
            ) {
                items {
                    id
                    email
                    name
                    telephone
                }
            }
        }
    `;

    const runGraphql = await requestGraph(graphqlQuery(), {}, {
        session: { token: '' },
        headers: { authorization: req?.headers?.authorization },
    });

    const result = runGraphql?.getSellerUsers?.items || false;

    if (result) {
        res.status(200).json({
            code: 200,
            response: true,
            message: 'Success get admin list',
            data: result.map((e) => ({
                account_id: e.id,
                email: e.email,
                name: e.name,
                telephone: e.telephone,
            })),
        });
    } else {
        res.status(400).json({
            code: 400,
            response: false,
            message: 'Failed when try to access admin list !',
            data: null,
        });
    }
};
