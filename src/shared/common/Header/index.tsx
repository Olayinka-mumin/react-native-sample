import React, { useState } from 'react';
import {
  StatusBar,
  Platform,
  useColorScheme,
  ListRenderItemInfo,
} from 'react-native';
import Styles from './styles';

interface Props {
  onPressOption?: (index: number) => void;
  containerStyle?: object;
  leftContent?: JSX.Element;
  rightContent?: JSX.Element;
  back?: () => void;
  title: string;
  optionTxtStyle?: object;
  options?: string[];
}

export default ({
  leftContent,
  rightContent,
  back,
  title,
  options,
  optionTxtStyle,
  onPressOption,
  containerStyle,
}: Props) => {
  const scheme = useColorScheme();
  const [visible, setVisible] = useState(false);

  const menuSelect = (index: number) => {
    setVisible(false);
    onPressOption?.(index);
  };

  return (
    <>
      <Styles.Wrap style={containerStyle || {}} scheme={scheme}>
        <StatusBar
          barStyle={scheme === 'light' ? 'dark-content' : 'light-content'}
        />
        {Platform.OS === 'android' ? null : <Styles.StatusWrap />}
        <Styles.Head>
          <Styles.LeftBox>
            {leftContent && leftContent}
            {back && (
              <Styles.LeftBtn onPress={back}>
                <Styles.BackIcon name="keyboard-backspace" />
              </Styles.LeftBtn>
            )}
          </Styles.LeftBox>
          <Styles.CenterTitle>{title && title}</Styles.CenterTitle>
          <Styles.RightBox>
            {rightContent && rightContent}
            {options && options.length && (
              <Styles.RightTouch onPress={() => setVisible(true)}>
                <Styles.Dot name="dots-three-vertical" />
              </Styles.RightTouch>
            )}
          </Styles.RightBox>
        </Styles.Head>
      </Styles.Wrap>
      <Styles.Modal
        visible={visible}
        transparent
        animationType="fade"
      >
        <Styles.Inner
          activeOpacity={1}
          onPress={() => setVisible(false)}
        >
          <Styles.MenuWrap>
            <Styles.List
              data={options || []}
              keyExtractor={(item: string, index: number) => `${item}${index}`}
              renderItem={({ item, index }: ListRenderItemInfo<string>) => (
                <Styles.EachMenu onPress={() => menuSelect(index)}>
                  <Styles.MenuTxt style={optionTxtStyle || {}}>
                    {item}
                  </Styles.MenuTxt>
                </Styles.EachMenu>
              )}
            />
          </Styles.MenuWrap>
        </Styles.Inner>
      </Styles.Modal>
    </>
  );
};
