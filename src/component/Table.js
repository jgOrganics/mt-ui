import React, { useState, useEffect } from 'react';

import { forwardRef } from 'react';
import MaterialTable, { MTableToolbar } from "material-table";
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
import axios from 'axios'
import { Alert, TextField } from '@mui/material';
const tableIcons = {

    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

function Table() {

    var columns = [
        { title: "id", field: "id", hidden: true, editable: false },
        {
            title: 'Avatar',
            field: 'avatar',
            render: rowData => (
                // eslint-disable-next-line jsx-a11y/alt-text
                <img
                    style={{ height: 36, borderRadius: '50%' }}
                    src={rowData.avatar}
                />
            ),
        },
        {
            title: "Name", field: "name"
        },
        { title: "Email", field: "email" },
        {
            title: "Role", field: "role",
            lookup: {
                'admin': 'admin',
                'customer': 'customer',
            }
        },
        { title: "Password", field: "password" },
    ]

    const [data, setData] = useState([]); //table data
    const api = axios.create({
        baseURL: `http://localhost:3005`
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

    const [iserror, setIserror] = useState(false)
    const [errorMessages, setErrorMessages] = useState([])

    useEffect(() => {
        api.get("/users")
            .then(res => {
                console.log(res.data);
                setData(res.data);
            })
            .catch(error => {
                console.log("Error")
            })
    }, [])

    const [searchText, setSearchText] = useState('');
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
    
    return (
        <div className="App" style={{ marginTop: "60px" }}>
            <h2 style={{ textAlign: "center" }}>
                Users Details
            </h2>
            <div>
                {iserror &&
                    <Alert severity="error">
                        {errorMessages.map((msg, i) => {
                            return <div key={i}>{msg}</div>
                        })}
                    </Alert>
                }
                <div style={{ marginLeft: "1250px" }}>
                    <TextField
                        label="Search"
                        variant="outlined"
                        value={searchText}
                        onChange={handleSearchChange}
                        style={{ marginBottom: '10px' }}
                    />
                </div>
            </div>

            <MaterialTable
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
                        // size: '150px',
                        fontStyle: "italic", backgroundColor: "skyblue"

                    },

                }}

                // cellEditable={{
                //     onCellEditApproved: async (newData, oldData, rowData, columnDef) => {
                //         return new Promise((resolve, reject) => {
                //             const updatedRow = { ...rowData, [columnDef.field]: newData };
                //             console.log(updatedRow);
                //             axios.put(`${api}${updatedRow.id}`, updatedRow)
                //                 .then(() => {
                //                     // resolve()
                //                     setTimeout(() => {
                //                         setData(data.map(row => (row.id === updatedRow.id ? updatedRow : row)));
                //                         // fetchData();
                //                         resolve();
                //                     }, 2000);
                //                 })
                //                 .catch(error => {
                //                     console.error('Error updating users:', error);
                //                     reject();
                //                 });
                //         });
                //     }
                // }}
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
        </div>
    );
}
export default Table;