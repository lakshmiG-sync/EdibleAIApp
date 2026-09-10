import React, {useState, useRef} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, TextInput,Modal,Pressable} from 'react-native';
import {router, Stack} from 'expo-router';
export default function SignInScreen(){
    const[email,setEmail]=useState('');
    const[password, setPassword]= useState('');

    //bottom sheet overlay state
    const[modalVisible, setModalVisible]=useState(false);
    const[sheetStep,setSheetStep]=useState<1|2|3>(1);

    //Forgot Password flow
    const[resetEmail, setResetEmail]= useState('');
    const[otp, setOtp]=useState(['','','','']);
    const[newPassword, setNewPassword]=useState('');
    const[confirmPassword,setConfirmPassword]=useState('');

    //Refs for auto-focus of OTP box
    const otpRefs1=useRef<TextInput>(null);
    const otpRefs2=useRef<TextInput>(null);
    const otpRefs3=useRef<TextInput>(null);
    const otpRefs4=useRef<TextInput>(null);

    const handleOtpChange =(text: string, index: number)=>{
        const updated=[...otp];
        updated[index]=text;
        setOtp(updated);
        if(text.length===1){
            if(index===0) otpRefs2.current?.focus();
            if (index===1) otpRefs3.current?.focus();
            if(index===2) otpRefs4.current?.focus();
        }
    };

    const closeSheet=()=>{
        setModalVisible(false);
        setSheetStep(1);
        setOtp(['','','','']);
        setNewPassword('');
        setConfirmPassword('');
    };

    return(
        <View style={styles.container}>
                    {/*1. Back button*/}
                    <Stack.Screen options={{ headerShown: false }} />
                      <TouchableOpacity style={styles.backButton}
                    onPress={()=>router.back()}>
                        <Text style={styles.backText}>←</Text>
                    </TouchableOpacity>
        
                    {/*2. Header Titles*/}
                    <View style={styles.header}>
                        <Text style={styles.title}>Welcome Back!</Text>
                        <Text style={styles.subtitle}>
                            Sign in to keep tracking your fresh food.
                        </Text>
                    </View> 
        
                    {/*3. Form Inputs */}
                    <View style={styles.form}>
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
                            placeholder="Enter your password"
                            placeholderTextColor="#94A3B8"
                            secureTextEntry
                            value={password}
                            onChangeText={setPassword}
                        />

                        <TouchableOpacity style={styles.forgotBtn} onPress={()=>setModalVisible(true)}>
                            <Text style={styles.forgotText}>Forgot Password?</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.primaryButton} activeOpacity={0.8}
                        onPress={()=>router.replace('/(tabs)')}>
                        <Text style={styles.buttonText}>Sign In</Text>
                        </TouchableOpacity>
                    </View>
                    <Modal visible={modalVisible} transparent animationType='slide' onRequestClose={closeSheet}>
                        {/*Modal Overlay*/}
                        <View style={styles.modolOverlay}> 
                            <Pressable style={styles.backdropClickArea} onPress={closeSheet}/>
                            {/*Sheet container */}
                            <View style={styles.sheetContainer}>
                                {/*Top drag handle */}
                                <View style={styles.dragHandle}/>
                                {/* Step 1: Forgot Password(email) */}
                                {sheetStep===1 && (
                                <View>
                                    <Text style={styles.sheetTitle}>Forgot Password</Text>
                                    <Text style={styles.sheetSubtitle}>
                                        Enter your email for the verification process. We'll send OTP to your email!
                                    </Text>
                                    <Text style={styles.sheetLabel}> Email </Text>
                                    <TextInput style={styles.input} placeholder='Enter your email' placeholderTextColor="#94A3BB"
                                    keyboardType='email-address' autoCapitalize='none' value={resetEmail} onChangeText={setResetEmail}/>
                                    <TouchableOpacity style={styles.sheetActionBtn} onPress={()=>setSheetStep(2)}>
                                        <Text style={styles.sheetActionText}>Continue</Text>
                                    </TouchableOpacity>
                                </View>
                                )}

                                {/*Step2: Otp Verification */}
                                {sheetStep===2&&(
                                    <View> 
                                        <Text style={styles.sheetTitle}>Enter 4 digits Code</Text>
                                        <Text style={styles.sheetSubtitle}>Enter the 4 digits code that you received on your email</Text>           
                                        <View style={styles.otpRow}>
                                            <TextInput
                                                ref={otpRefs1}
                                                style={styles.otpBox}
                                                keyboardType="number-pad"
                                                maxLength={1}
                                                value={otp[0]}
                                                onChangeText={(t) => handleOtpChange(t, 0)}
                                            />
                                            <TextInput
                                                ref={otpRefs2}
                                                style={styles.otpBox}
                                                keyboardType="number-pad"
                                                maxLength={1}
                                                value={otp[1]}
                                                onChangeText={(t) => handleOtpChange(t, 1)}
                                            />
                                            <TextInput
                                                ref={otpRefs3}
                                                style={styles.otpBox}
                                                keyboardType="number-pad"
                                                maxLength={1}
                                                value={otp[2]}
                                                onChangeText={(t) => handleOtpChange(t, 2)}
                                            />
                                            <TextInput
                                                ref={otpRefs4}
                                                style={styles.otpBox}
                                                keyboardType="number-pad"
                                                maxLength={1}
                                                value={otp[3]}
                                                onChangeText={(t) => handleOtpChange(t, 3)}
                                            />
                                        </View>  
                                        <TouchableOpacity style={styles.sheetActionBtn} onPress={()=>setSheetStep(3)}>
                                            <Text style={styles.sheetActionText}>Continue</Text>
                                        </TouchableOpacity>                                  
                                    </View>
                                )}

                                {sheetStep===3 &&(
                                    <View>
                                        <Text style={styles.sheetTitle}>Reset your password</Text>
                                        <Text style={styles.sheetSubtitle}>
                                            Set the new password for your account and login again.
                                        </Text>

                                        <Text style={styles.sheetLabel}>New Password</Text>
                                        <TextInput style={styles.input}placeholder='Enter new password' placeholderTextColor="#94A3B8" 
                                        secureTextEntry
                                        value={newPassword} onChangeText={setNewPassword}/>

                                        <Text style={styles.sheetLabel}>Confirm Password</Text>
                                        <TextInput style={styles.input} placeholder='Confirm new Password' placeholderTextColor="#94A3B8"
                                        secureTextEntry value={confirmPassword} onChangeText={setConfirmPassword}/>

                                        <TouchableOpacity style={styles.sheetActionBtn} onPress={closeSheet}>
                                            <Text style={styles.sheetActionText}>Reset</Text>
                                        </TouchableOpacity>
                                    </View>
                                )}
                            </View>
                        </View>
                    </Modal>
                    {/*3. Footer */}
                    <View style={styles.footerRow}>
                        <Text style={styles.footerText}>Don't you have an account? </Text>
                        <TouchableOpacity onPress={()=> router.push('/signup')}>
                            <Text style={styles.footerLink}>Sign Up</Text>
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
            header: {
                marginBottom:20,
                flexDirection:'column',
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
            forgotBtn:{
                alignSelf: 'flex-end',
                marginTop: 10,
                marginBottom: 8,
            },
            forgotText:{
                fontSize: 12,
                fontWeight: '600',
                color: '#114925',
            },
            modolOverlay:{
                flex:1,
                backgroundColor:'rgba(0,0,0,0.45)',
                justifyContent:'flex-end',
            },
            backdropClickArea:{
                flex:1,
            },
            sheetContainer:{
                backgroundColor:'#FFFFFF',
                borderTopLeftRadius: 36,
                borderTopRightRadius:36,
                paddingHorizontal: 28,
                paddingTop: 12,
                paddingBottom: 36,
                shadowColor:'#000',
                shadowOffset:{width: 0, height: -4},
                shadowOpacity: 0.1,
                shadowRadius: 10,
            },
            dragHandle:{
                width:44,
                height: 4,
                backgroundColor:'#94A3B8',
                borderRadius: 2,
                alignSelf:'center',
                marginBottom: 20,
            },
            sheetTitle:{
                fontSize:20,
                fontWeight: '800',
                color:'#114925',
                marginBottom:16,
            },
            sheetSubtitle:{
                fontSize: 12,
                color:'#114925',
                lineHeight: 18,
                marginBottom: 16,
            },
            sheetLabel:{
                fontSize: 12,
                fontWeight: '600',
                color: '#334155',
                marginBottom:6,
                marginTop:10,
            },
            sheetActionBtn:{
                backgroundColor:'#114925',
                paddingVertical: 14,
                borderRadius: 28,
                alignItems:'center',
                marginTop:22,
            },
            sheetActionText:{
                fontSize: 14,
                fontWeight:'700',
                color: '#fcfcfd'
            },
            otpRow:{
                flexDirection:'row',
                justifyContent:'space-between',
                marginVertical: 14,
                paddingHorizontal: 12,
            },
            otpBox:{
                width: 54,
                height: 54,
                borderWidth: 1.5,
                borderColor:'#CBD5E1',
                borderRadius: 14,
                textAlign:'center',
                fontSize: 20,
                fontWeight: '700',
                color: '#0F172A',
                backgroundColor:'#FAFAFA',
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
