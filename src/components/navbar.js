import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { getAuth } from "../redux/reducers/authentication";
import { IconWrapper } from "./iconWrapper";
import { useNavigate } from "react-router";
import { AccountIcon, LoginIcon } from "../assets/icons";
import { FlexBox, Text } from "./styled-components";
import { useOnClickOutside } from "../utils/useOnClickOutside";

export function Navbar() {
  const auth = useSelector(getAuth);
  const navigate = useNavigate();
  const goToHomepage = () => navigate("/");
  const dropdownRef = React.useRef();
  const buttonRef = React.useRef();
  const [isDropdownVisible, setIsDropdownVisible] = React.useState(false);
  const closeDropdown = React.useCallback(() => setIsDropdownVisible(false), []);
  const iconOnClick = () => setIsDropdownVisible((s) => !s);
  useOnClickOutside({ buttonRef, handler: closeDropdown });

  return (
    <Outer>
      <Inner>
        <FlexBox center justifyContent="space-between">
          <Heading style={{ cursor: "pointer" }} onClick={goToHomepage}>
            To Do Demo
          </Heading>
          <IconWrapper
            ref={buttonRef}
            iconFill={(theme) => theme.navbar.iconColor}
            iconSize="36px"
            onClick={iconOnClick}
            position="relative"
            hoverBg={(theme) => theme.colors.blue[3]}
            cursor="pointer"
            borderRadius={10}
          >
            {auth.refreshToken ? <AccountIcon /> : <LoginIcon />}
            {isDropdownVisible ? <Dropdown>Lorem ipsum</Dropdown> : null}
          </IconWrapper>
        </FlexBox>
      </Inner>
    </Outer>
  );
}

const Outer = styled("div")({
  backgroundColor: ({ theme }) => theme.colors.blue[0],
});

const Inner = styled("div")({
  maxWidth: ({ theme }) => theme.maxWidth,
  margin: "auto",
  padding: "0 10px",
});

const Heading = styled("div")({
  color: "white",
  fontSize: 24,
  padding: 15,
});

const Dropdown = styled("div")({
  position: "absolute",
  margin: 0,
  borderRadius: 10,
  right: 0,
  backgroundColor: "#eee",
  color: "#666",
  padding: 15,
});
