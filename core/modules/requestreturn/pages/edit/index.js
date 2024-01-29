import { withApollo } from '@lib_apollo';
import Content from '@modules/requestreturn/pages/edit/components';
import Core from '@modules/requestreturn/pages/edit/core';

const Page = (props) => (
    <Core
        Content={Content}
        {...props}
    />
);

export default withApollo({ ssr: false })(Page);
