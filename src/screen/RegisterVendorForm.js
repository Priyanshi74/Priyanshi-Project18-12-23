import React, { useState } from 'react';
const RegisterVendorForm = () => {
      //State to hold user Input
      const [firstName, setFirstName] = useState("");
      const [lastName, setLastName] = useState("");
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const [revenue, setRevenue] = useState("");
      const [numEmployees, setNumEmployees] = useState("");
      const [category, setCategory] = useState("");
      const [panCardNo, setPanCardNo] = useState("");
      const [gstNo, seGstNo] = useState("");
      const [mobile, setMobile] = useState("");

      const [error, setError] = useState("");

      const handleRegistration = async (e) => {
            e.preventDefault();

            //API endpoint
            const apiUrl = 'https://rfpdemo.velsof.com/api/registervendor';

            try {
                  //Make a POST request to login api
                  const response = await fetch(apiUrl, {
                        method: 'POST',
                        headres: {
                              'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                              firstName: firstName,
                              lastName: lastName,

                              email: email,
                              password: password,
                              revenue: revenue,
                              no_of_employees: numEmployees,
                              category: category,
                              pancard_no: panCardNo,
                              gst_no: gstNo,
                              mobile: mobile
                        }),
                  });
                console.log(response);
                  //Check if the request was successful(status code 200)
                  if (!response.ok) {
                        const errorData=await response.json();//get the error details
                        console.error('Error Response:', errorData);//debugging purpose

                        if(errorData && errorData.error){
                              setError(errorData.error);
                        }else{
                              setError('Unknown error occurred');
                        }
                  }else{
                        const data = await response.json(); 
                        console.log('API Response:', data);

                  
                  if (data.response === 'success') {
                        console.log('Registration Successful');
                  }
                  else if (data.response === 'error') {
                        if (Array.isArray(data.error)) {
                              setError(data.error.join(','));
                        } else {
                              setError('Unknown error occurred');
                        }
                  }
            }
      } catch (error) {
            console.error('Error during Registration:', error);
            setError('Unknown error occurred: ${error.message}');
           

      }


            
      }






            return (
                  <div>
                        <form onSubmit={handleRegistration}>
                              <label>
                                    First Name:
                                    <input
                                          type="text"
                                          value={firstName}
                                          onChange={(e) => setFirstName(e.target.value)}
                                    />

                              </label>
                              <br />
                              <label>
                                    Last Name:
                                    <input
                                          type="text"
                                          value={lastName}
                                          onChange={(e) => setLastName(e.target.value)}
                                    />

                              </label>
                              <br />
                              <label>
                                    Email:
                                    <input
                                          type="text"
                                          value={email}
                                          onChange={(e) => setEmail(e.target.value)}
                                    />

                              </label>
                              <br />
                              <label>
                                    Password:
                                    <input
                                          type="password"
                                          value={password}
                                          onChange={(e) => setPassword(e.target.value)}
                                    />

                              </label>
                              <br />
                              <label>
                                    Revenue:
                                    <input
                                          type="text"
                                          value={revenue}
                                          onChange={(e) => setRevenue(e.target.value)}
                                    />

                              </label>
                              <br />
                              <label>
                                    No. of Employees:
                                    <input
                                          type="text"
                                          value={numEmployees}
                                          onChange={(e) => setNumEmployees(e.target.value)}
                                    />

                              </label>
                              <br />
                              <label>
                                    CATEGORY:
                                    <input
                                          type="text"
                                          value={category}
                                          onChange={(e) => setCategory(e.target.value)}
                                    />

                              </label>
                              <br />
                              <label>
                                    Pan Card:
                                    <input
                                          type="text"
                                          value={panCardNo}
                                          onChange={(e) => setPanCardNo(e.target.value)}
                                    />

                              </label>
                              <br />
                              <label>
                                    GST:
                                    <input
                                          type="text"
                                          value={gstNo}
                                          onChange={(e) => seGstNo(e.target.value)}
                                    />

                              </label>
                              <br />
                              <label>
                                    Mobile:
                                    <input
                                          type="numeric"
                                          value={mobile}
                                          onChange={(e) => setMobile(e.target.value)}
                                    />

                              </label>
                              <button type="submit">Register</button>

                        </form>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                  </div>
            );
      };
      export default RegisterVendorForm;