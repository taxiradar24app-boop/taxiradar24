import React from "react";
import {
  HeaderWrapper,
  HeaderInner,
  LogoBox,
  RightBox,
} from "./HeaderShellStyle";

export default function HeaderShell({ logo, rightContent }) {
  return (
    <HeaderWrapper>
      <HeaderInner>
        <LogoBox>{logo}</LogoBox>
        <RightBox>{rightContent}</RightBox>
      </HeaderInner>
    </HeaderWrapper>
  );
}
