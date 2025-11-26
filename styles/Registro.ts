import { StyleSheet } from 'react-native';

export const Registro = StyleSheet.create({
   container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  
  registerCard: {
    width: '100%',
    backgroundColor: '#2d2d2d',
    borderRadius: 20,
    padding: 30,
    borderWidth: 1,
    borderColor: '#404040',
    maxWidth: 400,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#f2921d',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#b0b0b0',
    textAlign: 'center',
    marginBottom: 30,
  },
  
  inputRow: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#b0b0b0',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#404040',
    borderRadius: 12,
    padding: 16,
    color: '#ffffff',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#555555',
  },
  
  
  registerButton: {
    backgroundColor: '#f2921d',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: '#1a1a1a',
    fontSize: 18,
    fontWeight: 'bold',
  },
  
  loginLink: {
    alignItems: 'center',
  },
  loginText: {
    color: '#b0b0b0',
    fontSize: 14,
  },
  loginBold: {
    color: '#f2921d',
    fontWeight: '600',
  },
  //---------------------------------
  mainContainer: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loginCard: {
    width: '100%',
    backgroundColor: '#2d2d2d',
    borderRadius: 20,
    padding: 30,
    borderWidth: 1,
    borderColor: '#404040',
    maxWidth: 400,
  },
  
  loginButton: {
    backgroundColor: '#f2921d',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    marginTop: 10,
  },
  
 //--------------------------------------

  buttonDisabled: {
    opacity: 0.6,
  },
  
  registerLink: {
    alignItems: 'center',
    marginTop: 20,
  },
  registerText: {
    color: '#b0b0b0',
    fontSize: 14,
  },
  registerBold: {
    color: '#f2921d',
    fontWeight: '600',
  },
});
