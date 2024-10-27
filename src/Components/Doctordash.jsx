// import axios from 'axios';
// import React, { useEffect, useState } from 'react';

// const Doctordash = () => {
//     const [users, setUsers] = useState([]);

//     const fetchUsers = async () => {
//         try {
//             const response = await axios.get("http://localhost:8080/api/patientview/view");
//             setUsers(response.data);
//         } catch (error) {
//             console.error("Error fetching users:", error);
//             alert("Could not fetch users. Please try again later.");
//         }
//     };

//     useEffect(() => {
//         fetchUsers();
//     }, []);

//     return (
//         <div style={styles.pageStyle}>
//             <h1 style={styles.title}>PATIENT DETAILS</h1>
//             <div style={styles.tableContainer}>
//                 <table style={styles.table}>
//                     <thead>
//                         <tr>
//                             <th style={styles.tableHeader}>Name</th>
//                             <th style={styles.tableHeader}>Email</th>
//                             <th style={styles.tableHeader}>DOB</th>
//                             <th style={styles.tableHeader}>Expected Delivery</th>
//                             <th style={styles.tableHeader}>Diseases</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {users.map((user) => (
//                             <tr key={user._id}>
//                                 <td style={styles.tableData}>{user.name}</td>
//                                 <td style={styles.tableData}>{user.email}</td>
//                                 <td style={styles.tableData}>{user.dob}</td>
//                                 <td style={styles.tableData}>{user.expectedDelivery}</td>
//                                 <td style={styles.tableData}>{user.diseases}</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// };

// const styles = {
//     pageStyle: {
//         backgroundImage: "url('https://wallpapers.com/images/hd/aesthetic-astronaut-flower-field-laptop-4ndqwiauwee5jpze.jpg')",
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//         height: '100vh',
//         width: '100vw',
//         padding: '20px',
//         color: 'white',
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//     },
//     title: {
//         textAlign: 'center',
//         margin: '20px 0',
//     },
//     tableContainer: {
//         overflowX: 'auto',
//         width: '80%',
//         backgroundColor: 'rgba(0, 0, 0, 0.7)',
//         borderRadius: '10px',
//         padding: '20px',
//         backdropFilter: 'blur(10px)',
//     },
//     table: {
//         width: '100%',
//         borderCollapse: 'collapse',
//     },
//     tableHeader: {
//         backgroundColor: 'rgba(255, 255, 255, 0.2)',
//         padding: '10px',
//         border: '1px solid rgba(255, 255, 255, 0.5)',
//     },
//     tableData: {
//         padding: '10px',
//         border: '1px solid rgba(255, 255, 255, 0.5)',
//     },
// };

// export default Doctordash;
import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';

const Doctordash = () => {
    const [users, setUsers] = useState([]);

    // Memoized fetchUsers function
    const fetchUsers = useCallback(async () => {
        try {
            const doctorName = localStorage.getItem("doctorName"); // Retrieve doctorName from localStorage
            if (!doctorName) {
                alert("Doctor name is not specified. Please log in again.");
                return;
            }
            const response = await axios.get("http://localhost:8080/api/patientview/view", {
                params: { doctorName }, // Include doctorName as a query parameter
            });
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
            alert("Could not fetch users. Please try again later.");
        }
    }, []); // Empty dependency array to memoize `fetchUsers`

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]); // Re-run useEffect if fetchUsers changes

    return (
        <div style={styles.pageStyle}>
            <h1 style={styles.title}>PATIENT DETAILS</h1>
            <div style={styles.tableContainer}>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.tableHeader}>Name</th>
                            <th style={styles.tableHeader}>Email</th>
                            <th style={styles.tableHeader}>DOB</th>
                            <th style={styles.tableHeader}>Expected Delivery</th>
                            <th style={styles.tableHeader}>Diseases</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td style={styles.tableData}>{user.name}</td>
                                <td style={styles.tableData}>{user.email}</td>
                                <td style={styles.tableData}>{user.dob}</td>
                                <td style={styles.tableData}>{user.expectedDelivery}</td>
                                <td style={styles.tableData}>{user.diseases}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const styles = {
    pageStyle: {
        backgroundImage: "url('https://wallpapers.com/images/hd/aesthetic-astronaut-flower-field-laptop-4ndqwiauwee5jpze.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        width: '100vw',
        padding: '20px',
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    title: {
        textAlign: 'center',
        margin: '20px 0',
    },
    tableContainer: {
        overflowX: 'auto',
        width: '80%',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        borderRadius: '10px',
        padding: '20px',
        backdropFilter: 'blur(10px)',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
    },
    tableHeader: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        padding: '10px',
        border: '1px solid rgba(255, 255, 255, 0.5)',
    },
    tableData: {
        padding: '10px',
        border: '1px solid rgba(255, 255, 255, 0.5)',
    },
};

export default Doctordash;
