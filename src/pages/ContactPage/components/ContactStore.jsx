import React from "react";

const ContactStore = () => {
  return (
    <div className="stores mb-4 mb-lg-5">
      <h2 className="title text-center mb-3">Our Stores</h2>
      <div className="row">
        <div className="col-lg-6">
          <div className="store">
            <div className="row">
              <div className="col-sm-5 col-xl-6">
                <figure className="store-media mb-2 mb-lg-0">
                  <img src="/assets/images/stores/img-1.jpg" alt="image" />
                </figure>
              </div>
              <div className="col-sm-7 col-xl-6">
                <div className="store-content">
                  <h3 className="store-title">Wall Street Plaza</h3>
                  <address>88 Pine St, New York, NY 10005, USA</address>
                  <div>
                    <a href="tel:0909284493">0909284493</a>
                  </div>
                  <h4 className="store-subtitle">Store Hours:</h4>
                  <div>Monday - Saturday 11am to 7pm</div>
                  <div>Sunday 11am to 6pm</div>
                  <a href="#" className="btn btn-link" target="_blank">
                    <span>View Map</span>
                    <i className="icon-long-arrow-right" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="store">
            <div className="row">
              <div className="col-sm-5 col-xl-6">
                <figure className="store-media mb-2 mb-lg-0">
                  <img src="/assets/images/stores/img-2.jpg" alt="image" />
                </figure>
              </div>
              <div className="col-sm-7 col-xl-6">
                <div className="store-content">
                  <h3 className="store-title">One New York Plaza</h3>
                  <address>88 Pine St, New York, NY 10005, USA</address>
                  <div>
                    <a href="tel:0909284493">0909284493</a>
                  </div>
                  <h4 className="store-subtitle">Store Hours:</h4>
                  <div>Monday - Friday 9am to 8pm</div>
                  <div>Saturday - 9am to 2pm</div>
                  <div>Sunday - Closed</div>
                  <a href="#" className="btn btn-link" target="_blank">
                    <span>View Map</span>
                    <i className="icon-long-arrow-right" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactStore;
