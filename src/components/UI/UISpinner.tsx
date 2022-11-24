import {Text} from "react-native";
import styled from "styled-components/native";

interface PropTypes {
    show?: boolean
}

export const UISpinner = ({show}: PropTypes) => {
    return <>{show ? <Spinner>Wait...</Spinner> : <></>}</>
}


const Spinner = styled.Text`
  color: white;
`




