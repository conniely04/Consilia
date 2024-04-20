import { Link, useParams } from "react-router-dom"
import "./HangoutSpace.css"

export default function HangoutSpace() {
    const { name } = useParams();
    const hangouts = ['hangout1', 'hangout2', 'hangout3'];
    const propogateHangouts = hangouts.map((hangoutName, index) => (
        <div key={index}>

            
                <button className="hangout-name"  >
                    {hangoutName}
                    <Link to={`/${hangoutName}`} className="hangout-link">
                    <button className="join-button">join</button>
                    </Link>

                    <hr />
                </button>
        </div>
    ))

    return (
        <div>
            <h1 className="hangout_space_title">{name} <span className="username">username</span></h1>
            <hr />
            <div className="hangouts">
                {propogateHangouts}
            </div>
        </div>
    );


}