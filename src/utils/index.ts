export const handleScrollSection = (elementSelector: string) => {
    console.log(`handleScrollSection`, elementSelector)
    const NAVBAR_HEIGHT = 70;
    const nextSection = document.getElementById(elementSelector);
    
    if (nextSection) {
        const sectionPos = window.scrollY + nextSection.getBoundingClientRect().top - NAVBAR_HEIGHT;
        window.scroll({
          top: sectionPos,
          behavior: "smooth"
        });
    }
  };