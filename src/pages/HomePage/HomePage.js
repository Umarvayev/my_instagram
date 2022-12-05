import React, { useEffect } from 'react';
import Timeline from '../../components/Timeline';
import Sidebar from './../../components/Sidebar/index';
import imgcontrnt from "../../components/createPost/image/profile.png"
const HomePage = () => {

    useEffect(() => {
        document.title = "My Instagram";
    }, []);

    return (
        <div className="orqa_fon_1 py-10">
            <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg mt-10">
                <Timeline/>
                <Sidebar/>
            </div>
        </div>
    );
};

export default HomePage;
