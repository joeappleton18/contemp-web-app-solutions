import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

function useAuth(fStore) {
  const ref = fStore().collection('checkins');

  const createCheckin  = checkin => ref.add(checkin);

  const readCheckins = () => ref.get();


  return {createCheckin, readCheckins}

}
export default useAuth;
