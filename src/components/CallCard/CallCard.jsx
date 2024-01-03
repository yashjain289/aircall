import { SwipeableList, SwipeableListItem, TrailingActions, SwipeAction } from "react-swipeable-list";
import React, { Fragment, useEffect, useState } from "react";
import { PhoneIncoming, PhoneMissed, Voicemail, MoreVertical, PhoneOff } from "@styled-icons/feather";
import { Undo, Archive } from "@styled-icons/fa-solid";

import "react-swipeable-list/dist/styles.css";
import "./CallCard.css";

const CallCard = ({ date, direction, from, to, callType, via, isArchived, id, activityRef, formatActivities, setActivities, callIndex }) => {
    const [error, setError] = useState(null);
    const newDate = new Date(date);
    const dateOptions = { year: "numeric", month: "long", day: "numeric" };
    const timeOptions = { hour: "numeric", minute: "numeric", hour12: true };
    const formatDate = new Intl.DateTimeFormat("en-US", dateOptions);
    const formatTime = new Intl.DateTimeFormat("en-US", timeOptions);
    const shortDate = formatDate.format(newDate);
    const fullTime = formatTime.format(newDate);
    const time = fullTime.match(/[\d:]+/);
    const ampm = fullTime.match(/PM|AM/);

    const handleTrailingAction = (handleArchiveCall, isArchived) => (
        <TrailingActions>
            <SwipeAction onClick={() => handleArchiveCall()} destructive={true}>
                <div className="archive-swipe-container" style={isArchived ? { backgroundColor: "#147EFB" } : { backgroundColor: "#FECB2E" }}>
                    {isArchived ? (
                        <Undo className="undo-container" size="24" />
                    ) : (
                        <Archive className="archive-icon-container" />
                    )}
                </div>
            </SwipeAction>
        </TrailingActions>
    );

    const handleArchiveCall = async () => {
        const url = `https://cerulean-marlin-wig.cyclic.app/activities/${id}`;

        try {
            const requestData = {
                is_archived: !isArchived
            };

            await fetch(url, {
                method: "PATCH",
                body: JSON.stringify(requestData),
                headers: { "Content-type": "application/json; charset=UTF-8" }
            });
            
            const updatedActivities = activityRef.current.map((item, index) =>
                index === callIndex ? Object.assign({}, item, { is_archived: !isArchived }) : item
            );

            activityRef.current = updatedActivities;
            setActivities(formatActivities(updatedActivities));
        } catch(error) {
            setError(error);
        }
    }

    return (
        <div className="call-box-container">
            <div className="call-date-container">{shortDate}</div>

            <SwipeableList destructiveCallbackDelay={100}>
                <SwipeableListItem trailingActions={handleTrailingAction(handleArchiveCall, isArchived)}>
                    <div className="call-detail-container">
                        <CallIcon callType={callType} />

                        <div className="call-from-container">
                            <CallFrom direction={direction} from={from} to={to} />

                            <div className="call-via-container">
                                <CallVia via={via} />
                            </div>
                        </div>

                        <MoreVertical size="16" style={{ marginLeft: 'auto', color: 'darkgrey', minWidth: '16px' }} />

                        <div className="call-time-container">
                            <div id="time">{time}</div>
                            <div id="ampm">{ampm}</div>
                        </div>
                    </div>
                </SwipeableListItem>
            </SwipeableList>
        </div>
    )
}

const CallFrom = ({ direction, from, to }) => {
    if(direction === "inbound") {
        return <Fragment>{from}</Fragment>
    } else if(direction === "outbound") {
        return <Fragment>{to}</Fragment>
    } else {
        return null;
    }
}

const CallIcon = ({ callType }) => {
    if(callType === "answered") {
        return <PhoneIncoming size="18" style={{ margin: "0 15px", minWidth: "16px", color: "green" }} />
    } else if(callType === "missed") {
        return <PhoneMissed size="18" style={{ margin: "0 15px", minWidth: "16px", color: "red" }} />
    } else if(callType === "voicemail") {
        return <Voicemail size="18" style={{ margin: "0 15px", minWidth: "16px", color: "black" }} />
    } else {
        return <PhoneOff size="18" style={{ margin: "0 15px", minWidth: "16px", color: "black" }} />;
    }
}

const CallVia = ({ via }) => {
    return (
        <Fragment>
            tried to call on <span style={{ fontSize: "12.7px", fontWeight: "900" }}>{via}</span>
        </Fragment>
    )
}

export default CallCard;