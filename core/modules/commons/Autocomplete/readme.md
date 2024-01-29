# Description

Autocomplete is module commons to create custom Field Searchable Dropdown view


## How To Install

**1. Import module to your component**
```node
import Autocomplete from '@common_autocomplete';
```

or

```node
import Autocomplete from '{pathModule}/commons/Autocomplete';
```

**2. Place Autocomplete component on your component**

```node
....

    import companyGqlService from '@modules/company/services/graphql';

    ...

    const [value, setValue] = React.useState();
    const [valueLazy, setValueLazy] = React.useState();
    const [valueServer, setValueServer] = React.useState();
    const [getCompanyList, getCompanyListRes] = companyGqlService.getCompanyList();

    // default mode
    <Autocomplete
        label="Default Mode"
        value={value}
        onChange={setValue}
        options={[
            { vs_id: 1, vs_name: 'VSSWI' },
            { vs_id: 2, vs_name: 'VSSWIawfsdfs' },
            { vs_id: 3, vs_name: 'VSSWIbbbbbbb' },
            { vs_id: 4, vs_name: 'VSSWIzzzzzzz' },
        ]}
        primaryKey="vs_id"
        labelKey="vs_name"
        multiple={false}
        disabled={false}
        error={!value}
        helperText={(!value || '') && 'Error message'}
    />

    // lazy mode
    <Autocomplete
        label="Lazy Mode"
        mode="lazy"
        value={valueLazy}
        onChange={setValueLazy}
        loading={getCompanyListRes.loading}
        options={
            getCompanyListRes
            && getCompanyListRes.data
            && getCompanyListRes.data.getCompanyList
            && getCompanyListRes.data.getCompanyList.items
        }
        getOptions={getCompanyList}
        primaryKey="company_id"
        labelKey="company_name"
    />

    // server mode
    <Autocomplete
        label="Server Mode"
        mode="server"
        value={valueServer}
        onChange={setValueServer}
        loading={getCompanyListRes.loading}
        getOptionLabel={(option) => option && `${option.company_name} - 1213131`}
        options={
            getCompanyListRes
            && getCompanyListRes.data
            && getCompanyListRes.data.getCompanyList
            && getCompanyListRes.data.getCompanyList.items
        }
        getOptions={getCompanyList}
        primaryKey="company_id"
        labelKey="company_name"
    />
....
```

### Properties
| Props       | Required | Description | Type |
| :---        | :---     | :---        |:---  |

