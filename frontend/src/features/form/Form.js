import { useState, useEffect } from "react";
import NewItem from "./newItem";
import NewUser from "./userDetails";
import api from "../../api/jobs";
import { useNavigate } from "react-router-dom";

function Form() {
  const [jobList, setJobList] = useState([]);
  const [itemFormComplete, setItemFormComplete] = useState(false);
  const [userList, setUserList] = useState([]);
  const [userFormComplete, setUserFormComplete] = useState(false);
  const [data, setData] = useState();
  const [formComplete, setFormComplete] = useState(false);
  const navigate = useNavigate();

  const addData = () => {
    const mergedData = { ...userList, ...jobList };
    setData(mergedData);
    setFormComplete(true);
    navigate("/");
  };

  const addNewData = () => {
    const mergedData = { ...userList, ...jobList };
    setData(mergedData);
    setFormComplete(true);
    setItemFormComplete(false);
  };

  useEffect(() => {
    if (formComplete === true) {
      const submitData = async () => {
        try {
          await api.post("/jobs", data);
        } catch (err) {
          console.log(`Error : ${err.message}`);
        }
      };
      submitData();
      setJobList();
    }
  }, [setFormComplete, formComplete, data]);

  return (
    <>
      <div>
        <NewUser
          userList={userList}
          setUserList={setUserList}
          userFormComplete={userFormComplete}
          setUserFormComplete={setUserFormComplete}
        />
        {userFormComplete && (
          <NewItem
            itemFormComplete={itemFormComplete}
            setItemFormComplete={setItemFormComplete}
            jobList={jobList}
            setJobList={setJobList}
            userList={userList}
            addNewData={addNewData}
          />
        )}
      </div>
      {itemFormComplete && userFormComplete && jobList && (
        <div className="form-element home-page">
          <div className="btn">
            <button className="new-item-btn" type="button" onClick={addNewData}>
              Add Another Item
            </button>
          </div>
          <div className="btn">
            <button className="dash-board-btn" type="button" onClick={addData}>
              Finish
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Form;
