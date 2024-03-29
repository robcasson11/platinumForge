import React from "react";
import { useState, useRef, useEffect } from "react";
import Input from "./input";
import blankForm from "../../data/blankForm";

const NewItem = ({
  itemFormComplete,
  setItemFormComplete,
  setJobList,
  addNewData,
}) => {
  const [job, setJob] = useState(blankForm);
  const [page1, setPage1] = useState(false);
  const [page2, setPage2] = useState(true);
  const [page3, setPage3] = useState(true);
  //You can create an array/object to store all of these refs somehow...(https://mattclaffey.medium.com/adding-react-refs-to-an-array-of-items-96e9a12ab40c)
  const checkBoxRef = useRef();
  const checkBoxRefDeposit = useRef();
  const checkBoxRefDamaged = useRef();
  const checkBoxRefNotes = useRef();
  const checkBoxRefQuote = useRef();
  const itemDescriptionRef = useRef();

  useEffect(() => {
    checkBoxRef.current.checked = false;
    checkBoxRefDeposit.current.checked = false;
    checkBoxRefDamaged.current.checked = false;
    checkBoxRefNotes.current.checked = false;
    checkBoxRefQuote.current.checked = false;
  }, [addNewData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJob((prevJob) => {
      return {
        ...prevJob,
        [name]: value,
      };
    });
  };

  const handleCheck = (e) => {
    const { name, checked } = e.target;
    const newValue = checked;
    setJob((prevJob) => {
      return {
        ...prevJob,
        [name]: newValue,
      };
    });
  };

  const updateItem = (e) => {
    e.preventDefault();
    const requiredFields = ["timescale"];
    for (const field of requiredFields) {
      const value = job[field];
      if (value === "") {
        alert(`Please enter a value for the ${field} field.`);
        return;
      }
      setPage1(false);
      setPage3(true);
      setJobList(job);
      setJob(blankForm);
      setItemFormComplete(true);
    }
  };

  return (
    <form style={itemFormComplete ? { display: "none" } : null}>
      <div className="form-element" style={page1 ? { display: "none" } : null}>
        {/* page 1 */}
        <div className="itemForm form-left">
          <Input
            name="itemDescription"
            title="Item Description"
            innerRef={itemDescriptionRef}
            value={job.itemDescription}
            type="text"
            handleInputChange={handleInputChange}
          />
          <br />
          <Input
            name="workRequired"
            title="Work Required"
            placeHolder={"If quote, leave blank"}
            value={job.workRequired}
            type="text"
            handleInputChange={handleInputChange}
          />
          <br />
          <Input
            name="quoteRequired"
            title="Quote"
            innerRef={checkBoxRefQuote}
            checked="false"
            value={job.quoteRequired}
            type="checkBox"
            handleInputChange={handleCheck}
          />
          {job.quoteRequired === true && (
            <>
              <br />
              <Input
                name="quoteDetails"
                title="Quote Details"
                value={job.quoteDetails}
                type="text"
                handleInputChange={handleInputChange}
              />
            </>
          )}
          <br />
          <Input
            name="price"
            title="Price"
            value={job.price}
            type="number"
            handleInputChange={handleInputChange}
          />
          <br />
          <button
            type="button"
            onClick={() => {
              const requiredFields = ["fName, itemDescription"];
              for (const field of requiredFields) {
                const value = job[field];
                if (value === "") {
                  alert(`Please enter a value for the ${field} field.`);
                  return;
                }
              }
              setPage1(true);
              setPage2(false);
            }}
          >
            Next
          </button>
        </div>
        <div className="form-right">
          <p>Please provide information on the item.</p>
        </div>
      </div>
      <div className="form-element" style={page2 ? { display: "none" } : null}>
        {/* page 2 */}
        <div className="form-left">
          <Input
            name="additionalNotesRequired"
            title="Additional Notes"
            innerRef={checkBoxRefNotes}
            value={job.additionalNotesRequired}
            type="checkBox"
            handleInputChange={handleCheck}
          />
          {job.additionalNotesRequired === true && (
            <>
              <br />
              <Input
                name="additionalNotes"
                title="Notes"
                value={job.additionalNotes}
                type="text"
                handleInputChange={handleInputChange}
              />
            </>
          )}
          <br />
          <Input
            name="damagedRequired"
            title="Damaged"
            innerRef={checkBoxRefDamaged}
            value={job.damagedRequired}
            type="checkBox"
            handleInputChange={handleCheck}
          />
          {job.damagedRequired === true && (
            <>
              <br />
              <Input
                name="damagedNotes"
                title="Damaged Notes"
                value={job.damagedNotes}
                type="text"
                handleInputChange={handleInputChange}
              />
            </>
          )}
          <br />
          <Input
            name="depositRequired"
            title="Deposit"
            innerRef={checkBoxRefDeposit}
            value={job.depositRequired}
            type="checkBox"
            handleInputChange={handleCheck}
          />
          {job.depositRequired === true && (
            <>
              <br />
              <Input
                name="depositAmount"
                title="Amount"
                value={job.depositAmount}
                type="number"
                handleInputChange={handleInputChange}
              />
            </>
          )}
          <br />
          <button
            type="button"
            onClick={() => {
              setPage2(true);
              setPage3(false);
            }}
          >
            Next
          </button>
        </div>
        <div className="form-right">
          <p>Add any additional information if necessary</p>
        </div>
      </div>
      <div className="form-element" style={page3 ? { display: "none" } : null}>
        {/* page 3*/}

        <div className="form-left">
          <Input
            name="materialsRequired"
            title="Order Materials"
            innerRef={checkBoxRef}
            value={job.materialsRequired}
            type="checkBox"
            handleInputChange={handleCheck}
          />
          {job.materialsRequired === true && (
            <>
              <br />
              <Input
                name="materialsSupplier"
                title="Supplier"
                value={job.materialsSupplier}
                type="text"
                handleInputChange={handleInputChange}
              />
              <br />
              <Input
                name="materialsNotes"
                title="Materials"
                value={job.materialsNotes}
                type="text"
                handleInputChange={handleInputChange}
              />
            </>
          )}
          <br />
          <Input
            name="timescale"
            title="Time Scale"
            value={job.timescale}
            placeHolder="In Weeks"
            type="number"
            handleInputChange={handleInputChange}
          />
          <br />
          {/* end of form */}
          <button
            type="button"
            style={page3 ? { display: "none" } : null}
            onClick={updateItem}
          >
            Next
          </button>
        </div>
        <div className="form-right">
          <p>
            There are two possible suppliers with different delivery times.
            Please specify which supplier by number, either 1 or 2.
          </p>
        </div>
      </div>
    </form>
  );
};

export default NewItem;
