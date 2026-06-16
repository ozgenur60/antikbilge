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
            // If clicking the dropdown parent link in mobile mode, let the toggle handler deal with it
            var isMobile=hamburger&&getComputedStyle(hamburger).display!=='none';
            var isDropdownParent=link.parentElement&&link.parentElement.classList.contains('has-dropdown')&&link===link.parentElement.querySelector(':scope > a');
            if (isMobile&&isDropdownParent) return;
            // Otherwise close the hamburger menu
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
        var isMobile=hamburger&&getComputedStyle(hamburger).display!=='none';
        if (isMobile){
            // Mobile: toggle sub-items, don't navigate
            e.preventDefault();
            item.classList.toggle('mobile-open');
        } else {
            // Desktop: toggle .open class, don't navigate
            e.preventDefault();
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
