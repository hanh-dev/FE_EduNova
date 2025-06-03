import React, { useEffect, useState } from 'react';
import './ClassList.css';
import classListImage from "../../../assets/images/lop_1.png";
import { useNavigate } from 'react-router-dom';
//import Header from '../../../components/teacher/Header/Header';
import { getClasses } from '../../../services/api/StudentAPI';


const ClassList = () => {
    const navigate = useNavigate();




    const [classess, setClasses] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const classData = await getClasses();
                console.log("Test classes:", classData);
                setClasses(classData);
            } catch (error) {
                console.log("Error fetching data:", error);
            }
        };


        fetchData();
    }, []);


    const handleView = (className) => {
        navigate(`/class/${className}`);
    };


    return (
        <div className="class-container1">
            <h2>All Classes</h2>
            <div className="class-grid1">
                {classess.map((classItem, index) => (
                    <div key={index} className="class-card1">


                        <div className="class-content1">
                            <div className="class-text1">
                                <h3>{classItem.name}</h3>
                            </div>
                            <img
                                src={classListImage}
                                alt={`Image of ${classItem.name}`}
                                className="class-list-img1"
                            />
                        </div>
                        <button
                            className="view-button1"
                            onClick={() => handleView(classItem.name)}
                        >
                            View
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );

};


export default ClassList;





