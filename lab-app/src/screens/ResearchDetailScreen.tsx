import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import { colors, spacing, fontSize } from '../theme';
import { researchDirections } from '../data/research';

const researchImageMap: Record<string, any[]> = {
  'water-quality-safety': [
    require('../../assets/research/water-quality-safety-cover.jpg'),
    require('../../assets/research/water-quality-safety-g01.jpg'),
    require('../../assets/research/water-quality-safety-g02.jpg'),
  ],
  'bubble-collapse-oh': [
    require('../../assets/research/bubble-collapse-oh-cover.jpg'),
    require('../../assets/research/bubble-collapse-oh-g01.jpg'),
    require('../../assets/research/bubble-collapse-oh-g02.jpg'),
  ],
  'surface-cleaning-removal': [
    require('../../assets/research/surface-cleaning-removal-cover.jpg'),
    require('../../assets/research/surface-cleaning-removal-g01.jpg'),
    require('../../assets/research/surface-cleaning-removal-g02.jpg'),
  ],
  'agriculture-salt-alkali': [
    require('../../assets/research/agriculture-salt-alkali-cover.jpg'),
    require('../../assets/research/agriculture-salt-alkali-g01.jpg'),
    require('../../assets/research/agriculture-salt-alkali-g02.jpg'),
  ],
  'equipment-development': [
    require('../../assets/research/equipment-development-cover.jpg'),
    require('../../assets/research/equipment-development-g01.jpg'),
    require('../../assets/research/equipment-development-g02.jpg'),
  ],
};

export default function ResearchDetailScreen({ route }: any) {
  const slug = route?.params?.slug as string;
  const item = researchDirections.find((r) => r.slug === slug);
  const images = researchImageMap[slug] || [];

  if (!item) {
    return (
      <View style={styles.emptyWrap}>
        <Text style={styles.emptyText}>未找到对应研究方向</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.heroCard}>
        <Text style={styles.title}>{item.titleZh}</Text>
        {!!item.titleEn && <Text style={styles.subTitle}>{item.titleEn}</Text>}
        {!!item.category && <Text style={styles.category}>{item.category}</Text>}
      </View>

      {!!images.length && (
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>相关图片</Text>
          <Image source={images[0]} style={styles.coverImage} resizeMode="cover" />
          <View style={styles.gridRow}>
            {images.slice(1).map((img, idx) => (
              <Image key={idx} source={img} style={styles.gridImage} resizeMode="cover" />
            ))}
          </View>
        </View>
      )}

      {!!item.briefZh && (
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>方向概述</Text>
          <Text style={styles.body}>{item.briefZh}</Text>
        </View>
      )}

      {!!item.positioningZh && (
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>学术定位</Text>
          <Text style={styles.body}>{item.positioningZh}</Text>
        </View>
      )}

      {!!item.keywords?.length && (
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>关键词</Text>
          <View style={styles.tagsWrap}>
            {item.keywords.map((k) => (
              <View key={k} style={styles.tag}>
                <Text style={styles.tagText}>{k}</Text>
              </View>
            ))}
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f6f8fb' },
  content: { padding: spacing.md, paddingBottom: spacing.xl },
  heroCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: '#eef2f7',
  },
  title: { fontSize: 24, fontWeight: '700', color: '#111827' },
  subTitle: { fontSize: fontSize.sm, color: '#6b7280', marginTop: 4 },
  category: { fontSize: fontSize.sm, color: colors.primary, marginTop: 8, fontWeight: '600' },
  sectionCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: '#eef2f7',
  },
  sectionTitle: { fontSize: fontSize.md, fontWeight: '700', color: '#0f172a', marginBottom: spacing.sm },
  body: { fontSize: fontSize.sm, color: '#334155', lineHeight: 22 },
  coverImage: { width: '100%', height: 170, borderRadius: 12, marginBottom: 8 },
  gridRow: { flexDirection: 'row', gap: 8 },
  gridImage: { flex: 1, height: 92, borderRadius: 10 },
  tagsWrap: { flexDirection: 'row', flexWrap: 'wrap' },
  tag: {
    backgroundColor: '#eff6ff',
    borderColor: '#dbeafe',
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: { color: '#1d4ed8', fontSize: 12, fontWeight: '600' },
  emptyWrap: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  emptyText: { color: '#64748b' },
});
