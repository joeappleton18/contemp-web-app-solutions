import React, { useState, useEffect } from "react";
import styled from "styled-components";
import drinkIcon from "../assets/drink-icon.svg";
import foodIcon from "../assets/food-icon.svg";
import Button from "../Components/Button";
import ErrorLabel from "../Components/ErrorLabel";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const StyledHeading = styled.h4`
  text-align: center;
  margin-top: 2%;
  color: ${({ theme }) => theme.colors.purple};
`;

const StyledLabel = styled.label`
  text-align: left;
  margin-top: 5%;
`;

const StyledForm = styled.form`
  display: grid;
  justify-content: center;
  text-align: left;
`;
const StyledCheckinP = styled.p`
  display: flex;
  font-size: 13px;
  justify-content: space-around;
  margin-top: 5%;
  input:nth-child(1) {
    background: green;
  }

  input:checked {
    background-color: #a77e2d !important;
    color: #ffffff !important;
  }
`;

const StyledFoodDrinkArea = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 10px;
`;

const StyledSelect = styled.select`
  padding-left: 25%;
  text-indent: 40%;
  background: white;
  width: 135px;
  height: 44px;
  font-size: 14px;
  color: rgba(31, 32, 65, 0.75);
`;

const StyledIcon = styled.img`
  margin-right: -10px;
  z-index: 2000;
  display: relative;
  position: absolute;
  margin-top: 10px;
  margin-left: 6px;
`;

const StyledCheckinTitle = styled.div`
  display: flex;
  justify-content: space-between;
  p {
    font-size: 12px;
    color: ${({ theme, error }) => error ? 'red' : theme.colors.darkShade[50]};
    margin-top: 5%;

  }
`;


const CheckinForm = props => {

  const maxCommentLength  = 145;
  const [total, setTotal] = useState(0);
  const [remainingCommentCount, setRemainingCommentCount] = useState(maxCommentLength);

  const checkinFormSchema = yup.object().shape({
    exercise: yup.string().required("you must tell us if you exercised"),
    veg: yup.string().required("you must tell us if ate your veg"),
    water: yup.string().required("you must tell us if you drank 2l of water"),
    diet: yup.string().required("you must tell us if you kept to your diet")
  });


  const { register, handleSubmit, errors, watch } = useForm({
    validationSchema: checkinFormSchema,
    defaultValues: {
      exercise: "",
      veg: "",
      water: "",
      diet: "",
      comment: "",
      drinkPenalty: "",
      dietPenalty: ""  
    }
  });

  
  let checkinScore = {
    exercise: "",
    veg: "",
    water: "",
    diet: ""
  };

  const diet = watch("diet");
  const formValues = watch();
  const comment = watch("comment");

  useEffect(() => {
    setRemainingCommentCount( maxCommentLength - comment.length)
  }, [comment])
  

  useEffect(() => {
    checkinScore.exercise = !formValues.exercise
      ? 0
      : parseInt(formValues.exercise);
    checkinScore.veg = !formValues.veg ? 0 : parseInt(formValues.veg);
    checkinScore.water = !formValues.water ? 0 : parseInt(formValues.water);
    checkinScore.diet = formValues.diet && parseInt(formValues.diet);
    if (formValues.diet === "0") {
        checkinScore.diet = 10 - (parseInt(formValues.dietPenalty) + parseInt(formValues.drinkPenalty))
    }

    setTotal(
      checkinScore.exercise +
        checkinScore.veg +
        checkinScore.water +
        checkinScore.diet
    );
  }, [formValues]);

  const onSubmit = data => {
      console.log({...data,...checkinScore, ...{total}})
  };

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <StyledLabel>Did you exercise for at least 20 mins (5)?</StyledLabel>
      <StyledCheckinP>
        {" "}
        <span>
          <input type="radio" value="5" name="exercise" ref={register} /> Yes{" "}
        </span>{" "}
        <span>
          <input type="radio" value="0" name="exercise" ref={register} /> No{" "}
        </span>{" "}
      </StyledCheckinP>
      <ErrorLabel> {errors.exercise && errors.exercise.message} </ErrorLabel>
      <StyledLabel>Did you eat 5 portions of veg (3)?</StyledLabel>
      <StyledCheckinP>
        <span>
          <input type="radio" value="3" name="veg" ref={register} /> Yes
        </span>
        <span>
          <input type="radio" value="0" name="veg" ref={register} /> No
        </span>
      </StyledCheckinP>
      <ErrorLabel> {errors.veg && errors.veg.message} </ErrorLabel>
      <StyledLabel>Did you drink 2l of water (2)?</StyledLabel>
      <StyledCheckinP>
        <span>
          <input type="radio" value="2" name="water" ref={register} /> Yes
        </span>
        <span>
          <input type="radio" value="0" name="water" ref={register} /> No
        </span>
      </StyledCheckinP>
      <ErrorLabel> {errors.water && errors.water.message} </ErrorLabel>

      <StyledLabel>Was Your Diet Perfect (10)?</StyledLabel>
      <StyledCheckinP>
        <span>
          <input type="radio" value="10" name="diet" ref={register} /> Yes
        </span>
        <span>
          <input type="radio" value="0" name="diet" ref={register} /> No
        </span>
      </StyledCheckinP>
      <ErrorLabel> {errors.diet && errors.diet.message} </ErrorLabel>

      {diet === "0" && (
        <StyledFoodDrinkArea>
          <StyledLabel>Drinks</StyledLabel>
          <StyledLabel>Food</StyledLabel>
          <div>
            <StyledIcon src={drinkIcon} />
            <StyledSelect name="drinkPenalty" ref={register}>
              <option value="0"> 0 </option>
              <option value="1"> 1 </option>
              <option value="2"> 2 </option>
              <option value="3"> 3 </option>
              <option value="4"> 4 </option>
              <option value="4"> 5 </option>
            </StyledSelect>
          </div>
          <div>
            <StyledIcon src={foodIcon} />
            <StyledSelect name="dietPenalty" ref={register}>
              <option value="0"> 0 </option>
              <option value="1"> 1 </option>
              <option value="2"> 2 </option>
              <option value="3"> 3 </option>
              <option value="4"> 4 </option>
              <option value="4"> 5 </option>
            </StyledSelect>
          </div>
        </StyledFoodDrinkArea>
      )}

      <StyledCheckinTitle  error={remainingCommentCount < 0}> 
        <StyledLabel>Comments</StyledLabel> <p>{remainingCommentCount}</p>{" "}
      </StyledCheckinTitle>
      <textarea rows="4" cols="40" name="comment" ref={register}></textarea>
      <StyledHeading> Total: {total} points </StyledHeading>
      <Button text="CHECKIN"> </Button>
    </StyledForm>
  );
};

export default CheckinForm;
