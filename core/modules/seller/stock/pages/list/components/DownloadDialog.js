/* eslint-disable no-useless-escape */
import clsx from 'clsx';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import TextField from '@common_textfield';
import Autocomplete from '@common_autocomplete';
import Button from '@common_button';
import useStyles from '@sellermodules/stock/pages/list/components/style';

const DownloadAllContent = (props) => {
    const {
        t, dataLocations, open, setOpen, handleDownloadAll, handleDownloadTemplate, title,
    } = props;
    const classes = useStyles();

    const [selected, setSelected] = React.useState([]);
    const disabledButton = selected.length === 0;

    return (
        <Dialog
            open={open}
            onClose={() => { setOpen(false); setSelected([]); }}
            classes={{ paper: classes.dialogContainer }}
            fullWidth
        >
            <DialogTitle className={classes.dialogTitleContainer}>
                { title === 'stock'
                    ? t('sellerstock:Download_Stock')
                    : t('sellerstock:Download_Template')}
                <IconButton className={classes.closeButton} onClick={() => { setOpen(false); setSelected([]); }}>
                    <CloseIcon className={classes.closeIcon} />
                </IconButton>
            </DialogTitle>
            <DialogContent className={clsx(classes.contentDownload, 'grid')}>
                <div className="title">{t('sellerstock:Select_Location')}</div>
                <Autocomplete
                    multiple
                    id="location"
                    name="location"
                    options={dataLocations}
                    getOptionLabel={(option) => option.label}
                    value={selected}
                    onChange={(e) => setSelected(e)}
                    primaryKey="value"
                    labelKey="label"
                    renderInput={(params) => (
                        <TextField
                            className={classes.textInputDownload}
                            {...params}
                        />
                    )}
                />
            </DialogContent>
            <DialogContent className={clsx(classes.contentDownload, 'button')}>
                <Button
                    disabled={disabledButton}
                    className={classes.btn}
                    onClick={() => (title === 'stock'
                        ? handleDownloadAll(selected, true)
                        : handleDownloadTemplate(selected)
                    )}
                >
                    {t('common:Download')}
                </Button>
            </DialogContent>
        </Dialog>
    );
};

export default DownloadAllContent;
