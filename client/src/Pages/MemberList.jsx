import React from 'react';
import './MemberList.css';

export default function MemberList({ isCreator }) {
    const members = ['Hannah Tran', 'Eric Ly', "Elizabeth Moh", "Connie Ly"];

    const propogateMembers = members.map((memberName, index) => (
        <div key={index}>
            <h3>{memberName}
            {isCreator && <button className='kick-button' onClick={() => handleKickMember(memberName)}>Kick</button>}
            </h3>
           
            <hr />
        </div>
    ));

    const handleKickMember = (memberName) => {
        console.log(`Kicking member: ${memberName}`);
        
    };

    return (
        <div>
            <h1 className="membership_title">Membership List </h1>
            <hr />
            <div className="members">
                {propogateMembers}
            </div>
        </div>
    );
}
