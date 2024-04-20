import "./list.scss";
import Navbar from "../../components/navbar";
import Sidebar from "../../components/sidebar";
import Datatable from "../../components/datatable";

const List = ({ columns }) => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <Datatable columns={columns} />
      </div>
    </div>
  );
};

export default List;
