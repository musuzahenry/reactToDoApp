import {getClasses}  from "./shorthands"

   
function hidePoppers(){
    const popers = getClasses("popper");
    Array.from(popers).forEach((popper) => popper.style.visibility = "hidden");
  }


function showPoppers(){
     const popers = getClasses("popper");
     Array.from(popers).forEach((popper) => popper.style.visibility = "visible");
}


   export {hidePoppers, showPoppers}