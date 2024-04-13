import  { useState, useEffect } from 'react';
import { forwardRef } from 'react';
import MaterialTable from "material-table";
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import { Alert, TextField } from '@mui/material';
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@material-ui/core';
import GroupIcon from '@mui/icons-material/Group';
import { useTheme } from '../contexts/ThemeContext';
import ToggleThemeButton from './Toggle';
import axios from 'axios';

function Table() {
    const { darkMode } = useTheme();
    const tableIcons = {
        Add: forwardRef((props, ref) => <AddBox
            {...props}
            ref={ref}
            style={{ color: darkMode ? '#fff' : '#222', }}
        />
        ),
        Check: forwardRef((props, ref) => <Check
            style={{ color: darkMode ? '#fff' : '#222', }}
            {...props} ref={ref} />),
        Clear: forwardRef((props, ref) => <Clear
            style={{ color: darkMode ? '#fff' : '#222', }}
            {...props} ref={ref} />),
        Delete: forwardRef((props, ref) => <DeleteOutline
            style={{ color: darkMode ? '#fff' : '#222', }}
            {...props} ref={ref} />),
        DetailPanel: forwardRef((props, ref) => <ChevronRight
            style={{ color: darkMode ? '#fff' : '#222', }}
            {...props} ref={ref} />),
        Edit: forwardRef((props, ref) => <Edit
            style={{ color: darkMode ? '#fff' : '#222', }}
            {...props} ref={ref} />),
        Export: forwardRef((props, ref) => <SaveAlt
            style={{ color: darkMode ? '#fff' : '#222', }}
            {...props} ref={ref} />),
        Filter: forwardRef((props, ref) => <FilterList
            style={{ color: darkMode ? '#fff' : '#222', }}
            {...props} ref={ref} />),
        FirstPage: forwardRef((props, ref) => <FirstPage
            style={{ color: darkMode ? '#fff' : '#222', }}
            {...props} ref={ref} />),
        LastPage: forwardRef((props, ref) => <LastPage
            style={{ color: darkMode ? '#fff' : '#222', }}
            {...props} ref={ref} />),
        NextPage: forwardRef((props, ref) => <ChevronRight
            style={{ color: darkMode ? '#fff' : '#222', }}
            {...props} ref={ref} />),
        PreviousPage: forwardRef((props, ref) => <ChevronLeft
            style={{ color: darkMode ? '#fff' : '#222', }}
            {...props} ref={ref} />),
        ResetSearch: forwardRef((props, ref) => <Clear
            style={{ color: darkMode ? '#fff' : '#222', }}
            {...props} ref={ref} />),
        Search: forwardRef((props, ref) => <Search
            style={{ color: darkMode ? '#fff' : '#222', }}
            {...props} ref={ref} />),
        SortArrow: forwardRef((props, ref) => <ArrowDownward
            style={{ color: darkMode ? '#fff' : '#222', }}
            {...props} ref={ref} />),
        ThirdStateCheck: forwardRef((props, ref) => <Remove
            style={{ color: darkMode ? '#fff' : '#222', }}
            {...props} ref={ref} />),
        ViewColumn: forwardRef((props, ref) => <ViewColumn
            style={{ color: darkMode ? '#fff' : '#222', }}
            {...props} ref={ref} />)
    };
    var columns = [
        { title: "id", field: "id", hidden: true, editable: false },
        {
            title: 'Avatar',
            field: 'avatar',
            render: rowData => (
                // eslint-disable-next-line jsx-a11y/alt-text
                <img
                    style={{
                        height: 36, borderRadius: '50%'

                    }}
                    src={rowData.avatar}
                />
            ),
            headerStyle: {
                color: darkMode ? '#fff' : '#222',
            },
            cellStyle: {
                color: darkMode ? '#fff' : '#222',
            }
        },
        {
            title: "Name", field: "name",
            headerStyle: {
                color: darkMode ? '#fff' : '#222',
            },
            cellStyle: {
                color: darkMode ? '#fff' : '#222',
            }

        },
        {
            title: "Email", field: "email",
            headerStyle: {
                color: darkMode ? '#fff' : '#222',
            },
            cellStyle: {
                color: darkMode ? '#fff' : '#222',
            }
        },
        {
            title: "Role", field: "role",
            lookup: {
                'admin': 'admin',
                'customer': 'customer',
            },
            headerStyle: {
                color: darkMode ? '#fff' : '#222',
            },
            cellStyle: {
                color: darkMode ? '#fff' : '#222',
            }
        },
        {
            title: "Password", field: "password",
            headerStyle: {
                color: darkMode ? '#fff' : '#222',
            },
            cellStyle: {
                color: darkMode ? '#fff' : '#222',
            }
        },
    ]

    const [data, setData] = useState([]); //table data
    const [iserror, setIserror] = useState(false);
    const [errorMessages, setErrorMessages] = useState([]);
    const [searchText, setSearchText] = useState('');

    const api = axios.create({
        baseURL: `http://localhost:3000`
    })
    function validatePassword(password) {
        // Password must be at least 8 characters long
        if (password.length < 8) {
            return false;
        }
        if (!/[A-Z]/.test(password)) {
            return false;
        }
        if (!/[a-z]/.test(password)) {
            return false;
        }
        if (!/\d/.test(password)) {
            return false;
        }
        if (!/[!@#$%^&*()-_=+{}[\]|;:'",.<>?~]/.test(password)) {
            return false;
        }
        return true;
    }
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    useEffect(() => {
        api.get("/users")
            .then(res => {
                console.log(res.data);
                setData(res.data);
            })
            .catch(error => {
                console.log("Error");
            })
    }, []);
    const handleRowUpdate = (newData, oldData, resolve) => {
        //validation
        let errorList = []
        if (newData.name === "") {
            errorList.push("Please enter name")
        }
        if (newData.role === "") {
            errorList.push("Please enter last name")
        }
        if (newData.email === "" || validateEmail(newData.email) === false) {
            errorList.push("Please enter a valid email")
        }
        if (newData.password === "" || validatePassword(newData.password) === false) {
            errorList.push("Please enter a valid  password")
        }

        if (errorList.length < 1) {
            api.patch("/users/" + newData.id, newData)
                .then(res => {
                    const dataUpdate = [...data];
                    const index = oldData.tableData.id;
                    dataUpdate[index] = newData;
                    setData([...dataUpdate]);
                    resolve()
                    setIserror(false)
                    setErrorMessages([])
                })
                .catch(error => {
                    setErrorMessages(["Update failed! Server error"])
                    setIserror(true)
                    resolve()
                })
        } else {
            setErrorMessages(errorList)
            setIserror(true)
            resolve()
        }
    }
    const handleRowAdd = (newData, resolve) => {
        //validation
        let errorList = []
        if (newData.name === undefined) {
            errorList.push("Please enter first name")
        }
        if (newData.role === undefined) {
            errorList.push("Please select role")
        }
        if (newData.email === undefined || validateEmail(newData.email) === false) {
            errorList.push("Please enter a valid email")
        }
        if (newData.password === undefined || validatePassword(newData.password) === false) {
            errorList.push("Please enter a valid password")
        }
        if (errorList.length < 1) { //no error
            api.post("/users", newData)
                .then(res => {
                    let dataToAdd = [...data];
                    dataToAdd.push(newData);
                    setData(dataToAdd);
                    resolve()
                    setErrorMessages([])
                    setIserror(false)
                })
                .catch(error => {
                    setErrorMessages(["Cannot add data. Server error!"])
                    setIserror(true)
                    resolve()
                })
        } else {
            setErrorMessages(errorList)
            setIserror(true)
            resolve()
        }
    }
    const handleRowDelete = (oldData, resolve) => {
        api.delete("/users/" + oldData.id)
            .then(res => {
                const dataDelete = [...data];
                const index = oldData.tableData.id;
                dataDelete.splice(index, 1);
                setData([...dataDelete]);
                resolve()
            })
            .catch(error => {
                setErrorMessages(["Delete failed! Server error"])
                setIserror(true)
                resolve()
            })
    }
    const handleSearchChange = (event) => {
        setSearchText(event.target.value);
    };

    const filteredData = searchText ? data.filter(item =>
        item.name.toLowerCase().includes(searchText.toLowerCase()) ||
        item.email.toLowerCase().includes(searchText.toLowerCase()) ||
        item.role.toLowerCase().includes(searchText.toLowerCase())
    ) : data;

    const tableStyles = {
        backgroundColor: darkMode ? '#222' : '#fff',
        color: darkMode ? '#fff' : '#222',
    };
    return (
        <Box style={{ backgroundColor: darkMode ? '#222' : '#fff', color: darkMode ? '#fff' : '#222' }}>
            <AppBar position="fixed"
                style={{
                    height: 75,
                    borderColor: darkMode ? '#fff' : 'skyblue',
                    borderBottomWidth: 1,
                    backgroundColor: darkMode ? '#222' : 'skyblue',
                    color: darkMode ? '#222' : '#fff'
                }}
                variant='outlined' >
                <Toolbar >
                    <GroupIcon
                        style={{
                            height: 50,
                            width: 50,
                            color: darkMode ? '#fff' : '#222'
                        }}
                    />
                    <Typography
                        style={{
                            marginLeft: 10,
                            color: darkMode ? '#fff' : '#222'
                        }}>
                        USERS
                    </Typography>
                    <TextField
                        label="Search"
                        variant="outlined"
                        value={searchText}
                        onChange={handleSearchChange}
                        sx={{ width: '300px' }}
                        InputLabelProps={{ style: { color: darkMode ? '#fff' : '#222' } }} // Set label color here
                        style={{
                            borderColor: darkMode ? '#fff' : '#222',
                            color: darkMode ? '#fff' : '#222',
                            marginTop: '10px', marginLeft: "1000px",
                        }}
                    />
                    <IconButton
                        style={{
                            marginTop: 10
                        }}>
                        <Button
                            style={{
                                color: darkMode ? '#fff' : '#222'
                            }}
                            variant='outlined'
                            size='25px'
                        >Login</Button>
                    </IconButton>
                    <ToggleThemeButton />
                </Toolbar>
            </AppBar>
            <Box style={{ marginTop: "75px", backgroundColor: darkMode ? '#222' : '#fff', color: darkMode ? '#fff' : '#222' }}>
                <div>
                    {iserror &&
                        <Alert severity="error">
                            {errorMessages.map((msg, i) => {
                                return <div key={i}>{msg}</div>
                            })}
                        </Alert>
                    }
                </div>
                <MaterialTable
                    style={tableStyles}
                    mt={90}
                    title="Users Details"
                    columns={columns}
                    // data={data}
                    data={filteredData}
                    icons={tableIcons}
                    options={{
                        selection: true,
                        columnsButton: true,
                        draggable: true,
                        grouping: false,
                        sorting: true,
                        search: false,
                        paging: true,
                        pageSizeOptions: [5, 10, 20, 25, 50, 75, 100],
                        paginationPosition: "both",
                        exportButton: true,
                        exportAllData: true,
                        exportFileName: "Users Data",
                        filtering: true,
                        searchFieldAlignment: "right",
                        searchAutoFocus: true,
                        searchFieldVariant: "outlined",
                        actionsColumnIndex: -1,
                        addRowPosition: "first",
                        toolbar: true,
                        headerStyle: {
                            fontStyle: "italic",
                            backgroundColor: darkMode ? '#222' : 'lightblue',
                            color: darkMode ? 'lightblue' : '#222',

                        },
                    }}
                    editable={{
                        onRowUpdate: (newData, oldData) =>
                            new Promise((resolve) => {
                                handleRowUpdate(newData, oldData, resolve);

                            }),
                        onRowAdd: (newData) =>
                            new Promise((resolve) => {
                                handleRowAdd(newData, resolve)
                            }),
                        onRowDelete: (oldData) =>
                            new Promise((resolve) => {
                                handleRowDelete(oldData, resolve)
                            }),
                    }}
                />
            </Box>
        </Box>
    );
}
export default Table;