import React from "react";
import { useState, useRef, useEffect } from "react";
import Input from "./input";

const blankForm = {
  fName: "",
  lName: "",
  phoneNumber: "",
  addressRequired: false,
  address: "",
};

const NewUser = ({
  userList,
  setUserList,
  userFormComplete,
  setUserFormComplete,
}) => {
  const [user, setUser] = useState(blankForm);
  const fNameRef = useRef();

  useEffect(() => {
    fNameRef.current.focus();
  }, []);

  const handleInputChange = (e) => {
    const id = userList.length ? userList[userList.length - 1].id + 1 : 1;
    const { name, value } = e.target;
    setUser((prevUser) => {
      return {
        ...prevUser,
        id: id,
        [name]: value,
      };
    });
  };

  const handleCheck = (e) => {
    const { name, checked } = e.target;
    const newValue = checked;
    setUser((prevUser) => {
      return {
        ...prevUser,
        [name]: newValue,
      };
    });
  };

  const nextPage = (e) => {
    e.preventDefault();
    setUserList(user);
    setUser(blankForm);
    setUserFormComplete(true);
  };

  return (
    <form>
      <div
        className="userForm"
        style={userFormComplete ? { display: "none" } : null}
      >
        <Input
          name="fName"
          title="First Name"
          value={user.fName}
          innerRef={fNameRef}
          type="text"
          handleInputChange={handleInputChange}
        />
        <br />
        <Input
          name="lName"
          title="Last Name"
          value={user.lName}
          type="text"
          handleInputChange={handleInputChange}
        />
        <br />
        <Input
          name="phoneNumber"
          title="Phone Number"
          value={user.phoneNumber}
          type="text"
          handleInputChange={handleInputChange}
        />
        <br />
        <Input
          name="addressRequired"
          title="Address"
          value={user.addressRequired}
          type="checkBox"
          handleInputChange={handleCheck}
        />
        {user.addressRequired === true && (
          <>
            <br />
            <Input
              name="address"
              title="Adrress"
              value={user.address}
              type="text"
              handleInputChange={handleInputChange}
            />
          </>
        )}
        <br />
        <button type="button" onClick={nextPage}>
          Next
        </button>
      </div>
    </form>
  );
};

export default NewUser;
