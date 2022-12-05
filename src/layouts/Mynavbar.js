import React, { useContext, useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { EDIT_PROFILE, HOME, LOGIN } from '../constants/routes';
import UserContext from '../context/user';
import FirebaseContext from '../context/firebase';
import { SIGN_UP } from '../constants/routes';
import CreatePost from '../components/createPost/CreatePost';
import useUser from '../hooks/useUser';
import "./style.css";
import SearchBar from './searchnaw';

const NavBar = () => {  
    const navigate = useNavigate();
    const searchRef = useRef();
    const navbarRef = useRef(null);
    const [ focused, setFocused ] = useState(false);
    const [ search, setSearch ] = useState('');
    const { firebase } = useContext(FirebaseContext);
    const { user } = useContext(UserContext);
    const [ dropdownOpen, setDropdownOpen ]= useState(false);
    const [ open, setOpen ] = useState(false);
    const { user: { avatarSrc, username } } = useUser();

    useEffect(() => {
        window.addEventListener('scroll', isSticky);
        return () => {
            window.removeEventListener('scroll', isSticky);
        };
    });

    useEffect(() => {
        function handleClickOutside(event) {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setFocused(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [searchRef]);

    const isSticky = (e) => {
        const header = navbarRef.current;
        const scrollTop = window.scrollY;
        scrollTop >= 63 ? header.classList.add('is-sticky') : header.classList.remove('is-sticky');
    };

    return (
        <>
        <CreatePost open={open} setOpen={setOpen}/>
        <div className="navbar_qismi" ref={navbarRef} >
            <div className="navbar_qism">
               

                <div className='logo'> <a href="/">My Instagram</a> </div>

                <div className="">
                    <div>
                        
                        <input
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            onFocus={() => setFocused(true)}
                            type="text"
                            className="search_style"
                            placeholder="Search"
                        />
                    </div>
                    {focused && (
                        <div
                            className="my-bg mt-8"
                            ref={searchRef}
                        >
                            <SearchBar searchInput={search}/>
                           
                        </div>
                    )}
                </div>
                
                <div className='tekkis_navbar'>
                
                    <div className="flex ">
                        {user ? (
                            <div className='main_flex'>
                        <div className='p-2 mt-6 mr-2 h-90'>
                        <a href="/" >
                            <svg className='home_logo' aria-label="Home" class="_ab6-" color="black" fill="black" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M22 23h-6.001a1 1 0 01-1-1v-5.455a2.997 2.997 0 10-5.993 0V22a1 1 0 01-1 1H2a1 1 0 01-1-1V11.543a1.002 1.002 0 01.31-.724l10-9.543a1.001 1.001 0 011.38 0l10 9.543a1.002 1.002 0 01.31.724V22a1 1 0 01-1 1z"></path></svg>
                        </a>
                            </div>
                            <div className="cursor-pointer flex items-center justify-center mr-6"
                                onClick={() => setOpen(true)}
                            >
                                <div></div>
                                <div className='mt-7'>
                                    
                                <svg aria-label="New post" class="_ab6-" color="black" fill="black" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M2 12v3.45c0 2.849.698 4.005 1.606 4.944.94.909 2.098 1.608 4.946 1.608h6.896c2.848 0 4.006-.7 4.946-1.608C21.302 19.455 22 18.3 22 15.45V8.552c0-2.849-.698-4.006-1.606-4.945C19.454 2.7 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.547 2 5.703 2 8.552z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="6.545" x2="17.455" y1="12.001" y2="12.001"></line><line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="12.003" x2="12.003" y1="6.545" y2="17.455"></line></svg>

                           
                            </div>
                            
                        
                                
                            </div>
                            <div
                                className="mt-7 cursor-pointer w-20 py-1 relative text-center My_Profil"
                                onClick={() => setDropdownOpen(prev => !prev)}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                                    <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                                </svg>
                                
                                <div className={ !dropdownOpen ? "hidden" : "" + " bg-white text-base z-50 list-none divide-y divide-gray-100 rounded shadow absolute top-10 right-0"} >
                                    <ul className="py-1" aria-labelledby="dropdown">
                                        <li
                                            className="hover:bg-gray-100"
                                            onClick={() => navigate(`/${username}`)}
                                        >
                                            <div className="flex items-center px-4 py-2">
                                                <div className="flex items-center mr-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    </svg>
                                                </div>
                                                <span className="text-sm text-gray-700 block">Profile</span>
                                            </div>
                                        </li>
                                        <li
                                            className="border-b hover:bg-gray-100"
                                            onClick={() => navigate(EDIT_PROFILE)}
                                        >
                                            <div className="flex items-center px-4 py-2 pr-10">
                                                <div  className="flex items-center mr-2" >
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    </svg>
                                                </div>
                                                <span className="text-sm text-gray-700 block">Settings</span>
                                            </div>
                                        </li>
                                        <li
                                            onClick={() => firebase.auth().signOut()}
                                        >
                                            <span className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2">Sign out</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            </div>
                        ) : (
                            <>
                                <Link to={LOGIN}>
                                    <button
                                        className="bg-blue-inst font-bold text-sm rounded text-white w-20 h-8"
                                        type="button"
                                    >
                                        Log In
                                    </button>
                                </Link>
                                <Link to={SIGN_UP}>
                                    <button
                                        className="text-blue-inst font-bold text-sm rounded text-white w-20 h-8"
                                        type="button"
                                    >
                                        Sign Up
                                    </button>
                                </Link>
                            </>
                        )
                        }

                    </div>
                </div>
            </div>
        </div>
        </>
    );
};

export default NavBar;
