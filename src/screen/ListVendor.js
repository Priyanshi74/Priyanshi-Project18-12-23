import { useState, useEffect } from "react";

function ListVendor() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState("");
    const [vendorList, setVendorList] = useState([]);
    const [error, setError] = useState("");

    const handleLogin = async () => {
        try {
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
                setToken(resJson.token);
                setLoading(true);
                console.log(token);
            } else {
                console.error("Some error occurred");
            }
        } catch (err) {
            console.error(err);
        }
    };
useEffect(()=>{
    const fetchVendorList = async () => {
        try {
            let res = await fetch("https://rfpdemo.velsof.com/api/vendorlist", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${ token }`,
        },
    });

    if (res.ok) {
        let data = await res.json();
        setVendorList(data);
    } else {
        console.error("Failed to fetch vendor list");
        setError("Failed to fetch vendor list");
    }
} catch (error) {
    console.error("Error during vendor list fetch:", error);
    setError("Error during vendor list fetch");
}
  };
  if (loading && token) {
    fetchVendorList();
}
}, [loading, token]);


// useEffect(() => {
//     if (loading && token) {
//         fetchVendorList();
//     }
// }, [loading, token]);

return (
    <div className="App">
        {loading ? (
            <div>
                <h1>Your are logged in successfully</h1>
                {vendorList.length > 0 ? (
                    <div>
                        <h2>Vendor List:</h2>
                        <ul>
                            {vendorList.map((vendor) => (
                                <li key={vendor.id}>
                                    <strong>{vendor.name}</strong> - {vendor.email}
                                </li>
                            ))}
                        </ul>
                    </div>
                ) : (
                    <p>No vendors available.</p>
                )}
            </div>
        ) : (
            <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
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
                <button type="submit">Log In</button>
            </form>
        )}
        {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
);
      
        }
export default ListVendor;



