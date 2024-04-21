import { useEffect, useState } from "react";
import "./MemberList.css";

export default function MemberList({ groupId, isCreator }) {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5002/api/friend-groups/${groupId}/members`)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          throw new Error(data.error);
        }
        setMembers(data); // Assuming `data` is an array of member objects
        console.log(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [groupId]);

  const propogateMembers = members.map((member, index) => (
    <div key={member._id || index}>
      {" "}
      // Use member's _id if available, else fallback to index
      <h3>
        {member.name} // Assuming member objects have a 'name' property
        {isCreator && (
          <button
            className="kick-button"
            onClick={() => handleKickMember(member.name)} // Assuming you want to use name to identify for kick
          >
            Kick
          </button>
        )}
      </h3>
      <hr />
    </div>
  ));

  const handleKickMember = (memberName) => {
    console.log(`Kicking member: ${memberName}`);
    // Implementation to kick a member would go here
  };

  return (
    <div>
      <h1 className="membership_title">Friends List</h1>
      <hr />
      <div className="members">{propogateMembers}</div>
    </div>
  );
}
