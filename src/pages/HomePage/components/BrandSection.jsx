import React from "react";

const BrandSection = ({ brands }) => {
  return (
    <div className="container">
      <div
        className="owl-carousel mt-5 mb-5 owl-simple"
        data-toggle="owl"
        data-owl-options='{
                                                  "nav": false, 
                                                  "dots": false,
                                                  "margin": 30,
                                                  "loop": false,
                                                  "responsive": {
                                                      "0": {
                                                          "items":2
                                                      },
                                                      "420": {
                                                          "items":3
                                                      },
                                                      "600": {
                                                          "items":4
                                                      },
                                                      "900": {
                                                          "items":5
                                                      },
                                                      "1024": {
                                                          "items":6
                                                      }
                                                  }
                                              }'
      >
        {brands?.length > 0 &&
          brands?.map((item, index) => {
            return (
              <a key={item?.id || index} href="#" className="brand">
                <img src={item} alt="Brand Name" />
              </a>
            );
          })}
      </div>
    </div>
  );
};

export default BrandSection;
