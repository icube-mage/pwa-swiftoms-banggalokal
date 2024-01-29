import { getStoreHost } from '@helper_config';
import pjson from '@pjson';
import Head from 'next/head';

const Core = (props) => {
    const { Content } = props;
    const pwaVersion = pjson.version;
    const gqlversionUrl = `${getStoreHost()}composer_version.json`;

    if (typeof window === 'undefined') {
        return <></>;
    }
    const httpGet = () => {
        const xmlHttp = new XMLHttpRequest();
        xmlHttp.open('GET', gqlversionUrl, false); // false for synchronous request
        xmlHttp.send(null);
        return xmlHttp.responseText;
    };

    const contentVersion = {
        ...JSON.parse(httpGet()),
        'swiftoms-pwa': pwaVersion,
    };

    const contentProps = {
        contentVersion: JSON.stringify(contentVersion),
        ...props,
    };

    return (
        <>
            <Head>
                <title>Swift OMS Version</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Content {...contentProps} />
        </>
    );
};

export default Core;
