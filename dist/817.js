"use strict";(self.webpackChunksleact_ts_front=self.webpackChunksleact_ts_front||[]).push([[817],{76817:function(e,t,n){n.r(t);var r=n(38678),a=n(73046),l=n(83564),o=n(9669),i=n.n(o),u=n(67294),c=n(5977),s=n(73727),m=n(52503);function d(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,a,l=[],o=!0,i=!1;try{for(n=n.call(e);!(o=(r=n.next()).done)&&(l.push(r.value),!t||l.length!==t);o=!0);}catch(e){i=!0,a=e}finally{try{o||null==n.return||n.return()}finally{if(i)throw a}}return l}}(e,t)||function(e,t){if(e){if("string"==typeof e)return f(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?f(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function f(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}t.default=function(){var e=(0,m.ZP)("/api/users",l.Z),t=e.data,n=(e.error,e.mutate),o=d((0,u.useState)(!1),2),f=o[0],p=o[1],v=d((0,r.Z)(""),2),y=v[0],h=v[1],E=d((0,r.Z)(""),2),b=E[0],w=E[1],g=(0,u.useCallback)((function(e){e.preventDefault(),p(!1),i().post("/api/users/login",{email:y,password:b},{withCredentials:!0}).then((function(e){n(e.data,!1)})).catch((function(e){var t,n;p(401===(null===(t=e.response)||void 0===t||null===(n=t.data)||void 0===n?void 0:n.code))}))}),[y,n,b]);return void 0===t?u.createElement("div",null,"로딩중..."):t?(console.log("로그인 됨~~1",t),u.createElement(c.l_,{to:"/workspace/sleact/channel/일반"})):u.createElement("div",{id:"container"},u.createElement(a.h4,null,"sanghyeon"),u.createElement(a.l0,{onSubmit:g},u.createElement(a.__,{id:"email-label"},u.createElement("span",null,"이메일 주소"),u.createElement("div",null,u.createElement(a.II,{type:"email",id:"email",name:"email",value:y,onChange:h}))),u.createElement(a.__,{id:"password-label"},u.createElement("span",null,"비밀번호"),u.createElement("div",null,u.createElement(a.II,{type:"password",id:"password",name:"password",value:b,onChange:w})),f&&u.createElement(a.jj,null,"이메일과 비밀번호 조합이 일치하지 않습니다.")),u.createElement(a.zx,{type:"submit"},"로그인")),u.createElement(a.Ji,null,"아직 회원이 아니신가요? ",u.createElement(s.rU,{to:"/signup"},"회원가입 하러가기")))}}}]);