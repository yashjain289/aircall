import React, { useState } from 'react';
import { Archive, Undo } from '@styled-icons/fa-solid';

import "./ArchiveUndoAll.css";

const ArchiveUndoAll = ({ activities, setActivities, formatActivities, activityRef, mode }) => {
    const [error, setError] = useState(null);

    const handleArchiveUndoAll = (mode) => {
        activities.forEach(async (call, callIndex) => {
            const requestData = {
                is_archived: mode === "archiveAll" ? true : false
            };

            const url = `https://cerulean-marlin-wig.cyclic.app/activities/${call.id}`

            try {    
                await fetch(url, {
                    method: "PATCH",
                    body: JSON.stringify(requestData),
                    headers: { "Content-type": "application/json; charset=UTF-8" }
                });

                const updatedActivities = activityRef.current.map((item, index) =>
                    index === callIndex ? Object.assign({}, item, { is_archived: mode === "archiveAll" ? true : false }) : item
                );

                activityRef.current = updatedActivities;
                setActivities(formatActivities(updatedActivities));
            } catch(error) {
                setError(error);
            }
        })
    }

    return (
        <div className='call-box-container'>
            {mode === "archiveAll" ? (
                <div 
                    className='call-detail-container'
                    onClick={() => handleArchiveUndoAll("archiveAll")}
                >
                    <Archive 
                        className="archive-icon-container" 
                        onClick={() => handleArchiveUndoAll("archiveAll")}
                    />
                    <span style={{ fontWeight: "600" }}>Archive All Calls</span>
                </div>
            ) : mode === "undoAll" ? (
                <div 
                    className='call-detail-container'
                    onClick={() => handleArchiveUndoAll("undoAll")}
                >
                    <Undo 
                        className="undo-container" 
                        size="24" 
                    />
                    <span style={{ fontWeight: "600" }}>Undo All Archive Calls</span>
                </div>
            ) : null}
        </div>
    )
}   

export default ArchiveUndoAll;