import React from "react";

const Comment = () => {
  return (
<div className="metro_comments-form">

            <h4>Leave a Comment</h4>

            <form method="post">
              <div className="form-group">
                <input type="text" className="form-control" placeholder="Full Name" name="fname" defaultValue=""/>
                <i className="far fa-user"></i>
              </div>
              <div className="form-group">
                <input type="email" className="form-control" placeholder="Email Address" name="email" defaultValue=""/>
                <i className="far fa-user"></i>
              </div>
              <div className="form-group">
                <textarea className="form-control" placeholder="Type your comment..." name="comment" rows="7"></textarea>
                <i className="far fa-envelope"></i>
              </div>

              <button type="submit" className="metro_btn-custom primary" name="button">Send Comment</button>
            </form>
          </div>
);
};
export default Comment;
