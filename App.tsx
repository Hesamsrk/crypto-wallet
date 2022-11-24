import styled from 'styled-components/native'
import {useState} from "react";
import {Cam} from "./src/modules/privateKeyGenerator/Cam";
import {UIButton} from "./src/components/UI/UIButton";
import {Grid} from "./src/modules/privateKeyGenerator/Grid";

const App = () => {
    const [open, setOpen] = useState<boolean>(false)

    return (
        <Container>
            {/*<Grid level={4}/>*/}
            {open && <Cam/>}
            <UIButton bgColor={"yellow"}
                      onClick={() => setOpen(open => !open)}>{open ? "Go Back" : "Create Private Key"}</UIButton>
        </Container>
    );
}
const Container = styled.View`
  background: black;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export default App
