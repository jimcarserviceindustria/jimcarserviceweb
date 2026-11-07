
const $ = id => document.getElementById(id);
/* Muestra u oculta un elemento con el atributo hidden Y con estilo en línea, para que funcione aunque el CSS no se haya actualizado */
const mostrar=(el,v)=>{el.hidden=!v;el.style.display=v?"":"none";};
["panel","veil","modal"].forEach(id=>{const el=document.getElementById(id);if(el)mostrar(el,false);});
const eur = n => new Intl.NumberFormat("es-ES",{style:"currency",currency:TIENDA.moneda}).format(n);
const esc = s => String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const wa = txt => `https://wa.me/${TIENDA.whatsapp}?text=${encodeURIComponent(txt)}`;
let cat="todas", texto="", pagina=1, carrito=[], opener=null, prevN=-1;
try{ carrito=JSON.parse(localStorage.getItem("carrito-jimcar")||"[]"); }catch(e){ carrito=[]; }
const guardar=()=>{ try{ localStorage.setItem("carrito-jimcar",JSON.stringify(carrito)); }catch(e){} };

/* engranajes */
function gearPath(cx,cy,ro,n){
  const ri=ro*.82, s=2*Math.PI/n, pts=[];
  for(let i=0;i<n;i++){
    const a=i*s;
    [[0,ri],[.18,ro],[.46,ro],[.64,ri]].forEach(([f,r])=>pts.push([cx+r*Math.cos(a+f*s),cy+r*Math.sin(a+f*s)]));
  }
  const hole=ro*.3;
  return "M"+pts.map(p=>p[0].toFixed(1)+" "+p[1].toFixed(1)).join("L")+"Z"+
    `M${cx+hole} ${cy}A${hole} ${hole} 0 1 0 ${cx-hole} ${cy}A${hole} ${hole} 0 1 0 ${cx+hole} ${cy}Z`+
    `M${cx+ro*.62} ${cy}A${ro*.62} ${ro*.62} 0 1 0 ${cx-ro*.62} ${cy}A${ro*.62} ${ro*.62} 0 1 0 ${cx+ro*.62} ${cy}Z`;
}
$("g1").innerHTML=`<path d="${gearPath(0,0,92,14)}"/>`;
$("g2").innerHTML=`<path d="${gearPath(0,0,92,10)}"/>`;

/* fondo difuminado */
function pintaFondo(){
  const bg=$("bg");
  if(TIENDA.fondo){ bg.style.backgroundImage=`url("${TIENDA.fondo}")`; $("cv").style.display="none"; return; }
  const cv=$("cv"), w=cv.width=innerWidth+80, h=cv.height=innerHeight+80, c=cv.getContext("2d");
  const col=getComputedStyle(document.documentElement).getPropertyValue("--art").trim()||"#3A4651";
  c.clearRect(0,0,w,h); c.strokeStyle=col; c.lineWidth=1; c.globalAlpha=.16;
  for(let x=0;x<w;x+=48){c.beginPath();c.moveTo(x,0);c.lineTo(x,h);c.stroke();}
  for(let y=0;y<h;y+=48){c.beginPath();c.moveTo(0,y);c.lineTo(w,y);c.stroke();}
  c.globalAlpha=.7; c.lineWidth=4;
  const k=Math.max(w,h)/1200;
  [[.1,.18,170,14],[.3,.82,120,12],[.84,.22,210,18],[.7,.88,100,10],[.52,.46,80,9],[.95,.66,130,12],[.18,.58,70,8]].forEach(([fx,fy,r,n])=>{
    c.stroke(new Path2D(gearPath(fx*w,fy*h,r*k,n)));
  });
  c.globalAlpha=.55; c.lineWidth=3;
  [[.4,.14,34],[.62,.62,46],[.08,.9,38],[.9,.92,30]].forEach(([fx,fy,r])=>{
    const x=fx*w,y=fy*h,R=r*k; c.beginPath();
    for(let i=0;i<6;i++){const a=Math.PI/3*i+Math.PI/6;c.lineTo(x+R*Math.cos(a),y+R*Math.sin(a));}
    c.closePath(); c.stroke(); c.beginPath(); c.arc(x,y,R*.45,0,7); c.stroke();
  });
}
let rz; addEventListener("resize",()=>{clearTimeout(rz);rz=setTimeout(()=>{pintaFondo();lista();},200);});
try{ matchMedia("(prefers-color-scheme: dark)").addEventListener("change",pintaFondo); }catch(e){}
new MutationObserver(pintaFondo).observe(document.documentElement,{attributes:true,attributeFilter:["data-theme"]});

