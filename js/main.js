(function(){'use strict';

// Hamburger menu
var hamburger=document.getElementById('hamburger');
var categoryMenu=document.querySelector('.category-menu');

// Keep the Roma Tarihi subcategory available across legacy static pages.
if (categoryMenu){
    var historyMenu=categoryMenu.querySelector('.has-dropdown > a[href$="tarih"] + .dropdown-menu');
    if (historyMenu&&!historyMenu.querySelector('a[href$="roma-tarihi"]')){
        var egyptLink=historyMenu.querySelector('a[href$="antik-misir-tarihi"]');
        var romaItem=document.createElement('li');
        var romaLink=document.createElement('a');
        var prefix=egyptLink&&egyptLink.getAttribute('href').indexOf('../')===0?'../':'';
        romaLink.href=prefix+'roma-tarihi';
        romaLink.textContent='Roma Tarihi';
        romaItem.appendChild(romaLink);
        historyMenu.appendChild(romaItem);
    }
}

if (hamburger&&categoryMenu){
    if (!categoryMenu.id) categoryMenu.id='category-menu';
    hamburger.setAttribute('aria-controls',categoryMenu.id);
    hamburger.setAttribute('aria-expanded','false');

    hamburger.addEventListener('click',function(){
        hamburger.classList.toggle('active');
        categoryMenu.classList.toggle('active');
        var isOpen=categoryMenu.classList.contains('active');
        hamburger.setAttribute('aria-expanded',isOpen?'true':'false');
        document.body.style.overflow=isOpen?'hidden':'';
    });

    categoryMenu.querySelectorAll('a').forEach(function(link){
        link.addEventListener('click',function(){
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded','false');
            categoryMenu.classList.remove('active');
            document.body.style.overflow='';
            document.querySelectorAll('.has-dropdown.mobile-open').forEach(function(el){
                el.classList.remove('mobile-open');
                var button=el.querySelector(':scope > .dropdown-toggle');
                if (button) button.setAttribute('aria-expanded','false');
            });
        });
    });
}

// Dropdown buttons keep category links navigable
document.querySelectorAll('.has-dropdown').forEach(function(item,index){
    var trigger=item.querySelector(':scope > a');
    var menu=item.querySelector(':scope > .dropdown-menu');
    if (!trigger||!menu) return;

    var arrow=trigger.querySelector('.dropdown-arrow');
    var toggle=document.createElement('button');
    var label=trigger.textContent.replace('▼','').trim();
    toggle.type='button';
    toggle.className='dropdown-toggle';
    toggle.setAttribute('aria-label',label+' alt kategorilerini aç');
    toggle.setAttribute('aria-expanded','false');

    if (!menu.id) menu.id='submenu-'+(index+1);
    toggle.setAttribute('aria-controls',menu.id);

    if (arrow){
        trigger.removeChild(arrow);
        toggle.appendChild(arrow);
    } else {
        toggle.innerHTML='<span class="dropdown-arrow" aria-hidden="true">&#9660;</span>';
    }
    item.insertBefore(toggle,menu);

    item.addEventListener('mouseenter',function(){
        if (window.innerWidth>992) item.classList.add('hover-open');
    });
    item.addEventListener('mouseleave',function(){
        item.classList.remove('hover-open');
    });

    toggle.addEventListener('click',function(e){
        e.preventDefault();
        e.stopPropagation();
        var mobile=window.innerWidth<=992;
        var activeClass=mobile?'mobile-open':'open';
        var isOpen=item.classList.contains(activeClass);

        document.querySelectorAll('.has-dropdown.open,.has-dropdown.mobile-open').forEach(function(el){
            el.classList.remove('open','mobile-open');
            var button=el.querySelector(':scope > .dropdown-toggle');
            if (button) button.setAttribute('aria-expanded','false');
        });

        if (!isOpen){
            item.classList.add(activeClass);
            toggle.setAttribute('aria-expanded','true');
        }
    });
});

// Close menus on outside click
document.addEventListener('click',function(e){
    if (!e.target.closest('.has-dropdown')){
        document.querySelectorAll('.has-dropdown.open,.has-dropdown.mobile-open').forEach(function(el){
            el.classList.remove('open','mobile-open');
            var button=el.querySelector(':scope > .dropdown-toggle');
            if (button) button.setAttribute('aria-expanded','false');
        });
    }
});

// Close navigation with Escape
document.addEventListener('keydown',function(e){
    if (e.key!=='Escape') return;

    document.querySelectorAll('.has-dropdown.open,.has-dropdown.mobile-open').forEach(function(el){
        el.classList.remove('open','mobile-open');
        var button=el.querySelector(':scope > .dropdown-toggle');
        if (button) button.setAttribute('aria-expanded','false');
    });

    if (categoryMenu&&categoryMenu.classList.contains('active')){
        categoryMenu.classList.remove('active');
        if (hamburger){
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded','false');
            hamburger.focus();
        }
        document.body.style.overflow='';
    }
});

// Contact form
var contactForm=document.querySelector('.contact-form');
if (contactForm){
    contactForm.addEventListener('submit',function(e){
        e.preventDefault();
        var formData=new FormData(this);
        var name=formData.get('name');
        alert('Teşekkürler '+name+'! Mesajınız alındı.');
        this.reset();
    });
}

// Shared back-to-top control, independent of legacy stylesheet versions.
if (!document.getElementById('back-to-top')){
    var backToTopStyle=document.createElement('style');
    backToTopStyle.textContent=`
        .back-to-top{position:fixed;right:16px;right:max(16px,env(safe-area-inset-right));top:50%;transform:translateY(-50%);z-index:999;width:44px;height:44px;display:flex;align-items:center;justify-content:center;border:1px solid #d4b896;border-radius:50%;background:#f5e8c8;color:#1e3a5f;box-shadow:0 2px 8px rgba(0,0,0,.16);cursor:pointer;touch-action:manipulation;-webkit-tap-highlight-color:transparent}
        .back-to-top[hidden]{display:none}
        .back-to-top svg{width:24px;height:24px;pointer-events:none}
        .back-to-top:focus-visible{outline:3px solid #1e3a5f;outline-offset:3px}
        @media(hover:hover){.back-to-top:hover{background:#1e3a5f;color:#fff}}
        @media(max-width:600px){.back-to-top{right:8px;right:max(8px,env(safe-area-inset-right))}}
    `;
    document.head.appendChild(backToTopStyle);
    var backToTop=document.createElement('button');
    backToTop.id='back-to-top';
    backToTop.className='back-to-top';
    backToTop.type='button';
    backToTop.hidden=true;
    backToTop.setAttribute('aria-label','Sayfanın başına dön');
    backToTop.title='Sayfanın başına dön';
    backToTop.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';
    document.body.appendChild(backToTop);
    var backToTopFrame=0;
    function updateBackToTop(){
        backToTopFrame=0;
        backToTop.hidden=window.scrollY<=300;
    }
    window.addEventListener('scroll',function(){
        if (!backToTopFrame) backToTopFrame=window.requestAnimationFrame(updateBackToTop);
    },{passive:true});
    window.addEventListener('pageshow',updateBackToTop);
    backToTop.addEventListener('click',function(){
        var reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        window.scrollTo({top:0,left:0,behavior:reduceMotion?'instant':'smooth'});
        // Keep keyboard focus near the destination after the button is hidden.
        var destination=document.querySelector('.top-nav a,.logo a,a.logo,main,h1');
        if (destination){
            var temporaryFocus=!destination.matches('a[href],button,input,select,textarea,[tabindex]');
            if (temporaryFocus){
                destination.setAttribute('tabindex','-1');
                destination.addEventListener('blur',function(){destination.removeAttribute('tabindex');},{once:true});
            }
            destination.focus({preventScroll:true});
        }
    });
    updateBackToTop();
}

// Article reading time
var articleBody=document.querySelector('.article-body');
if (articleBody){
    var text=articleBody.textContent||articleBody.innerText;
    var wordCount=text.trim().split(/\s+/).length;
    var readingTime=Math.ceil(wordCount/200);
    var readTimeEl=document.querySelector('.article-header .read-time');
    if (readTimeEl){
        readTimeEl.textContent=readingTime+' dk okuma';
    }
}

// Protect images from right-click
var protectedImages=document.querySelectorAll('.about-logo,.protected-image');
protectedImages.forEach(function(img){
    img.addEventListener('contextmenu',function(e){
        e.preventDefault();
        return false;
    });
    img.addEventListener('dragstart',function(e){
        e.preventDefault();
        return false;
    });
});

})();
