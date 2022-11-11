/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';

function TempLogin({
  setUid,
}: {
  setUid: React.Dispatch<React.SetStateAction<number | undefined>>;
}) {
  const [uidInput, setUidInput] = useState<undefined | number>(undefined);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setUid(uidInput);
      }}
    >
      <input type="number" onChange={(e) => setUidInput(Number(e.target.value))} value={uidInput} placeholder="id" />
      <button type="submit">login</button>
    </form>
  );
}

export default TempLogin;
