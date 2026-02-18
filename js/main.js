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
            hamburger.classList.remove('active');
            categoryMenu.classList.remove('active');
            document.body.style.overflow='';
        });
    });
}

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
