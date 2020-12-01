import React, {useState, useEffect} from 'react';
import {Link, withRouter} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {Layout} from "antd";
import {
  CloseSquareOutlined,
  UnorderedListOutlined,
  LogoutOutlined,
  PlusOutlined,
  ProfileOutlined,
} from '@ant-design/icons';
import styled, {keyframes} from "styled-components";

import Text from "./Text";
import {media} from "../lib/helpers";
import * as AuthActions from "../actions/AuthActions";

export default withRouter(() => {
  const dispatch = useDispatch();
  const [background, setBackground] = useState("transparent");
  const [mobileMenu, setMobileMenu] = useState(false);
  const getMe = useSelector(state => state.auth.get("getMe"));
  const userRef = React.useRef();

  useEffect(() => {
    dispatch(AuthActions.getMe());
    let isCancelled = false;
    const handleScroll = () => {
      if (isCancelled) {
        return;
      }
      if (window.pageYOffset > 0) {
        setBackground("white");
      } else {
        setBackground("transparent");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      isCancelled = true;
      if (userRef && userRef.current) {
        userRef.current.setStop(true);
      }

    };
  }, []);

  const menus = [{
    icon: () => <ProfileOutlined />,
    text: "Surveys",
    to: "/",
  }];
  if (getMe) {
    menus.push({
      icon: () => <PlusOutlined />,
      text: "Create Question",
      to: "/survey/create",
    });
    menus.push({
      text: "Logout",
      to: "/logout",
      icon: () => <LogoutOutlined />,
    });
  } else {
    menus.push({
      icon: () => "",
      text: "Sign up",
      to: "/signup",
    });
    menus.push({
      icon: () => "",
      text: "Sign in",
      to: "/signin",
    });
  }

  return (
    <HeaderWrapper background={background}>
      <HeaderContent type="default" className="flex-h flex-1">
        <div className="flex-start flex-v flex-center flex-1">
          <Link to="/"><Text size="l" bold color="#333">Survey</Text></Link>
        </div>

        <BurgerButton
          className="ph10 flex-v flex-center"
          onClick={() => {
            setMobileMenu(true);
          }}
        >
          <UnorderedListOutlined />
        </BurgerButton>
        <MenuWrapper
          className="flex-2"
          show={mobileMenu}
          onClick={() => {
            setMobileMenu(false);
          }}
        >
          <Menu>
            <CloseButton onclick={() => setMobileMenu(false)}>
              <CloseSquareOutlined />
            </CloseButton>

            {menus.map((menu) => (
              <MenuLink to={menu.to} className="flex-v flex-center" key={menu.to}>
                <div className="flex-h flex-center">
                  <div className="mr5">{menu.icon()}</div>
                  <Text>{menu.text}</Text>
                </div>
              </MenuLink>
            ))}
          </Menu>
        </MenuWrapper>
      </HeaderContent>
    </HeaderWrapper>
  );
});

const fadeIn = keyframes`
  from {
    transform: translateX(-500px);
    opacity: 0;
  }

  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const CloseButton = styled.div`
  font-size: 30px;
  position: absolute;
  right: -30px;
  top: 15px;
  background: white;
  
  ${media.md`
    display: inline-block;
  `}
`;
const MenuWrapper = styled.div`
  background: transparent;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-end;

  ${media.md`
    display: ${props => (props.show ? "flex" : "none")};
    position: fixed;
    background: rgba(255, 255, 255, 0.5);
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 555;
  `}
`;

const Menu = styled.div`
  display: flex;
  flex-direction: row;

  ${media.md`
    animation: ${fadeIn} 0.3s linear;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    background: #fff;
    padding: 20px 20px;
    flex-direction: column;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
    min-width: 50vw;
  `}
`;

const MenuLink = styled(Link)`
  color: #333;
  align-items: center;
  height: ${props => props.theme.headerHeight};
  font-size: 16px;
  font-weight: bold;
  padding: 0 20px;
  text-align: center;
  border-bottom: 1px solid transparent;

  &:hover {
    border-bottom: 1px solid #5b40bb;
  }
  &:active {
    opacity: 0.9;
  }
  ${media.md`
    padding: 10px;
    margin: 10px 0;
    height: auto;
    width: 100%;
    align-items: flex-start;
  `}
`;

const HeaderContent = styled.div`
  width: 100%;
  max-width: ${props => props.theme.contentWidth}px;
  margin: auto;
  height: ${props => props.theme.headerHeight};
  ${media.md`
    padding: 0 10px;
  `}
`;

const HeaderWrapper = styled(Layout.Header)`
  z-Index: 12;
  position: fixed;
  width: 100%;
  padding: 0;
  color: #333;
  height: ${props => props.theme.headerHeight};
  line-height: 1;
  background: ${props => props.background} !important;
  ${props => `
    background: ${props.background} !important;
    box-shadow: ${props.background === "transparent" ? "none" : "0 0 10px 0px rgba(0, 0, 0, 0.2)"};
  `}
`;

const BurgerButton = styled.div`
  font-size: 25px;
  display: none !important;
  ${media.md`
    display: flex !important;
  `}
`;
