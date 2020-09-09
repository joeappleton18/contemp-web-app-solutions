import React from "react";
import moment from "moment";
import PropTypes from "prop-types";
import Tile from "./Tile";
import styled from "styled-components";
import avatarLarge from "../assets/avatar_large.png";
import avatarSmall from "../assets/avatar_small.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import Histogram from "./Histogram";

function LikeButton(props) {
  const StyledDiv = styled.div`
    border-radius: 11px;
    border: 1px solid ${({ theme }) => theme.colors.purple};
    width: 40px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${({ theme }) => theme.colors.purple};
  `;

  return (
    <StyledDiv>
      <h6>
        <FontAwesomeIcon style={{ fontSize: "12px" }} icon={faHeart} /> 12{" "}
      </h6>
    </StyledDiv>
  );
}

const StyledDetailsArea = styled.div`
    display: grid;
    grid-template-columns: 0.2fr 3fr;
    align-items: center;
    textarea {
        border-radius: 4px;
        border: 1px solid ${({ theme }) => theme.colors.darkShade[25]};
    }`;


    
  const StyledSpan = styled.span`
    color: ${({ theme }) => theme.colors.purple};
  `;

  const StyledPhotoArea = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
  `;

  const StyledCheckinArea = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    min-height: 190px;
  `;

  const StyledScoreArea = styled.div`
    
    display: flex;
    flex-direction: row;
    h3 {
      color: ${({ theme }) => theme.colors.purple};
    },`;

  const StyledDivider = styled.hr`
    border: 0.3px solid ${({ theme }) => theme.colors.darkShade[5]};
    width: 100%;
  `;

  const CommentArea = styled.div`
  
   border-radius: 15px;
   background-color: ${({ theme }) => theme.colors.grey};
   width: 95%;
   margin-top: 2%;
   margin-bottom: 2%;
   min-height: 80px;
   padding 3%;
   h6:nth-child(2) {
       margin-top: 5%
   },

   
  `;

function CheckinComment(props) {
  
 const {checkin} = props;

  return (
    <Tile elevation="0.06">
      <StyledDetailsArea>
        <StyledPhotoArea>
          <img
            src={avatarLarge}
            style={{ marginBottom: "-20px" }}
            alt="avatar"
          />
          <LikeButton></LikeButton>
        </StyledPhotoArea>

        <StyledCheckinArea>
          <h6>
            {" "}
            {checkin.userName} <StyledSpan> Checked In </StyledSpan>
          </h6>
          <em> {moment(checkin.time.toDate()).fromNow()} </em> <h6>{checkin.comment}</h6>
          <h6> Total</h6>
          <StyledScoreArea>
            {" "}
            <h3>{checkin.total}</h3>{" "}
            <div style={{ width: "100%", height: "90%" }}>
              <Histogram barCount={7} bars={[10, 10, 10, 10, 10, 10, 10]} />
            </div>
          </StyledScoreArea>
        </StyledCheckinArea>
      </StyledDetailsArea>
      <StyledDivider />

      <StyledDetailsArea>
        <img
          src={avatarSmall}
          style={{ marginBottom: "-20px" }}
          alt="avatar"
        />

        <CommentArea>
          <h6>
            Joe Appleton <em> 2 hours ago </em>
          </h6>

        <h6> {checkin.commet}</h6>
        </CommentArea>
      </StyledDetailsArea>

      <StyledDetailsArea>
        <img
          src={avatarSmall}
          style={{ marginBottom: "-20px" }}
          alt="avatar"
        />

        <textarea rows="4"> 


        </textarea>
       
      

      </StyledDetailsArea>
    </Tile>
  );
}

CheckinComment.propTypes = {

  checkin: PropTypes.object.isRequired

};

export default CheckinComment;
