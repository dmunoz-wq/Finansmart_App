import { Platform, StyleSheet } from 'react-native';

// Helper to create theme-aware styles
export const createStyles = (isDark: boolean) => {
  const bgCard = isDark ? '#1A1A1A' : '#FFFFFF';
  const bgCardSecondary = isDark ? '#2A2A2A' : '#F9FAFB';
  const textPrimary = isDark ? '#E8E8E8' : '#11181C';
  const textSecondary = isDark ? '#8A8A8A' : '#6B7280';
  const borderColor = isDark ? '#2A2A2A' : '#E5E7EB';
  const borderNeon = isDark ? '#FF6B3533' : '#FF6B35';
  const accentOrange = '#FF6B35';
  const accentOrangeDim = isDark ? '#FFAA66' : '#FF8C42';

  return {
    tabBar: { 
      height:72, 
      backgroundColor: isDark ? '#2A2A2A' : '#FFFFFF', 
      borderRadius:36, 
      flexDirection:'row' as const, 
      alignItems:'center' as const, 
      justifyContent:'space-around' as const, 
      paddingHorizontal:12, 
      marginVertical:8, 
      borderWidth:1, 
      borderColor: isDark ? '#404040' : '#E5E7EB',
      ...Platform.select({ 
        web: { 
          boxShadow: isDark ? '0 8px 20px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,107,53,0.2)' : '0 8px 20px rgba(15,23,36,0.08)'
        }, 
        default: { shadowColor: '#000', elevation: 6 } 
      }) 
    },
    tabLabel: { fontSize:12, color: accentOrange },
    balanceCard: { 
      backgroundColor: bgCard, 
      borderRadius:20, 
      padding:12, 
      marginBottom:12, 
      borderWidth:1, 
      borderColor: borderNeon, 
      ...Platform.select({ 
        web: { 
          backgroundImage: isDark ? 'linear-gradient(135deg, #2A2A2A 0%, #1A1A1A 100%)' : 'linear-gradient(135deg, #F9FAFB 0%, #FFFFFF 100%)',
          boxShadow: isDark ? 'inset 0 1px 0 rgba(255,107,53,0.3), 0 8px 20px rgba(0,0,0,0.4)' : '0 8px 20px rgba(15,23,36,0.08)'
        }, 
        default: {} 
      }) 
    },
    balanceAmount: { fontSize:26, fontWeight:'800' as const, marginBottom:6, color: accentOrangeDim },
    inOutBlock: { 
      width:'48%', 
      backgroundColor: bgCard, 
      padding:8, 
      borderRadius:12, 
      alignItems:'center' as const, 
      borderWidth:1, 
      borderColor: borderNeon, 
      ...Platform.select({ 
        web: { 
          boxShadow: isDark ? 'inset 0 1px 0 rgba(255,107,53,0.2)' : 'inset 0 1px 0 rgba(255,107,53,0.1)'
        }, 
        default: {} 
      }) 
    },
    inOutAmount: { fontWeight:'700' as const, color: accentOrangeDim },
    monthBudgetCard: { 
      backgroundColor: bgCard, 
      padding:12, 
      borderRadius:12, 
      borderWidth:1, 
      borderColor: borderNeon, 
      ...Platform.select({ 
        web: { 
          backgroundImage: isDark ? 'linear-gradient(135deg, #2A2A2A 0%, #1A1A1A 100%)' : 'linear-gradient(135deg, #F9FAFB 0%, #FFFFFF 100%)',
          boxShadow: isDark ? 'inset 0 1px 0 rgba(255,107,53,0.2)' : 'inset 0 1px 0 rgba(255,107,53,0.1)'
        }, 
        default: {} 
      }) 
    },
    budgetCard: { 
      backgroundColor: bgCard, 
      padding:12, 
      borderRadius:12, 
      flexDirection:'row' as const, 
      alignItems:'center' as const, 
      marginBottom:8, 
      borderWidth:1, 
      borderColor: borderColor 
    },
  };
};

