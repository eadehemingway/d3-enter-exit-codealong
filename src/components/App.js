import React, { useEffect, useState } from "react";
import styled from "styled-components";

export function App() {
  const [inputValues, setInputValues] = useState([]);
  const svgWidth = 700;
  const svgHeight = 500;

  function draw() {}

  function addInput() {
    const newinputValues = [...inputValues, ""];
    setInputValues(newinputValues);
  }

  function removeInput() {
    const newinputValues = [...inputValues];
    newinputValues.pop();
    setInputValues(newinputValues);
  }

  function fillRandomly() {
    const newVals = inputValues.map((v) =>
      Math.floor(Math.random() * (200 - 1) + 1)
    );
    setInputValues(newVals);
  }

  function changeInput(val, i) {
    const inputs = [...inputValues];
    inputs.splice(i, 1, val);
    setInputValues(inputs);
  }

  return (
    <section>
      <ChartContainer>
        <ControlBox>
          <InputContainer>
            {inputValues.map((input, i) => (
              <InputBox
                type="text"
                key={i}
                value={input}
                onChange={(e) => changeInput(e.target.value, i)}
              />
            ))}
          </InputContainer>
          <FillButton id="fill" onClick={fillRandomly}>
            FILL RANDOMLY
          </FillButton>
        </ControlBox>
        <svg id="chart" />
      </ChartContainer>

      <ButtonContainer>
        <AddDeleteButton id="add" onClick={addInput}>
          +
        </AddDeleteButton>
        <AddDeleteButton id="exit" onClick={removeInput}>
          -
        </AddDeleteButton>
        <UpdateButton id="update" onClick={draw}>
          UPDATE
        </UpdateButton>
      </ButtonContainer>
    </section>
  );
}

const Button = styled.button`
  border: 2px solid coral;
  height: 40px;
  margin: 1rem;
  font-size: 1rem;
  background: white;
  color: coral;
  outline: none;
  &:hover {
    cursor: pointer;
    font-weight: 900;
    border: 2px solid #e65c00;
    color: #e65c00;
  }
`;

const UpdateButton = styled(Button)`
  border-radius: 8%;
  width: 100px;
`;

const AddDeleteButton = styled(Button)`
  border-radius: 50%;
  width: 40px;
`;

const FillButton = styled(Button)`
  border: 1px solid coral;
  border-radius: 8%;
  height: 20px;
  width: 100px;
  font-size: 0.5rem;
  background: white;
  color: coral;
  outline: none;
  position: absolute;
  bottom: 10px;
  left: 10px;
`;

const InputBox = styled.input`
  border: 1px solid coral;
  display: block;
  width: 30px;
  color: grey;
  margin: 20px;
  border-radius: 5%;
`;

const ButtonContainer = styled.div`
  width: 800px;
  display: flex;
  justify-content: center;
  margin: auto;
  padding-left: 100px;
`;

const InputContainer = styled.div`
  height: 500px;
  max-height: 500px;
  width: 50px;
`;

const ControlBox = styled.div`
  position: relative;
`;

const ChartContainer = styled.div`
  width: 800px;
  height: 550px;
  background-color: #f7f7f7;
  margin: 25px auto 0 auto;
  display: flex;
`;
