
// import store from './store';

// wx.getSetting({
//   success(res) {
//       const authSetting = res.authSetting || {};
//       const payload = Object.keys(authSetting).reduce((settings, scope) => ({
//           ...settings,
//           [scope.replace('scope.', '')]: authSetting[scope],
//       }), {})
//       store.dispatch({
//           type: 'GetSetting',
//           payload,
//       });
//   }  
// });

window.matchMedia = () => {};