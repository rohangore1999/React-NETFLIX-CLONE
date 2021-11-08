import React, {useEffect, useState} from 'react'
import './Nav.css'

const Nav = () => {
    const [show, handleShow] = useState(false)
    // code to run once when nav bar component run
    useEffect(() => {
        // listening to Scroll!!
        window.addEventListener("scroll",()=>{
            // if scroll > than 100 in Y-axis
            if(window.scrollY > 100) {
                // then show Nav bar
                handleShow(true)
            }
            else{
                // else dont
                handleShow(false)
            }
        }
        )
        // return () => {
        //     window.removeEventListener("scroll")
        // }
    }, [])

    return (
        // nav class will always present; and if [useState] => 'show' is true then add class 'nav__black'
        <div className={`nav ${show && "nav__black"}`}>
            <img
                className="nav__logo"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/250px-Netflix_2015_logo.svg.png"
                alt="Netflix Logo"
            />
            <img
                className="nav__avatar"
                src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/366be133850498.56ba69ac36858.png"
                alt="Netflix Logo"
            />
        </div>
    )
}

export default Nav
