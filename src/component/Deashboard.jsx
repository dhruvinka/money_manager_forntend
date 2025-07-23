import React, { Children, useContext } from 'react'
import Menubar from './Menubar'
import { AppContext } from '../context/AppContext'
import Sidebar from './Sidebar';

export default function Deashboard({ children ,activeMenu}) {
    const { user } = useContext(AppContext);
    return (


        <div>   <Menubar  activeMenu={activeMenu} />

            <div className="flex">
                <div className='max-[1080px]:hidden'>
                    {
                        /** Side bar content */
                    }

                    <Sidebar activeMenu={activeMenu} />
                </div>

                <div className='grow mx-5'>{children}</div>

            </div>
        </div>


    )
}
