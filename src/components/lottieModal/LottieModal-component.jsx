import React from "react";

import { useLottie } from "lottie-react";

import { LottieCont } from "./LottieModal.styles";

const LottieModal = ({ animJSON, optionss, styles, notThis }) => {
  const options = {
    animationData: animJSON,
    loop: true,
    ...optionss,
  };

  const { View } = useLottie(options);

  return notThis ? (
    <div style={{ ...styles }}>{View}</div>
  ) : (
    <LottieCont style={{ ...styles }}>{View}</LottieCont>
  );
};

export default LottieModal;
