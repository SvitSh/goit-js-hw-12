import{a as w,S,i}from"./assets/vendor-BDlA6vKe.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))d(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&d(n)}).observe(document,{childList:!0,subtree:!0});function r(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function d(e){if(e.ep)return;e.ep=!0;const s=r(e);fetch(e.href,s)}})();const q="50595861-e3300a20d14d5dbbfabcd1d5e";async function f(t,o){try{return(await w.get("https://pixabay.com/api/",{params:{key:q,q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:o}})).data}catch(r){throw console.log("Помилка при запиті:",r),r}}const h=document.querySelector(".gallery"),p=document.querySelector(".loader"),g=document.querySelector(".load-more"),M=new S(".gallery a",{captionsData:"alt",captionDelay:150});function y(t){const o=t.map(({webformatURL:r,largeImageURL:d,tags:e,likes:s,views:n,comments:x,downloads:v})=>`
        <li class="gallery-item">
        <a href="${d}" class="gallery-link">
          <div class="thumb">
            <img src="${r}" alt="${e}" class="gallery-img" />
          </div>
          <ul class="info-box">
            <li class="info-item">
              <span class="info-text">Likes</span>
              <span class="info-amount">${s}</span>
            </li>
            <li class="info-item">
              <span class="info-text">Views</span>
              <span class="info-amount">${n}</span>
            </li>
            <li class="info-item">
              <span class="info-text">Comments</span>
              <span class="info-amount">${x}</span>
            </li>
            <li class="info-item">
              <span class="info-text">Downloads</span>
              <span class="info-amount">${v}</span>
            </li>
          </ul>
        </a>
      </li>`).join("");h.insertAdjacentHTML("beforeend",o),M.refresh()}function O(){h.innerHTML=""}function L(){p.classList.remove("is-hidden")}function l(){p.classList.add("is-hidden")}function b(){g.classList.remove("is-hidden")}function c(){g.classList.add("is-hidden")}const R=document.querySelector(".form"),$=document.querySelector(".load-more");let u="",a=1,m=0;R.addEventListener("submit",B);$.addEventListener("click",P);async function B(t){if(t.preventDefault(),u=t.currentTarget.elements["search-text"].value.trim(),u===""){l(),i.error({position:"topRight",message:"Sorry, there are no images matching your search query. Please try again!",maxWidth:432});return}a=1,O(),c(),L();try{const o=await f(u,a);if(l(),o.hits.length===0){c(),i.error({title:"Oops!",message:"No images found. Try another search.",position:"topRight"});return}y(o.hits),m=Math.ceil(o.totalHits/15),a>=m?(c(),i.info({position:"topRight",message:"We're sorry, but you've reached the end of search results."})):b()}catch(o){l(),i.error({position:"topRight",message:o.message,maxWidth:432})}}async function P(){a+=1,L();try{const t=await f(u,a);if(l(),t.hits.length===0){c(),i.error({title:"Oops!",message:"No images found. Try another search.",position:"topRight"});return}y(t.hits),T(),a>=m?(c(),i.info({position:"topRight",message:"We're sorry, but you've reached the end of search results."})):b()}catch(t){l(),i.error({position:"topRight",message:t.message,maxWidth:432})}}function T(){const{height:t}=document.querySelector(".gallery").firstElementChild.getBoundingClientRect();window.scrollBy({top:t*2,behavior:"smooth"})}
//# sourceMappingURL=index.js.map
