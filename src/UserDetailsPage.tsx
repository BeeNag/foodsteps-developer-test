import { useEffect, useState } from "react";
import { Spin } from "antd";

import { useUser } from "./context/UserContext";
import Page from "./Page";

interface UserDetails {
  name: string;
  email: string;
  phone: string;
  website: string;
}

export default function UserDetailsPage() {
  const { user } = useUser();
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${user}`)
      .then((response) => response.json())
      .then((json) => {
        setUserDetails(json);
      });
  }, [setUserDetails, user]);

  return (
    <Page title="User Details">
      {userDetails === null ? (
        <Spin />
      ) : (
        <div>
          <p>
            <b>Name:</b> {userDetails.name}
          </p>
          <p>
            <b>Email:</b> {userDetails.email}
          </p>
          <p>
            <b>Phone:</b> {userDetails.phone}
          </p>
          <p>
            <b>Website:</b> {userDetails.website}
          </p>
        </div>
      )}
    </Page>
  );
}