/* textos de empresa, cintas, enlaces */
$("tit").textContent=TIENDA.titulo;
$("desc").innerHTML=TIENDA.descripcion.map(p=>`<p style="margin-bottom:10px">${esc(p)}</p>`).join("");
(function(){
  const box=$("empresaImg");
  if(TIENDA.imagenEmpresa){
    box.innerHTML=`<img src="${esc(TIENDA.imagenEmpresa)}" alt="Tienda JIMCARSERVIS"><div class="cap"><span>Ropa industrial y herramientas</span><b>JIMCARSERVIS</b></div>`;
  }else{
    $("eg1").innerHTML=`<path d="${gearPath(95,70,46,12)}"/>`;
    $("eg2").innerHTML=`<path d="${gearPath(515,58,56,10)}"/>`;
  }
})();
const cinta=["JIMCARSERVIS","Ropa industrial","Herramientas","Protección laboral","Pedidos por WhatsApp"].map(t=>`<span>${t}</span>`).join("");
$("t0").innerHTML=["Pedidos por WhatsApp","Ropa industrial","Herramientas","Recogida en tienda"].map(t=>`<span>${t}</span>`).join("").repeat(6);
$("t1").innerHTML=cinta.repeat(4); $("t2").innerHTML=["Taladros y moladoras","Botas S3","Alta visibilidad","Guantes y cascos","Recogida en tienda"].map(t=>`<span>${t}</span>`).join("").repeat(4);
const waBase=wa("Hola JIMCARSERVIS, quisiera hacer una consulta.");
["waHero","waLoc","waFoot","fab"].forEach(i=>$(i).href=waBase);
$("dir").textContent=TIENDA.direccion; $("hor").textContent=TIENDA.horario; $("tel").innerHTML=`<a href="tel:${esc(TIENDA.telefono.replace(/[^+\d]/g,""))}">${esc(TIENDA.telefono)}</a>`;
$("femail").innerHTML=`<a href="mailto:${esc(TIENDA.email)}">${esc(TIENDA.email)}</a>`; $("anio").textContent=new Date().getFullYear();
$("como").href="https://www.google.com/maps/search/?api=1&query="+encodeURIComponent(TIENDA.mapaConsulta);
if(TIENDA.incrustarMapa){
  const f=document.createElement("iframe");
  f.src="https://www.google.com/maps?q="+encodeURIComponent(TIENDA.mapaConsulta)+"&output=embed";
  f.title="Mapa de la tienda"; f.loading="lazy"; f.referrerPolicy="no-referrer-when-downgrade";
  $("map").appendChild(f); $("map").querySelector(".pin").remove();
}

