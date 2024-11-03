import {useState} from 'react'
import { useNavigate } from 'react-router-dom'

type BuildShopsProps = {
    name: string,
    welcomeText: string,
    status: boolean
}

const BuildShops = (props: BuildShopsProps) => {
  const navigate = useNavigate()
    const [status, setStatus] = useState<boolean>(props.status)

  return (
    <div className="mshop_section" onClick={ () => navigate("/merchant/product")}>
      <p className="mshop_text_ln">{props.name}</p>
      <p className="mshop_text_ln">{props.welcomeText}</p>
      <div className="mshop_action_div">
          <button className={status? "toggle_button_active": "toggle_button_inactive"} type="button" onClick={() => setStatus(!status)}><div className={status? "toggle_indicator_active" : "toggle_indicator_inactive"}></div></button>
      </div>      
  </div>
  )
}

export default BuildShops