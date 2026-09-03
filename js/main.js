(function(){'use strict';

// Hamburger menu
var hamburger=document.getElementById('hamburger');
var categoryMenu=document.querySelector('.category-menu');
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
