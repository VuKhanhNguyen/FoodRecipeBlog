import React from 'react';

const Pagination = () => {
  return (  
    <ul className="pagination mb-0">
        <li className="page-item"><a className="page-link" href="#"> <i className="fas fa-arrow-left"></i> </a></li>
        <li className="page-item"><a className="page-link" href="#">1</a></li>
        <li className="page-item active">
            <a className="page-link" href="#">2 <span className="sr-only">(current)</span></a>
        </li>
        <li className="page-item"><a className="page-link" href="#">3</a></li>
        <li className="page-item"><a className="page-link" href="#"> <i className="fas fa-arrow-right"></i> </a></li>
    </ul>
  );
};
export default Pagination;