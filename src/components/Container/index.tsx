import React from 'react';
import { ScrollView, View, ViewStyle } from 'react-native';
import { theme } from '../../theme/theme';
import Header from '@components/Header';
import { getColor } from '@utils/getColor';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import FloatingButton from '@components/Button/FloatingButton';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ContainerProps {
  children: React.ReactNode;
  scrollEnabled?: boolean;
  spacerHorizontal?: 'small' | 'medium' | 'large';
  spacerVertical?: 'small' | 'medium' | 'large';
  title?: string;
  sizeText?: number;
  handlerPrimary?: () => void;
  hasGoBack?: boolean;
  hasDrawer?: boolean;
  noHeader?: boolean;
  color?: keyof typeof theme.colors | string;
  noMargin?: boolean;
  showMoreButton?: boolean;
  onPressShowMore?: () => void;
}

const Container: React.FC<ContainerProps> = ({
  children,
  scrollEnabled = false,
  spacerHorizontal = 'medium',
  spacerVertical = 'medium',
  title,
  handlerPrimary,
  hasGoBack,
  hasDrawer,
  noHeader,
  color = 'background',
  noMargin,
  showMoreButton = false,
  onPressShowMore,
  sizeText,
}) => {
  const navigation = useNavigation<BottomTabNavigationProp<any>>();
  const containerStyle: ViewStyle = {
    flex: 1,
    paddingHorizontal: noMargin ? undefined : theme.spacing[spacerHorizontal],
    paddingVertical: noMargin ? undefined : theme.spacing[spacerVertical],
    width: '100%',
    backgroundColor: getColor(color),
  };
  const handleHeader = () => {
    if (handlerPrimary) {
      handlerPrimary();
    } else {
      navigation.goBack();
    }
  };
  if (scrollEnabled) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: theme.colors.text.onPrimary,
        }}
      >
        {!noHeader && (
          <Header
            title={title}
            onPressPrimary={handleHeader}
            isBack={hasGoBack}
            isDrawer={hasDrawer}
            sizeText={sizeText}
          />
        )}
        <ScrollView
          nestedScrollEnabled={true} // <-- habilita scroll aninhado
          style={containerStyle}
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {children}
        </ScrollView>
        {showMoreButton && onPressShowMore && (
          <FloatingButton onPress={onPressShowMore} />
        )}
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.colors.text.onPrimary,
      }}
    >
      {!noHeader && (
        <Header
          title={title}
          onPressPrimary={handleHeader}
          isBack={hasGoBack}
          isDrawer={hasDrawer}
          sizeText={sizeText}
        />
      )}
      <View style={containerStyle}>{children}</View>
      {showMoreButton && onPressShowMore && (
        <FloatingButton onPress={onPressShowMore} />
      )}
    </SafeAreaView>
  );
};

export default Container;
