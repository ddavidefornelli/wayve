(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=class extends HTMLElement{connectedCallback(){if(this.childElementCount>0)return;let e=document.createElement(`div`);e.className=`circles`,e.setAttribute(`aria-hidden`,`true`);for(let t=0;t<9;t+=1){let t=document.createElement(`div`);t.className=`row`;for(let e=0;e<9;e+=1){let e=document.createElement(`i`);e.className=`circle`,t.append(e)}e.append(t)}this.append(e)}};customElements.define(`wayve-logo`,e);var t=class extends HTMLElement{connectedCallback(){if(this.childElementCount>0)return;let e=document.createElement(`span`);e.className=`wayve-title`,e.textContent=`WAYVE`,this.append(e)}};customElements.define(`wayve-title`,t);var n=class extends HTMLElement{connectedCallback(){if(this.childElementCount>0)return;let e=document.createElement(`a`),t=document.createElement(`span`);e.href=this.getAttribute(`href`)??`#contact`,e.append(this.getAttribute(`label`)??`Contact us`),t.setAttribute(`aria-hidden`,`true`),t.textContent=`→`,e.append(t),this.append(e)}};customElements.define(`wayve-contact-cta`,n);var r=`https://formsubmit.co/ajax/fornelli.dv@gmail.com`;async function i(e,t=fetch){e.set(`_replyto`,String(e.get(`email`)??``));let n=await t(r,{method:`POST`,headers:{Accept:`application/json`},body:e}),i=await n.json();if(!n.ok||i.success===!1||i.success===`false`)throw Error(`The message could not be sent.`)}var a=class extends HTMLElement{connectedCallback(){if(this.childElementCount>0)return;this.innerHTML=`
      <form class="email-form" action="https://formsubmit.co/hello@wayve.it" method="post">
        <input type="hidden" name="_subject" value="New message from the WAYVE website" />
        <input type="hidden" name="_template" value="table" />
        <input type="hidden" name="_captcha" value="false" />
        <input class="email-form-honey" type="text" name="_honey" tabindex="-1" autocomplete="off" />
        <div class="email-form-fields">
          <label>
            <span>Your email</span>
            <input type="email" name="email" autocomplete="email" placeholder="you@company.com" required />
          </label>
          <label>
            <span>What would you like to talk about?</span>
            <textarea name="message" rows="4" placeholder="Tell us how you would like to work with us" required></textarea>
          </label>
        </div>
        <div class="email-form-footer">
          <p class="email-form-status" aria-live="polite">We’ll reply directly to your inbox.</p>
          <button type="submit">Send message <span aria-hidden="true">→</span></button>
        </div>
      </form>
    `;let e=this.querySelector(`form`),t=this.querySelector(`button`),n=this.querySelector(`.email-form-status`);!e||!t||!n||e.addEventListener(`submit`,async r=>{r.preventDefault(),t.disabled=!0,t.textContent=`Sending…`,n.textContent=`Sending your message…`,n.dataset.state=`pending`;try{await i(new FormData(e)),e.reset(),n.textContent=`Thanks — your message is in our inbox.`,n.dataset.state=`success`}catch{n.textContent=`Something isn’t working. Please try again.`,n.dataset.state=`error`}finally{t.disabled=!1,t.innerHTML=`Send message <span aria-hidden="true">→</span>`}})}};customElements.define(`wayve-email-form`,a);var o=[{name:`main_skill`,legend:`What’s the strongest skill you bring to a hackathon team?`,answers:[`Product strategy`,`UX/UI design`,`Software development`,`Communication & pitching`]},{name:`hackathon_goal`,legend:`What are you hoping to get out of this hackathon?`,answers:[`Win it`,`Meet new people`,`Learn something new`,`Build something I’m proud of`]},{name:`team_role`,legend:`Which role do you naturally take in a team?`,answers:[`Idea starter`,`Organizer`,`Maker`,`Presenter`]},{name:`under_pressure`,legend:`What do you do when time is running out?`,answers:[`Focus on the essentials`,`Help unblock the team`,`Keep improving the solution`,`Prepare the final pitch`]}],s=`We’ll use your email only to follow up about the team.`,c=class extends HTMLElement{connectedCallback(){if(this.childElementCount>0)return;let e=o.map(({name:e,legend:t,answers:n},r)=>`
        <fieldset class="fit-question">
          <legend><span>0${r+1} / 04</span>${t}</legend>
          <div class="fit-answers">
            ${n.map((t,n)=>`
                  <label>
                    <input type="radio" name="${e}" value="${t}" required />
                    <span><i aria-hidden="true">${String.fromCharCode(65+n)}</i>${t}</span>
                  </label>
                `).join(``)}
          </div>
        </fieldset>
      `).join(``);this.innerHTML=`
      <button class="nav-banner" type="button" aria-haspopup="dialog" aria-controls="fit-dialog">
        <span class="banner-badge">TWO SLOTS LEFT</span>
        <span class="banner-message"><strong>Want to join our team?</strong> Find out if you are a fit</span>
        <span class="banner-arrow" aria-hidden="true">
          <svg viewBox="0 0 40 24" focusable="false">
            <path d="M1 12h37M29 3l9 9-9 9" />
          </svg>
        </span>
      </button>
      <dialog class="fit-dialog" id="fit-dialog" aria-labelledby="fit-title">
        <form class="fit-form" action="https://formsubmit.co/hello@wayve.it" method="post">
          <input type="hidden" name="_subject" value="New WAYVE team fit response" />
          <input type="hidden" name="_template" value="table" />
          <input type="hidden" name="_captcha" value="false" />
          <input class="fit-honey" type="text" name="_honey" tabindex="-1" autocomplete="off" />
          <button class="fit-close" type="button" aria-label="Close team fit form">×</button>
          <header class="fit-header">
            <p>Join the team</p>
            <h2 id="fit-title">Could your next team be <span>WAYVE?</span></h2>
            <p>Choose the answer that sounds most like you. Four questions, no wrong answers.</p>
          </header>
          <div class="fit-questions">${e}</div>
          <label class="fit-contact">
            <span>Contact email</span>
            <input type="email" name="email" autocomplete="email" placeholder="you@example.com" required />
          </label>
          <footer class="fit-footer">
            <p class="fit-status" aria-live="polite">${s}</p>
            <button class="fit-submit" type="submit">Send my answers <span aria-hidden="true">→</span></button>
          </footer>
        </form>
      </dialog>
    `;let t=this.querySelector(`.nav-banner`),n=this.querySelector(`.fit-dialog`),r=this.querySelector(`.fit-form`),a=this.querySelector(`.fit-close`),c=this.querySelector(`.fit-submit`),l=this.querySelector(`.fit-status`);!t||!n||!r||!a||!c||!l||(t.addEventListener(`click`,()=>{l.dataset.state===`success`&&(delete l.dataset.state,l.textContent=s),n.showModal()}),a.addEventListener(`click`,()=>n.close()),n.addEventListener(`click`,e=>{e.target===n&&n.close()}),r.addEventListener(`submit`,async e=>{e.preventDefault(),c.disabled=!0,c.textContent=`Sending…`,l.textContent=`Sending your answers…`,l.dataset.state=`pending`;try{await i(new FormData(r)),r.reset(),l.textContent=`Thanks — your answers are in our inbox.`,l.dataset.state=`success`}catch{l.textContent=`Something isn’t working. Please try again.`,l.dataset.state=`error`}finally{c.disabled=!1,c.innerHTML=`Send my answers <span aria-hidden="true">→</span>`}}))}};customElements.define(`wayve-links`,c);var l=[{name:`David`,role:`The builder`,text:`Turns ideas into working products, from the first sketch to the final prototype.`,instagram:`davide.fornelli`},{name:`Cello`,role:`The talker`,text:`Turns complex ideas into clear stories and gets people excited about them.`,instagram:`_.ggiuliano._`},{name:`???`,role:`The next member`,text:`Could this be you?`},{name:`???`,role:`The next member`,text:`Could this be you?`}],u=class extends HTMLElement{connectedCallback(){if(this.childElementCount>0)return;let e=document.createElement(`section`);e.className=`site-section about-section`,e.setAttribute(`aria-labelledby`,`about-title`),e.innerHTML=`
      <div class="section-content about-content">
        <h2 id="about-title">About us.</h2>
        <p class="section-lede">Different strengths, one team.</p>
        <div class="team-grid"></div>
      </div>
    `;let t=e.querySelector(`.team-grid`);for(let e of l){let n=document.createElement(`article`);n.innerHTML=`
        <p class="member-role">${e.role}</p>
        <h3>${e.name}</h3>
        <p class="member-description">${e.text}</p>
        ${`instagram`in e?`<a class="member-instagram" href="https://www.instagram.com/${e.instagram}/">@${e.instagram}</a>`:``}
      `,t?.append(n)}this.append(e)}};customElements.define(`wayve-about`,u);