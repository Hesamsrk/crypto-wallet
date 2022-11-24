import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import styled from "styled-components/native";

interface PropTypes{
    level:number
}


export const Grid = ({level}:PropTypes) => {
    let items = Array(level*level)
    return (
        <Container>
            <FlatList
                data={items}
                renderItem={() => (
                    <Box/>
                )}
                //Setting the number of column
                numColumns={level}
                keyExtractor={(item, index) => `${index}`}
            />
        </Container>
    );
};


const Container = styled.SafeAreaView`
  width: 90%;
  height: 90%;
  background: white;
`

const Box = styled.View`
  height: 50px;
  width: 50px;
  background: transparent;
  border: 1px black solid;
`