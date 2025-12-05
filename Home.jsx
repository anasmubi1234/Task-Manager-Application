import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListCheck, faHourglassHalf, faRightFromBracket, faCheckSquare, faThLarge, faBars } from '@fortawesome/free-solid-svg-icons';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';

function Home() {
    const Nav = useNavigate();

    const titleRef = useRef();
    const descriptionRef = useRef();
    const priorityRef = useRef();

    function getDate(date = new Date()) {
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
        }).replace(',', '');
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = {
            title: titleRef.current.value,
            description: descriptionRef.current.value,
            priority: priorityRef.current.value,
            createdAt: getDate()
        };

        try {
            await axios.post("http://localhost:2004/taskDetails", formData);
            alert("Task Added Successfully");
            Nav("/Task");
        } catch (error) {
            console.error("Error adding task:", error);
        }
    };

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
                        <h1>Dashboard</h1>
                        <h3>Welcome To TaskFlow - Your Productivity Companion</h3>

                        <div className="d-card-flex">
                            <div className="d-card-details">
                                <h1><FontAwesomeIcon icon={faListCheck} title="Task List" /></h1>
                                <div className="item-flex">
                                    <h3>Total Task</h3>
                                    <h1>0</h1>
                                </div>
                            </div>
                            <div className="d-card-details">
                                <h1><FontAwesomeIcon icon={faCircleCheck} title="Completed" /></h1>
                                <div className="item-flex">
                                    <h3>Completed</h3>
                                    <h1>0</h1>
                                </div>
                            </div>
                            <div className="d-card-details">
                                <h1><FontAwesomeIcon icon={faHourglassHalf} title="Pending" /></h1>
                                <div className="item-flex">
                                    <h3>Pending</h3>
                                    <h1>0</h1>
                                </div>
                            </div>
                        </div>
                    </div>

                    <h2>Create New Task</h2>
                    <div className="form-container">
                        <form onSubmit={handleSubmit}>
                            <label>Task Title</label>
                            <input
                                type="text"
                                name="title"
                                ref={titleRef}
                                required
                                placeholder="Enter task title...."
                            />
                            <label>Description (Optional)</label>
                            <textarea
                                name="description"
                                ref={descriptionRef}
                                placeholder="Add more details...."
                            />
                            <label>Priority</label>
                            <select name="priority" ref={priorityRef}>
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                            <button type="submit" className="submit-button">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;