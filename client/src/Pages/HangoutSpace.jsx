import { Link, useParams } from "react-router-dom";
import "./HangoutSpace.css";
import { useEffect, useState } from "react";

export default function HangoutSpace() {
  const { name, groupId } = useParams();
  const [friendGroup, setFriendGroup] = useState(null);

  //   useEffect(() => {
  //     // Fetch friend group details from the server
  //     const fetchFriendGroup = async () => {
  //       try {
  //         const response = await fetch(`/api/friend-groups/${groupId}`);
  //         if (!response.ok) {
  //           throw new Error("Failed to fetch friend group details.");
  //         }
  //         const data = await response.json();
  //         setFriendGroup(data);
  //       } catch (error) {
  //         console.error("Error:", error);
  //       }
  //     };

  //     fetchFriendGroup();
  //   }, [groupId]);

  const hangouts = ["hangout1", "hangout2", "hangout3"];
  const propogateHangouts = hangouts.map((hangoutName, index) => (
    <div key={index}>
      <button className="hangout-name">
        {hangoutName}
        <Link to={`/${hangoutName}`} className="hangout-link">
          <button className="join-button">join</button>
        </Link>

        <hr />
      </button>
    </div>
  ));

  return (
    <div>
      <h1 className="hangout_space_title">
        {name} <span className="username">username</span>
      </h1>
      <hr />
      <div className="hangouts">{propogateHangouts}</div>
    </div>
  );
}
