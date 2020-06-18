import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  max-width: 800px;
  margin: 30px auto;

  ul {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  }
`;

export const Card = styled.li`
  width: 150px;
  height: 150px;
  margin: 15px;

  border: 2px solid #eee;

  display: flex;
  justify-content: center;
  align-items: center;

  a {
    color: red;
    text-decoration: none;
  }
`;
