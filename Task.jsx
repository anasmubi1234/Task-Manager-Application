import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash, faSearch, faRightFromBracket, faCheckSquare, faThLarge, faBars } from '@fortawesome/free-solid-svg-icons';

function Task() {
    const [Details, setDetails] = useState([]);

    const dataFetching = async () => {
        try {
            const response = await axios.get("http://localhost:2004/taskDetails");
            setDetails(response.data);
            console.log(response.data);
        }
        catch (Error) {
            console.log("Data Not Get", Error);
        }
    };

    useEffect(() => {
        dataFetching();
    }, []);

    const deleteData = async (data) => {
        if (window.confirm('Are You Sure You Want To Delete This Item ?')) {
            await axios.delete(`http://localhost:2004/taskDetails/${data}`)
            dataFetching();
        }
        else {
            console.log("Deletation Cancelled");
        }
    }

    return (
        <>
            <div className="flex-full-dashboard">
                <div className="conatiner-left-flex">
                    <Link to={"/Home"}><button><FontAwesomeIcon icon={faThLarge} /> Dashboard</button></Link>
                    <Link to={"/Task"}><button><FontAwesomeIcon icon={faCheckSquare} className="icon-style" /> Task</button></Link>
                    <Link to={"/"}><button><FontAwesomeIcon icon={faRightFromBracket} />  Log Out</button></Link>
                </div>

                <div className="container-right-flex">
                    <div className="container-navbar-button">
                        <button><FontAwesomeIcon icon={faBars} /></button>
                    </div>
                    <div className="dashboard-details-container">
                        <h1>Tasks</h1>
                        <h3>Manage And Track All Your Task</h3>
                        <div className="search-bar">
                            <FontAwesomeIcon icon={faSearch} className="search-icon" />
                            <input type="text" placeholder="Search tasks..." />
                        </div>
                        <div className="d-card-flex">
                            <div className="d-card-list active">
                                <h1>All</h1><h1>0</h1>
                            </div>
                            <div className="d-card-list">
                                <h1>Complete</h1><h1>0</h1>
                            </div>
                            <div className="d-card-list">
                                <h1>Pending</h1><h1>0</h1>
                            </div>
                        </div>
                    </div>

                    <div className="tabel-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>Status</th>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Priority</th>
                                    <th>Created At</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Details.map((value, index) => (
                                    <tr key={index}>
                                        <td><input type="checkbox" name="" id="" /></td>
                                        <td>{value.title}</td>
                                        <td>{value.description}</td>
                                        <td>{value.priority}</td>
                                        <td>{value.createdAt}</td>
                                        <td>
                                            <Link to={`/Edit/${value.id}`}>
                                                <button className="edit-button"><FontAwesomeIcon icon={faPenToSquare} /></button>
                                            </Link>
                                            <button className="delete-button" onClick={() => {
                                                deleteData(value._id)
                                            }}><FontAwesomeIcon icon={faTrash} /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Task;


// import axios from "axios";
// import { Link } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPenToSquare, faTrash, faSearch, faRightFromBracket, faCheckSquare, faThLarge } from '@fortawesome/free-solid-svg-icons';

// function Task() {
//     const [Details, setDetails] = useState([]);
//     const [completedTasks, setCompletedTasks] = useState([]);
//     const [filter, setFilter] = useState('all');
//     const [searchText, setSearchText] = useState('');

//     // Fetch tasks from backend
//     const dataFetching = async () => {
//         try {
//             const response = await axios.get("http://localhost:2004/taskDetails");
//             setDetails(response.data);
//         } catch (Error) {
//             console.log("Data Not Get", Error);
//         }
//     };

//     useEffect(() => {
//         dataFetching();
//     }, []);

//     // Delete a task
//     const deleteData = async (id) => {
//         if (window.confirm('Are You Sure You Want To Delete This Item?')) {
//             await axios.delete(`http://localhost:2004/taskDetails/${id}`);
//             dataFetching();
//             setCompletedTasks(prev => prev.filter(taskId => taskId !== id));
//         }
//     };

//     // Toggle completed status
//     const toggleComplete = (id) => {
//         if (completedTasks.includes(id)) {
//             setCompletedTasks(completedTasks.filter(taskId => taskId !== id));
//         } else {
//             setCompletedTasks([...completedTasks, id]);
//         }
//     };

//     // Get today's date
//     const today = new Date();
//     const date = today.toLocaleDateString('en-US', {
//         year: 'numeric',
//         month: 'long',
//         day: 'numeric'
//     });

//     // Filter tasks based on status and search text
//     const filteredTasks = Details.filter(task => {
//         const statusMatch = filter === 'all'
//             ? true
//             : filter === 'complete'
//                 ? completedTasks.includes(task.id)
//                 : !completedTasks.includes(task.id);

//         const searchMatch =
//             task.title.toLowerCase().includes(searchText.toLowerCase()) ||
//             task.description.toLowerCase().includes(searchText.toLowerCase());

//         return statusMatch && searchMatch;
//     });

//     return (
//         <div className="flex-full-dashboard">
//             {/* Sidebar */}
//             <div className="conatiner-left-flex">
//                 <Link to={"/Home"}><button><FontAwesomeIcon icon={faThLarge} /> Dashboard</button></Link>
//                 <Link to={"/Task"}><button><FontAwesomeIcon icon={faCheckSquare} /> Task</button></Link>
//                 <Link to={"/"}><button><FontAwesomeIcon icon={faRightFromBracket} /> Log Out</button></Link>
//             </div>

//             {/* Main Content */}
//             <div className="container-right-flex">
//                 <div className="dashboard-details-container">
//                     <h1>Tasks</h1>
//                     <h3>Manage And Track All Your Tasks</h3>

//                     {/* Search Bar */}
//                     <div className="search-bar">
//                         <FontAwesomeIcon icon={faSearch} className="search-icon" />
//                         <input
//                             type="text"
//                             placeholder="Search tasks..."
//                             value={searchText}
//                             onChange={(e) => setSearchText(e.target.value)}
//                         />
//                     </div>

//                     {/* Status Cards */}
//                     <div className="d-card-flex">
//                         <div
//                             className={`d-card-list ${filter === 'all' ? 'active' : ''}`}
//                             onClick={() => setFilter('all')}
//                         >
//                             <h1>All</h1>
//                             <h1>{Details.length}</h1>
//                         </div>
//                         <div
//                             className={`d-card-list ${filter === 'complete' ? 'active' : ''}`}
//                             onClick={() => setFilter('complete')}
//                         >
//                             <h1>Complete</h1>
//                             <h1>{completedTasks.length}</h1>
//                         </div>
//                         <div
//                             className={`d-card-list ${filter === 'pending' ? 'active' : ''}`}
//                             onClick={() => setFilter('pending')}
//                         >
//                             <h1>Pending</h1>
//                             <h1>{Details.length - completedTasks.length}</h1>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Task Table */}
//                 <div className="tabel-container">
//                     <table>
//                         <thead>
//                             <tr>
//                                 <th>Status</th>
//                                 <th>Title</th>
//                                 <th>Description</th>
//                                 <th>Priority</th>
//                                 <th>Created</th>
//                                 <th>Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {filteredTasks.length > 0 ? (
//                                 filteredTasks.map((task, index) => (
//                                     <tr key={index}>
//                                         <td>
//                                             <input
//                                                 type="checkbox"
//                                                 checked={completedTasks.includes(task.id)}
//                                                 onChange={() => toggleComplete(task.id)}
//                                             />
//                                         </td>
//                                         <td style={{ textDecoration: completedTasks.includes(task.id) ? 'line-through' : 'none' }}>
//                                             {task.title}
//                                         </td>
//                                         <td style={{ textDecoration: completedTasks.includes(task.id) ? 'line-through' : 'none' }}>
//                                             {task.description}
//                                         </td>
//                                         <td>{task.priority}</td>
//                                         <td>{date}</td>
//                                         <td>
//                                             <Link to={`/Edit/${task.id}`}>
//                                                 <button className="edit-button">
//                                                     <FontAwesomeIcon icon={faPenToSquare} />
//                                                 </button>
//                                             </Link>
//                                             <button
//                                                 className="delete-button"
//                                                 onClick={() => deleteData(task.id)}
//                                             >
//                                                 <FontAwesomeIcon icon={faTrash} />
//                                             </button>
//                                         </td>
//                                     </tr>
//                                 ))
//                             ) : (
//                                 <tr>
//                                     <td colSpan="6" style={{ textAlign: 'center', padding: '15px' }}>
//                                         No tasks found.
//                                     </td>
//                                 </tr>
//                             )}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Task;