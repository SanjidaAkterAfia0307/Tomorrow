import React from 'react';
import "./CompletedTask.scss"
import "../../App.scss"
const TaskDetails = ({ task }) => {
    const { title, _id, des, image, completed, user, comment, UserEmail, date } = task
    return (
        <div>
            <h2>Task Details</h2>
            <div className='parent m-6'>
            <div><h2 className='title'><span>Title : </span>{title}</h2></div>
            <div className='info-div'>
                <div className='user-div'>
                    <h4 > {user}</h4>
                    <p > {UserEmail}</p>
                </div>
                <div className='user-div'>
                    <h4>Date</h4>
                    <p>{date && date.slice(0, 24)}</p>
                </div>
            </div>
            <div><img src={image} className="img" alt="" /></div>

            <div className='des'>
                <h4 >Description</h4>
                <p>  {des}</p>
            </div>

            <div className='des '>
                <h4 className='comment'>Comments :</h4>
                {
                    comment?.map((com, i) => <p key={i}>{com}</p>)
                }
            </div>
        </div>
        </div>
    );
};

export default TaskDetails;