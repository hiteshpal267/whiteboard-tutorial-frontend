import { useEffect, useState } from "react";

function Profile() {

  const [name, setName] = useState("");

  useEffect(() => {

    const fetchProfile = async () => {

      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:3030/users/profile", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await response.json();

      setName(data.name);
    };

    fetchProfile();

  }, []);

  return (
    <div style={{textAlign:"center", marginTop:"100px"}}>
      <h1>Hello, {name} 👋</h1>
    </div>
  );
}

export default Profile;