export const styles = StyleSheet.create({
  safe: { flex:1, alignItems:'center', justifyContent:'center' },
  bgLight: { backgroundColor: '#F9FAFB' },
  bgDark: { backgroundColor: '#0A0A0A' },
  deviceMockup: { width: 380, height: 820, borderRadius: 36, overflow:'hidden', backgroundColor:'#fff', padding:16, ...Platform.select({ web: { boxShadow: '0 12px 30px rgba(0,0,0,0.3)' }, default: { shadowColor: '#000', elevation: 6 } }) },
  screenContainer: { flex:1, padding:12 },
  topRightToggle: { position:'absolute', right:18, top:18 },
  themeButton: { padding:8, backgroundColor:'#F3F4F6', borderRadius:999 },
  themeText: { fontSize:16 },
  onboardCenter: { flex:1, alignItems:'center', justifyContent:'center' },
  onboardTitle: { fontSize:22, fontWeight:'700', marginBottom:8 },
  onboardDesc: { color:'#6B7280', textAlign:'center', marginBottom:16 },
  onboardIconWrapper: { padding:20, borderRadius:20, backgroundColor:'#FFF4EF' },
  onboardFooter: { paddingBottom:12 },
  stepIndicatorRow: { flexDirection:'row', justifyContent:'center', marginBottom:12 },
  stepDot: { width:10, height:10, borderRadius:10, backgroundColor:'#E5E7EB', marginHorizontal:6 },
  stepDotActive: { backgroundColor:'#FF6B35' },
  onboardButtonsRow: { flexDirection:'row', justifyContent:'space-between', alignItems:'center' },
  ghostButton: { padding:10 },
  primaryButton: { backgroundColor:'#FF6B35', padding:12, borderRadius:14 },
  primaryButtonText: { color:'#fff', fontWeight:'700' },

  authTitle: { fontSize:28, fontWeight:'800', textAlign:'center', marginTop:24 },
  authToggleRow: { flexDirection:'row', alignSelf:'center', marginTop:24, borderRadius:12, overflow:'hidden' },
  authTab: { paddingVertical:8, paddingHorizontal:20, backgroundColor:'#F3F4F6' },
  authTabActive: { backgroundColor:'#FFEDD5' },
  authForm: { marginTop:20, paddingHorizontal:6 },
  input: { backgroundColor:'#fff', padding:12, borderRadius:12, marginVertical:8, borderWidth:1, borderColor:'#E5E7EB' },
  passwordRow: { flexDirection:'row', alignItems:'center' },
  eyeButton: { padding:8, marginLeft:8 },

  appWrapper: { flex:1, justifyContent:'flex-end' },
  appBody: { flex:1 },
  tabButton: { alignItems:'center', justifyContent:'center' },
  tabButtonActive: { transform:[{translateY:-6}] },
  tabIcon: { marginBottom:4 },

  fabWrap: { position:'absolute', left:'50%', marginLeft:-36, bottom:40 },
  fab: { width:72, height:72, borderRadius:36, backgroundColor:'#FF6B35', alignItems:'center', justifyContent:'center', ...Platform.select({ web: { boxShadow: '0 10px 28px rgba(15,23,36,0.12)' }, default: { shadowColor: '#000', elevation: 8 } }) },

  pageScroll: { paddingBottom:120 },
  headerRow: { flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginBottom:12 },
  greeting: { color:'#6B7280' },
  username: { fontSize:20, fontWeight:'700' },
  avatar: { width:48, height:48, borderRadius:24 },

  balanceCard: { backgroundColor:'#1A1A1A', borderRadius:20, padding:12, marginBottom:12, borderWidth:1, borderColor:'#FF6B3533', ...Platform.select({ web: { backgroundImage: 'linear-gradient(135deg, #2A2A2A 0%, #1A1A1A 100%)', boxShadow: 'inset 0 1px 0 rgba(255,107,53,0.3), 0 8px 20px rgba(0,0,0,0.4)' }, default: {} }) },
  balanceHeaderRow: { flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginBottom:6 },
  balanceLabel: { color:'#8A8A8A' },
  smallPill: { backgroundColor:'#FF6B35', paddingHorizontal:8, paddingVertical:4, borderRadius:10 },
  balanceAmount: { fontSize:26, fontWeight:'800', marginBottom:6, color:'#FFAA66' },
  incomeExpenseRow: { flexDirection:'row', justifyContent:'space-between' },
  inOutBlock: { width:'48%', backgroundColor:'#1A1A1A', padding:8, borderRadius:12, alignItems:'center', borderWidth:1, borderColor:'#FF6B3533', ...Platform.select({ web: { boxShadow: 'inset 0 1px 0 rgba(255,107,53,0.2)' }, default: {} }) },
  inOutText: { color:'#8A8A8A' },
  inOutAmount: { fontWeight:'700', color:'#FFAA66' },

  section: { marginVertical:8 },
  sectionTitle: { fontWeight:'700', marginBottom:8, color:'#FFAA66' },
  barChartRow: { flexDirection:'row', alignItems:'flex-end', justifyContent:'space-between', height:180, paddingHorizontal:6 },
  bar: { width:28, backgroundColor:'#3A3A3A', borderRadius:6, borderWidth:1, borderColor:'#FF6B3533' },

  txRow: { flexDirection:'row', alignItems:'center', paddingVertical:8 },
  txIcon: { width:44, height:44, borderRadius:22, alignItems:'center', justifyContent:'center', marginRight:12 },
  txTitle: { fontWeight:'600', color:'#E8E8E8' },
  txMeta: { color:'#8A8A8A', fontSize:12 },
  txAmount: { fontWeight:'700', color:'#FFAA66' },

  pageInner: { flex:1, padding:12 },
  stickyRow: { flexDirection:'row', alignItems:'center', marginBottom:8 },
  searchInput: { flex:1, backgroundColor:'#1A1A1A', padding:10, borderRadius:12, borderWidth:1, borderColor:'#2A2A2A', color:'#E8E8E8' },
  filterBtn: { padding:10, marginLeft:8, backgroundColor:'#1A1A1A', borderRadius:12, borderWidth:1, borderColor:'#FF6B3533' },
  txGroup: { marginBottom:12 },
  groupTitle: { fontWeight:'700', marginBottom:8, color:'#FFAA66' },

  monthBudgetCard: { backgroundColor:'#1A1A1A', padding:12, borderRadius:12, borderWidth:1, borderColor:'#FF6B3533', ...Platform.select({ web: { backgroundImage: 'linear-gradient(135deg, #2A2A2A 0%, #1A1A1A 100%)', boxShadow: 'inset 0 1px 0 rgba(255,107,53,0.2)' }, default: {} }) },
  progressTrack: { height:8, backgroundColor:'#2A2A2A', borderRadius:8, overflow:'hidden', borderWidth:1, borderColor:'#FF6B3522' },
  progressFill: { height:8, backgroundColor:'#FF6B35' },

  budgetCard: { backgroundColor:'#1A1A1A', padding:12, borderRadius:12, flexDirection:'row', alignItems:'center', marginBottom:8, borderWidth:1, borderColor:'#2A2A2A' },
  budgetIcon: { fontSize:24, marginRight:12 },
  dashedButton: { borderWidth:1, borderStyle:'dashed', borderColor:'#FF6B3555', padding:12, borderRadius:12, alignItems:'center', marginTop:8, backgroundColor:'#1A1A1A22' },

  profileHeader: { flexDirection:'row', alignItems:'center', marginBottom:12 },
  profileAvatar: { width:76, height:76, borderRadius:38, marginRight:12 },
  proBadge: { marginTop:6, backgroundColor:'#FF6B35', paddingHorizontal:8, paddingVertical:4, borderRadius:8 },

  settingsSection: { backgroundColor:'#1A1A1A', padding:12, borderRadius:12, marginBottom:12, borderWidth:1, borderColor:'#2A2A2A' },
  settingsRow: { flexDirection:'row', justifyContent:'space-between', alignItems:'center', paddingVertical:8 },
  settingsGroup: { backgroundColor:'#1A1A1A', borderRadius:12, overflow:'hidden' },
  menuRow: { flexDirection:'row', justifyContent:'space-between', padding:12, borderBottomWidth:1, borderColor:'#2A2A2A' },

  modalBackdrop: { flex:1, backgroundColor:'rgba(0,0,0,0.6)', justifyContent:'flex-end' },
  modalCard: { backgroundColor:'#1A1A1A', padding:16, borderTopLeftRadius:16, borderTopRightRadius:16, borderWidth:1, borderBottomWidth:0, borderColor:'#FF6B3533', ...Platform.select({ web: { backgroundImage: 'linear-gradient(180deg, #2A2A2A 0%, #1A1A1A 100%)', boxShadow: 'inset 0 1px 0 rgba(255,107,53,0.2), 0 -8px 20px rgba(0,0,0,0.4)' }, default: {} }) },
  modalHeader: { flexDirection:'row', justifyContent:'space-between', alignItems:'center' },
  typeToggle: { padding:8, borderRadius:10, borderWidth:1, borderColor:'#2A2A2A', marginHorizontal:8, backgroundColor:'#1A1A1A' },
  amountInput: { fontSize:32, fontWeight:'800', textAlign:'center', marginVertical:12, color:'#FFAA66' },
});

export default styles;
