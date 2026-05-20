import { use, useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { deleteActivity } from "../api/activities";

export default function ActivityList({ activities, syncActivities }) {
  const { token } = useAuth();

  const [error, setError] = useState(null);
  const [errorActivityId, setErrorActivityId] = useState(-1);

  use;

  const tryDeleteActivity = async (id) => {
    setError(null);
    setErrorActivityId(-1);

    try {
      await deleteActivity(token, id);
      syncActivities();
    } catch (e) {
      setError(e.message);
      setErrorActivityId(id);
    }
  };

  return (
    <ul>
      {activities.map((activity) => (
        <li key={activity.id}>
          <span>{activity.name}</span>
          {token && (
            <button onClick={() => tryDeleteActivity(activity.id)}>
              Delete
            </button>
          )}
          {error && errorActivityId === activity.id && (
            <p role="alert">{error}</p>
          )}
        </li>
      ))}
    </ul>
  );
}
