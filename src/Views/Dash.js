import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import DaysCompleted from "../Components/DaysCompleted";
import CheckinComment from "../Components/CheckinComment";
import * as dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';


function Dash(props) {

  const {checkins, readCheckins,readChallenges} = props;
  
  const [allCheckins, setAllCheckins] = useState([]);
  const [daysComplete, setDaysComplete] = useState(0);
  const [percentageComplete, setPercentageComplete] = useState(0);
 
  useEffect(() => {

    const getAllCheckins =  async () => {
      const aCheckins =  await readCheckins();
      let checkins = [];
      aCheckins.forEach(c => checkins.push(c.data()));
      setAllCheckins(checkins)
    }

    const getAllChallenges = async () => {
      const aChallenges = await readChallenges();
      let challenges = [];
      aChallenges.forEach(c => challenges.push(c.data()));
      // using the daysjs libary to work out the days to the end of the challenge
      const now =  dayjs();
      const start = dayjs(challenges[0].start.toDate());
      const end = dayjs(challenges[0].end.toDate());
      const totalDays = end.diff(start, 'day');
      const daysCompleted = now.diff(start, 'day');
      const percentageComplete = (parseInt(daysCompleted) / parseInt(totalDays)) * 100;

      setDaysComplete(daysCompleted);
      setPercentageComplete(Math.round(percentageComplete));  
 
      }

    getAllCheckins();
    getAllChallenges();
  
  
  
  }, [])

 



  return (
    <div>
      

      <DaysCompleted days={daysComplete} percentageComplete={percentageComplete}  checkins={[]}>
        {" "}
      </DaysCompleted>
      
      {
        allCheckins.map( (c) => <CheckinComment  checkin={c}/>)
      }
      

     
    </div>
  );
}

Dash.propTypes = {
    checkins: PropTypes.array.isRequired,
    readCheckins: PropTypes.object.isRequired
};

export default Dash;


