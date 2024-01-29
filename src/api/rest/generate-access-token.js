const requestGraph = require('../../../core/api/graphql/request');

module.exports = async (req, res) => {
    const graphqlQuery = (email, password) => `
        mutation {
            generateCustomerToken(email : "${email}", password: "${password}") {
                token
            }
        }
    `;

    const email = req?.body?.email;
    const password = req?.body?.password;
    const runGraphql = await requestGraph(graphqlQuery(email, password));
    const result = runGraphql?.generateCustomerToken?.token || false;

    if (result) {
        res.status(200).json({
            code: 200,
            response: true,
            message: 'Generate access success',
            data: {
                token: result,
            },
        });
    } else {
        res.status(400).json({
            code: 400,
            response: false,
            message: 'Username or password is wrong !',
            data: null,
        });
    }
};
