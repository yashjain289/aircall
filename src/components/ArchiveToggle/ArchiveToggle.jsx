import React from "react";
import { MoreVertical } from "@styled-icons/feather";

import "./ArchiveToggle.css";

const ArchiveToggle = ({ showarchive, setShowArchive }) => {
    return (
        <div className="archive-toggle-container">
            <div id="btn" style={showarchive ? { left: "57.5%" } : { left: "10.5%" }}></div>
            <button 
                className="archive-toggle-button-container"
                onClick={() => setShowArchive(false)}
                style={!showarchive ? { color: "#484848" } : {}}
            >Activity</button>
            <MoreVertical size="16" className="vertical-dot-container" />
            <button 
                className="archive-toggle-button-container"
                onClick={() => setShowArchive(true)}
                style={showarchive ? { color: "#484848" } : {}}
            >Archives</button>
        </div>
    )
}

export default ArchiveToggle;