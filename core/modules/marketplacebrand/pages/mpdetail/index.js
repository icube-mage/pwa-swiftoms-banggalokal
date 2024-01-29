import { withApollo } from '@lib_apollo';
import Content from '@modules/marketplacebrand/pages/mpdetail/components';
import Core from '@modules/marketplacebrand/pages/mpdetail/core';

const Page = (props) => (
    <Core
        Content={Content}
        {...props}
    />
);

export default withApollo({ ssr: false })(Page);
