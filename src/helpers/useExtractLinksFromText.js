import GradientText from '@/components/GradientText/GradientText'
import Row from '@/components/wrappers/row'

const { Pressable, Linking, Text } = require('react-native')

const useExtractLinksFromText = ({
  text = '',
  textStyle = {},
  linkStyle = {},
  wrapperStyle = {},
}) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g

  const TextComponents = text?.split(' ')?.map((word, index) => {
    const isLink = urlRegex?.test(word)

    return (
      <Pressable key={index} onPress={isLink ? () => Linking.openURL(word) : null}>
        {!isLink ? (
          <Text style={textStyle}>{word}</Text>
        ) : (
          <GradientText style={[textStyle, linkStyle]} colors={['#7DCE8A', '#4D7CFE']}>
            {word}
          </GradientText>
        )}
      </Pressable>
    )
  })
  return (
    <Row wrapper={{ maxWidth: '100%', flexWrap: 'wrap', ...wrapperStyle }}>{TextComponents}</Row>
  )
}
export default useExtractLinksFromText
