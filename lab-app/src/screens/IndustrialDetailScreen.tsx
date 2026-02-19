import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Linking, Image } from 'react-native';
import { colors, spacing, fontSize } from '../theme';
import { industrialBases } from '../data/industrialization';

const industrialImageMap: Record<string, any[]> = {
  aquaculture: [
    require('../../assets/industrialization/aquaculture/cover.jpg'),
    require('../../assets/industrialization/aquaculture/g01.jpg'),
    require('../../assets/industrialization/aquaculture/g02.jpg'),
    require('../../assets/industrialization/aquaculture/g03.jpg'),
  ],
  'reid-device-tianjin': [
    require('../../assets/industrialization/reid-device-tianjin/cover.jpg'),
    require('../../assets/industrialization/reid-device-tianjin/g01.jpg'),
    require('../../assets/industrialization/reid-device-tianjin/g02.jpg'),
    require('../../assets/industrialization/reid-device-tianjin/g03.jpg'),
  ],
};

export default function IndustrialDetailScreen({ route }: any) {
  const slug = route?.params?.slug as string;
  const base = industrialBases.find((b) => b.slug === slug);
  const images = industrialImageMap[slug] || [];

  if (!base) {
    return (
      <View style={styles.emptyWrap}>
        <Text style={styles.emptyText}>未找到对应基地</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.heroCard}>
        <Text style={styles.title}>{base.titleZh}</Text>
        {!!base.titleEn && <Text style={styles.subTitle}>{base.titleEn}</Text>}
        <Text style={styles.body}>{base.briefZh}</Text>
      </View>

      {!!images.length && (
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>现场图片</Text>
          <Image source={images[0]} style={styles.coverImage} resizeMode="cover" />
          <View style={styles.gridRow}>
            {images.slice(1).map((img, idx) => (
              <Image key={idx} source={img} style={styles.gridImage} resizeMode="cover" />
            ))}
          </View>
        </View>
      )}

      {!!base.highlightsZh?.length && (
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>核心亮点</Text>
          {base.highlightsZh.map((h, idx) => (
            <Text key={idx} style={styles.bullet}>• {h}</Text>
          ))}
        </View>
      )}

      {!!base.sections?.length && (
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>详细介绍</Text>
          {base.sections.map((s, idx) => (
            <View key={idx} style={{ marginBottom: 14 }}>
              <Text style={styles.subSectionTitle}>{s.titleZh}</Text>
              <Text style={styles.body}>{s.bodyZh}</Text>
              {!!s.bulletsZh?.length && (
                <View style={{ marginTop: 8 }}>
                  {s.bulletsZh.map((b, i) => (
                    <Text key={i} style={styles.bulletMinor}>▸ {b}</Text>
                  ))}
                </View>
              )}
            </View>
          ))}
        </View>
      )}

      <View style={styles.actionRow}>
        {!!base.locationUrl && (
          <TouchableOpacity style={styles.btn} onPress={() => Linking.openURL(base.locationUrl!)}>
            <Text style={styles.btnText}>📍 导航到基地</Text>
          </TouchableOpacity>
        )}
        {!!base.monitorUrl && (
          <TouchableOpacity style={[styles.btn, styles.btnAlt]} onPress={() => Linking.openURL(base.monitorUrl!)}>
            <Text style={styles.btnText}>📊 打开监测大屏</Text>
          </TouchableOpacity>
        )}
      </View>
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
  subTitle: { fontSize: fontSize.sm, color: '#6b7280', marginTop: 4, marginBottom: 8 },
  sectionCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: '#eef2f7',
  },
  sectionTitle: { fontSize: fontSize.md, fontWeight: '700', color: '#0f172a', marginBottom: spacing.sm },
  subSectionTitle: { fontSize: fontSize.sm, fontWeight: '700', color: '#1f2937', marginBottom: 4 },
  body: { fontSize: fontSize.sm, color: '#334155', lineHeight: 22 },
  coverImage: { width: '100%', height: 170, borderRadius: 12, marginBottom: 8 },
  gridRow: { flexDirection: 'row', gap: 8, marginBottom: 4 },
  gridImage: { flex: 1, height: 92, borderRadius: 10 },
  bullet: { fontSize: fontSize.sm, color: '#334155', lineHeight: 22, marginBottom: 4 },
  bulletMinor: { fontSize: 13, color: '#475569', lineHeight: 20, marginBottom: 4 },
  actionRow: { marginTop: 4 },
  btn: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  btnAlt: { backgroundColor: '#0f766e' },
  btnText: { color: '#fff', fontSize: 14, fontWeight: '600' },
  emptyWrap: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  emptyText: { color: '#64748b' },
});
