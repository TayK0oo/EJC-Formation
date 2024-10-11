import React, { useEffect, useState } from 'react';
import UserSpaceController from '../controllers/UserSpaceController';

interface UserSpaceData {
  formations: number[];
  progress: { [formationId: number]: number };
}

const UserSpace: React.FC = () => {
  const [userSpace, setUserSpace] = useState<UserSpaceData | null>(null);

  useEffect(() => {
    const fetchUserSpace = async () => {
      const data = await UserSpaceController.getUserSpace();
      setUserSpace(data);
    };

    fetchUserSpace();
  }, []);

  if (!userSpace) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Mes Formations</h2>
      {userSpace.formations.map(formationId => (
        <div key={formationId}>
          <h3>Formation {formationId}</h3>
          <p>Progression : {userSpace.progress[formationId]}%</p>
        </div>
      ))}
    </div>
  );
};

export default UserSpace;