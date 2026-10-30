(function(){
var IG='https://www.instagram.com/spacedrift_ltd/';/* change this one line to your Instagram link */
var ICON='<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>';
var FORM='https://formspree.io/f/xaeebjqe';/* paste your Formspree link here, for example https://formspree.io/f/abcdwxyz */
var P=window.PROJECTS||[],$=function(s,r){return(r||document).querySelector(s)},$$=function(s,r){return[].slice.call((r||document).querySelectorAll(s))};
document.documentElement.classList.add('js');
var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
/* nav + footer */
var pages=[["Services","index.html#services"],["Approach","index.html#process"],["Projects","projects.html"],["About","about.html"],["Contact","index.html#contact"]];
var cur=location.pathname.split('/').pop()||'index.html';
$('#nav').innerHTML='<div class="wrap bar"><a href="index.html"><img src="images/logo.png" alt="Spacedrift Design Studio"></a><button id="mb" aria-label="Menu" aria-expanded="false">Menu</button><ul id="mu">'+pages.map(function(p){return'<li><a href="'+p[1]+'"'+(p[1]===cur?' aria-current="page"':'')+'>'+p[0]+'</a></li>'}).join('')+'</ul></div>';
$('#mb').onclick=function(){var o=$('#mu').classList.toggle('open');this.setAttribute('aria-expanded',o)};
$('#foot').innerHTML='<div class="wrap"><span>© '+new Date().getFullYear()+' Spacedrift Design Studio</span><span>'+pages.map(function(p){return'<a href="'+p[1]+'">'+p[0]+'</a>'}).join(' ')+'<a href="review.html">Leave a review</a><a class="ig" href="'+IG+'" target="_blank" rel="noopener" aria-label="Spacedrift on Instagram">'+ICON+' Instagram</a></span></div>';
$$('[data-ig]').forEach(function(l){l.href=IG});
window.addEventListener('scroll',function(){$('#nav').classList.toggle('sc',window.scrollY>20)},{passive:true});
/* scroll reveal */
var io=('IntersectionObserver' in window&&!reduce)?new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){var t=e.target;t.classList.add('in');io.unobserve(t);setTimeout(function(){t.style.transitionDelay=''},1200)}})},{threshold:.1}):null;
function reveal(root){$$('section h2,.lead,.svc,.step,.proj,.vals>div,.meta,.desc,.prose p,form',root).forEach(function(el,i){if(el.classList.contains('rv'))return;el.classList.add('rv');if(io){el.style.transitionDelay=(i%4)*70+'ms';io.observe(el)}else el.classList.add('in')})}
function swipe(el,fn){var x0=null;el.addEventListener('touchstart',function(e){x0=e.touches[0].clientX},{passive:true});el.addEventListener('touchend',function(e){if(x0===null)return;var dx=e.changedTouches[0].clientX-x0;x0=null;if(Math.abs(dx)>50)fn(dx<0?1:-1)})}
function card(p){var im=p.images[0];return'<a class="proj" href="project.html?id='+p.id+'"><div class="ph">'+(im?'<img src="images/'+im+'" alt="'+p.title+'" loading="lazy">':'')+'</div><div class="t"><b>'+p.title+'</b><small>'+p.category+' · '+p.type+'</small></div></a>'}
/* home: featured */
var feat=$('#featured');if(feat)feat.innerHTML=P.slice(0,3).map(card).join('');
/* projects page: tabs + live search */
var all=$('#all');
if(all){var cat='All',q='',cats=['All'].concat(window.CATEGORIES||[]);P.forEach(function(p){if(cats.indexOf(p.category)<0)cats.push(p.category)});
var tabs=$('#tabs'),qi=$('#q'),cnt=$('#count');
tabs.innerHTML=cats.map(function(c,i){return'<button class="tab" aria-pressed="'+(i==0)+'">'+c+'</button>'}).join('');
var show=function(){var l=P.filter(function(p){return(cat==='All'||p.category===cat)&&(!q||[p.title,p.desc,p.category,p.type,p.location].join(' ').toLowerCase().indexOf(q)>-1)});
all.innerHTML=l.map(card).join('')||'<p class="empty">'+(q?'No projects match your search.':cat==='All'?'Projects are being added.':'New '+cat.toLowerCase()+' projects are being added. Please check back soon.')+'</p>';
cnt.textContent=l.length+(l.length===1?' project':' projects');reveal(all)};
show();
tabs.onclick=function(e){if(e.target.tagName!=='BUTTON')return;cat=e.target.textContent;$$('button',tabs).forEach(function(b){b.setAttribute('aria-pressed',b===e.target)});show()};
qi.oninput=function(){q=qi.value.trim().toLowerCase();show()}}
/* hero slideshow (home + projects) */
var sl=$('#slides');
if(sl){var seen={},urls=[];if(sl.dataset.first){urls.push(sl.dataset.first);seen[sl.dataset.first]=1}
P.forEach(function(p){p.images.forEach(function(i){if(!seen[i]){seen[i]=1;urls.push(i)}})});
if(urls.length){var dots=$('#dots'),c0=0,timer,paused=false;
if(reduce)sl.classList.add('still');
sl.innerHTML=urls.map(function(u,i){return'<img src="images/'+u+'" alt=""'+(i?' loading="lazy"':'')+'>'}).join('');
var im=sl.children;
dots.innerHTML=urls.length>1?urls.map(function(u,i){return'<button aria-label="Slide '+(i+1)+'"></button>'}).join('')+'<button class="pp" aria-label="Pause slideshow">❚❚</button>':'';
var go=function(n){c0=(n+urls.length)%urls.length;[].forEach.call(im,function(x,i){x.classList.toggle('on',i===c0)});$$('button:not(.pp)',dots).forEach(function(b,i){b.setAttribute('aria-current',i===c0)})};
var run=function(){clearInterval(timer);if(!paused&&urls.length>1)timer=setInterval(function(){go(c0+1)},4500)};
dots.onclick=function(e){var b=e.target.closest('button');if(!b)return;if(b.classList.contains('pp')){paused=!paused;b.textContent=paused?'▶':'❚❚';b.setAttribute('aria-label',paused?'Play slideshow':'Pause slideshow');run();return}
var i=$$('button:not(.pp)',dots).indexOf(b);if(i>-1){go(i);run()}};
go(0);run()}}
/* project page: gallery, thumbnails, lightbox, next/previous */
var d=$('#detail');
if(d){var id=new URLSearchParams(location.search).get('id'),i0=P.map(function(x){return x.id}).indexOf(id),p=P[i0];
if(!p){d.innerHTML='<h1>Project not found</h1><p><a href="projects.html">Back to all projects</a></p>'}
else{document.title=p.title+' | Spacedrift Design Studio';var n=0,imgs=p.images,N=imgs.length,pv=P[(i0-1+P.length)%P.length],nx=P[(i0+1)%P.length];
d.innerHTML='<p class="crumb"><a href="index.html">Home</a> › <a href="projects.html">Projects</a> › '+p.title+'</p><div class="gal"><div class="ph big" id="g"'+(N?' tabindex="0" role="button" aria-label="Open image full screen"':'')+'></div>'+(N>1?'<button id="pv" aria-label="Previous image">‹</button><button id="nx" aria-label="Next image">›</button><span id="ct"></span>':'')+'</div>'+(N>1?'<div class="thumbs" id="th">'+imgs.map(function(u,i){return'<button aria-label="Show image '+(i+1)+'"><img src="images/'+u+'" alt=""></button>'}).join('')+'</div>':'')+'<h1>'+p.title+'</h1><dl class="meta"><div><dt>Category</dt><dd>'+p.category+'</dd></div><div><dt>Stage</dt><dd>'+p.type+'</dd></div><div><dt>Location</dt><dd>'+p.location+'</dd></div><div><dt>Year</dt><dd>'+p.year+'</dd></div></dl><p class="desc">'+p.desc+'</p><a class="btn fill" href="index.html#contact">Ask about a similar project</a>'+(P.length>1?'<nav class="pn" aria-label="Other projects"><a href="project.html?id='+pv.id+'">← '+pv.title+'</a><a href="project.html?id='+nx.id+'">'+nx.title+' →</a></nav>':'');
var g=$('#g'),ct=$('#ct'),th=$('#th');
var set=function(i){n=(i+N)%Math.max(N,1);g.innerHTML=N?'<img src="images/'+imgs[n]+'" alt="'+p.title+' image '+(n+1)+'">':'';if(ct)ct.textContent=(n+1)+' / '+N;if(th)$$('button',th).forEach(function(b,k){b.setAttribute('aria-current',k===n)})};set(0);
var lb,li,lc,lx=0;
var lbShow=function(i){lx=(i+N)%N;li.src='images/'+imgs[lx];lc.textContent=(lx+1)+' / '+N};
var lbClose=function(){lb.classList.remove('open');document.body.style.overflow='';g.focus()};
var lbStep=function(s){lbShow(lx+s);set(lx)};
var lbOpen=function(){if(!lb){lb=document.createElement('div');lb.className='lb';lb.setAttribute('role','dialog');lb.setAttribute('aria-modal','true');lb.setAttribute('aria-label','Image viewer');
lb.innerHTML='<button class="x" aria-label="Close">×</button>'+(N>1?'<button class="lp" aria-label="Previous image">‹</button><button class="ln" aria-label="Next image">›</button>':'')+'<img alt=""><span class="lc"></span>';
document.body.appendChild(lb);li=$('img',lb);lc=$('.lc',lb);
lb.onclick=function(e){var c=e.target.className;if(c==='lb'||c==='x')lbClose();else if(c==='lp')lbStep(-1);else if(c==='ln')lbStep(1)};swipe(lb,lbStep)}
lbShow(n);lb.classList.add('open');document.body.style.overflow='hidden';$('.x',lb).focus()};
if(N){g.onclick=lbOpen;g.onkeydown=function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();lbOpen()}};swipe(g,function(s){set(n+s)})}
if(N>1){$('#pv').onclick=function(){set(n-1)};$('#nx').onclick=function(){set(n+1)};th.onclick=function(e){var b=e.target.closest('button');if(b)set($$('button',th).indexOf(b))}}
document.onkeydown=function(e){var open=lb&&lb.classList.contains('open');if(e.key==='Escape'&&open)lbClose();else if(N>1&&(e.key==='ArrowLeft'||e.key==='ArrowRight')){var s=e.key==='ArrowLeft'?-1:1;open?lbStep(s):set(n+s)}};
var more=$('#more');if(more)more.innerHTML=P.filter(function(x){return x.id!==id}).slice(0,3).map(card).join('')}}
/* contact form */
var f=$('#f');
if(f)f.onsubmit=function(e){e.preventDefault();var fd=new FormData(f),btn=f.querySelector('button');btn.disabled=true;btn.textContent='Sending...';
var mail=function(){location.href='mailto:'+f.dataset.to+'?subject='+encodeURIComponent('Project enquiry from '+fd.get('name'))+'&body='+encodeURIComponent('Name: '+fd.get('name')+'\nEmail: '+fd.get('email')+'\nInterested in: '+fd.get('need')+'\nLocation: '+fd.get('location')+'\n\n'+fd.get('message'));btn.disabled=false;btn.textContent='Send message'};
if(!FORM){mail();return}
fetch(FORM,{method:'POST',headers:{'Accept':'application/json'},body:fd}).then(function(r){if(!r.ok)throw 0;f.outerHTML='<div class="thanks" role="status"><h3>Thank you</h3><p>Your message is on its way. We will reply by email soon.</p></div>'}).catch(mail)};
/* review form */
var rf=$('#rf');
if(rf)rf.onsubmit=function(e){e.preventDefault();var fd=new FormData(rf),btn=rf.querySelector('button');btn.disabled=true;btn.textContent='Sending...';
var mail=function(){location.href='mailto:'+rf.dataset.to+'?subject='+encodeURIComponent('Review from '+fd.get('name'))+'&body='+encodeURIComponent('Name: '+fd.get('name')+'\nEmail: '+fd.get('email')+'\nProject: '+fd.get('project')+'\nRating: '+fd.get('rating')+'\n\n'+fd.get('review'));btn.disabled=false;btn.textContent='Submit review'};
if(!FORM){mail();return}
fetch(FORM,{method:'POST',headers:{'Accept':'application/json'},body:fd}).then(function(r){if(!r.ok)throw 0;rf.outerHTML='<div class="thanks" role="status"><h3>Thank you</h3><p>We have received your review. We read every one, and may share it on this site with your permission.</p></div>'}).catch(mail)};
/* testimonials */
var T=window.TESTIMONIALS||[],ts=$('#testimonials');
if(ts&&!T.length)$('#tw').innerHTML='<h2>Share your experience</h2>';
if(ts&&T.length){var esc=function(s){return String(s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})};
$('#tw').innerHTML='<h2>Kind words</h2><div class="tq">'+T.map(function(t,i){return'<figure class="q'+(i?'':' on')+'"><blockquote>“'+esc(t.quote)+'”</blockquote><figcaption><b>'+esc(t.name)+'</b>'+(t.detail?'<span>'+esc(t.detail)+'</span>':'')+'</figcaption></figure>'}).join('')+'</div>'+(T.length>1?'<div class="dots" id="td" role="group" aria-label="Choose testimonial">'+T.map(function(t,i){return'<button aria-label="Testimonial '+(i+1)+'" aria-current="'+(i===0)+'"></button>'}).join('')+'</div>':'')+'';
if(T.length>1){var ti=0,tt,qs=$$('.q',ts),tb=$$('#td button',ts);
var tg=function(n){ti=(n+T.length)%T.length;qs.forEach(function(q,i){q.classList.toggle('on',i===ti)});tb.forEach(function(b,i){b.setAttribute('aria-current',i===ti)})};
var tr=function(){clearInterval(tt);if(!reduce)tt=setInterval(function(){tg(ti+1)},7000)};
$('#td').onclick=function(e){var i=tb.indexOf(e.target.closest('button'));if(i>-1){tg(i);tr()}};
ts.onmouseenter=ts.onfocusin=function(){clearInterval(tt)};ts.onmouseleave=ts.onfocusout=tr;tr()}}
/* section headings: words rise in on scroll, last word gets an underline sweep */
if(!reduce)$$('section h2').forEach(function(h){var ws=h.textContent.trim().split(/\s+/);h.classList.add('sp');h.innerHTML=ws.map(function(w,i){return'<span class="wd'+(i===ws.length-1?' hl':'')+'" style="--i:'+i+'">'+w+'</span>'}).join(' ')});
/* headline words rise in */
if(!reduce)$$('.hero h1').forEach(function(h){h.innerHTML=h.textContent.trim().split(/\s+/).map(function(w,i){return'<span class="w" style="animation-delay:'+(i*90)+'ms">'+w+'</span>'}).join(' ')});
/* typed services line (home hero) */
var rt=$('#rot');
if(rt&&!reduce){var W=['Interior design','Colour consultation','Bespoke design','Craftsmanship','Architectural design','Site supervision'],wi=0,ci=0,del=false,rounds=0;rt.classList.add('typing');
var tick=function(){var w=W[wi];
if(!del){ci++;rt.textContent=w.slice(0,ci);if(ci===w.length){del=true;return setTimeout(tick,1500)}return setTimeout(tick,55)}
ci--;rt.textContent=w.slice(0,ci);
if(ci===0){del=false;wi=(wi+1)%W.length;if(wi===0&&++rounds>=2){rt.textContent=W[0];rt.classList.remove('typing');return}return setTimeout(tick,250)}
return setTimeout(tick,30)};
rt.textContent='';setTimeout(tick,700)}
reveal(document);
})();
