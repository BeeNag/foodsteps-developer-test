import { useEffect, useState } from "react";
import Page from "./Page";
import { Spin } from "antd";
import { DEFAULT_USER_ID } from "./App";

interface UserDetails {
    name: string;
    email: string;
    phone: string;
    website: string;
};

export default function UserDetailsPage() {
    const [userDetails, setUserDetails] = useState<UserDetails | null>(null);

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/users/${DEFAULT_USER_ID}`)
            .then((response) => response.json())
            .then((json) => {
                setUserDetails(json);
            });
        } , [setUserDetails]);
    

    return <Page title="User Details">
        {userDetails === null ? <Spin/> : <div>
            <p><b>Name:</b> {userDetails.name}</p>
            <p><b>Email:</b> {userDetails.email}</p>
            <p><b>Phone:</b> {userDetails.phone}</p>
            <p><b>Website:</b> {userDetails.website}</p>
        </div>}
    </Page>;
}
