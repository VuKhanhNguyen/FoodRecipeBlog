import React from 'react';
import people1 from '../../assets/img/people/1.png';
import people2 from '../../assets/img/people/2.png';
import people3 from '../../assets/img/people/3.png';

 {/* Widget Testimonials */}
  const WidgetTestimonials = () => {
    return (
        <div className="sidebar-widget">
              <h5 className="widget-title">Những lời chứng thực</h5>
              <div className="metro_testimonials">

                <div className="metro_testimonial-item">
                  <div className="metro_testimonials-inner">
                    <p>Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Donec sollicitudin molestie malesuada</p>
                    <div className="metro_testimonial-footer">
                      <img src={people1} alt="author"/>
                      <div className="metro_testimonial-content">
                        <h5>Thomas E. Daniels</h5>
                        <span className="custom-primary">CEO & Founder</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="metro_testimonial-item">
                  <div className="metro_testimonials-inner">
                    <p>Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Donec sollicitudin molestie malesuada</p>
                    <div className="metro_testimonial-footer">
                      <img src={people2} alt="author"/>
                      <div className="metro_testimonial-content">
                        <h5>Thomas E. Daniels</h5>
                        <span className="custom-primary">CEO & Founder</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="metro_testimonial-item">
                  <div className="metro_testimonials-inner">
                    <p>Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Donec sollicitudin molestie malesuada</p>
                    <div className="metro_testimonial-footer">
                      <img src={people3} alt="author"/>
                      <div className="metro_testimonial-content">
                        <h5>Thomas E. Daniels</h5>
                        <span className="custom-primary">CEO & Founder</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
        </div>
    );
  };

  export default WidgetTestimonials;