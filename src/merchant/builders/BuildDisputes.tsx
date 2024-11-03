import {FaArrowUpFromBracket} from "react-icons/fa6"

type BuildDisputesProps = {
    id: number,
    name: string,
    date: string,
    duration: string,
    status: string,
    amount: string,
    decline: boolean, 
    setDecline: any,
    accept: boolean, 
    setAccept: any,
    setDisputesContainer: any
    showSettlement: boolean,
    setShowSettlement: any,
}

const ShowDisputeData = (props: BuildDisputesProps) => {
    
    return(
        <>{ props.showSettlement &&
            <div className="disp_info_container">
                <p className="disp_info_title">Resolve Disputes</p>
                <p className="disp_amount">Refund: {props.amount}</p>
                <div className="disp_btn_container">
                    <button className="res_dis_btn" type="button" style={{borderBottom: props.accept? "3px solid red" : "none"}} onClick={() => {props.setAccept(true); props.setDecline(false)} }>Accept</button>
                    <button className="res_dis_btn" type="button" style={{borderBottom: props.decline? "3px solid red" : "none"}} onClick={() => {props.setDecline(true);  props.setAccept(false)} }>Decline</button>
                </div>
                { props.accept &&
                <div>
                    <p className="disp_charge_back_message">By approving the chargeback, you authorize us to refund your wallet.</p>
                    <p className="disp_charge_back_amt">-{props.amount}</p>
                    <button className="disp_accept_btn" type="button">Accept</button>
                </div>
                }
                { props.decline &&
                <div>
                    <p className="disp_dispute_message">State the reason for declining.</p>
                    <input type="text" className="disp_decline_text_input"></input>
                    <p className="disp_dispute_message">Upload all relevant documents to back up your claim</p>
                    <button className="disp_upload_btn" type="button"><FaArrowUpFromBracket /></button>
                    <button className="disp_decline_btn" type="button">Decline</button>
                </div>
                }

            </div>
            }
        </>
    )
}


const BuildDisputes = (props: BuildDisputesProps) => {
    const displayData =  props
        return (
            <div>
                <div className="disp_section" onClick={() => {displayData.setDisputesContainer(ShowDisputeData(displayData)); displayData.setShowSettlement(!displayData.showSettlement); }}>
                <p className="disp_text_ln">{props.name}</p>
                <p className="disp_text_ln">{props.date}</p>
                <p className="disp_text_ln">{props.duration}</p>
                <p className="disp_text_ln">{props.status}</p>
                </div>
                <hr className="disp_hr" />
            </div>
        )
}  

export  {BuildDisputes}