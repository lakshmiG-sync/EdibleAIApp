import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView} from 'react-native';
import {router, Stack} from 'expo-router';
export default function SignUpScreen(){  
    const [fullName, setFullName]= useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword]=useState('');
    return(
        <View style={styles.container}>
            {/*1. Back button*/}
            <Stack.Screen options={{ headerShown: false }} />
            <TouchableOpacity style={styles.backButton}
            onPress={()=>router.back()}>
                <Text style={styles.backText}>←</Text>
            </TouchableOpacity>
            <View style={styles.avatarContainer}>
                <TouchableOpacity style={styles.avatarBox}>
                <Text style={styles.cameraIcon}>📷</Text>
                <Text style={styles.avatarText}>Add Photo</Text>
                </TouchableOpacity>
            </View>
            {/*2. Header Titles*/}
            <View style={styles.header}>
                <Text style={styles.title}>Create Account</Text>
                <Text style={styles.subtitle}>
                    Smart shelf-Life tracking for healthier eating.
                </Text>
            </View> 

            {/*3. Form Inputs */}
            <View style={styles.form}>
                <Text style={styles.label}>Full Name</Text>
                <TextInput 
                    style={styles.input}
                    placeholder="Enter your name"
                    placeholderTextColor="#94A3B8"
                    value={fullName}
                    onChangeText={setFullName}
                />

                <Text style={styles.label}>Email</Text>
                <TextInput 
                    style={styles.input}
                    placeholder="abc@example.com"
                    placeholderTextColor="#94A3B8"
                    keyboardType="email-address"
                    autoCapitalize='none'
                    value={email}
                    onChangeText={setEmail}
                />

                <Text style={styles.label}>Password</Text>
                <TextInput 
                    style={styles.input}
                    placeholder="At least 6 characters"
                    placeholderTextColor="#94A3B8"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
                <TouchableOpacity style={styles.primaryButton} activeOpacity={0.8}>
                <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
            </View>
            {/*3. Footer */}
            <View style={styles.footerRow}>
                <Text style={styles.footerText}>Already have an account? </Text>
                <TouchableOpacity onPress={()=> router.push('/signin')}>
                    <Text style={styles.footerLink}>Sign in</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flexGrow:1,
        backgroundColor:'#ffffff',
        paddingHorizontal: 28,
        paddingTop: 40,
        paddingBottom: 30,
    },
    backButton:{
        marginBottom: 20,
        alignSelf: 'flex-start',
    },
    backText:{
        fontSize: 30,
        color: '#114925',
        fontWeight: '700',
    },
    avatarContainer:{
        alignItems:'center',
        marginBottom:16,
    },
    cameraIcon:{
        fontSize:22,
        marginBottom:2,
    },
    avatarText:{
        fontSize: 11,
        fontWeight: '600',
        color:'#64748B',
    },
    avatarBox:{
        width: 84,
        height: 84,
        borderRadius: 42,
        backgroundColor: '#F1F5F9',
        borderWidth: 1.5,
        borderColor:'#CBD5E1',
        borderStyle:'dashed',
        justifyContent:'center',
        alignItems: 'center',
    },
    header: {
        marginBottom:20,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
    },
    title:{
        fontSize: 28,
        fontWeight: '800',
        color: '#114925',
        marginBottom: 6,
    },
    subtitle: {
        fontSize: 13,
        color: '#114925',
        lineHeight: 18,
    },
    form:{
        marginTop:4,
    },
    label:{
        fontSize: 12,
        fontWeight:'600',
        color: '#334155',
        marginBottom: 6,
        marginTop: 14,
    },
    input:{
        borderWidth: 1,
        borderColor: '#E2E8F0',
        borderRadius: 14,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 14,
        color: '#0F172A',
        backgroundColor: '#FAFAFA',
    },
    primaryButton:{
        backgroundColor:"#114925",
        paddingVertical: 15,
        borderRadius: 30,
        alignItems: 'center',
        marginTop: 26,
    },
    buttonText:{
        fontSize: 15,
        fontWeight: '700',
        color: '#FFFFFF',
    },
    footerRow:{
        flexDirection:'row',
        justifyContent:'center',
        marginTop: 24,
    },
    footerText:{
        fontSize: 13,
        color: '#94A3B8',
    },
    footerLink:{
        fontSize: 13,
        fontWeight: '500',
        color:'#114925',
        textDecorationLine:'underline',
    }
});