/* iconos por categoría */
const ICONOS={
 ropa:'<path d="M20 14 32 8q8 6 16 0l12 6 8 16-10 4-4-6v42H26V28l-4 6-10-4z" fill="currentColor"/>',
 epi:'<path d="M10 52Q10 22 40 22t30 30z" fill="currentColor"/><rect x="6" y="54" width="68" height="7" fill="currentColor"/><rect x="36" y="14" width="8" height="12" fill="currentColor"/>',
 electricas:'<path d="M8 24h46l8 7h12v10H62l-8 7H42l-4 20H24l3-20H8z" fill="currentColor"/>',
 manuales:'<path d="M54 8a15 15 0 0 0-11 25L10 66l6 6 33-33a15 15 0 0 0 25-11l-10 9-8-2-2-8 9-10z" fill="currentColor"/>',
 consumibles:'<circle cx="40" cy="40" r="32" fill="none" stroke="currentColor" stroke-width="8"/><circle cx="40" cy="40" r="9" fill="currentColor"/><circle cx="40" cy="40" r="20" fill="none" stroke="currentColor" stroke-width="3" stroke-dasharray="6 6"/>'
};
const galeria=p=>{
  const n=p.fotos.length;
  if(!n) return `<div class="ph"><i>FOTO</i><svg viewBox="0 0 80 80" aria-hidden="true">${ICONOS[p.cat]}</svg></div>`;
  return `<div class="gal" data-g="${esc(p.id)}" data-i="0"><img src="${esc(p.fotos[0])}" alt="${esc(p.nombre)}${n>1?` — foto 1 de ${n}`:""}" loading="lazy">`+
    (n>1?`<button class="nav prev" type="button" data-nav="-1" aria-label="Foto anterior">‹</button><button class="nav next" type="button" data-nav="1" aria-label="Foto siguiente">›</button><span class="dots">${p.fotos.map((_,i)=>`<i class="${i?"":"on"}"></i>`).join("")}</span>`:"")+`</div>`;
};
function irA(g,i){
  const p=PRODUCTOS.find(x=>x.id===g.dataset.g), n=p.fotos.length; if(n<2) return;
  i=((i%n)+n)%n; g.dataset.i=i;
  const im=g.querySelector("img"); im.src=p.fotos[i]; im.alt=`${p.nombre} — foto ${i+1} de ${n}`;
  im.classList.remove("swap"); void im.offsetWidth; im.classList.add("swap");
  g.querySelectorAll(".dots i").forEach((pt,k)=>pt.classList.toggle("on",k===i));
}
document.addEventListener("click",e=>{
  const b=e.target.closest("[data-nav]"); if(!b) return;
  e.stopPropagation(); const g=b.closest(".gal"); irA(g,(+g.dataset.i||0)+ +b.dataset.nav);
},true);
let toque=null;
document.addEventListener("touchstart",e=>{const g=e.target.closest&&e.target.closest(".gal");toque=g&&!g.closest(".card")&&g.querySelector(".nav")?{g,x:e.touches[0].clientX}:null;},{passive:true});
document.addEventListener("touchend",e=>{if(!toque)return;const dx=e.changedTouches[0].clientX-toque.x;if(Math.abs(dx)>45)irA(toque.g,(+toque.g.dataset.i||0)+(dx<0?1:-1));toque=null;},{passive:true});

/* catálogo */
function filtrados(){
  const t=texto.trim().toLowerCase();
  return PRODUCTOS.filter(p=>(cat==="todas"||p.cat===cat)&&(!t||(p.nombre+" "+p.desc+" "+p.id).toLowerCase().includes(t)));
}
function chips(){
  $("chips").innerHTML=[["todas","Todo"],...Object.entries(CATEGORIAS)].map(([k,v])=>`<button class="chip" type="button" data-k="${k}" aria-pressed="${k===cat}">${esc(v)}</button>`).join("");
}
function lista(){
  const cols=Math.max(1,getComputedStyle($("grid")).gridTemplateColumns.split(" ").filter(Boolean).length);
  const PP=Math.max(cols,Math.round(POR_PAGINA/cols)*cols);
  const f=filtrados(), total=Math.max(1,Math.ceil(f.length/PP));
  if(pagina>total) pagina=total;
  const ini=(pagina-1)*PP, vis=f.slice(ini,ini+PP);
  $("count").textContent=f.length?`${f.length} productos · página ${pagina} de ${total}`:"0 productos";
  $("grid").innerHTML=vis.length?vis.map((p,i)=>`
    <article class="card" style="--i:${i}" data-ver="${esc(p.id)}">
      ${galeria(p)}
      <div class="body"><span class="sku">REF ${esc(p.id)}</span><h3>${esc(p.nombre)}</h3>
      <div class="row"><span class="price">${eur(p.precio)}</span><button class="more" type="button" aria-label="Ver detalle de ${esc(p.nombre)}">Ver detalle</button></div></div>
    </article>`).join(""):`<div class="empty">No hay productos con esa búsqueda. Prueba con otra palabra o elige otra categoría.</div>`;
  let h=`<button type="button" data-p="${pagina-1}" ${pagina===1?"disabled":""} aria-label="Página anterior">‹</button>`;
  for(let i=1;i<=total;i++) h+=`<button type="button" data-p="${i}" ${i===pagina?'aria-current="page"':""} aria-label="Página ${i}">${i}</button>`;
  h+=`<button type="button" data-p="${pagina+1}" ${pagina===total?"disabled":""} aria-label="Página siguiente">›</button>`;
  $("pager").innerHTML=total>1?h:"";
}

