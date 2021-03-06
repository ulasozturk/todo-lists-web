import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { getAuth } from "../redux/reducers/authentication";
import { IconWrapper } from "./iconWrapper";
import { useNavigate } from "react-router";
import { AccountIcon, LoginIcon } from "../assets/icons";
import { Box, FlexBox } from "./styled-components";
import { useOnClickOutside } from "../utils/hooks/useOnClickOutside";
import { NavbarDropdown } from "./";

export function Navbar() {
  const auth = useSelector(getAuth);
  const navigate = useNavigate();
  const goToHomepage = () => navigate("/");
  const buttonRef = React.useRef();
  const dropdownRef = React.useRef();
  const [isDropdownVisible, setIsDropdownVisible] = React.useState(false);
  const closeDropdown = React.useCallback(() => setIsDropdownVisible(false), []);
  const openDropdown = () => setIsDropdownVisible((s) => !s);
  useOnClickOutside({ buttonRef, dropdownRef, handler: closeDropdown });

  return (
    <Outer>
      <Inner>
        <FlexBox center justifyContent="space-between">
          <Heading style={{ cursor: "pointer" }} onClick={goToHomepage}>
            Todo Lists App
          </Heading>
          <Box position="relative" mr={10}>
            <IconWrapper
              ref={buttonRef}
              iconFill={(theme) => theme.navbar.iconColor}
              hoverBg={(theme) => theme.navbar.iconHoverBg}
              iconSize="36px"
              onClick={openDropdown}
              cursor="pointer"
              borderRadius={10}
            >
              {auth.refreshToken ? <AccountIcon /> : <LoginIcon />}
            </IconWrapper>
            {isDropdownVisible ? (
              <NavbarDropdown
                containerRef={dropdownRef}
                auth={auth}
                closeDropdown={closeDropdown}
              />
            ) : null}
          </Box>
        </FlexBox>
      </Inner>
    </Outer>
  );
}

const Outer = styled("div")({
  backgroundColor: ({ theme }) => theme.navbar.bg,
  borderBottomWidth: 1,
  borderBottomStyle: "solid",
  borderBottomColor: ({ theme }) => theme.navbar.borderBottomColor,
});

const Inner = styled("div")({
  maxWidth: ({ theme }) => theme.maxWidth,
  margin: "auto",
});

const Heading = styled("div")({
  color: ({ theme }) => theme.navbar.color,
  fontSize: 30,
  fontWeight: 600,
  padding: 15,
});
