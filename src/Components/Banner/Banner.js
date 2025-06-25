import "./Banner.css";

function Banner() {
  return (
    <div className="bannerParentDiv">
      <div className="bannerChildDiv">
        <div className="menuBar">
          <div className="categoryMenu">
            <span>ALL CATEGORIES</span>
          </div>
          <div className="otherQuickOptions">
            <span>Cars</span>
            <span>Motorcycles</span>
            <span>Mobile Phones</span>
            <span>For Sale: Houses & Apartments</span>
            <span>Scooters</span>
            <span>Commercial & Other Vehicles</span>
            <span>Jobs</span>
          </div>
        </div>
        <div className="banner">
          <img src="../../../Images/banner copy.png" alt="Main banner" />
        </div>
      </div>
    </div>
  );
}

export default Banner;