/* ficha */
function abreFicha(id,desde,inicio=0){
  const p=PRODUCTOS.find(x=>x.id===id); if(!p) return;
  opener=desde;
  $("sheet").innerHTML=`
    <button class="x" id="mx" type="button" aria-label="Cerrar">✕</button>
    ${galeria(p)}
    <div class="info">
      <span class="eyebrow">${esc(CATEGORIAS[p.cat])} · REF ${esc(p.id)}</span>
      <h3 id="mTit">${esc(p.nombre)}</h3>
      <p>${esc(p.desc)}</p>
      <ul class="specs">${p.specs.map(s=>`<li>${esc(s)}</li>`).join("")}</ul>
      <div class="big">${eur(p.precio)}</div>
      ${p.tallas&&p.tallas.length?`<div class="tallas"><label for="mt"><b>Talla</b></label><select id="mt">${p.tallas.map(t=>`<option>${esc(t)}</option>`).join("")}</select></div>`:""}
      <div class="acts">
        <a class="btn g" id="mwa" href="#" target="_blank" rel="noopener">Pedir este producto por WhatsApp</a>
        <button class="btn o" id="madd" type="button">Añadir a mi pedido</button>
      </div>
    </div>`;
  const link=()=>{const t=$("mt")?$("mt").value:"";
    $("mwa").href=wa(`Hola JIMCARSERVIS, me interesa: ${p.nombre} [REF ${p.id}]${t?` talla ${t}`:""} — ${eur(p.precio)}. ¿Está disponible?`);};
  link(); if($("mt")) $("mt").onchange=link;
  $("mx").onclick=cierraFicha;
  $("madd").onclick=()=>{const t=$("mt")?$("mt").value:"";const ex=carrito.find(i=>i.id===p.id&&i.t===t);ex?ex.q++:carrito.push({id:p.id,t,q:1});pintaCarrito();$("madd").textContent="Añadido ✓";};
  mostrar($("modal"),true); $("mx").focus();
  const gm=$("sheet").querySelector(".gal"); if(gm&&inicio) irA(gm,inicio);
}
function cierraFicha(){ mostrar($("modal"),false); if(opener) opener.focus(); }
$("scrim").onclick=cierraFicha;

