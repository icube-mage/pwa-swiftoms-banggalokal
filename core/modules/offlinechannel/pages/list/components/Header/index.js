import React from 'react';
import Button from '@common_button';
import TextField from '@common_textfield';

import { useRouter } from 'next/router';
import useStyles from '@modules/offlinechannel/pages/list/components/Header/style';
import SearchIcon from '@material-ui/icons/Search';

const HeaderContent = (props) => {
    const { search, setSearch, t } = props;
    const classes = useStyles();
    const router = useRouter();
    return (
        <div className={classes.headerContainer}>
            <div className={classes.search}>
                <div className={classes.searchIcon}>
                    <SearchIcon />
                </div>
                <TextField
                    multiple
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className={classes.textField}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    InputProps={{
                        className: classes.fieldInput,
                    }}
                    placeholder={t('offlinechannel:Search')}
                />
            </div>
            <Button
                buttonType="primary-rounded"
                onClick={() => router.push('/integration/offlinechannel/add')}
            >
                {t('offlinechannel:Add_Channel')}
            </Button>
        </div>
    );
};

export default HeaderContent;
