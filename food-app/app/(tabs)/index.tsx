import React from 'react';
import {View,Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {router} from 'expo-router';

export default function WelcomeScreen(){
  return(
    <View style={styles.container}>
      {/*1. Hero Image section */}
      <View style={styles.heroBox}>
        <Image source={ require('../../assets/images/hero.png')}
          style={styles.heroImage}
          resizeMode="cover"
          />
      </View>

      {/*2.Text Content */}
      <View style={styles.bottomContent}>
        <Text style={styles.title}> Welcome</Text>
        <Text style={styles.subtitle}>
          Know what's on your plate, before it's too late.
        </Text>

        <TouchableOpacity style={styles.primaryButton}
        activeOpacity={0.8}
        onPress={()=> router.push('/signup')}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <View style={styles.footerRow}>
          <Text style={styles.footerText}> Already have an account? </Text>
          <TouchableOpacity onPress={()=>router.push('/signin')}>
            <Text style={styles.footerLink}>Try it</Text>
          </TouchableOpacity>
        </View>

      </View>
    </View>
  );
}

const styles= StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#ffffff',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heroBox:{
    width: '100%',
    height: '65%',
    borderBottomLeftRadius:170,
    borderBottomRightRadius:170,
    overflow: 'hidden',
    shadowColor: '#1B5E20',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.8,
    shadowRadius: 8,
  },
  heroImage: {
    width: '100%',
    height: '100%'
  },
  bottomContent:{
    alignItems:'center',
    paddingHorizontal: 32,
    paddingBottom: 40,
  },
  title:{
    fontSize: 32,
    fontWeight: '800',
    color: '#1B5E20',
    marginBottom: 8,
  },
  subtitle:{
    fontSize: 14,
    color: '#082417',
    textAlign: 'center',
    lineHeight:20,
    marginBottom: 28,
  },
  primaryButton:{
    width: '50%',
    backgroundColor:'#1B5E20',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    shadowColor: '#1B5E20',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.8,
    shadowRadius: 8,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  footerRow:{
    flexDirection: 'row',
    marginTop: 18,
    alignItems: 'center',
  },
  footerText:{
    fontSize: 13,
    color: '#6d7075',
  },
  footerLink:{
    fontSize:13,
    fontWeight: '500',
    color: '#1c7949',
    textDecorationLine:'underline',
  },
});