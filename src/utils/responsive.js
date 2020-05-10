import { Dimensions } from 'react-native';

const screenHeight = Dimensions.get("screen").height;
const screenWidth = Dimensions.get("screen").width;

export const hp = percentage => {
    return (screenHeight / 100) * percentage;
};

export const wp = percentage => {
    return (screenWidth / 100) * percentage;
};