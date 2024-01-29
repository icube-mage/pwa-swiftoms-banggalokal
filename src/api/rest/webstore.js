const { decrypt } = require('../../../core/helpers/encryption');

module.exports = (req, res) => {
    const reqData = req?.query?.data || null;
    const request = reqData && decrypt(reqData);
    const jsonData = JSON.parse(request);

    fetch(`https://${jsonData?.target}/custom/generate_dashboard_url?store_name=${jsonData?.storecode || null}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${jsonData?.token}`,
        },
    })
        .then((data) => data.json())
        .then((json) => {
            res.status(200).json(json);
        })
        .catch((err) => res.status(500).json(err));
};
