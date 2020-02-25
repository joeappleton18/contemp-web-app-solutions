import React, { useState } from "react";
import { useForm } from 'react-hook-form'
import PropTypes from "prop-types";
import Button from "../Components/Button";
import styled from "styled-components";
import { SocialIcon } from "react-social-icons";


function LoginForm(props) {
  
  const {buttonText} = props;

  const StyledHeading = styled.h2`
    text-align: center;
    margin-top: 2%;
    color: ${({ theme }) => theme.colors.purple};
  `;

  const StyledSocialIconArea = styled.div`
    display: flex;
    justify-content: space-around;
  `;

  return (
    <React.Fragment>
      <StyledSocialIconArea>
        <SocialIcon network="facebook" />
        <SocialIcon network="google" />
        <SocialIcon network="twitter" />
      </StyledSocialIconArea>
      <StyledHeading> OR </StyledHeading>
  

        <Button  text="Email" />   
     

        <form>
          <p>
            <label> Email </label>
          </p>
          <p>
            <input type="text" name="email" />
          </p>
          <p>
            <label> Password </label>
          </p>
          <p>
            <input type="password" name="password" />
          </p>
          <Button  text={buttonText} />  
        </form>
      
    </React.Fragment>
  );
}

LoginForm.propTypes = {
  buttonText: PropTypes.string
};

LoginForm.defaultProps = {
  buttonText: "JOIN"
};

export default LoginForm;
