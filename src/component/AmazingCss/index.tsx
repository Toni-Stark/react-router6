import React from "react";
import "./index.css";

export const AmazingCss: React.FC = () => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      <div className="amazing" style={{ backgroundColor: "#3296fa" }}>
        {/* 半透明的边框 */}
        <div className="border1">半透明边框</div>
      </div>
      {/* 平行四边形 */}
      <div className="amazing">
        <div className="diamond">
          <div>
            <span>平行四边形</span>
          </div>
        </div>
        <div className="diamond">
          <div>平行四边形</div>
        </div>
        <div className="diamond">
          <div>平行四边形</div>
          <img
            src={require("../../static/dog2018.jpg").default}
            alt="无法显示"
          />
        </div>
      </div>
    </div>
  );
};
