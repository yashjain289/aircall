import React from "react";
import CallCard from "../CallCard/CallCard.jsx";
import ArchiveUndoAll from "../ArchiveUndoAll/ArchiveUndoAll.jsx";

const ArchiveFeed = ({ activities, activityRef, formatActivities, setActivities }) => {
    return (
        <div>
            <ArchiveUndoAll 
                activities={activities}
                setActivities={setActivities}
                formatActivities={formatActivities}
                activityRef={activityRef}
                mode={"undoAll"}
            />

            <div style={{ marginBottom: "30px" }}></div>

            {activities && activities.map((call, index) => (
                (call.is_archived) ? (
                    <CallCard 
                        date={call.created_at}
                        key={index}
                        direction={call.direction}
                        from={call.from}
                        to={call.to}
                        callType={call.call_type}
                        via={call.via}
                        isArchived={call.is_archived}
                        id={call.id}
                        activityRef={activityRef}
                        formatActivities={formatActivities}
                        setActivities={setActivities}
                        callIndex={index}                    
                    />
                ) : null
            ))}
        </div>
    )
}

export default ArchiveFeed;