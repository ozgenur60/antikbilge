(function(){'use strict';

// Hamburger menu
var hamburger=document.getElementById('hamburger');
var categoryMenu=document.querySelector('.category-menu');
if (hamburger&&categoryMenu){
    hamburger.addEventListener('click',function(){
        hamburger.classList.toggle('active');
        categoryMenu.classList.toggle('active');
        document.body.style.overflow=categoryMenu.classList.contains('active')?'hidden':'';
    });
    categoryMenu.querySelectorAll('a').forEach(function(link){
        link.addEventListener('click',function(){
            var isMobileOpen=categoryMenu.classList.contains('active');
            var isDropdownParent=link.parentElement&&link.parentElement.classList.contains('has-dropdown')&&link===link.parentElement.querySelector(':scope > a');
            if (isMobileOpen&&isDropdownParent) return;
            hamburger.classList.remove('active');
            categoryMenu.classList.remove('active');
            document.body.style.overflow='';
            document.querySelectorAll('.has-dropdown.mobile-open').forEach(function(el){el.classList.remove('mobile-open');});
        });
    });
}

// Dropdown click toggle
document.querySelectorAll('.has-dropdown').forEach(function(item){
    var trigger=item.querySelector(':scope > a');
    var menu=item.querySelector(':scope > .dropdown-menu');
    if (!trigger||!menu) return;
    trigger.addEventListener('click',function(e){
        e.preventDefault();
        e.stopPropagation();
        var isMobileOpen=categoryMenu&&categoryMenu.classList.contains('active');
        if (isMobileOpen){
            item.classList.toggle('mobile-open');
        } else {
            var isOpen=item.classList.contains('open');
            document.querySelectorAll('.has-dropdown.open').forEach(function(el){el.classList.remove('open');});
            if (!isOpen) item.classList.add('open');
        }
    });
});

// Close desktop dropdown on outside click
document.addEventListener('click',function(e){
    if (!e.target.closest('.has-dropdown')){
        document.querySelectorAll('.has-dropdown.open').forEach(function(el){el.classList.remove('open');});
    }
});

// Cookie consent banner
(function(){
    if (localStorage.getItem('cookieConsent')) return;
    var banner=document.createElement('div');
    banner.className='cookie-banner';
    banner.innerHTML='<p>Bu site, hizmet kalitesini artırmak ve size özel reklamlar sunmak amacıyla Google Analytics ve Google AdSense çerezleri kullanmaktadır. Siteyi kullanmaya devam ederek <a href="cerez-politikasi.html">Çerez Politikamızı</a> kabul etmiş sayılırsınız.</p><div class="cookie-banner-buttons"><button class="cookie-accept">Kabul Et</button><button class="cookie-decline">Reddet</button></div>';
    document.body.appendChild(banner);
    banner.querySelector('.cookie-accept').addEventListener('click',function(){
        localStorage.setItem('cookieConsent','accepted');
        banner.classList.add('hidden');
    });
    banner.querySelector('.cookie-decline').addEventListener('click',function(){
        localStorage.setItem('cookieConsent','declined');
        banner.classList.add('hidden');
    });
})();

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
