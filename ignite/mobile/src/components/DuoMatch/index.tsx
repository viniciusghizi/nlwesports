
import { View, Modal, ModalProps, Text, TouchableOpacity, Alert, ActivityIndicatorBase, ActivityIndicator  } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';
import {CheckCircle} from 'phosphor-react-native';
import * as Clipboard from 'expo-clipboard';

import { styles } from './styles';
import { THEME } from '../../theme';
import { Headling } from '../Headling';
import React, { useState } from 'react';


interface Props extends ModalProps{
    discord:string; 
    onClose:() => void;
}

export function DuoMatch({discord, onClose, ...rest}: Props) {

    const [isCopping, setIsCopping] = useState(false);

    async function handleCopyDiscordToClipboard(){
        setIsCopping(true);
        await Clipboard.setStringAsync(discord);

        Alert.alert('Discord Copiado!', 'Usuário ${discord} copiado para a área de transferência, entre em contato e BORA DE PLAYY')
        setIsCopping(false);
    }
  return (
    <Modal
        animationType='fade'
        transparent
        statusBarTranslucent
        >
    <View style={styles.container}>
        <View style={styles.content}>
            <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
                
                <MaterialIcons
                    name='close'
                    size={20}
                    color={THEME.COLORS.CAPTION_500} 
                />

                <CheckCircle 
                    size={64}
                    color={THEME.COLORS.SUCCESS}
                    weight="bold"
                    />
                <Headling
                    title="Let's Play"
                    subtitle='Agora é só começar a jogar!'
                    style={{alignItems:'center', marginTop:24}}
                    />
                <Text style={styles.label}>
                Adicione ao seu Discord
                </Text>
                <TouchableOpacity
                    style={styles.discordButton}
                    onPress={handleCopyDiscordToClipboard}
                    disabled={isCopping}
                    >
                    <Text style={styles.discord}>
                        {isCopping? <ActivityIndicator color={THEME.COLORS.PRIMARY}/> : discord}
                    </Text>
                </TouchableOpacity>
            </TouchableOpacity>
            
        </View>
    </View>
    </Modal>
  );
}