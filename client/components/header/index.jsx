import BellIcon  from './icons/bell.svg';
import MessengerIcon from './icons/messenger.svg';
import CaretIcon from './icons/caret.svg';
import PlusIcon  from './icons/plus.svg';
import CogIcon from './icons/cog.svg';
import ChevronIcon from './icons/chevron.svg';
import ArrowIcon  from './icons/arrow.svg';
import BoltIcon  from './icons/bolt.svg';
import React, { useState, useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { IconButton, useColorMode,chakra } from '@chakra-ui/react';
import {TO_DARK_SVG,TO_LIGHT_SVG} from './icons/theme'
import toggleTheme from './util/theme'
function HeaderComponent(props) {
  const {colorMode,toggleColorMode} = useColorMode()
  useEffect(()=>{
    //on change in theme in rest of the theme change navbar theme
    toggleTheme(colorMode)
  },[colorMode])
  return (
    <Navbar>
       <NavItem icon={'FARMER'}/>
      <NavItem icon={colorMode=='light' ?TO_DARK_SVG({onClick:toggleColorMode})
                                        :TO_LIGHT_SVG({onClick:toggleColorMode})} />
      <NavItem icon={<PlusIcon />}/>
      <NavItem icon={<BellIcon />} />
      <NavItem icon={<MessengerIcon />} />
      <NavItem icon={<CaretIcon />}>
            <DropdownMenu {...props}>
                </DropdownMenu>
      </NavItem>
    </Navbar>
  );
}

function Navbar(props) {
  return (
    <nav className="header">
      <ul className="header-nav">{props.children}</ul>
    </nav>
  );
}

function NavItem(props) {
  const [open, setOpen] = useState(false);

  return (
    <li className="header-item">
      <a href="#" className="icon-button" onClick={() => setOpen(!open)}>
        {props.icon}
      </a>

      {open && props.children}
    </li>
  );
}

function DropdownMenu(props) {
  const [activeMenu, setActiveMenu] = useState('main');
  const [menuHeight, setMenuHeight] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight+35)
  }, [])

  function calcHeight(el) {
    const height = el.offsetHeight+35;
    setMenuHeight(height);
  }

  function DropdownItem(props) {
    return (
      <a  href="#" style={{zIndex:10}} className="menu-item" onClick={() =>{ 
                                                        props.goToMenu && setActiveMenu(props.goToMenu);
                                                        props.onClick && props.onClick();
                                                      }}>
        <span className="icon-button">{props.leftIcon}</span>
        {props.children}
        <span className="icon-right">{props.rightIcon}</span>
      </a>
    );
  }
  return (
    <div className="dropdown" style={{ height: menuHeight,zIndex:20}} ref={dropdownRef}>

      <CSSTransition
        in={activeMenu === 'main'}
        timeout={500}
        classNames="menu-primary"
        unmountOnExit
        onEnter={calcHeight}>
        <div className="menu">
          <DropdownItem>My Profile</DropdownItem>
          <DropdownItem
            leftIcon={<CogIcon />}
            rightIcon={<ChevronIcon />}
            goToMenu="settings">
            Settings
          </DropdownItem>
          <DropdownItem
            leftIcon="🦧"
            rightIcon={<ChevronIcon />}
            goToMenu="login">
            Login
          </DropdownItem>

        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === 'settings'}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}>
        <div className="menu">
          <DropdownItem goToMenu="main" leftIcon={<ArrowIcon />}>
            <h2>My Tutorial</h2>
          </DropdownItem>
          <DropdownItem leftIcon={<BoltIcon />}>HTML</DropdownItem>
          <DropdownItem leftIcon={<BoltIcon />}>CSS</DropdownItem>
          <DropdownItem leftIcon={<BoltIcon />}>JavaScript</DropdownItem>
          <DropdownItem leftIcon={<BoltIcon />}>Awesome!</DropdownItem>
        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === 'login'}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}>
        <div className="menu">
          <DropdownItem goToMenu="main" leftIcon={<ArrowIcon />}>
            <h2>Login</h2>
          </DropdownItem>
          <DropdownItem leftIcon="🦘" onClick={()=>{console.log('asda')}}>Login</DropdownItem>
          <DropdownItem leftIcon="🐸" onClick={()=>{

          }}>Sign Up</DropdownItem>
        </div>
      </CSSTransition>
    </div>
  );
}
export default HeaderComponent;
