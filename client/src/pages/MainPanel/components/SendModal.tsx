import React, {PropsWithChildren} from 'react';
import {StyleSheet} from 'react-native';
import {UIModal} from "../../../components/UI/UIModal";


interface PropTypes{
    onClose:()=>void
    open:boolean
};

export const SendModal: React.FC<PropsWithChildren<PropTypes>> = (props) => {
    return <UIModal title={"Send Assets"} onClose={props.onClose} open={props.open}>

    </UIModal>
};

const styles = StyleSheet.create({

});
