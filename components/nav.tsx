import React from "react";
import Link from "next/link";
const containerStyle = {
    display:'flex'
}
const itemStyle = {
    padding: 10
}
const Nav: React.FC = () => {
    return (
        <div style={containerStyle}>
            <Link href="/">
                <p style={itemStyle}>
                    HOME
                </p>
            </Link>
            <Link href="/about">
                <p style={itemStyle}>
                    About
                </p>
            </Link>
            <Link href="/connect">
                <p style={itemStyle}>
                    CONNECT
                </p>
            </Link>          
        </div>
    )
}

export default Nav;

