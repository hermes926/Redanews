import Header from "../Components/Header";
import Body from "./Body";
import Home from "./Home";
import styled from "styled-components";
import Paper from "@material-ui/core/Paper";

const Wrapper = styled.div`
  margin: auto;
  width: 100%;
  height: 90vh;
  display: flex;
  flex-direction: column;
`;

const StyledPaper = styled(Paper)`
  padding: 2em;
`;

function App() {
  const isHome = true;
  return (
    <>
      <Header />
      <Wrapper>{isHome ? <Home /> : <Body />}</Wrapper>
    </>
  );
}

export default App;
