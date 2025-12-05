import React from 'react';
import people1 from '../../assets/img/people/1.png';
import people2 from '../../assets/img/people/2.png';
import people3 from '../../assets/img/people/3.png';

const CommentForm = () => {
return (
          <div className="metro_comments-list">
            <h4>Our Comments</h4>
            <ul>
              <li className="comment-item">
                <img src={people1} alt="comment author"/>
                <div className="comment-body">
                  <h5>Francine</h5>
                  <span>January 13 2020</span>
                  <p>Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition.</p>
                  <a href="#" className="btn-link"> Reply <i className="fas fa-arrow-right"></i> </a>
                </div>
                <ul>
                  <li className="comment-item">
                    <img src={people3} alt="comment author"/>
                    <div className="comment-body">
                      <h5>John</h5>
                      <span>January 13 2020</span>
                      <p>Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches to corporate strategy foster collaborative thinking to further the overall value proposition.</p>
                      <a href="#" className="btn-link"> Reply <i className="fas fa-arrow-right"></i> </a>
                    </div>
                  </li>
                </ul>
              </li>
              <li className="comment-item">
                <img src={people2} alt="comment author"/>
                <div className="comment-body">
                  <h5>Mich</h5>
                  <span>January 13 2020</span>
                  <p>Leverage agile frameworks to provide a robust synopsis for high level overviews. Iterative approaches</p>
                  <a href="#" className="btn-link"> Reply <i className="fas fa-arrow-right"></i> </a>
                </div>
              </li>
            </ul>
          </div>
          
          
  );
  };
export default CommentForm;        