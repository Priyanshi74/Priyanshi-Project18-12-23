import React, { useState } from "react";

function RFPForm({ onSuccess }) {
  const [itemName, setItemName] = useState("");
  const [rfpNo, setRfpNo] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [lastDate, setLastDate] = useState("");
  const [minPrice, setMinPrice] = useState(0.0);
  const [maxPrice, setMaxPrice] = useState(0.0);
  const [categories, setCategories] = useState("");
  const [vendors, setVendors] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDateChange = (e) => {
    const dateValue = new Date(e.target.value);
    const year = dateValue.getFullYear();
    const month = (`0${dateValue.getMonth() + 1}`).slice(-2);
    const day = (`0${dateValue.getDate()}`).slice(-2);
    const hours = (`0${dateValue.getHours()}`).slice(-2);
    const minutes = (`0${dateValue.getMinutes()}`).slice(-2);
    const seconds = (`0${dateValue.getSeconds()}`).slice(-2);
  
    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    setLastDate(formattedDate);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      let res = await fetch("https://rfpdemo.velsof.com/api/createrfp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          item_name: itemName,
          rfp_no: rfpNo,
          quantity: parseInt(quantity),
          last_date: lastDate,
          minimum_price: parseFloat(minPrice),
          maximum_price: parseFloat(maxPrice),
          categories: categories,
          vendors: vendors,
          item_description: itemDescription,
        }),
      });
      let resJson = await res.json();
      console.log(resJson);
      if (res.status === 200) {
        setLoading(true);
        onSuccess(resJson); // Notify the parent component about the success
      } else {
        console.error("Some error occurred");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const categoryOptions = ["1", "5", "4"];
  const vendorOptions = ["10", "5", "55"];

  return (
    <div className="RFPForm">
      {loading ? (
        <div>
          <h1>Your RFP has been successfully created!</h1>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={itemName}
            placeholder="Item Name"
            onChange={(e) => setItemName(e.target.value)}
          />
          <input
            type="text"
            value={rfpNo}
            placeholder="RFP Number"
            onChange={(e) => setRfpNo(e.target.value)}
          />
          <input
            type="number"
            value={quantity}
            placeholder="Quantity"
            onChange={(e) => setQuantity(e.target.value)}
          />
            <input
        type="datetime-local"
        value={lastDate}
        placeholder="Last Date"
        onChange={handleDateChange}
      />
          <input
            type="number"
            value={minPrice}
            placeholder="Minimum Price"
            onChange={(e) => setMinPrice(e.target.value)}
          />
          <input
            type="number"
            value={maxPrice}
            placeholder="Maximum Price"
            onChange={(e) => setMaxPrice(e.target.value)}
          />
          <select value={categories} onChange={(e) => setCategories(e.target.value)}>
            <option value="">Select Category</option>
            {categoryOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <select value={vendors} onChange={(e) => setVendors(e.target.value)}>
            <option value="">Select Vendor</option>
            {vendorOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <textarea
            value={itemDescription}
            placeholder="Item Description"
            onChange={(e) => setItemDescription(e.target.value)}
          ></textarea>

          <button type="submit">Create RFP</button>
        </form>
      )}
    </div>
  );
}

function AddRfp() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      let res = await fetch("https://rfpdemo.velsof.com/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      let resJson = await res.json();
      console.log(resJson);
      if (res.status === 200) {
        setLoggedIn(true);
      } else {
        console.error("Some error occurred");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      {!loggedIn ? (
        <form onSubmit={handleLogin}>
          <input
            type="text"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            value={password}
            placeholder="Enter the password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">{loading ? "Logging in..." : "Log In"}</button>
        </form>
      ) : (
        <RFPForm onSuccess={() => setLoggedIn(false)} />
      )}
    </div>
  );
}

export default AddRfp;

