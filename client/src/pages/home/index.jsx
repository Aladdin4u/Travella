import "./home.css";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import Header from "../../components/header";
import MailList from "../../components/mailList";
import Featured from "../../components/featured";
import PropertyList from "../../components/propertyList";
import FeaturedProperties from "../../components/featuredProperties";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Header/>
      <div className="homeContainer">
        <Featured/>
        <h1 className="homeTitle">Browse by property type</h1>
        <PropertyList/>
        <h1 className="homeTitle">Homes guests love</h1>
        <FeaturedProperties/>
        <MailList/>
        <Footer/>
      </div>
    </div>
  );
};

export default Home;
