const themeMap = {
    dark: "light",
    light: "solar",
    solar: "dark"
  };
  let tmp 
  const theme =typeof window !='undefined' && localStorage.getItem('theme')
    || (tmp = Object.keys(themeMap)[0],
        localStorage.setItem('theme', tmp),
        tmp);
  const bodyClass =typeof window !='undefined' &&  document.body.classList;
  typeof window !='undefined' && bodyClass.add(theme);
  
  function toggleTheme(next) {
    const current = typeof window !='undefined' && localStorage.getItem('theme');
        if(!next) next = themeMap[current];
        typeof window !='undefined' &&  bodyClass.replace(current, next);
    typeof window !='undefined' && localStorage.setItem('theme', next);
  }
  export default toggleTheme