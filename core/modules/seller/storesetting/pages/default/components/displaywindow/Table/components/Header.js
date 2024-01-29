/* eslint-disable no-nested-ternary */
/* eslint-disable eqeqeq */
import clsx from 'clsx';
import { useRouter } from 'next/router';
import Link from 'next/link';

import Paper from '@material-ui/core/Paper';
import InputAdornment from '@material-ui/core/InputAdornment';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';

import Button from '@common_button';
import TextField from '@common_textfield';

import useStyles from '@sellermodules/storesetting/pages/default/components/displaywindow/Table/style';

const TabsHeader = (props) => {
    const {
        header = '', searchPlaceholder = '',
        search, setSearch, t,
    } = props;
    const router = useRouter();

    const classes = useStyles();

    return (
        <Paper className={classes.paperHead}>
            <div className={clsx(classes.header, 'nopad')}>
                {header}
            </div>
            <div className={classes.tableToolbar}>
                <div className="top-buttons-wrapper nopad">
                    <div className="top-item-left">
                        <div className="top-item">
                            <TextField
                                placeholder={searchPlaceholder}
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className={clsx(classes.textInput, 'full')}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <img alt="" src="/assets/img/search.svg" className={classes.iconImg} />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </div>
                    </div>
                    <div className="top-item-right">
                        <div className="top-item">
                            <Button
                                className={classes.btnAdd}
                                onClick={() => router.push('/seller/displaywindow/new')}
                                startIcon={
                                    <FolderOpenIcon />
                                }
                            >
                                <Link href="/seller/displaywindow/new">
                                    {t('common:Add_Display_Window')}
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </Paper>
    );
};

export default TabsHeader;
