import "./featuredProperties.css";
import useFetch from "../../hooks/useFetch";
import { REACT_APP_BASE_URL } from "../../utils/config";

const FeaturedProperties = () => {
  const { data, loading, error } = useFetch(
    `${REACT_APP_BASE_URL}/hotels?featured=true&&limit=4`
  );
  return (
    <div className="fp">
      {loading ? (
        "loading"
      ) : (
        <>
          {data.map((item, i) => (
            <div className="fpItem" key={i}>
              <img src={item.photos[0]} alt={item.name} className="fpImg" />
              <span className="fpName">{item.name}</span>
              <span className="fpCity">{item.city}</span>
              <span className="fpPrice">
                Starting from ${item.cheapestPrice}
              </span>
              {item.rating && (
                <div className="fpRating">
                  <button>{item.rating}</button>
                  <span>Excellent</span>
                </div>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default FeaturedProperties;
