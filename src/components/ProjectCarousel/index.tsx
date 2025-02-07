import { theme } from '@theme/theme';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ListRenderItem,
} from 'react-native';
import { ProjectData } from 'src/store/Models/Project';

interface Project {
  id: string;
  name?: string;
  color?: string;
}

interface CarouselProps {
  title?: string;
  projects: ProjectData[];
  onSeeMore?: () => void;
  onPress?: (id: any) => void;
}

const ProjectCarousel: React.FC<CarouselProps> = ({
  title,
  projects,
  onSeeMore,
  onPress,
}) => {
  const renderItem: ListRenderItem<ProjectData> = ({ item }) => (
    <TouchableOpacity
      onPress={() => onPress && onPress(item.id_projeto)}
      activeOpacity={1}
      style={[
        styles.card,
        { backgroundColor: theme.colors.secondary.carousel },
      ]}
    >
      <Text style={styles.cardText}>{item.nome_projeto}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {onSeeMore && (
          <TouchableOpacity onPress={onSeeMore}>
            <Text style={styles.seeMore}>Ver mais</Text>
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={projects}
        renderItem={renderItem}
        keyExtractor={(item) => `${item.id_projeto}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 2,
    backgroundColor: 'white',
    marginBottom: 14,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: 500,
    color: theme.colors.primary.title,
  },
  seeMore: {
    fontSize: 14,
    color: theme.colors.primary.link,
    fontWeight: '600',
  },
  list: {
    gap: 10,
  },
  card: {
    width: 160,
    height: 100,
    borderRadius: 8,
    alignItems: 'flex-start',
    padding: 8,
  },
  cardText: {
    color: 'white',
    fontSize: 14,
    textAlign: 'left',
    alignItems: 'flex-end',
    marginBottom: 50,
    fontWeight: 'bold',
  },
});

export default ProjectCarousel;
