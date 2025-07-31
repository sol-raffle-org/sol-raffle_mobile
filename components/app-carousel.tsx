import { ReactNode, useRef, useState } from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import Carousel, { Pagination } from 'react-native-snap-carousel'

const { width } = Dimensions.get('window')

export interface AppCarouselProps<T> {
  data: T[]
  renderItem: ({ item, index }: { item: T; index: number }) => ReactNode
}

export const AppCarousel = <T,>({ data, renderItem }: AppCarouselProps<T>) => {
  const carouselRef = useRef<Carousel<T>>(null)

  const [activeIndex, setActiveIndex] = useState<number>(0)

  return (
    <View style={styles.root}>
      <Carousel
        ref={carouselRef}
        data={data}
        renderItem={renderItem}
        sliderWidth={width}
        itemWidth={width}
        onSnapToItem={(index: number) => setActiveIndex(index)}
        loop
        vertical={false}
      />

      <Pagination
        dotsLength={data.length}
        activeDotIndex={activeIndex}
        containerStyle={styles.paginationContainer}
        dotStyle={styles.dot}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.8}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },

  paginationContainer: {
    paddingVertical: 4,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#7FD88F',
  },
})
