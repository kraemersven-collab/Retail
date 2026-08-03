/* numana – Kontaktformular: Validierung + Versand über Formspree */
function handleForm(e){
  e.preventDefault();
  var form=e.target;
  var name=document.getElementById('fn').value.trim();
  var email=document.getElementById('fe').value.trim();
  var msg=document.getElementById('fm').value.trim();
  ['e-name','e-email','e-msg'].forEach(function(id){document.getElementById(id).textContent='';});
  var ok=true;
  if(!name){document.getElementById('e-name').textContent='Bitte geben Sie Ihren Namen ein.';ok=false;}
  if(!email||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){document.getElementById('e-email').textContent='Bitte eine gültige E-Mail-Adresse eingeben.';ok=false;}
  if(msg.length<10){document.getElementById('e-msg').textContent='Bitte schreiben Sie mindestens einen kurzen Satz.';ok=false;}
  if(!ok)return;
  var btn=form.querySelector('button[type=submit]');
  btn.disabled=true;btn.textContent='Wird gesendet …';
  fetch(form.action,{method:'POST',body:new FormData(form),headers:{'Accept':'application/json'}})
    .then(function(r){
      if(r.ok){
        document.getElementById('form-area').innerHTML='<div style="padding:2.5rem;background:var(--teal-bg);border:0.5px solid var(--brand-rule);text-align:center" role="status"><p style="font-size:1.05rem;font-weight:500;color:var(--teal);font-family:var(--serif);margin-bottom:0.5rem">Vielen Dank für Ihre Nachricht.</p><p style="font-size:0.85rem;color:var(--ink-soft)">Ich melde mich innerhalb von 48 Stunden. Sie haben den ersten Schritt getan.</p></div>';
      }else{throw new Error('send failed');}
    })
    .catch(function(){
      btn.disabled=false;btn.textContent='Nachricht senden';
      document.getElementById('e-msg').textContent='Senden fehlgeschlagen. Bitte versuchen Sie es erneut oder schreiben Sie direkt an kraemer@numana-coaching.de.';
    });
}
/* */
