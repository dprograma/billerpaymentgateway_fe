import "./styles/apiWebHook.css"
import { 
    FaFloppyDisk,
    FaPencil, 
} from "react-icons/fa6";
import { useState } from "react";
import AddStaff from "../builders/AddStaff";
import CreateRole from "../builders/CreateRole";
import Window from "../Window";
import { useNavigate } from "react-router-dom";

type Props = {}

const ApiAndWebHookView = (props: Props) => {
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState<number>(1)
    const [showAddStaff, setShowAddStaff] = useState<boolean>(false)
    const [showCreateRole, setShowCreateRole] = useState<boolean>(false)

    const [blur, setBlur] = useState<boolean>(false)
  return (
    <div className={'view_screen'}>
        <div className={ blur? 'api_web_super_container_blur':"api_web_super_container"}>
            <div className="api_web_header_info">
                <div>
                    <p className="api_web_header_title">API & Web Hook</p>
                    <p className='api_web_desc_text'>A descriptive body text comes here</p>
                </div>
            </div>
            <div className="api_web_tab_cont">
                <ul className="api_web_tab_wrpr">
                    <li className={activeTab === 1? "api_web_tab_active": "api_web_tab"} onClick={() => setActiveTab(1)}>API</li>
                    <li className={activeTab ===2? "api_web_tab_active": "api_web_tab"} onClick={() => setActiveTab(2)}>Web Hook</li>
                </ul>
            </div>
            { activeTab === 1 &&
                <div className="api_web_container">
                    <p>Elevate your website's capabilities by integrating seamlessly. 
                        Copying and pasting your unique API keys is all it takes 
                        to access a world of financial empowerment. 
                        Test API for merchant integration.
                    </p>
                    <div className='api_web_input_wrpr'>
                        <label>
                            Test API Key
                            <input className='api_web_form_input' 
                                placeholder="*************************
                                **************************************
                                **************************************"
                            />
                        </label>
                    </div>
                </div>
            }
            { activeTab === 2 &&
                <div className="api_web_container">
                   <p>Paste your URL here
                    </p>
                    <div className='api_web_input_wrpr'>
                        <label>
                            Paste URL
                            <input className='api_web_form_input' type="text" />     
                        </label>
                        <button className="api_key_save_btn"><FaFloppyDisk size={15} />Save</button>
                    </div>
                </div>
            }
        </div>
        <div className="api_web_add_member_cont">
            {showAddStaff && AddStaff(setShowAddStaff, setBlur)}
            {showCreateRole && CreateRole(setShowCreateRole, setBlur)}
        </div>
    </div>
  )
}


const ApiAndWebHook = () => {
    const content = {
        currentView: <ApiAndWebHookView />,
        activeId: 18
    }
    return(
        <Window currentView={content.currentView} activeId={content.activeId}/>
    )
}

export default ApiAndWebHook