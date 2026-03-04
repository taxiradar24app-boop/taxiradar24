// src/Academy/Pro/Profile/UserProgressCard.js

import React from "react";
import {
  Card,
  CardTitle,
  CardValue,
  CardSubtitle,
  CardMeta,
  LockedOverlay,
} from "./ProfileLayoutStyle";

export default function UserProgressCard({
  title,
  value,
  subtitle,
  meta,
  enabled = false,
}) {
  return (
    <Card $enabled={enabled}>
      {!enabled && <LockedOverlay>Disponible en PRO</LockedOverlay>}

      <CardTitle>{title}</CardTitle>
      <CardValue>{value}</CardValue>
      <CardSubtitle>{subtitle}</CardSubtitle>
      {meta ? <CardMeta>{meta}</CardMeta> : null}
    </Card>
  );
}