/* carrito */
function pedidoTexto(){
  const l=carrito.map(i=>{const p=PRODUCTOS.find(x=>x.id===i.id);return `- ${i.q} × ${p.nombre}${i.t?` (talla ${i.t})`:""} [${p.id}] — ${eur(p.precio*i.q)}`;});
  const tot=carrito.reduce((s,i)=>s+PRODUCTOS.find(x=>x.id===i.id).precio*i.q,0);
  return "Hola JIMCARSERVIS, quiero hacer este pedido:\n"+l.join("\n")+"\nTotal: "+eur(tot)+"\n\nNombre y dirección de entrega:";
}
function pintaCarrito(){
  const nn=carrito.reduce((s,i)=>s+i.q,0);
  $("n").textContent=nn;
  if(prevN>=0&&nn>prevN){const cb=$("open");cb.classList.remove("bump");void cb.offsetWidth;cb.classList.add("bump");}
  prevN=nn;
  $("total").textContent=eur(carrito.reduce((s,i)=>s+PRODUCTOS.find(x=>x.id===i.id).precio*i.q,0));
  $("lines").innerHTML=carrito.length?carrito.map((i,k)=>{const p=PRODUCTOS.find(x=>x.id===i.id);return `
    <div class="line"><div><b>${esc(p.nombre)}</b><br><small>REF ${esc(p.id)}${i.t?` · talla ${esc(i.t)}`:""}</small></div><strong>${eur(p.precio*i.q)}</strong>
    <div class="qty"><button type="button" data-d="-1" data-k="${k}" aria-label="Quitar uno">−</button><span>${i.q}</span><button type="button" data-d="1" data-k="${k}" aria-label="Añadir uno">+</button><button type="button" class="rm" data-d="0" data-k="${k}">Quitar</button></div></div>`;}).join("")
    :`<p class="hint" style="padding:12px 0">Tu pedido está vacío. Añade productos desde el catálogo.</p>`;
  $("wa").setAttribute("aria-disabled",carrito.length?"false":"true");
  $("wa").href=carrito.length?wa(pedidoTexto()):"#";
  $("hint").textContent=""; guardar();
}
const abre=v=>{mostrar($("panel"),v);mostrar($("veil"),v);if(v)$("close").focus();};

/* eventos */
$("chips").addEventListener("click",e=>{const b=e.target.closest("[data-k]");if(!b)return;cat=b.dataset.k;pagina=1;chips();lista();});
$("q").addEventListener("input",e=>{texto=e.target.value;pagina=1;lista();});
$("grid").addEventListener("click",e=>{
  const c=e.target.closest("[data-ver]"); if(!c) return;
  const g=c.querySelector(".gal");
  abreFicha(c.dataset.ver,c.querySelector(".more"),g?+g.dataset.i||0:0);
});
$("pager").addEventListener("click",e=>{const b=e.target.closest("[data-p]");if(!b||b.disabled)return;pagina=+b.dataset.p;lista();$("catalogo").scrollIntoView({behavior:"smooth"});});
$("lines").addEventListener("click",e=>{const b=e.target.closest("[data-d]");if(!b)return;const k=+b.dataset.k,d=+b.dataset.d;
  if(d===0||carrito[k].q+d<1)carrito.splice(k,1);else carrito[k].q+=d;pintaCarrito();});
$("open").onclick=()=>abre(true);$("close").onclick=()=>abre(false);$("veil").onclick=()=>abre(false);
document.addEventListener("keydown",e=>{
  if(e.key==="Escape"){if(!$("modal").hidden)cierraFicha();else abre(false);}
  else if((e.key==="ArrowLeft"||e.key==="ArrowRight")&&!$("modal").hidden&&e.target.tagName!=="SELECT"){
    const g=$("sheet").querySelector(".gal"); if(g&&g.querySelector(".nav")) irA(g,(+g.dataset.i||0)+(e.key==="ArrowRight"?1:-1));
  }
});
$("copy").onclick=async()=>{
  if(!carrito.length){$("hint").textContent="Añade algún producto primero.";return;}
  try{await navigator.clipboard.writeText(pedidoTexto()+"\n\nEnvíalo a: "+TIENDA.email);$("hint").textContent="Pedido copiado. Pégalo en un email a "+TIENDA.email+".";}
  catch(err){$("hint").textContent="No se pudo copiar. Escribe a "+TIENDA.email+" con la lista de productos.";}
};
/* menú: resalta la sección visible y se compacta al bajar */
const enlaces=[...document.querySelectorAll("nav.links a")];
if("IntersectionObserver" in window){
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)enlaces.forEach(a=>a.classList.toggle("on",a.getAttribute("href")==="#"+e.target.id));}),{rootMargin:"-45% 0px -50% 0px"});
  ["nosotros","catalogo","ubicacion"].forEach(id=>io.observe($(id)));
}
const cab=document.querySelector("header.top");
addEventListener("scroll",()=>cab.classList.toggle("scrolled",scrollY>40),{passive:true});

pintaFondo(); chips(); lista(); pintaCarrito();
