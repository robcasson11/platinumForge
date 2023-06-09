import { useState, useEffect } from "react";
import NewItem from "./form/newItem";
import NewUser from "./form/userDetails";
import api from "../api/jobs";

function Form() {
  const [jobList, setJobList] = useState([]);
  const [itemFormComplete, setItemFormComplete] = useState(false);
  const [userList, setUserList] = useState([]);
  const [userFormComplete, setUserFormComplete] = useState(false);
  const [data, setData] = useState();
  const [formComplete, setFormComplete] = useState(false);

  const addData = () => {
    const mergedData = { ...userList, ...jobList };
    setData(mergedData);
    setFormComplete(true);
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
        <>
          <button type="button" onClick={addNewData}>
            Add Another Item
          </button>
          <button type="button" onClick={addData}>
            Finish
          </button>
        </>
      )}
      {/* <div>
        {data && (
          <ul>
            {Object.entries(data).map(([key, value]) => {
              return (
                <li key={key}>
                  {JSON.stringify(key)}: {JSON.stringify(value)}
                </li>
              );
            })}
          </ul>
        )}
      </div> */}
    </>
  );
}

export default Form;
