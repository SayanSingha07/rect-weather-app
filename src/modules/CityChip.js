import React from 'react';
import styled from 'styled-components';

// Styled components
const ChipContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 16px 0;
`;

const Chip = styled.div`
  display: flex;
  align-items: center;
  background-color: #e0e0e0;
  border-radius: 16px;
  padding: 8px 12px;
  font-size: 14px;
  color: #333;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #888;
  margin-left: 8px;
  cursor: pointer;
  font-size: 16px;
`;

const CityChip = (props) => {
    const {weatherDataSet, removeCity} = props;

    return (
        <ChipContainer>
            {weatherDataSet.map((weatherData, index) => (
                <Chip key={index}>
                    {weatherData.city}
                    <CloseButton onClick={() => removeCity(index)}>&times;</CloseButton>
                </Chip>
            ))}
        </ChipContainer>
    );
};

export default CityChip;
