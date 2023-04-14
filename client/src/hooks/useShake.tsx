import React, { useRef, useCallback } from 'react';
import {Text, View, StyleSheet, Animated, ViewProps} from 'react-native';


export const useShake = ()=>{
    const anim = useRef(new Animated.Value(0));

    const shake = useCallback(() => {
        // makes the sequence loop
        Animated.loop(
            // runs the animation array in sequence
            Animated.sequence([
                // shift element to the left by 2 units
                Animated.timing(anim.current, {
                    toValue: -2,
                    duration: 50,
                    useNativeDriver:true
                }),
                // shift element to the right by 2 units
                Animated.timing(anim.current, {
                    toValue: 2,
                    duration: 50,
                    useNativeDriver:true
                }),
                // bring the element back to its original position
                Animated.timing(anim.current, {
                    toValue: 0,
                    duration: 50,
                    useNativeDriver:true
                }),
            ]),
            // loops the above animation config 2 times
            { iterations: 2 }
        ).start();
    }, []);

    const ShakeContainer = (props:ViewProps) => <View style={props.style}>
    <Animated.View style={[{ transform: [{ translateX: anim.current }] }]}>
        {props.children}
    </Animated.View>
    </View>

    return {ShakeContainer,shake}
}

