import React, {PropsWithChildren} from 'react';
import {Modal, StyleSheet, Text, View, ViewStyle} from 'react-native';
import {ButtonBase} from "./ButtonBase";
import {FontAwesomeIcon} from "@fortawesome/react-native-fontawesome";
import {Theme} from "../../styles/theme";
import {faClose} from "@fortawesome/free-solid-svg-icons";
import {Typography} from "../../styles/typography";

interface PropTypes{
    open: boolean;
    onClose: () => void;
    title?: string;
    containerStyle?: ViewStyle
};

export const UIModal: React.FC<PropsWithChildren<PropTypes>> = (props) => {
    return (
        <Modal animationType="fade" transparent={true} visible={props.open}>
            <View style={styles.modalBackDrop}>
                <View style={[styles.modalContainer,(props.containerStyle?props.containerStyle:{})]}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>{props.title}</Text>
                        <ButtonBase onClick={() => props.onClose()}><FontAwesomeIcon size={30}
                                                                                     color={Theme.colors.Gray500}
                                                                                     icon={faClose}/></ButtonBase>
                    </View>
                    {props.children}
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalBackDrop: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        backgroundColor: Theme.colors.Primary600,
        borderRadius: 10,
        padding: 15,
        elevation: 5,
        minWidth:200
    },
    modalTitle: Typography.create({
        fontSize: 21,
        color:Theme.colors.Text.Light,
        marginRight:5
    }),
    closeButton: {
        alignSelf: 'flex-end',
        padding: 10,
    },
    closeButtonText: {
        color: '#007aff',
        fontWeight: 'bold',
    },
    modalHeader: {
        flexDirection:"row",
        justifyContent:"space-between",
        alignContent:"center",
        marginBottom:20
    }
});
