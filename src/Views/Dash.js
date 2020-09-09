import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import DaysCompleted from "../Components/DaysCompleted";
import CheckinComment from "../Components/CheckinComment";



function Dash(props) {

  const {checkins, readCheckins} = props;
  const [allCheckins, setAllCheckins] = useState([]);
 
  useEffect(() => {

    const getAllCheckins =  async () => {
      console.log(process.env.NODE_ENV);
      const aCheckins =  await readCheckins();
      let checkins = [];
      aCheckins.forEach(c => checkins.push(c.data()));
      debugger;
      setAllCheckins(checkins)
    }

    getAllCheckins();
  
  
  
  }, [])

 



  return (
    <div>
      

      <DaysCompleted days={15} checkins={checkins}>
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


