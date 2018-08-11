function toggleMenu() {
    var slider = document.getElementById("block-views-block-slider-block-1");
    var hero = document.getElementsByClassName("headerHero");
    var menu = document.getElementById("block-bos365-main-menu");
    var toggle = document.getElementsByClassName("navbar-toggle");
    if (menu.className === "") {
        if(slider){
            slider.style.display = "none";
        }
        if(hero){
            hero[0].style.display = "none";
        }
        menu.className = "showMenu";
    } else {
        menu.className = "";
        if(slider){
            slider.style.display = "block";
        }
        if(hero){
            hero[0].style.display = "block";
        }
        toggle[0].blur();
    }
}