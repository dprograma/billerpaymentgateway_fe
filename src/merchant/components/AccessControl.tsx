import "./styles/accessControl.css"
import { 
    FaRegTrashCan,
    FaPencil, 
} from "react-icons/fa6";
import { useState } from "react";
import AddStaff from "../builders/AddStaff";
import CreateRole from "../builders/CreateRole";
import EditRole from "../builders/EditRole";
import Window from "../Window";
import { useNavigate } from "react-router-dom";

type Props = {}

const AccessControlView = (props: Props) => {
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState<number>(1)
    const [showAddStaff, setShowAddStaff] = useState<boolean>(false)
    const [showEditRole, setShowEditRole] = useState<boolean>(false)
    const [showCreateRole, setShowCreateRole] = useState<boolean>(false)

    const [blur, setBlur] = useState<boolean>(false)
  return (
    <div className={'view_screen'}>
        <div className={ blur? 'access_contrl_super_container_blur':"access_contrl_super_container"}>
            <div className="access_contrl_header_info">
                <div>
                    <p className="access_contrl_header_title">Access Control</p>
                    <p className='access_contrl_desc_text'>A descriptive body text comes here</p>
                </div>
            </div>
            <hr className="access_contrl_hr" />
            <div className="access_contrl_tab_cont">
                <ul className="access_contrl_tab_wrpr">
                    <li className={activeTab === 1? "access_control_tab_active": "access_control_tab"} onClick={() => setActiveTab(1)}>Staff</li>
                    <li className={activeTab ===2? "access_control_tab_active": "access_control_tab"} onClick={() => setActiveTab(2)}>Roles</li>
                </ul>
                { activeTab === 1 &&
                    <button type="button" className="access_contrl_add_staff_btn" onClick={() => {setShowAddStaff(true); setShowCreateRole(false); setBlur(true)}}>+ Add Staff</button>
                }
                { activeTab === 2 &&
                    <button type="button" className="access_contrl_create_role_btn" onClick={() => {setShowAddStaff(false); setShowCreateRole(true); setBlur(true)}}>+ Create Role</button>
                }
            </div>
            { activeTab === 1 &&
                <div className="access_contrl_container">
                    <div className="access_contrl_header">
                        <p className="access_contrl_text">Name</p>
                        <p className="access_contrl_text">Permission</p>
                        <p className="access_contrl_text">Actions</p>
                    </div>
                    <hr className="access_contrl_hr" />
                    <div className="access_contrl_section">
                        <p className="access_contrl_text_ln">Samson James</p>
                        <p className="access_contrl_text_ln">Manager</p> 
                        <div className="access_contrl_action_div">
                            <button className="edit_button" type="button" onClick={() => { setBlur(true); setShowCreateRole(true); setShowAddStaff(false)}}><FaPencil size={20}/></button>
                            <button className="delete_button" type="button"><FaRegTrashCan size={20}/></button>
                        </div>    
                    </div>
                    <hr className="access_contrl_hr" />
                    <div className="access_contrl_section">
                        <p className="access_contrl_text_ln">Samson James</p>
                        <p className="access_contrl_text_ln">Manager</p> 
                        <div className="access_contrl_action_div">
                            <button className="edit_button" type="button" onClick={() => { setBlur(true); setShowCreateRole(true); setShowAddStaff(false)}}><FaPencil size={20}/></button>
                            <button className="delete_button" type="button"><FaRegTrashCan size={20}/></button>
                        </div>    
                    </div>
                    <hr className="access_contrl_hr" />
                    <div className="access_contrl_section">
                        <p className="access_contrl_text_ln">Samson James</p>
                        <p className="access_contrl_text_ln">Manager</p> 
                        <div className="access_contrl_action_div">
                            <button className="edit_button" type="button" onClick={() => { setBlur(true); setShowCreateRole(true); setShowAddStaff(false)}}><FaPencil size={20}/></button>
                            <button className="delete_button" type="button"><FaRegTrashCan size={20}/></button>
                        </div>    
                    </div>
                    <hr className="access_contrl_hr" />
                    <div className="access_contrl_section">
                        <p className="access_contrl_text_ln">Samson James</p>
                        <p className="access_contrl_text_ln">Manager</p> 
                        <div className="access_contrl_action_div">
                            <button className="edit_button" type="button" onClick={() => { setBlur(true); setShowCreateRole(true); setShowAddStaff(false)}}><FaPencil size={20}/></button>
                            <button className="delete_button" type="button"><FaRegTrashCan size={20}/></button>
                        </div>    
                    </div>
                    <hr className="access_contrl_hr" />
                    <div className="access_contrl_section">
                        <p className="access_contrl_text_ln">Samson James</p>
                        <p className="access_contrl_text_ln">Manager</p> 
                        <div className="access_contrl_action_div">
                            <button className="edit_button" type="button" onClick={() => { setBlur(true); setShowCreateRole(true); setShowAddStaff(false)}}><FaPencil size={20}/></button>
                            <button className="delete_button" type="button"><FaRegTrashCan size={20}/></button>
                        </div>    
                    </div>
                    <hr className="access_contrl_hr" />
                    <div className="access_contrl_section">
                        <p className="access_contrl_text_ln">Samson James</p>
                        <p className="access_contrl_text_ln">Manager</p> 
                        <div className="access_contrl_action_div">
                            <button className="edit_button" type="button" onClick={() => { setBlur(true); setShowCreateRole(true); setShowAddStaff(false)}}><FaPencil size={20}/></button>
                            <button className="delete_button" type="button"><FaRegTrashCan size={20}/></button>
                        </div>    
                    </div>
                    <hr className="access_contrl_hr" />
                </div>
            }
            { activeTab === 2 &&
                <div className="access_contrl_container">
                    <div className="access_contrl_header">
                        <p className="access_contrl_text">Permission</p>
                        <p className="access_contrl_text">Access</p>
                        <p className="access_contrl_text">Actions</p>
                    </div>
                    <hr className="access_contrl_hr" />
                    <div className="access_contrl_section">
                        <p className="access_contrl_text_ln">Manager</p>
                        <p className="access_contrl_text_ln">Update record, add customer, edit customer</p> 
                        <div className="access_contrl_action_div">
                            <button className="edit_button" type="button" onClick={() => { setBlur(true); setShowAddStaff(false); setShowCreateRole(false); setShowEditRole(true)}}><FaPencil size={20}/></button>
                            <button className="delete_button" type="button"><FaRegTrashCan size={20}/></button>
                        </div>    
                    </div>
                    <hr className="access_contrl_hr" />
                    <div className="access_contrl_section">
                        <p className="access_contrl_text_ln">Manager</p>
                        <p className="access_contrl_text_ln">Update record, add customer, edit customer</p> 
                        <div className="access_contrl_action_div">
                            <button className="edit_button" type="button" onClick={() => { setBlur(true); setShowAddStaff(false); setShowCreateRole(false); setShowEditRole(true)}}><FaPencil size={20}/></button>
                            <button className="delete_button" type="button"><FaRegTrashCan size={20}/></button>
                        </div>    
                    </div>
                    <hr className="access_contrl_hr" />
                    <div className="access_contrl_section">
                        <p className="access_contrl_text_ln">Manager</p>
                        <p className="access_contrl_text_ln">Update record, add customer, edit customer</p> 
                        <div className="access_contrl_action_div">
                            <button className="edit_button" type="button" onClick={() => { setBlur(true); setShowAddStaff(false); setShowCreateRole(false); setShowEditRole(true)}}><FaPencil size={20}/></button>
                            <button className="delete_button" type="button"><FaRegTrashCan size={20}/></button>
                        </div>    
                    </div>
                    <hr className="access_contrl_hr" />
                    <div className="access_contrl_section">
                        <p className="access_contrl_text_ln">Manager</p>
                        <p className="access_contrl_text_ln">Update record, add customer, edit customer</p> 
                        <div className="access_contrl_action_div">
                            <button className="edit_button" type="button" onClick={() => { setBlur(true); setShowAddStaff(false); setShowCreateRole(false); setShowEditRole(true)}}><FaPencil size={20}/></button>
                            <button className="delete_button" type="button"><FaRegTrashCan size={20}/></button>
                        </div>    
                    </div>
                    <hr className="access_contrl_hr" />
                    <div className="access_contrl_section">
                        <p className="access_contrl_text_ln">Manager</p>
                        <p className="access_contrl_text_ln">Update record, add customer, edit customer</p> 
                        <div className="access_contrl_action_div">
                            <button className="edit_button" type="button" onClick={() => { setBlur(true); setShowAddStaff(false); setShowCreateRole(false); setShowEditRole(true)}}><FaPencil size={20}/></button>
                            <button className="delete_button" type="button"><FaRegTrashCan size={20}/></button>
                        </div>    
                    </div>
                    <hr className="access_contrl_hr" />
                </div>
            }
        </div>
        <div className="access_contrl_add_member_cont">
            {showEditRole && EditRole(setShowAddStaff, setShowCreateRole, setShowEditRole, setBlur)}
            {showAddStaff && AddStaff(setShowAddStaff, setBlur)}
            {showCreateRole && CreateRole(setShowCreateRole, setBlur)}
        </div>
    </div>
  )
}


const AccessControl = () => {
    const content = {
        currentView: <AccessControlView />,
        activeId: 17
    }
    return(
        <Window currentView={content.currentView} activeId={content.activeId}/>
    )
}

export default AccessControl