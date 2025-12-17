import React from "react";
import TeamImg from '../../assets/img/team/1.jpg';

const TeamCard = () => {
  return (

        <div className="col-md-4 col-sm-6">
            <div className="metro_team-card">
                <div className="metro_team-card-thumb">
                    <img src={TeamImg} alt="Team Member" />
                        <ul className="metro_sm">
                            <li> <a href="#" className="facebook"> <i className="fab fa-facebook-f"></i> </a> </li>
                            <li> <a href="#" className="twitter"> <i className="fab fa-twitter"></i> </a> </li>
                            <li> <a href="#" className="linkedin"> <i className="fab fa-linkedin-in"></i> </a> </li>
                            <li> <a href="#" className="youtube"> <i className="fab fa-youtube"></i> </a> </li>
                        </ul>
                </div>
                <div className="metro_team-card-content">
                <h5>Miranda Flues</h5>
                <span className="custom-primary">Head Chef</span>
                </div>
            </div>
        </div>
    );
};
export default TeamCard;