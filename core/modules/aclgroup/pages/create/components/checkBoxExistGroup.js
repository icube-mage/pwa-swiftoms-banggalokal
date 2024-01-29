/* eslint-disable react/jsx-wrap-multilines */
import React, { useEffect, useState } from 'react';
import Select from '@common_select';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';

const font = '"Roboto", "Helvetica", "Arial", sans-serif';
const colorText = '#536777';

const useStyles = makeStyles(() => ({
    checkBoxLabel: {
        '&.MuiFormControlLabel-label': {
            font,
        },
    },
    fieldInput: {
        borderRadius: 20,
        '& .MuiOutlinedInput-input': {
            padding: '10px 14px',
        },
    },
    root: {
        '&:focus': {
            backgroundColor: 'transparent',
        },
    },
}));

const CheckBoxExistGroup = (props) => {
    const {
        getCheckedGroup,
        getOptions = null,
        options,
        loading = false,
        t,
    } = props;
    const classes = useStyles();
    const [value, setValue] = useState('');
    const [checked, setChecked] = useState(false);

    const handleChange = (e) => {
        setValue(e.target.value);
    };

    useEffect(() => {
        if (getOptions) {
            getOptions();
        }
    }, []);

    useEffect(() => {
        if (value) {
            getCheckedGroup({
                variables: {
                    group_id: Number(value),
                },
            });
        }
    }, [value]);

    const handleChangeCheckBox = (event) => {
        setChecked(event.target.checked);
    };

    return (
        <div className={classes.formField}>
            <FormControlLabel
                control={<Checkbox className={classes.checkBoxLabel} checked={checked} onChange={handleChangeCheckBox} size="small" />}
                label={
                    <div style={{
                        fontFamily: font, color: colorText, fontSize: '16px', display: 'flex', alignItems: 'center',
                    }}
                    >
                        <div style={{ padding: '0px 5px' }}>
                            <span>{t('usergroup:Copy_from_User_Group')}</span>
                        </div>
                        <div style={{ padding: '0px 5px' }}>
                            <Select
                                loading={loading}
                                name="exist_group"
                                value={value}
                                onChange={handleChange}
                                dataOptions={options}
                                selectClasses={classes.fieldInput}
                                rootClasses={classes.root}
                                // formControlClasses={classes.selectControl}
                                enableEmpty={false}
                                disabled={!checked}
                            />
                        </div>
                    </div>
                }
            />
        </div>
    );
};

export default CheckBoxExistGroup;
