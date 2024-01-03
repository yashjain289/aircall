import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import ActivityFeed from './components/ActivityFeed/ActivityFeed.jsx';
import Header from './Header.jsx';

import "./css/app.css";
import ArchiveFeed from './components/ArchiveFeed/ArchiveFeed.jsx';
import ControlPanel from './components/ControlPanel/ControlPanel.jsx';

const App = () => {
  const [activities, setActivities] = useState(null);
  const [showarchive, setShowArchive] = useState(false);
  const activityRef = useRef(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    const url = "https://cerulean-marlin-wig.cyclic.app/activities";

    try {
      const response = await fetch(url);
      const data = await response.json();
      activityRef.current = data;
      setActivities(data);
      setIsLoading(false);
    } catch (error) {
      setError(error);

      //Retrying to fetch since it is mentioned in the problem statement that the response might not come from the server in the first call. 
      await new Promise(resolve => setTimeout(resolve, 30000));

      try {
        const response = await fetch(url);
        const data = await response.json();
        activityRef.current = data;
        setActivities(data);
        setIsLoading(false);
      } catch (retryError) {
        setError(retryError);
      }
    }
  }

  const formatActivities = (activities) => {
    const formattedData = activities.map((call) => {
      return {
        id: call.id,
        created_at: call.created_at,
        direction: call.direction,
        from: call.from,
        to: call.to,
        via: call.via,
        duration: call.duration,
        is_archived: call.is_archived,
        call_type: call.call_type
      }
    });

    return formattedData;
  }

  useEffect(() => {
    fetchData();
    setIsLoading(true);
  }, []);

  useEffect(() => {
    console.log("The activities", activities);
  }, [activities]);

  if (error) {
    return <div>Error: {error.message}</div>
  } else if (isLoading) {
    return <div>Loading...</div>
  } else {
    return (
      <div id='app'>
        <div className='container'>
          <Header setShowArchive={setShowArchive} showarchive={showarchive} />
          <div className='container-view'>
            {showarchive ? (
              <ArchiveFeed 
                activities={activities}
                setActivities={setActivities}
                activityRef={activityRef}
                formatActivities={formatActivities} 
              />
            ) : (
              <ActivityFeed 
                activities={activities} 
                setActivities={setActivities}
                activityRef={activityRef}
                formatActivities={formatActivities}
              />
            )}
          </div>
          <ControlPanel />
        </div>
      </div>
    )
  }
};

ReactDOM.render(<App />, document.getElementById('app'));

export default App;
