var B=Object.defineProperty;var T=(t,e,o)=>e in t?B(t,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[e]=o;var c=(t,e,o)=>T(t,typeof e!="symbol"?e+"":e,o);const I=t=>{const e=R(t),o=N();return e.appendChild(o),e},R=t=>{const e=document.createElement("a");return e.id=h(t.boothId),e.href=t.href,e},x="reservation-button-",h=t=>x+t,N=()=>{const t=document.createElement("button");return t.textContent="予約",t.className="reservation-button",t},y=t=>{const e=h(t);return document.getElementById(e)},m="473",b="474",v="475",C="477",p="478",f="1409",V=[m,b,v,C,p,f],S="○";class U{constructor(e){c(this,"time");c(this,"reservable");c(this,"reservationUrl");this.time=e.time,this.reservable=e.reservable,this.reservationUrl=e.reservationUrl}canReserve(){return this.reservable===S}}const P=document.getElementById("mix-anchor"),E=P.childNodes[1],i=E.childNodes[3],A=()=>{i.style.display="none"},O=t=>{i.after(t)},M={[m]:{time:0,reservable:1},[b]:{time:2,reservable:3},[v]:{time:4,reservable:5},[C]:{time:6,reservable:7},[p]:{time:8,reservable:9},[f]:{time:10,reservable:11}};class k{constructor(e){c(this,"data");this.data={},V.forEach(o=>{this.data[o]=this.getBoothCellValues(e,o)})}getBoothCellValues(e,o){const n=[];for(let l=0;l<e.rows.length;l++){if(l===0)continue;const s=e.rows[l],r=this.getBoothCellValue(s,o);n.push(r)}return n}getBoothCellValue(e,o){var d;const n=M[o],l=e.cells[n.time].textContent,s=e.cells[n.reservable].textContent,r=(d=e.cells[n.reservable].childNodes[0])==null?void 0:d.childNodes[0],w=r==null?void 0:r.href;return new U({time:l,reservable:s,reservationUrl:w})}getBoothReservableTimes(e){return this.data[e].filter(n=>n.canReserve()).map(n=>n.time)}getMinimumTimeReservationUrl(e){const n=this.data[e].filter(l=>l.canReserve());if(n.length!==0)return n[0].reservationUrl}findCellValue(e){return this.data[e.boothId].find(n=>n.time===e.time)}}const u=new k(E),D=t=>{const e=F();return u.getBoothReservableTimes(t).forEach(n=>{const l=Y({boothId:t,text:n});e.appendChild(l)}),e},F=()=>{const t=document.createElement("select");return t.className="minimal",t.onchange=H,t},H=t=>{const e=t.target,{boothId:o,text:n}=q(e.value),l=u.findCellValue({boothId:o,time:n}),s=y(o);s.href=(l==null?void 0:l.reservationUrl)??""},Y=t=>{const e=document.createElement("option");return e.value=j(t),e.textContent=t.text,e},g="-",j=t=>t.boothId+g+t.text,q=t=>{const e=t.split(g);return{boothId:e[0],text:e[1]}},a=i.cloneNode(!0),z=t=>{const e=a.rows[0];for(let s=0;s<e.cells.length;s++){const r=e.cells[s];r.colSpan=0,r.className="article-name"}const o=a.rows.length-1;for(let s=0;s<o;s++)a.deleteRow(1);const n=a.insertRow(),l=6;for(let s=0;s<l;s++)n.insertCell().appendChild(t[s]);return a};console.log("hello!!");window.onload=()=>{const t=V.map(o=>{const n=D(o),l=u.getMinimumTimeReservationUrl(o)??"",s=I({boothId:o,href:l});return G(n,s)});A();const e=z(t);O(e)};const G=(...t)=>{const e=document.createElement("div");return e.className="vertical-container",t.forEach(o=>e.appendChild(o)),e};
