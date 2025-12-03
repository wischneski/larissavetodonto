import{j as t}from"./vendor-motion-B9A3aF78.js";import{r as n}from"./vendor-react-Tc3YVsHp.js";const l=()=>{const r=n.useMemo(()=>Array.from({length:12}).map((a,e)=>({id:e,x:Math.random()*100,y:Math.random()*100,size:Math.random()*80+40,duration:Math.random()*15+20,delay:Math.random()*5,color:e%2===0?"bg-brand-500/5":"bg-brand-300/10"})),[]);return t.jsxs("div",{className:"fixed inset-0 z-0 pointer-events-none overflow-hidden",children:[t.jsx("style",{children:`
        @keyframes floatParticle {
          0%, 100% { transform: translateY(0) translateX(0) scale(1); }
          50% { transform: translateY(-80px) translateX(25px) scale(1.15); }
        }
      `}),r.map(a=>t.jsx("div",{className:`absolute rounded-full blur-2xl ${a.color}`,style:{left:`${a.x}%`,top:`${a.y}%`,width:a.size,height:a.size,animation:`floatParticle ${a.duration}s linear infinite`,animationDelay:`${a.delay}s`}},a.id))]})};export{l as FloatingParticles};
