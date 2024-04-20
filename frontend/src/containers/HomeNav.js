import React from "react";
import CustomNav from "../components/CustomNav";

const HomeNav = () => {
    const links = [
        {label: 'Register', url: '/register'},
        {label: 'Login', url: '/login'}
      ]
    return (
        <CustomNav brandName="Home" brandLink='/' links={links} />
    )
}

export default HomeNav